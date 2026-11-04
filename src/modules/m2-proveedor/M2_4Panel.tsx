// M2-4 Panel del proveedor (§B.3 M2, §B.4 M2, S2-M2, S2-M8): su parte del pedido N.° 0042,
// calificación, liquidación semanal (subtotal − comisión), aviso de 3.5 y descargo en 24 h.
import { AlertTriangle, Clock, Star } from 'lucide-react';
import { COMPRADOR } from '../../data/comprador';
import { NUMERO_PEDIDO_EJEMPLO } from '../../data/demo';
import { fechaDeInstante } from '../../domain/fechas';
import { baseEntrega, estadoDeProveedor, fechaEntrega } from '../../domain/pedido';
import { CALIFICACION_REVISION_DECIMAS, COMISION_PB, PLAZO_DESCARGO_U2_H } from '../../domain/reglas';
import { liquidacionRetenida, plazosReclamo } from '../../domain/reclamos';
import { formatearCalificacion } from '../../domain/umbrales';
import { useDemo } from '../../store/demo';
import { buscarSku, usePedido, useResumenPedido } from '../../store/selectores';
import { Dinero, Etiqueta, Fecha, Porcentaje, RotuloEscenario, Tarjeta } from '../../ui';
import { PantallaProveedor, QHAPAQ } from './comun';

export function M2_4Panel() {
  const pedido = usePedido(NUMERO_PEDIDO_EJEMPLO);
  const resumen = useResumenPedido(pedido?.lineas);
  const reclamos = useDemo((s) => s.reclamos);
  const ahora = useDemo((s) => s.ahora);
  const grupo = resumen?.grupos.find((g) => g.proveedor.id === QHAPAQ.id);
  const propios = reclamos.filter((r) => r.proveedorId === QHAPAQ.id);
  const retenida = pedido ? liquidacionRetenida(reclamos, pedido.numero, QHAPAQ.id) : false;

  return (
    <PantallaProveedor id="M2-4" titulo="Panel del proveedor">
      <div className="grid grid-cols-3 content-start gap-6">
        <Tarjeta className="col-span-2 p-6">
          <h2 className="text-sm font-semibold text-texto/70">Tu parte del pedido</h2>
          {pedido && grupo ? (
            <>
              <div className="mt-1 flex items-baseline justify-between">
                <p className="text-xl font-bold">
                  Pedido N.° {pedido.numero} · {COMPRADOR.razonSocial}
                </p>
                <Etiqueta tono={propios.length ? 'ambar' : 'mallki'}>{estadoDeProveedor(pedido, QHAPAQ, reclamos, ahora)}</Etiqueta>
              </div>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-texto/10 text-left text-xs text-texto/60">
                    <th className="py-2 font-medium">Producto</th>
                    <th className="py-2 text-right font-medium">Cantidad</th>
                    <th className="py-2 text-right font-medium">P. unit.</th>
                    <th className="py-2 text-right font-medium">Subtotal</th>
                    <th className="py-2 text-right font-medium">Entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.lineas.map((l) => {
                    const s = buscarSku(l.oferta.skuN);
                    return (
                      <tr key={l.oferta.id} className="border-b border-texto/5">
                        <td className="py-3 font-medium">{s.nombrePedido ?? s.nombre}</td>
                        <td className="py-3 text-right tabular-nums">{l.linea.cantidad}</td>
                        <td className="py-3 text-right"><Dinero c={l.precioUnitario} /></td>
                        <td className="py-3 text-right font-semibold"><Dinero c={l.subtotal} /></td>
                        <td className="py-3 text-right"><Fecha f={fechaEntrega(baseEntrega(pedido), QHAPAQ.plazoHoras)} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-texto/60">Despachas tu parte directamente al comprador.</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-texto/70">Sin pedidos pagados.</p>
          )}
        </Tarjeta>

        <Tarjeta className="flex flex-col p-6">
          <h2 className="text-sm font-semibold text-texto/70">Calificación</h2>
          <p className="mt-1 flex items-center gap-2 text-4xl font-bold">
            <Star size={28} className="text-mallki" /> {formatearCalificacion(QHAPAQ.calificacionDecimas)}
          </p>
          <div className="mt-4 rounded-lg bg-texto/5 p-3 text-sm leading-snug">
            Si tu calificación baja de {formatearCalificacion(CALIFICACION_REVISION_DECIMAS)}, tu cuenta pasa a revisión.
          </div>
        </Tarjeta>

        <Tarjeta className="col-span-2 p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-texto/70">Liquidación semanal</h2>
            {retenida && <RotuloEscenario />}
          </div>
          {grupo ? (
            <>
              <p className="mt-3 flex flex-wrap items-baseline gap-3 text-3xl font-bold tabular-nums">
                <Dinero c={grupo.subtotal} />
                <span className="text-texto/50">−</span>
                <Dinero c={grupo.comision} />
                <span className="text-texto/50">=</span>
                <span className="text-mallki"><Dinero c={grupo.liquidacion} /></span>
              </p>
              <p className="mt-2 text-sm text-texto/70">
                Tu venta del pedido N.° {pedido?.numero} menos la comisión de <Porcentaje pb={COMISION_PB} />. El comprador paga el precio completo; la
                comisión la paga el proveedor.
              </p>
              {retenida && (
                <p className="mt-3 flex items-center gap-2 rounded-lg bg-ambar/15 px-3 py-2 text-sm ring-1 ring-ambar/50">
                  <AlertTriangle size={16} className="text-ambar" /> Liquidación retenida hasta resolver el reclamo.
                </p>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-texto/70">Sin ventas por liquidar.</p>
          )}
        </Tarjeta>

        <Tarjeta className="flex flex-col p-6">
          <h2 className="text-sm font-semibold text-texto/70">Reclamos</h2>
          <p className="mt-2 flex items-center gap-2 text-base font-semibold">
            <Clock size={18} className="text-mallki" /> Descargo de reclamos en {PLAZO_DESCARGO_U2_H} horas
          </p>
          {propios.length === 0 ? (
            <p className="mt-2 text-sm text-texto/70">No tienes reclamos abiertos.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {propios.map((r) => (
                <li key={r.id} className="rounded-lg bg-ambar/15 px-3 py-2 text-sm ring-1 ring-ambar/50">
                  <span className="block font-semibold">Reclamo del pedido N.° {r.pedidoNumero}</span>
                  <span className="block text-xs">
                    Tu descargo vence el <Fecha f={fechaDeInstante(plazosReclamo(r).descargoU2)} />
                  </span>
                  {r.descripcion && <span className="mt-1 block text-xs text-texto/70">«{r.descripcion}»</span>}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-texto/60">Si recibes un reclamo, el comprador lo sigue con U1 y tu liquidación de ese pedido se retiene hasta resolverlo.</p>
        </Tarjeta>
      </div>
    </PantallaProveedor>
  );
}
