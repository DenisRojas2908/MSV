// M2-3 Confirmación de precios (§B.3 M2, §B.4 M2, S2-M3): sus ofertas con «Confirmar precio»
// y los días que les quedan. Sin confirmar en 7 días, la oferta pasa a «No disponible».
import { Info, RefreshCw } from 'lucide-react';
import { SKUS } from '../../data/skus';
import { sumarDias } from '../../domain/fechas';
import { VIGENCIA_DIAS } from '../../domain/reglas';
import { diasRestantes, estadoVigencia } from '../../domain/vigencia';
import { useDemo } from '../../store/demo';
import { useHoy } from '../../store/selectores';
import { Boton, Dinero, Etiqueta, Fecha, RotuloEscenario, Tarjeta } from '../../ui';
import { PantallaProveedor, QHAPAQ } from './comun';

export function M2_3Confirmacion() {
  const ofertas = useDemo((s) => s.ofertas);
  const confirmar = useDemo((s) => s.confirmarPrecio);
  const escenario = useDemo((s) => s.escenarios.length > 0);
  const hoy = useHoy();
  const propias = ofertas.filter((o) => o.proveedorId === QHAPAQ.id);

  return (
    <PantallaProveedor id="M2-3" titulo="Confirmación de precios">
      <div className="flex h-full flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-bold">Tus ofertas</h1>
            <p className="text-sm text-texto/70">
              Hoy <Fecha f={hoy} /> · confirma tus precios para que sigan en el comparador.
            </p>
          </div>
          {escenario && <RotuloEscenario />}
        </div>

        <Tarjeta className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-texto/5 text-left text-xs text-texto/60">
              <tr>
                <th className="px-6 py-3 font-medium">Producto</th>
                <th className="px-6 py-3 text-right font-medium">Precio</th>
                <th className="px-6 py-3 font-medium">Confirmado</th>
                <th className="px-6 py-3 font-medium">Vigente hasta</th>
                <th className="w-[280px] px-6 py-3 font-medium">Días que le quedan</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {propias.map((o) => {
                const s = SKUS.find((x) => x.n === o.skuN)!;
                const dias = Math.max(0, diasRestantes(o, hoy));
                const estado = estadoVigencia(o, hoy);
                return (
                  <tr key={o.id} className="border-t border-texto/10">
                    <td className="px-6 py-4">
                      <span className="block font-semibold">{s.nombre}</span>
                      <span className="text-xs text-texto/60">{s.presentacion}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold"><Dinero c={o.precio} /></td>
                    <td className="px-6 py-4"><Fecha f={o.confirmadaEl} corta /></td>
                    <td className="px-6 py-4"><Fecha f={sumarDias(o.confirmadaEl, VIGENCIA_DIAS - 1)} /></td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-3">
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-texto/10">
                          <span className="block h-full rounded-full bg-mallki" style={{ width: `${(dias / VIGENCIA_DIAS) * 100}%` }} />
                        </span>
                        <span className="w-16 whitespace-nowrap font-semibold tabular-nums">
                          {dias} {dias === 1 ? 'día' : 'días'}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {estado === 'vigente' && <Etiqueta tono="mallki">Vigente</Etiqueta>}
                      {estado === 'vence-manana' && <Etiqueta tono="ambar">Vence mañana</Etiqueta>}
                      {estado === 'no-disponible' && <Etiqueta tono="rojo">No disponible</Etiqueta>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Boton className="px-4 py-2 text-sm" onClick={() => confirmar(o.id)}>
                        <RefreshCw size={14} /> Confirmar precio
                      </Boton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Tarjeta>

        <div className="flex max-w-3xl gap-3 rounded-xl bg-blanco p-5 ring-1 ring-texto/10">
          <Info size={20} className="mt-0.5 shrink-0 text-mallki" />
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">Vigencia de {VIGENCIA_DIAS} días</p>
            <p className="text-texto/80">
              Solo es vigente el precio confirmado en los últimos {VIGENCIA_DIAS} días. Sin confirmar en {VIGENCIA_DIAS} días, la oferta pasa a
              «No disponible»: sale del comparador y no cuenta para el semáforo. Confirmar el precio, o cambiarlo, reinicia los {VIGENCIA_DIAS} días.
            </p>
          </div>
        </div>
      </div>
    </PantallaProveedor>
  );
}
