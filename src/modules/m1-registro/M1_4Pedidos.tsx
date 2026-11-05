// M1-4 Mis pedidos y reclamos (§B.3 M1, S2-M8, D-16, D-21): el pedido N.° 0042 con su estado
// por proveedor y «Abrir reclamo» con «Lo resolvemos en 48 horas».
import { Clock, MessageSquareWarning } from 'lucide-react';
import { useState } from 'react';
import { fechaDeInstante } from '../../domain/fechas';
import { baseEntrega, estadoDeProveedor, fechaEntrega } from '../../domain/pedido';
import { PLAZO_RECLAMO_U1_H } from '../../domain/reglas';
import { esExcepcionS3, plazosReclamo, puedeAbrirReclamo } from '../../domain/reclamos';
import type { ProveedorId } from '../../domain/tipos';
import { useDemo } from '../../store/demo';
import { buscarProveedor, buscarSku, useResumenPedido } from '../../store/selectores';
import { Boton, Dinero, Etiqueta, Fecha, Pantalla, RotuloEscenario, Tarjeta } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';

export function M1_4Pedidos() {
  const pedidos = useDemo((s) => s.pedidos);
  const reclamos = useDemo((s) => s.reclamos);
  const ahora = useDemo((s) => s.ahora);
  const abrir = useDemo((s) => s.abrirReclamo);
  const [elegido, setElegido] = useState<string | null>(null);
  const pedido = pedidos.find((p) => p.numero === elegido) ?? pedidos[pedidos.length - 1] ?? null;
  const resumen = useResumenPedido(pedido?.lineas);
  // Solo los reclamos del pedido elegido (auditoría independiente #5).
  const reclamosPedido = pedido ? reclamos.filter((r) => r.pedidoNumero === pedido.numero) : [];
  const disponibles = pedido && resumen ? resumen.grupos.filter((g) => puedeAbrirReclamo(reclamos, pedido.numero, g.proveedor.id)) : [];
  const [formulario, setFormulario] = useState(false);
  const [proveedor, setProveedor] = useState<ProveedorId | null>(null);
  const [descripcion, setDescripcion] = useState('');

  const enviar = () => {
    if (!pedido || !proveedor) return;
    abrir(pedido.numero, proveedor, descripcion.trim());
    setFormulario(false);
    setProveedor(null);
    setDescripcion('');
  };

  return (
    <Pantalla id="M1-4" titulo="Mis pedidos y reclamos" contexto={<CabeceraComprador />} volver="/m1-3">
      {!pedido || !resumen ? (
        <p className="text-sm text-texto/70">Todavía no tienes pedidos.</p>
      ) : (
        <div className="flex h-full flex-col gap-3">
          {pedidos.length > 1 && (
            <div className="flex shrink-0 gap-1.5">
              {[...pedidos].reverse().map((p) => (
                <button
                  key={p.numero}
                  type="button"
                  onClick={() => setElegido(p.numero)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${p.numero === pedido.numero ? 'bg-mallki text-blanco' : 'bg-blanco ring-1 ring-texto/20'}`}
                >
                  N.°&nbsp;{p.numero}
                </button>
              ))}
            </div>
          )}
          <Tarjeta className="shrink-0 px-3.5 py-3">
            <div className="flex items-baseline justify-between">
              <h1 className="text-base font-bold">Pedido N.° {pedido.numero}</h1>
              <span className="font-bold"><Dinero c={resumen.total} /></span>
            </div>
            <p className="text-xs text-texto/60">
              <Fecha f={pedido.fecha} /> · {resumen.grupos.length} {resumen.grupos.length === 1 ? 'proveedor' : 'proveedores'} · un solo pago
            </p>
            <ul className="mt-2 divide-y divide-texto/10">
              {resumen.grupos.map((g) => {
                const estado = estadoDeProveedor(pedido, g.proveedor, reclamos, ahora);
                return (
                  <li key={g.proveedor.id} className="flex items-center justify-between gap-2 py-2">
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{g.proveedor.nombre}</span>
                      <span className="block truncate text-xs text-texto/60">
                        {g.lineas.map((l) => buscarSku(l.oferta.skuN).nombrePedido).join(', ')}
                      </span>
                      <span className="block text-xs text-texto/60">
                        Entrega <Fecha f={fechaEntrega(baseEntrega(pedido), g.proveedor.plazoHoras)} />
                      </span>
                    </span>
                    <Etiqueta tono={estado === 'Reclamo abierto' ? 'ambar' : 'mallki'}>{estado}</Etiqueta>
                  </li>
                );
              })}
            </ul>
          </Tarjeta>

          {/* Con varios reclamos, esta sección se desplaza; el pedido queda fijo arriba (#14). */}
          <section className="-mx-1 -mb-1 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-1 pb-1">
            <h2 className="text-sm font-semibold">Reclamos</h2>
            {reclamosPedido.map((r) => {
              const p = buscarProveedor(r.proveedorId);
              const sub = resumen.grupos.find((g) => g.proveedor.id === r.proveedorId)?.subtotal ?? 0;
              return (
                <div key={r.id} className="rounded-xl bg-ambar/15 px-3.5 py-2.5 text-sm ring-1 ring-ambar/50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">Reclamo a {p.nombre}</span>
                    <RotuloEscenario />
                  </div>
                  {r.descripcion && <p className="mt-0.5 text-xs text-texto/70">«{r.descripcion}»</p>}
                  <p className="mt-1 text-xs">
                    Lo resolvemos hasta el <Fecha f={fechaDeInstante(plazosReclamo(r).cierreU1)} />. El pago a {p.nombre} queda retenido hasta resolverlo.
                  </p>
                  {esExcepcionS3(sub) && <p className="mt-1 text-xs font-semibold">Tu reclamo pasa a revisión especial.</p>}
                </div>
              );
            })}

            {formulario ? (
              <Tarjeta className="flex flex-col gap-2.5 px-3.5 py-3">
                <p className="text-sm font-semibold">¿Sobre qué proveedor es el reclamo?</p>
                <div className="flex flex-col gap-1.5">
                  {disponibles.map((g) => (
                    <button
                      key={g.proveedor.id}
                      type="button"
                      onClick={() => setProveedor(g.proveedor.id)}
                      className={`rounded-lg px-3 py-2 text-left text-sm ${proveedor === g.proveedor.id ? 'bg-mallki text-blanco' : 'bg-blanco ring-1 ring-texto/20'}`}
                    >
                      {g.proveedor.nombre}
                    </button>
                  ))}
                </div>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe el problema"
                  rows={2}
                  className="rounded-lg bg-blanco px-3 py-2 text-sm ring-1 ring-texto/20 placeholder:text-texto/40 focus:outline-none focus:ring-mallki"
                />
                <div className="flex gap-2">
                  <Boton variante="secundario" className="flex-1 py-2.5 text-sm" onClick={() => setFormulario(false)}>Cancelar</Boton>
                  <Boton className="flex-1 py-2.5 text-sm" disabled={!proveedor} onClick={enviar}>Enviar reclamo</Boton>
                </div>
              </Tarjeta>
            ) : (
              <div className="rounded-xl bg-blanco px-3.5 py-3 ring-1 ring-texto/10">
                <Boton className="w-full py-3 text-base" disabled={disponibles.length === 0} onClick={() => setFormulario(true)}>
                  <MessageSquareWarning size={18} /> Abrir reclamo
                </Boton>
                {disponibles.length === 0 && (
                  <p className="mt-2 text-center text-xs text-texto/60">Ya tienes un reclamo abierto con cada proveedor de este pedido.</p>
                )}
                <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-mallki">
                  <Clock size={15} /> Lo resolvemos en {PLAZO_RECLAMO_U1_H} horas
                </p>
                <p className="mt-1 text-center text-xs text-texto/60">Mientras se resuelve, el pago a ese proveedor se retiene.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </Pantalla>
  );
}
