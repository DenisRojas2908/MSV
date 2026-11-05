// M3-3 Alerta de precio (§B.3 M3, S2-M6): la subida y sus alternativas, sin tope (D-24).
import { BellRing, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatearCalificacion } from '../../domain/umbrales';
import { useAlertas } from '../../store/selectores';
import { Dinero, Pantalla, Porcentaje, Tarjeta } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';

export function M3_3Alerta() {
  const alertas = useAlertas();

  return (
    <Pantalla id="M3-3" titulo="Alerta de precio" contexto={<CabeceraComprador />} volver="/m3-1">
      {/* Con varias alertas, la lista se desplaza dentro de la pantalla; la cabecera queda fija (#13). */}
      <div className="-mx-1 -mt-1 flex h-full flex-col gap-3 overflow-y-auto px-1 pt-1">
        {alertas.length === 0 && <p className="text-sm text-texto/70">No hay alertas de precio.</p>}
        {alertas.map((a) => (
          <section key={a.oferta.id} className="flex shrink-0 flex-col gap-3">
            <div className="flex gap-3 rounded-xl bg-ambar/15 p-4 ring-1 ring-ambar/50">
              <BellRing size={22} className="mt-0.5 shrink-0 text-ambar" />
              <p className="text-[15px] leading-snug">
                El {a.sku.nombreEnFrase ?? a.sku.nombre.toLowerCase()} de {a.proveedor.nombre} subió de <Dinero c={a.anterior} /> a{' '}
                <Dinero c={a.nuevo} /> (<Porcentaje valor={a.variacion} />).
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Alternativas</h2>
              <p className="text-xs text-texto/70">Otras ofertas vigentes del mismo producto, de menor a mayor precio.</p>
            </div>
            {a.alternativas.length === 0 && <p className="text-sm text-texto/70">Sin alternativas vigentes por ahora.</p>}
            <ul className="flex flex-col gap-2">
              {a.alternativas.map((c) => (
                <li key={c.oferta.id}>
                  <Tarjeta className="flex items-center justify-between px-3.5 py-3">
                    <div>
                      <p className="font-semibold leading-tight">{c.proveedor.nombre}</p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-texto/70">
                        <span>Entrega en {c.proveedor.plazoHoras} h</span>
                        <span className="inline-flex items-center gap-0.5">
                          <Star size={12} className="text-texto/60" /> {formatearCalificacion(c.proveedor.calificacionDecimas)}
                        </span>
                      </p>
                    </div>
                    <p className="text-lg font-bold"><Dinero c={c.oferta.precio} /></p>
                  </Tarjeta>
                </li>
              ))}
            </ul>
            <Link to={`/m3-2?sku=${a.sku.n}`} className="flex items-center justify-center gap-1 rounded-lg bg-mallki px-4 py-3 text-sm font-semibold text-blanco">
              Ver el comparador de {a.sku.nombre.toLowerCase()} <ChevronRight size={16} />
            </Link>
          </section>
        ))}
      </div>
    </Pantalla>
  );
}
