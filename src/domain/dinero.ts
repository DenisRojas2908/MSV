// Dinero en céntimos enteros y porcentajes con redondeo half-up explícito.
import type { Centimos, PuntosBasicos } from './tipos';

function exigirEntero(n: number, nombre: string): void {
  if (!Number.isSafeInteger(n)) throw new Error(`${nombre} debe ser entero: ${n}`);
}

/** Convierte un literal en soles a céntimos sin pasar por floats: '116.90' → 11690. */
export function soles(literal: string): Centimos {
  const limpio = literal.replace(/,/g, '');
  const m = /^(\d+)(?:\.(\d{2}))?$/.exec(limpio);
  if (!m) throw new Error(`Monto inválido: ${literal}`);
  return Number(m[1]) * 100 + Number(m[2] ?? '0');
}

/** Subtotal de una línea: precio × cantidad. */
export function subtotal(precio: Centimos, cantidad: number): Centimos {
  exigirEntero(precio, 'precio');
  exigirEntero(cantidad, 'cantidad');
  return precio * cantidad;
}

/**
 * Aplica un porcentaje en puntos básicos con redondeo half-up a céntimo.
 * 19900 × 250 pb = 497.5 → 498 (S/ 4.98).
 */
export function aplicarPuntosBasicos(monto: Centimos, pb: PuntosBasicos): Centimos {
  exigirEntero(monto, 'monto');
  exigirEntero(pb, 'puntos básicos');
  if (monto < 0 || pb < 0) throw new Error('Solo montos y porcentajes no negativos');
  return Math.floor((monto * pb + 5000) / 10000);
}

export function sumar(montos: readonly Centimos[]): Centimos {
  return montos.reduce((a, b) => a + b, 0);
}

/** Redondeo half-up al entero de num ÷ den, solo con enteros no negativos. */
export function redondearRazon(num: number, den: number): number {
  exigirEntero(num, 'numerador');
  exigirEntero(den, 'denominador');
  if (num < 0 || den <= 0) throw new Error('Razón fuera de rango');
  return Math.floor((2 * num + den) / (2 * den));
}

/** Porcentaje entero de parte ÷ total: 17 de 24 → 71. */
export function porcentajeEntero(parte: number, total: number): number {
  return redondearRazon(parte * 100, total);
}

function miles(entero: number): string {
  return String(entero).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** 'S/ 1,234.50'. Con sinDecimales: 'S/ 186,400' (solo ventas y comisión del mes, D-13). */
export function formatearSoles(c: Centimos, opciones: { sinDecimales?: boolean } = {}): string {
  exigirEntero(c, 'monto');
  const signo = c < 0 ? '−' : '';
  const abs = Math.abs(c);
  const entero = Math.floor(abs / 100);
  const cent = abs % 100;
  if (opciones.sinDecimales) {
    if (cent !== 0) throw new Error(`El monto tiene céntimos: ${c}`);
    return `${signo}S/ ${miles(entero)}`;
  }
  return `${signo}S/ ${miles(entero)}.${String(cent).padStart(2, '0')}`;
}

/** Monto sin «S/», como en las columnas del pedido: '118.00'. */
export function formatearMonto(c: Centimos): string {
  return formatearSoles(c).replace('S/ ', '');
}

/** '71 %'. */
export function formatearPorcentaje(valor: number): string {
  exigirEntero(valor, 'porcentaje');
  return `${valor} %`;
}

/** Puntos básicos a texto: 30 → '0.3 %', 100 → '1 %', 125 → '1.25 %'. */
export function formatearPuntosBasicos(pb: PuntosBasicos): string {
  exigirEntero(pb, 'puntos básicos');
  const entero = Math.floor(pb / 100);
  const resto = pb % 100;
  if (resto === 0) return `${entero} %`;
  const dec = String(resto).padStart(2, '0').replace(/0$/, '');
  return `${entero}.${dec} %`;
}
