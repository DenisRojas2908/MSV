// M3-1 Buscador (§B.3 M3, §B.4 M3). Por categoría o producto, filtro «Opción ecológica».
import { BellRing, Check, ChevronRight, Leaf, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { NOMBRE_CATEGORIA } from '../../data/demo';
import { skusConPrecio } from '../../domain/comparador';
import type { Categoria } from '../../domain/tipos';
import { useDemo } from '../../store/demo';
import { useAlertas, useResumenSemaforo } from '../../store/selectores';
import { Dinero, Pantalla, Porcentaje, Punto } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';
import { coincide } from '../comun/texto';

const EJEMPLO = 'aceite vegetal 18 L';

export function M3_1Buscador() {
  const [consulta, setConsulta] = useState('');
  const [categoria, setCategoria] = useState<Categoria>('abarrotes');
  const [ecologica, setEcologica] = useState(false);
  const sem = useResumenSemaforo();
  const alertas = useAlertas();
  const ofertas = useDemo((s) => s.ofertas);
  const conPrecio = useMemo(() => skusConPrecio(ofertas), [ofertas]);
  const alerta = alertas[0];

  const filas = sem.lista.filter((s) => {
    if (ecologica && !s.sku.ecologica) return false;
    if (consulta.trim()) return coincide(consulta, `${s.sku.nombre} ${s.sku.presentacion}`);
    return ecologica || s.sku.categoria === categoria;
  });

  return (
    <Pantalla id="M3-1" titulo="Comparar precios" contexto={<CabeceraComprador />} volver="/m1-3">
      <div className="flex h-full flex-col gap-2.5">
        <label className="flex items-center gap-2 rounded-lg bg-blanco px-3 py-2.5 ring-1 ring-texto/20">
          <Search size={18} className="text-texto/50" />
          <input
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder={`Producto, por ejemplo «${EJEMPLO}»`}
            className="w-full bg-transparent text-sm outline-none placeholder:text-texto/40"
          />
        </label>

        <div className="flex gap-1.5">
          {(['abarrotes', 'envases'] as Categoria[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCategoria(c); setConsulta(''); setEcologica(false); }}
              className={`h-8 flex-1 whitespace-nowrap rounded-full text-xs font-semibold ${!consulta && !ecologica && categoria === c ? 'bg-mallki text-blanco' : 'bg-blanco text-texto ring-1 ring-texto/15'}`}
            >
              {NOMBRE_CATEGORIA[c]}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setEcologica((v) => !v)}
          className="-my-0.5 inline-flex items-center gap-2 self-start text-xs font-medium"
        >
          <span className={`flex h-4 w-4 items-center justify-center rounded ${ecologica ? 'bg-mallki text-blanco' : 'bg-blanco ring-1 ring-texto/30'}`}>
            {ecologica && <Check size={12} />}
          </span>
          <Leaf size={13} className="text-mallki" /> Opción ecológica
        </button>

        {alerta && (
          <Link to="/m3-3" className="flex items-center gap-2.5 rounded-lg bg-ambar/15 px-3 py-2 ring-1 ring-ambar/50">
            <BellRing size={18} className="shrink-0 text-ambar" />
            <span className="text-xs leading-snug">
              <span className="font-semibold">Aviso de precio:</span> {alerta.sku.nombre} de {alerta.proveedor.nombre} subió{' '}
              <Porcentaje valor={alerta.variacion} />. Ver alternativas
            </span>
            <ChevronRight size={16} className="ml-auto shrink-0" />
          </Link>
        )}

        <ul className="min-h-0 flex-1 divide-y divide-texto/10 overflow-hidden rounded-xl bg-blanco ring-1 ring-texto/10">
          {filas.map(({ sku, color, ofertantes }) => {
            const abre = conPrecio.includes(sku.n);
            const desde = ofertas.filter((o) => o.skuN === sku.n).map((o) => o.precio);
            const contenido = (
              <>
                <Punto color={color} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium leading-tight">
                    {sku.nombre}
                    {sku.ecologica && <Leaf size={11} className="ml-1 inline text-mallki" aria-label="Opción ecológica" />}
                  </span>
                  <span className="block text-[11px] leading-tight text-texto/60">
                    {sku.presentacion} · {ofertantes.length} {ofertantes.length === 1 ? 'oferta' : 'ofertas'}
                  </span>
                </span>
                {abre && desde.length > 0 ? (
                  <span className="flex items-center gap-1 text-right text-[11px] text-texto/70">
                    desde <span className="font-semibold text-texto"><Dinero c={Math.min(...desde)} /></span>
                    <ChevronRight size={14} />
                  </span>
                ) : null}
              </>
            );
            return (
              <li key={sku.n}>
                {abre ? (
                  <Link to={`/m3-2?sku=${sku.n}`} className="flex h-9 items-center gap-2.5 px-3">
                    {contenido}
                  </Link>
                ) : (
                  <div className="flex h-9 items-center gap-2.5 px-3">{contenido}</div>
                )}
              </li>
            );
          })}
          {filas.length === 0 && <li className="px-3 py-4 text-sm text-texto/60">Sin resultados.</li>}
        </ul>

        <Link to="/m3-4" className="flex items-center justify-between rounded-lg bg-blanco px-3 py-2.5 text-sm ring-1 ring-texto/10">
          <span>
            Semáforo de los {sem.total.total} SKU ·{' '}
            <span className="font-semibold">
              {sem.total.enVerde} de {sem.total.total} en verde
            </span>
          </span>
          <ChevronRight size={16} className="text-mallki" />
        </Link>
      </div>
    </Pantalla>
  );
}
