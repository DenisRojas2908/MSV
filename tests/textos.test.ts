// Revisa el código de la interfaz: sin montos ni porcentajes escritos a mano,
// sin nada de §A.5, sin emojis ni signos de exclamación en textos visibles.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? archivos(p) : p.endsWith('.tsx') || p.endsWith('.ts') ? [p] : [];
  });
}

const UI = [...archivos('src/ui'), ...archivos('src/modules'), ...archivos('src/simulacion')];
const TODO = [...UI, ...archivos('src/data'), ...archivos('src/store'), ...archivos('src/domain')];

// Quita comentarios para no confundir explicaciones con texto visible.
const sinComentarios = (t: string) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

describe('textos', () => {
  it('ningún monto ni porcentaje escrito a mano en ui, módulos o simulación', () => {
    for (const f of UI) {
      const t = sinComentarios(readFileSync(f, 'utf8'));
      expect(t, f).not.toMatch(/S\/\s?\d/);
      expect(t, f).not.toMatch(/\d\s?%/);
      expect(t, f).not.toMatch(/\b\d{1,3}\.\d{2}\b(?![^{]*\})/);
    }
  });
  it('nada de §A.5 en el código', () => {
    const prohibidas = [/health meter/i, /patrocinad/i, /recomendad/i, /tecnopor/i, /ya opera/i, /clientes actuales/i, /resultados obtenidos/i, /\bU4\b/, /Unidad 1\.1/];
    for (const f of TODO) {
      const t = sinComentarios(readFileSync(f, 'utf8'));
      for (const p of prohibidas) expect(t, `${f} ${p}`).not.toMatch(p);
    }
  });
  it('sin emojis ni signos de exclamación en textos de la interfaz', () => {
    for (const f of UI) {
      const t = sinComentarios(readFileSync(f, 'utf8'));
      expect(t, f).not.toMatch(/[¡]|\p{Extended_Pictographic}/u);
      expect(t, f).not.toMatch(/>[^<>{}=;&|]*!(?!=)[^<>{}]*</);
    }
  });
});
