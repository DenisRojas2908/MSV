// S2-M3 · Vigencia de 7 días (§A.3).
import { diasEntre } from './fechas';
import { POR_VENCER_DIAS, VIGENCIA_DIAS } from './reglas';
import type { FechaISO, Oferta } from './tipos';

export type EstadoVigencia = 'vigente' | 'vence-manana' | 'no-disponible';

/** Días restantes = 7 − (hoy − fecha de confirmación). */
export function diasRestantes(oferta: Pick<Oferta, 'confirmadaEl'>, hoy: FechaISO): number {
  return VIGENCIA_DIAS - diasEntre(oferta.confirmadaEl, hoy);
}

/** Con 1 día: «vence mañana». Con 0 o menos: «No disponible». */
export function estadoVigencia(oferta: Pick<Oferta, 'confirmadaEl'>, hoy: FechaISO): EstadoVigencia {
  const d = diasRestantes(oferta, hoy);
  if (d <= 0) return 'no-disponible';
  if (d === 1) return 'vence-manana';
  return 'vigente';
}

export function esVigente(oferta: Pick<Oferta, 'confirmadaEl'>, hoy: FechaISO): boolean {
  return diasRestantes(oferta, hoy) >= 1;
}

/** Ofertas vigentes con 2 días restantes o menos, de la que vence antes a la que vence después. */
export function ofertasPorVencer(ofertas: readonly Oferta[], hoy: FechaISO): Oferta[] {
  return ofertas
    .filter((o) => esVigente(o, hoy) && diasRestantes(o, hoy) <= POR_VENCER_DIAS)
    .sort((a, b) => diasRestantes(a, hoy) - diasRestantes(b, hoy));
}

/** Texto de vigencia para pantallas: «vence mañana», «No disponible», o null si no hay aviso. */
export function textoVigencia(estado: EstadoVigencia): string | null {
  if (estado === 'vence-manana') return 'vence mañana';
  if (estado === 'no-disponible') return 'No disponible';
  return null;
}
