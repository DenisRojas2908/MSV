import { describe, expect, it } from 'vitest';
import {
  aplicarPuntosBasicos,
  formatearPorcentaje,
  formatearPuntosBasicos,
  formatearSoles,
  porcentajeEntero,
  soles,
} from '../src/domain/dinero';
import { comisionLinea } from '../src/domain/pedido';

describe('dinero en céntimos', () => {
  it('convierte literales sin floats', () => {
    expect(soles('116.90')).toBe(11690);
    expect(soles('13.90')).toBe(1390);
    expect(soles('186,400.00')).toBe(18_640_000);
    expect(soles('198')).toBe(19800);
  });
  it('199.00 × 2.5 % = 4.98 (half-up en la mitad exacta)', () => {
    expect(comisionLinea(soles('199.00'))).toBe(498);
    expect(aplicarPuntosBasicos(497, 0)).toBe(0);
    expect(aplicarPuntosBasicos(1, 5000)).toBe(1); // 0.5 → 1
  });
  it('formato S/ 1,234.50', () => {
    expect(formatearSoles(123450)).toBe('S/ 1,234.50');
    expect(formatearSoles(49060)).toBe('S/ 490.60');
    expect(formatearSoles(18_640_000, { sinDecimales: true })).toBe('S/ 186,400');
    expect(() => formatearSoles(1, { sinDecimales: true })).toThrow();
  });
  it('porcentajes con espacio', () => {
    expect(formatearPorcentaje(porcentajeEntero(17, 24))).toBe('71 %');
    expect(formatearPorcentaje(porcentajeEntero(16, 24))).toBe('67 %');
    expect(formatearPuntosBasicos(30)).toBe('0.3 %');
    expect(formatearPuntosBasicos(100)).toBe('1 %');
    expect(formatearPuntosBasicos(125)).toBe('1.25 %');
    expect(formatearPuntosBasicos(250)).toBe('2.5 %');
  });
});
