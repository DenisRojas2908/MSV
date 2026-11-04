// Umbrales del S2, del tablero del S3 y del canal algedónico (§C, §D, §E).
import { aplicarPuntosBasicos } from './dinero';
import {
  CALIFICACION_REVISION_DECIMAS,
  COMISION_PB,
  PLAZO_ALGEDONICO_S3_H,
  PLAZO_ALGEDONICO_UNIDAD_H,
  UMBRAL_ALGEDONICO_PB,
  UMBRAL_RECLAMOS_FUERA_PCT,
} from './reglas';
import type { Centimos, PuntosBasicos } from './tipos';

/** S2-M2: calificación menor a 3.5 pasa a revisión. */
export function enRevision(calificacionDecimas: number): boolean {
  return calificacionDecimas < CALIFICACION_REVISION_DECIMAS;
}

/** 46 → '4.6'. */
export function formatearCalificacion(decimas: number): string {
  return `${Math.floor(decimas / 10)}.${decimas % 10}`;
}

export interface SenalAlgedonica {
  activa: boolean;
  plazoUnidadHoras: number;
  plazoS3Horas: number;
}

/** §E y D-10: más de 1 % de los pedidos del día con precio distinto (estricto). */
export function senalPrecioDistinto(porcentajeDia: PuntosBasicos): SenalAlgedonica {
  return {
    activa: porcentajeDia > UMBRAL_ALGEDONICO_PB,
    plazoUnidadHoras: PLAZO_ALGEDONICO_UNIDAD_H,
    plazoS3Horas: PLAZO_ALGEDONICO_S3_H,
  };
}

/** D-22: reclamos fuera de 48 h = 100 − cerrados en 48 h. */
export function reclamosFuera48h(cerradosEn48hPct: number): number {
  return 100 - cerradosEn48hPct;
}

/** S2-M8: escala al S3 si el plazo se incumple en 5 % o más de los casos. */
export function reclamosEscalanS3(fueraPct: number): boolean {
  return fueraPct >= UMBRAL_RECLAMOS_FUERA_PCT;
}

/** D-14: comisión del mes = 2.5 % de las ventas del mes. */
export function comisionDelMes(ventas: Centimos): Centimos {
  return aplicarPuntosBasicos(ventas, COMISION_PB);
}

/** Avance contra una meta a seis meses (D-23): '112 de 200'. */
export function textoAvance(valor: number, meta: number): string {
  return `${valor} de ${meta}`;
}
