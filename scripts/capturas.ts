// npm run capturas [-- M3-1 M3-2 …]
// Genera las 20 capturas PNG de §B.1: abre cada ruta con ?captura=1, viewport exacto,
// deviceScaleFactor 1 y estado inicial del 09/11/2026. Verifica nombre, tamaño, que no haya
// contenido cortado ni scroll, y que no aparezcan palabras de §A.5. Sale con error si algo falla.
import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { PANTALLAS, TAMANOS } from '../src/data/pantallas';

const SALIDA = 'capturas';
const PROHIBIDAS = [
  /health meter/i,
  /patrocinad/i,
  /recomendad/i,
  /tecnopor/i,
  /ya opera/i,
  /clientes actuales/i,
  /resultados obtenidos/i,
  /\bU4\b/,
  /Unidad 1\.1/,
  /!/,
];

/** Ancho y alto de un PNG leyendo su cabecera IHDR. */
function tamanoPng(ruta: string): { ancho: number; alto: number } {
  const b = readFileSync(ruta);
  return { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20) };
}

async function main() {
  const pedidas = process.argv.slice(2).map((x) => x.toUpperCase());
  const lista = PANTALLAS.filter((p) => pedidas.length === 0 || pedidas.includes(p.id));
  if (lista.length === 0) throw new Error(`Ninguna pantalla coincide con: ${pedidas.join(' ')}`);
  mkdirSync(SALIDA, { recursive: true });

  const servidor = await preview({ preview: { port: 4317, strictPort: false }, logLevel: 'silent' });
  const base = servidor.resolvedUrls?.local[0];
  if (!base) throw new Error('No se pudo levantar vite preview');
  const navegador = await chromium.launch();
  const errores: string[] = [];

  try {
    for (const p of lista) {
      const { ancho, alto } = TAMANOS[p.dispositivo];
      const pagina = await navegador.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1 });
      await pagina.goto(`${base}?captura=1#${p.ruta}`);
      await pagina.waitForSelector('[data-pantalla]');
      await pagina.evaluate(() => document.fonts.ready);
      const r = await pagina.evaluate(() => {
        const marco = document.querySelector('[data-pantalla]')!.getBoundingClientRect();
        const c = document.querySelector('[data-contenido]')!;
        const cb = c.getBoundingClientRect();
        const todos = [...c.querySelectorAll('*')];
        // Cortes en los cuatro bordes del área de contenido (auditoría independiente #25).
        const fuera = todos.filter((e) => {
          const x = e.getBoundingClientRect();
          return (
            x.width > 0 &&
            (x.bottom > cb.bottom + 0.5 || x.right > cb.right + 0.5 || x.top < cb.top - 0.5 || x.left < cb.left - 0.5)
          );
        }).length;
        // Texto recortado con «…» (text-overflow: ellipsis) o que no cabe en su caja.
        const truncados = todos.filter((e) => {
          const el = e as HTMLElement;
          return getComputedStyle(el).textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth;
        }).length;
        // Listas con scroll interno que ya no caben (en el estado inicial no debe haber ninguna).
        const conScroll = todos.filter((e) => {
          const el = e as HTMLElement;
          const oy = getComputedStyle(el).overflowY;
          return (oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1;
        }).length;
        return {
          marco: [marco.x, marco.y, marco.width, marco.height],
          scroll: c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth,
          fuera,
          truncados,
          conScroll,
          doc: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
          texto: document.body.innerText,
        };
      });
      const archivo = join(SALIDA, p.archivo);
      await pagina.screenshot({ path: archivo });
      await pagina.close();

      const problemas: string[] = [];
      const [x, y, w, h] = r.marco;
      if (x !== 0 || y !== 0 || w !== ancho || h !== alto) problemas.push(`marco ${w} × ${h} en (${x}, ${y})`);
      if (r.scroll) problemas.push('el contenido hace scroll');
      if (r.fuera > 0) problemas.push(`${r.fuera} elementos cortados`);
      if (r.truncados > 0) problemas.push(`${r.truncados} textos truncados`);
      if (r.conScroll > 0) problemas.push(`${r.conScroll} listas con scroll interno`);
      if (r.doc[0]! > ancho || r.doc[1]! > alto) problemas.push(`la página mide ${r.doc[0]} × ${r.doc[1]}`);
      for (const pal of PROHIBIDAS) if (pal.test(r.texto)) problemas.push(`texto prohibido ${pal}`);
      const png = tamanoPng(archivo);
      if (png.ancho !== ancho || png.alto !== alto) problemas.push(`PNG de ${png.ancho} × ${png.alto}`);

      console.log(`${problemas.length ? 'ERROR' : 'ok   '}  ${p.archivo.padEnd(24)} ${png.ancho} × ${png.alto}${problemas.length ? '  ' + problemas.join('; ') : ''}`);
      if (problemas.length) errores.push(p.id);
    }
  } finally {
    await navegador.close();
    await new Promise<void>((res) => servidor.httpServer.close(() => res()));
  }

  console.log(`\n${lista.length - errores.length} de ${lista.length} capturas correctas en ${SALIDA}/`);
  if (errores.length) {
    console.error(`Con problemas: ${errores.join(', ')}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
