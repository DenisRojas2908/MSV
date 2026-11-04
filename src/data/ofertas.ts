// §A.2 · Las 9 ofertas con precio (precios con IGV, de demostración). Plazo y
// calificación salen del proveedor. «vence mañana» no se guarda: se calcula.
import { soles } from '../domain/dinero';
import type { Oferta } from '../domain/tipos';

export const OFERTAS_INICIALES: readonly Oferta[] = [
  { id: 'aceite-wayna', skuN: 1, proveedorId: 'wayna', precio: soles('116.90'), confirmadaEl: '2026-11-03' },
  { id: 'aceite-qhapaq', skuN: 1, proveedorId: 'qhapaq', precio: soles('118.00'), confirmadaEl: '2026-11-07' },
  { id: 'aceite-inti', skuN: 1, proveedorId: 'inti', precio: soles('121.50'), confirmadaEl: '2026-11-05' },
  { id: 'arroz-inti', skuN: 2, proveedorId: 'inti', precio: soles('199.00'), confirmadaEl: '2026-11-06' },
  { id: 'arroz-qhapaq', skuN: 2, proveedorId: 'qhapaq', precio: soles('205.00'), confirmadaEl: '2026-11-07' },
  { id: 'arroz-wayna', skuN: 2, proveedorId: 'wayna', precio: soles('210.00'), confirmadaEl: '2026-11-08', precioAnterior: soles('198.00') },
  { id: 'taper-pacha', skuN: 13, proveedorId: 'pacha', precio: soles('13.90'), confirmadaEl: '2026-11-06' },
  { id: 'taper-killa', skuN: 13, proveedorId: 'killa', precio: soles('14.50'), confirmadaEl: '2026-11-08' },
  { id: 'taper-ayni', skuN: 13, proveedorId: 'ayni', precio: soles('15.20'), confirmadaEl: '2026-11-04' },
];
