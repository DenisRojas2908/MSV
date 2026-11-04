// §A.2 · Tablero de demostración (M5). Mes 3 del piloto, supuesto.
// Son totales de la plataforma y no se recalculan (§A.3), salvo la cobertura
// (se calcula con el semáforo) y el porcentaje de precio distinto (E4).
import { soles } from '../domain/dinero';
import type { PuntosBasicos } from '../domain/tipos';

export const ROTULO_TABLERO = 'Datos de demostración · mes 3 del piloto';

export const TABLERO = {
  compradoresActivos: 112,
  metaCompradores: 200,
  proveedoresActivos: 31,
  metaProveedores: 50,
  recompra60DiasPct: 34,
  metaRecompraTexto: '30 % o más',
  preciosVigentesPct: 93,
  reclamosCerradosEn48hPct: 96,
  precioDistintoHoyPb: 30 as PuntosBasicos,
  /** D-55: §A.2 actualizada por el DP; coincide con D-10 (más de 1 %). */
  metaPrecioDistintoTexto: 'Más de 1 % de los pedidos de un día con precio distinto activa el canal algedónico',
  metaCoberturaTexto: '70 % o más',
  /** D-14: la comisión del mes se calcula (2.5 %). */
  ventasDelMes: soles('186,400.00'),
} as const;

export const NOMBRES_INDICADORES = {
  compradores: 'Compradores activos',
  proveedores: 'Proveedores activos',
  cobertura: 'Cobertura del comparador',
  recompra: 'Recompra a 60 días',
  preciosVigentes: 'Precios vigentes',
  reclamos48h: 'Reclamos cerrados en 48 h',
  precioDistinto: 'Pedidos con precio distinto al mostrado',
  ventas: 'Ventas del mes / comisión del mes',
} as const;

/** §G · Unidades operativas del Sistema 1. */
export const UNIDADES = {
  U1: 'U1 · Comprador',
  U2: 'U2 · Proveedor',
  U3: 'U3 · Analítica y Riesgo',
} as const;

/** §G · Canal C4 del S3. */
export const CANAL_C4 = 'C4 · negociación de recursos y rendición';
