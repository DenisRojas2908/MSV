// M3-2 Comparador (§B.3 M3, §B.4 M3): máximo tres ofertas, de menor a mayor precio,
// sin destacados. «vence mañana» y «subió de» se calculan. «¿Cómo ordenamos?» (S2-M4).
import { Info, Minus, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AVISO_CAMBIO_CRITERIOS_H, VIGENCIA_DIAS } from '../../domain/reglas';
import { textoVigencia } from '../../domain/vigencia';
import { formatearCalificacion } from '../../domain/umbrales';
import { useDemo } from '../../store/demo';
import { buscarSku, useComparador, useResumenSemaforo } from '../../store/selectores';
import { Boton, Dinero, Etiqueta, Fecha, Pantalla, Semaforo, Tarjeta } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';

export function M3_2Comparador() {
  const [params] = useSearchParams();
  const skuN = Number(params.get('sku') ?? '1') || 1;
  const sku = buscarSku(skuN);
  const lista = useComparador(skuN);
  const sem = useResumenSemaforo().lista.find((s) => s.sku.n === skuN);
  const agregar = useDemo((s) => s.agregarAlCarrito);
  const navegar = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [criterio, setCriterio] = useState(true);

  return (
    <Pantalla id="M3-2" titulo="Comparador" contexto={<CabeceraComprador />} volver="/m3-1">
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-lg font-bold leading-tight">{sku.nombre}</h1>
            <p className="text-sm text-texto/70">{sku.presentacion}</p>
          </div>
          {sem && <span className="text-xs"><Semaforo color={sem.color} etiqueta={`${lista.length} ${lista.length === 1 ? 'oferta' : 'ofertas'}`} /></span>}
        </div>

        <div className="flex items-center justify-between text-xs text-texto/70">
          <span>Precio de menor a mayor · con IGV</span>
          <button type="button" onClick={() => setCriterio((v) => !v)} className="inline-flex items-center gap-1 font-semibold text-mallki underline underline-offset-2">
            <Info size={13} /> ¿Cómo ordenamos?
          </button>
        </div>

        <ol className="flex flex-col gap-2">
          {lista.map((c) => {
            const aviso = textoVigencia(c.estado);
            const subio = c.oferta.precioAnterior !== undefined && c.oferta.precio > c.oferta.precioAnterior;
            return (
              <li key={c.oferta.id}>
                <Tarjeta className="px-3.5 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold leading-tight">{c.proveedor.nombre}</p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-texto/70">
                        <span>Entrega en {c.proveedor.plazoHoras} h</span>
                        <span className="inline-flex items-center gap-0.5">
                          <Star size={12} className="text-texto/60" /> {formatearCalificacion(c.proveedor.calificacionDecimas)}
                        </span>
                      </p>
                    </div>
                    <p className="text-xl font-bold leading-tight"><Dinero c={c.oferta.precio} /></p>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="flex flex-wrap items-center gap-1.5 text-xs text-texto/70">
                      Confirmado <Fecha f={c.oferta.confirmadaEl} corta />
                      {aviso && <Etiqueta tono="ambar">{aviso}</Etiqueta>}
                      {subio && c.oferta.precioAnterior !== undefined && (
                        <Etiqueta tono="ambar">subió de <Dinero c={c.oferta.precioAnterior} /></Etiqueta>
                      )}
                    </span>
                    <Boton
                      variante="secundario"
                      className="shrink-0 whitespace-nowrap px-3 py-1.5 text-xs"
                      onClick={() => { agregar(c.oferta.id, cantidad); navegar('/m4-1'); }}
                    >
                      Agregar al pedido
                    </Boton>
                  </div>
                </Tarjeta>
              </li>
            );
          })}
        </ol>

        <div className="flex items-center justify-between rounded-lg bg-blanco px-3 py-2 text-sm ring-1 ring-texto/10">
          <span className="text-texto/70">Cantidad</span>
          <span className="flex items-center gap-3">
            <button type="button" aria-label="Menos" onClick={() => setCantidad((n) => Math.max(1, n - 1))} className="rounded-full p-1 ring-1 ring-texto/20"><Minus size={14} /></button>
            <span className="w-5 text-center font-semibold tabular-nums">{cantidad}</span>
            <button type="button" aria-label="Más" onClick={() => setCantidad((n) => n + 1)} className="rounded-full p-1 ring-1 ring-texto/20"><Plus size={14} /></button>
          </span>
        </div>

        {criterio && (
          <div className="rounded-lg bg-mallki/5 px-3 py-2.5 text-xs leading-relaxed ring-1 ring-mallki/20">
            <p className="font-semibold text-mallki">¿Cómo ordenamos?</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              <li>Por precio, de menor a mayor. A igual precio, primero el menor plazo de entrega y luego la confirmación más reciente.</li>
              <li>El orden no cambia porque alguien pague. No hay destacados.</li>
              <li>Un cambio de criterios se avisa con {AVISO_CAMBIO_CRITERIOS_H} horas de anticipación.</li>
              <li>Solo se muestran precios confirmados en los últimos {VIGENCIA_DIAS} días.</li>
            </ul>
          </div>
        )}
      </div>
    </Pantalla>
  );
}
