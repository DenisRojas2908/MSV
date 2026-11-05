// M4-4 Seguimiento (§B.3 M4, §B.4 M4, S2-M8): estado y entrega por proveedor,
// «Cómo se reparte tu pago» y aviso de retención por reclamo.
import { Info } from 'lucide-react';
import { baseEntrega, estadoDeProveedor, fechaEntrega, totalComprador } from '../../domain/pedido';
import { COMISION_PB } from '../../domain/reglas';
import { liquidacionRetenida } from '../../domain/reclamos';
import { useDemo } from '../../store/demo';
import { useResumenPedido } from '../../store/selectores';
import { Boton, Dinero, Etiqueta, Fecha, Monto, Pantalla, Porcentaje, Tarjeta } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';
import { usePedidoVista } from './vista';

export function M4_4Seguimiento() {
  const pedido = usePedidoVista('pagado');
  const resumen = useResumenPedido(pedido?.lineas);
  const reclamos = useDemo((s) => s.reclamos);
  const ahora = useDemo((s) => s.ahora);

  if (!pedido || !resumen) {
    return (
      <Pantalla id="M4-4" titulo="Seguimiento" contexto={<CabeceraComprador />} volver="/m1-3">
        <p className="text-sm text-texto/70">Aún no hay pedidos pagados.</p>
      </Pantalla>
    );
  }

  return (
    <Pantalla id="M4-4" titulo="Seguimiento" contexto={<CabeceraComprador />} volver="/m1-3">
      <div className="flex h-full flex-col gap-3">
        <section>
          <h1 className="mb-1.5 text-base font-bold">Pedido N.° {pedido.numero}</h1>
          <ul className="divide-y divide-texto/10 rounded-xl bg-blanco ring-1 ring-texto/10">
            {resumen.grupos.map((g) => {
              const estado = estadoDeProveedor(pedido, g.proveedor, reclamos, ahora);
              return (
                <li key={g.proveedor.id} className="flex items-center justify-between gap-2 px-3.5 py-2.5">
                  <span>
                    <span className="block text-sm font-semibold">{g.proveedor.nombre}</span>
                    <span className="block text-xs text-texto/70">
                      Entrega <Fecha f={fechaEntrega(baseEntrega(pedido), g.proveedor.plazoHoras)} />
                    </span>
                  </span>
                  <Etiqueta tono={estado === 'Reclamo abierto' ? 'ambar' : 'mallki'}>{estado}</Etiqueta>
                </li>
              );
            })}
          </ul>
        </section>

        <Tarjeta className="px-3.5 py-3">
          <h2 className="text-sm font-bold">Cómo se reparte tu pago</h2>
          <p className="mt-1 text-xs leading-relaxed text-texto/80">
            Pagas <Dinero c={totalComprador(resumen)} /> en una sola operación. Mallki retiene el <Porcentaje pb={COMISION_PB} /> a cada
            proveedor (<Dinero c={resumen.comisionTotal} />) y les paga <Dinero c={resumen.liquidacionTotal} /> en la liquidación semanal.
          </p>
          <table className="mt-2 w-full text-xs tabular-nums">
            <thead>
              <tr className="text-left text-texto/60">
                <th className="py-1 font-medium">Proveedor</th>
                <th className="py-1 text-right font-medium">Subtotal</th>
                <th className="py-1 text-right font-medium">Comisión <Porcentaje pb={COMISION_PB} /></th>
                <th className="py-1 text-right font-medium">Recibe</th>
              </tr>
              <tr className="text-right text-[10px] text-texto/50">
                <th />
                <th className="font-normal">S/</th>
                <th className="font-normal">S/</th>
                <th className="font-normal">S/</th>
              </tr>
            </thead>
            <tbody>
              {resumen.grupos.map((g) => (
                <tr key={g.proveedor.id} className="border-t border-texto/10">
                  <td className="py-1">{g.proveedor.nombre}</td>
                  <td className="py-1 text-right"><Monto c={g.subtotal} /></td>
                  <td className="py-1 text-right"><Monto c={g.comision} /></td>
                  <td className="py-1 text-right">
                    <Monto c={g.liquidacion} />
                    {liquidacionRetenida(reclamos, pedido.numero, g.proveedor.id) && (
                      <span className="block text-[10px] font-semibold text-texto/70">Retenido</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-texto/30 font-bold">
                <td className="py-1">Total</td>
                <td className="py-1 text-right"><Monto c={resumen.total} /></td>
                <td className="py-1 text-right"><Monto c={resumen.comisionTotal} /></td>
                <td className="py-1 text-right"><Monto c={resumen.liquidacionTotal} /></td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs text-texto/70">La comisión la paga el proveedor: tu total no cambia.</p>
        </Tarjeta>

        <div className="flex gap-2.5 rounded-xl bg-blanco px-3.5 py-3 ring-1 ring-texto/10">
          <Info size={18} className="mt-0.5 shrink-0 text-mallki" />
          <p className="text-sm">Si abres un reclamo, el pago a ese proveedor se retiene hasta resolverlo.</p>
        </div>

        <Boton a="/m1-4" className="mt-auto w-full py-3.5 text-base">Ir a Mis pedidos</Boton>
      </div>
    </Pantalla>
  );
}
