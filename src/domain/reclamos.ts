// S2-M8 · Dueño único del reclamo (§C, D-21).
import { sumarHoras } from './fechas';
import { PLAZO_DESCARGO_U2_H, PLAZO_RECLAMO_U1_H, UMBRAL_RECLAMO_S3 } from './reglas';
import type { Centimos, Minutos, ProveedorId, Reclamo } from './tipos';

export interface PlazosReclamo {
  /** U1 conduce y cierra en 48 h. */
  cierreU1: Minutos;
  /** U2 da el descargo en 24 h. */
  descargoU2: Minutos;
}

export function plazosReclamo(r: Reclamo): PlazosReclamo {
  return {
    cierreU1: sumarHoras(r.abiertoEn, PLAZO_RECLAMO_U1_H),
    descargoU2: sumarHoras(r.abiertoEn, PLAZO_DESCARGO_U2_H),
  };
}

/** Pagos retiene la liquidación del proveedor reclamado hasta resolver. */
export function liquidacionRetenida(reclamos: readonly Reclamo[], pedidoNumero: string, proveedorId: ProveedorId): boolean {
  return reclamos.some((r) => r.pedidoNumero === pedidoNumero && r.proveedorId === proveedorId);
}

/** S2-M8, dueño único: un solo reclamo abierto por proveedor y pedido (auditoría independiente #7). */
export function puedeAbrirReclamo(reclamos: readonly Reclamo[], pedidoNumero: string, proveedorId: ProveedorId): boolean {
  return !reclamos.some((r) => r.pedidoNumero === pedidoNumero && r.proveedorId === proveedorId);
}

/** Reclamo sobre 0.1 UIT (S/ 550): excepción al S3. Se compara el subtotal del proveedor (D-21). */
export function esExcepcionS3(subtotalReclamado: Centimos): boolean {
  return subtotalReclamado > UMBRAL_RECLAMO_S3;
}
