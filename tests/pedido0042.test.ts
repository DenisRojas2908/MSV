import { describe, expect, it } from 'vitest';
import { LINEAS_PEDIDO_0042 } from '../src/data/pedido0042';
import { formatearMonto, formatearSoles } from '../src/domain/dinero';
import { fechaEntrega, resumirPedido, totalComprador } from '../src/domain/pedido';
import { INICIO } from '../src/store/inicial';
import { PROVEEDORES, ofertas } from './ayuda';

describe('pedido N.° 0042', () => {
  const r = resumirPedido(LINEAS_PEDIDO_0042, ofertas(), PROVEEDORES);
  const col = (k: 'subtotal' | 'comision' | 'liquidacion') => r.grupos.map((g) => formatearMonto(g[k]));
  it('agrupa por proveedor en el orden de §A.2', () => {
    expect(r.grupos.map((g) => g.proveedor.nombre)).toEqual(['Distribuidora Qhapaq', 'Comercial Inti', 'Empaques Pacha']);
  });
  it('subtotales 236.00, 199.00 y 55.60; total 490.60', () => {
    expect(col('subtotal')).toEqual(['236.00', '199.00', '55.60']);
    expect(formatearSoles(r.total)).toBe('S/ 490.60');
  });
  it('comisiones 5.90, 4.98 y 1.39 = 12.27', () => {
    expect(col('comision')).toEqual(['5.90', '4.98', '1.39']);
    expect(formatearSoles(r.comisionTotal)).toBe('S/ 12.27');
  });
  it('liquidaciones 230.10, 194.02 y 54.21 = 478.33', () => {
    expect(col('liquidacion')).toEqual(['230.10', '194.02', '54.21']);
    expect(formatearSoles(r.liquidacionTotal)).toBe('S/ 478.33');
  });
  it('el comprador paga 490.60: la comisión nunca se suma a su total', () => {
    // Literales de §A.2: paga S/ 490.60, no S/ 502.87 (490.60 + 12.27).
    expect(formatearSoles(totalComprador(r))).toBe('S/ 490.60');
    expect(formatearSoles(totalComprador(r))).not.toBe('S/ 502.87');
    expect(formatearSoles(r.liquidacionTotal)).toBe('S/ 478.33');
  });
  it('Qhapaq eligió el aceite aunque Wayna era S/ 1.10 más barato', () => {
    const o = ofertas();
    const dif = (o.find((x) => x.id === 'aceite-qhapaq')?.precio ?? 0) - (o.find((x) => x.id === 'aceite-wayna')?.precio ?? 0);
    expect(formatearSoles(dif)).toBe('S/ 1.10');
  });
  it('entregas: 24 h → 10/11/2026; 48 h → 11/11/2026', () => {
    expect(fechaEntrega(INICIO, 24)).toBe('2026-11-10');
    expect(fechaEntrega(INICIO, 48)).toBe('2026-11-11');
  });
});
