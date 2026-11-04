// M3-4 Semáforo (§B.3 M3, S2-M1): los 24 SKU en el orden de §A.2 y «17 de 24 en verde: 71 %».
import { NOMBRE_CATEGORIA } from '../../data/demo';
import type { Categoria } from '../../domain/tipos';
import { useDemo } from '../../store/demo';
import { useResumenSemaforo } from '../../store/selectores';
import { Etiqueta, Pantalla, Porcentaje, Punto, RotuloEscenario } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';

export function M3_4Semaforo() {
  const sem = useResumenSemaforo();
  const enEscenario = useDemo((s) => s.escenarios.includes('E1'));
  const c = sem.total;

  return (
    <Pantalla id="M3-4" titulo="Semáforo de cobertura" contexto={<CabeceraComprador />} volver="/m3-1">
      <div className="flex h-full flex-col gap-2">
        <div className="rounded-xl bg-blanco px-3.5 py-2.5 ring-1 ring-texto/10">
          <p className="text-[17px] font-bold">
            {c.enVerde} de {c.total} en verde: <Porcentaje valor={c.porcentaje} />
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-texto/70">
            <span className="inline-flex items-center gap-1"><Punto color="verde" /> {sem.conteo.verde} verdes</span>
            <span className="inline-flex items-center gap-1"><Punto color="ambar" /> {sem.conteo.ambar} ámbar</span>
            <span className="inline-flex items-center gap-1"><Punto color="rojo" /> {sem.conteo.rojo} rojos</span>
            {sem.zona !== 'dentro-meta' && <Etiqueta tono="ambar">Bajo la meta</Etiqueta>}
            {enEscenario && <RotuloEscenario />}
          </p>
          <p className="mt-0.5 text-[11px] leading-tight text-texto/60">Verde: 3 ofertas · ámbar: 2 · rojo: 1 o ninguna. A la derecha, ofertas vigentes.</p>
        </div>
        {(['abarrotes', 'envases'] as Categoria[]).map((cat) => (
          <section key={cat}>
            <h2 className="px-1 pb-0.5 text-[11px] font-semibold uppercase tracking-wide text-texto/60">{NOMBRE_CATEGORIA[cat]}</h2>
            <ul className="divide-y divide-texto/5 rounded-xl bg-blanco ring-1 ring-texto/10">
              {sem.lista
                .filter((s) => s.sku.categoria === cat)
                .map((s) => (
                  <li key={s.sku.n} className="flex h-[22px] items-center gap-2 px-3 text-xs">
                    <span className="w-4 text-right tabular-nums text-texto/50">{s.sku.n}</span>
                    <Punto color={s.color} tamano={9} />
                    <span className="min-w-0 flex-1 truncate">{s.sku.nombre}</span>
                    <span className="tabular-nums text-texto/60">{s.ofertantes.length}</span>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </Pantalla>
  );
}
