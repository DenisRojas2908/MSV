// Fechas calendario y reloj en minutos. Nada aquí lee la fecha del sistema.
import type { FechaISO, Minutos } from './tipos';

const MIN_DIA = 24 * 60;

function partes(f: FechaISO): [number, number, number] {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f);
  if (!m) throw new Error(`Fecha inválida: ${f}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function diaNumero(f: FechaISO): number {
  const [a, m, d] = partes(f);
  return Date.UTC(a, m - 1, d) / 86_400_000;
}

function desdeDiaNumero(n: number): FechaISO {
  const dt = new Date(n * 86_400_000);
  const a = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const d = String(dt.getUTCDate()).padStart(2, '0');
  return `${a}-${m}-${d}`;
}

/** Días calendario de `desde` a `hasta` (positivo si hasta es posterior). */
export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  return diaNumero(hasta) - diaNumero(desde);
}

export function sumarDias(f: FechaISO, dias: number): FechaISO {
  return desdeDiaNumero(diaNumero(f) + dias);
}

/** '09/11/2026'. */
export function formatearFecha(f: FechaISO): string {
  const [a, m, d] = partes(f);
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${a}`;
}

/** '03/11' (solo fechas de confirmación de ofertas, D-19). */
export function formatearDiaMes(f: FechaISO): string {
  return formatearFecha(f).slice(0, 5);
}

/** Instante en minutos a partir de fecha y hora 'hh:mm' de Lima. */
export function instante(f: FechaISO, hhmm = '00:00'): Minutos {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm);
  if (!m) throw new Error(`Hora inválida: ${hhmm}`);
  return diaNumero(f) * MIN_DIA + Number(m[1]) * 60 + Number(m[2]);
}

export function fechaDeInstante(t: Minutos): FechaISO {
  return desdeDiaNumero(Math.floor(t / MIN_DIA));
}

export function sumarHoras(t: Minutos, horas: number): Minutos {
  return t + horas * 60;
}

/** Duración en horas como texto: 48 → '48 h'. */
export function formatearHoras(horas: number): string {
  return `${horas} h`;
}
