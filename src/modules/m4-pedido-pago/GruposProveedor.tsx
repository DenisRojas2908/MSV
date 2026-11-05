// Pedido agrupado por proveedor: líneas, subtotal y plazo o fecha de entrega.
import { Lock } from 'lucide-react';
import type { ResumenPedido } from '../../domain/pedido';
import type { FechaISO } from '../../domain/tipos';
import { buscarSku } from '../../store/selectores';
import { Dinero, Fecha, Tarjeta } from '../../ui';

interface Props {
  resumen: ResumenPedido;
  /** Fecha de entrega por proveedor; si no se da, se muestra el plazo. */
  entrega?: (plazoHoras: number) => FechaISO;
  vencidas?: string[];
  /** Controles de una línea con precio vencido (D-26, auditoría independiente #4). */
  onQuitar?: (ofertaId: string) => void;
  onElegirOtra?: (ofertaId: string) => void;
  fijado?: boolean;
}

export function GruposProveedor({ resumen, entrega, vencidas = [], fijado, onQuitar, onElegirOtra }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {resumen.grupos.map((g) => (
        <li key={g.proveedor.id}>
          <Tarjeta className="px-3.5 py-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-semibold">{g.proveedor.nombre}</p>
              <p className="text-xs text-texto/70">
                {entrega ? (
                  <>Entrega <Fecha f={entrega(g.proveedor.plazoHoras)} /></>
                ) : (
                  <>Entrega en {g.proveedor.plazoHoras} h</>
                )}
              </p>
            </div>
            {g.lineas.map((l) => {
              const sku = buscarSku(l.oferta.skuN);
              const vencida = vencidas.includes(l.oferta.id);
              return (
                <div key={l.oferta.id} className="mt-1 flex items-baseline justify-between gap-2 text-sm">
                  <span className="min-w-0">
                    <span className="block">{sku.nombrePedido ?? sku.nombre}</span>
                    <span className="flex items-center gap-1 text-xs text-texto/60">
                      {l.linea.cantidad} × <Dinero c={l.precioUnitario} />
                      {fijado && <Lock size={11} className="text-mallki" aria-label="Precio fijado" />}
                    </span>
                    {vencida && <span className="block text-xs font-medium text-rojo">Precio vencido: elige otra oferta</span>}
                    {vencida && (onQuitar || onElegirOtra) && (
                      <span className="mt-1 flex gap-3 text-xs font-semibold">
                        {onElegirOtra && (
                          <button type="button" onClick={() => onElegirOtra(l.oferta.id)} className="text-mallki underline underline-offset-2">
                            Elegir otra oferta
                          </button>
                        )}
                        {onQuitar && (
                          <button type="button" onClick={() => onQuitar(l.oferta.id)} className="text-texto/70 underline underline-offset-2">
                            Quitar
                          </button>
                        )}
                      </span>
                    )}
                  </span>
                  {g.lineas.length > 1 && <span className="tabular-nums"><Dinero c={l.subtotal} /></span>}
                </div>
              );
            })}
            <div className="mt-1.5 flex justify-between border-t border-texto/10 pt-1.5 text-sm font-semibold">
              <span>Subtotal</span>
              <Dinero c={g.subtotal} />
            </div>
          </Tarjeta>
        </li>
      ))}
    </ul>
  );
}

export function FilaTotal({ total, nota }: { total: number; nota?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-mallki/10 px-3.5 py-3">
      <span>
        <span className="block text-sm font-semibold">Total</span>
        {nota && <span className="block text-xs text-texto/70">{nota}</span>}
      </span>
      <span className="text-xl font-bold"><Dinero c={total} /></span>
    </div>
  );
}
