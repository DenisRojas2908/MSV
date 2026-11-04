// Validación de lo que escribe una persona en vivo (expositor o proveedor). Auditoría independiente #8.
import { soles } from './dinero';
import type { Centimos, PuntosBasicos } from './tipos';

/** Porcentaje de pedidos: de 0 a 100, hasta dos decimales. '1.5' → 150 pb; inválido → null. */
export function leerPorcentaje(texto: string): PuntosBasicos | null {
  const m = /^(\d{1,3})(?:[.,](\d{1,2}))?$/.exec(texto.trim());
  if (!m) return null;
  const pb = Number(m[1]) * 100 + Number((m[2] ?? '').padEnd(2, '0'));
  return pb <= 10_000 ? pb : null;
}

/** Precio mayor que 0, hasta dos decimales. '125.5' → 12550; inválido o cero → null. */
export function leerMonto(texto: string): Centimos | null {
  const m = /^(\d{1,6})(?:[.,](\d{1,2}))?$/.exec(texto.trim());
  if (!m) return null;
  const c = soles(`${m[1]}.${(m[2] ?? '').padEnd(2, '0')}`);
  return c > 0 ? c : null;
}
