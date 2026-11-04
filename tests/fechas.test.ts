import { describe, expect, it } from 'vitest';
import { diasEntre, fechaDeInstante, formatearDiaMes, formatearFecha, instante, sumarDias, sumarHoras } from '../src/domain/fechas';

describe('fechas', () => {
  it('dd/mm/aaaa y dd/mm', () => {
    expect(formatearFecha('2026-11-09')).toBe('09/11/2026');
    expect(formatearDiaMes('2026-11-03')).toBe('03/11');
  });
  it('aritmética calendario', () => {
    expect(diasEntre('2026-11-03', '2026-11-09')).toBe(6);
    expect(sumarDias('2026-11-30', 1)).toBe('2026-12-01');
  });
  it('instantes en minutos', () => {
    const t = instante('2026-11-09', '09:00');
    expect(fechaDeInstante(t)).toBe('2026-11-09');
    expect(fechaDeInstante(sumarHoras(t, 24))).toBe('2026-11-10');
    expect(fechaDeInstante(sumarHoras(t, 15))).toBe('2026-11-10');
    expect(fechaDeInstante(sumarHoras(t, 14))).toBe('2026-11-09');
  });
});
