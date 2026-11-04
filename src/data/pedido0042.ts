// §A.2 · Pedido N.° 0042 · Pollería Sumaq · 09/11/2026.
// Solo oferta y cantidad. Subtotales, comisiones y liquidaciones se calculan en el dominio.
import type { LineaPedido } from '../domain/tipos';

export const LINEAS_PEDIDO_0042: readonly LineaPedido[] = [
  { ofertaId: 'aceite-qhapaq', cantidad: 2 },
  { ofertaId: 'arroz-inti', cantidad: 1 },
  { ofertaId: 'taper-pacha', cantidad: 4 },
];
