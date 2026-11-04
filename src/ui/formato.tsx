// Componentes de formato. Toda cifra visible pasa por aquí (nada escrito a mano).
import { formatearMonto, formatearPorcentaje, formatearPuntosBasicos, formatearSoles } from '../domain/dinero';
import { formatearDiaMes, formatearFecha } from '../domain/fechas';
import type { Centimos, FechaISO, PuntosBasicos } from '../domain/tipos';

export function Dinero({ c, sinDecimales }: { c: Centimos; sinDecimales?: boolean }) {
  return <span className="whitespace-nowrap tabular-nums">{formatearSoles(c, { sinDecimales })}</span>;
}

/** Monto sin «S/», para columnas cuyo encabezado ya dice «S/». */
export function Monto({ c }: { c: Centimos }) {
  return <span className="whitespace-nowrap tabular-nums">{formatearMonto(c)}</span>;
}

export function Fecha({ f, corta }: { f: FechaISO; corta?: boolean }) {
  return <span className="whitespace-nowrap tabular-nums">{corta ? formatearDiaMes(f) : formatearFecha(f)}</span>;
}

export function Porcentaje({ valor, pb }: { valor?: number; pb?: PuntosBasicos }) {
  const t = pb !== undefined ? formatearPuntosBasicos(pb) : formatearPorcentaje(valor ?? 0);
  return <span className="whitespace-nowrap tabular-nums">{t}</span>;
}
