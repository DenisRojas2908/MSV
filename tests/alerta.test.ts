import { describe, expect, it } from 'vitest';
import { alertaDePrecio, alertasActivas, variacionPorcentual } from '../src/domain/alerta';
import { formatearSoles, soles } from '../src/domain/dinero';
import { HOY, PROVEEDORES, SKUS, oferta, ofertas } from './ayuda';

describe('S2-M6 alerta de precio', () => {
  it('arroz de Wayna: S/ 198.00 → S/ 210.00 = 6 %', () => {
    const o = ofertas();
    const a = alertaDePrecio(oferta(o, 'arroz-wayna'), o, SKUS, PROVEEDORES, HOY);
    expect(a).not.toBeNull();
    expect(a?.variacion).toBe(6);
    expect(formatearSoles(a?.anterior ?? 0)).toBe('S/ 198.00');
    expect(formatearSoles(a?.nuevo ?? 0)).toBe('S/ 210.00');
  });
  it('alternativas: Comercial Inti S/ 199.00 y Distribuidora Qhapaq S/ 205.00', () => {
    const o = ofertas();
    const a = alertaDePrecio(oferta(o, 'arroz-wayna'), o, SKUS, PROVEEDORES, HOY);
    expect(a?.alternativas.map((c) => `${c.proveedor.nombre} ${formatearSoles(c.oferta.precio)}`)).toEqual([
      'Comercial Inti S/ 199.00',
      'Distribuidora Qhapaq S/ 205.00',
    ]);
  });
  it('al 09/11 hay una sola alerta activa', () => {
    expect(alertasActivas(ofertas(), SKUS, PROVEEDORES, HOY).map((a) => a.oferta.id)).toEqual(['arroz-wayna']);
  });
  it('solo con subidas (D-11)', () => {
    expect(variacionPorcentual(soles('210.00'), soles('198.00'))).toBe(-6);
    const o = ofertas().map((x) => (x.id === 'arroz-wayna' ? { ...x, precio: soles('190.00') } : x));
    expect(alertaDePrecio(oferta(o, 'arroz-wayna'), o, SKUS, PROVEEDORES, HOY)).toBeNull();
  });
});
