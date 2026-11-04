// M4-2 Confirmación (§B.3 M4, S2-M5): «Precio fijado», ya no cambia aunque el proveedor lo actualice.
import { Lock } from 'lucide-react';
import { baseEntrega, fechaEntrega } from '../../domain/pedido';
import { useResumenPedido } from '../../store/selectores';
import { Boton, Pantalla } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';
import { FilaTotal, GruposProveedor } from './GruposProveedor';
import { usePedidoVista } from './vista';

export function M4_2Confirmacion() {
  const pedido = usePedidoVista('confirmado');
  const resumen = useResumenPedido(pedido?.lineas);

  return (
    <Pantalla id="M4-2" titulo="Confirmación" contexto={<CabeceraComprador />} volver="/m4-1">
      {!pedido || !resumen ? (
        <p className="text-sm text-texto/70">No hay un pedido confirmado.</p>
      ) : (
        <div className="flex h-full flex-col gap-2.5">
          <div className="rounded-xl bg-mallki px-4 py-3 text-blanco">
            <p className="flex items-center gap-2 text-lg font-bold">
              <Lock size={18} /> Precio fijado
            </p>
            <p className="mt-0.5 text-sm text-blanco/90">
              Pedido N.° {pedido.numero} confirmado. Sus precios ya no cambian aunque el proveedor los actualice.
            </p>
          </div>
          <GruposProveedor resumen={resumen} fijado entrega={(h) => fechaEntrega(baseEntrega(pedido), h)} />
          <FilaTotal total={resumen.total} />
          <p className="text-xs text-texto/60">Las fechas de entrega se cuentan desde la confirmación, según el plazo de cada proveedor.</p>
          {pedido.etapa === 'confirmado' ? (
            <Boton a="/m4-3" className="mt-auto w-full py-3.5 text-base">Ir a pagar</Boton>
          ) : (
            <Boton a="/m4-4" variante="secundario" className="mt-auto w-full py-3.5 text-base">Ver seguimiento</Boton>
          )}
        </div>
      )}
    </Pantalla>
  );
}
