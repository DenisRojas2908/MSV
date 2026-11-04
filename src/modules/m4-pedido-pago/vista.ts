// Qué pedido muestra cada pantalla del M4 (D-08).
// En modo captura, cada pantalla muestra la etapa de su ficha: M4-1 carrito,
// M4-2 confirmado, M4-3 pago, M4-4 pagado, siempre con el pedido N.° 0042.
// Fuera de captura, muestran el estado real del store.
import { useMemo } from 'react';
import { NUMERO_PEDIDO_EJEMPLO } from '../../data/demo';
import { LINEAS_PEDIDO_0042 } from '../../data/pedido0042';
import type { Carrito, Pedido } from '../../domain/tipos';
import { useDemo } from '../../store/demo';
import { useModoCaptura } from '../../ui';

export function useCarritoVista(): Carrito | null {
  const captura = useModoCaptura();
  const carrito = useDemo((s) => s.carrito);
  return useMemo(
    () => (captura ? { numero: NUMERO_PEDIDO_EJEMPLO, lineas: LINEAS_PEDIDO_0042.map((l) => ({ ...l })) } : carrito),
    [captura, carrito],
  );
}

/** El pedido más reciente (o el 0042 en captura) con la etapa que corresponde. */
export function usePedidoVista(etapaFicha: Pedido['etapa']): Pedido | null {
  const captura = useModoCaptura();
  const pedidos = useDemo((s) => s.pedidos);
  return useMemo(() => {
    if (captura) {
      const p = pedidos.find((x) => x.numero === NUMERO_PEDIDO_EJEMPLO);
      if (!p) return null;
      return etapaFicha === 'confirmado' ? { ...p, etapa: 'confirmado', pagadoEn: undefined } : p;
    }
    return pedidos[pedidos.length - 1] ?? null;
  }, [captura, pedidos, etapaFicha]);
}
