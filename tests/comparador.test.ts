import { describe, expect, it } from 'vitest';
import { ofertasComparables } from '../src/domain/comparador';
import { soles } from '../src/domain/dinero';
import { HOY, MANANA, PROVEEDORES, ofertas } from './ayuda';

const ids = (l: ReturnType<typeof ofertasComparables>) => l.map((c) => c.oferta.proveedorId);

describe('S2-M4 orden neutral', () => {
  it('aceite: Wayna, Qhapaq, Inti; Wayna vence mañana', () => {
    const l = ofertasComparables(1, ofertas(), PROVEEDORES, HOY);
    expect(ids(l)).toEqual(['wayna', 'qhapaq', 'inti']);
    expect(l[0]?.estado).toBe('vence-manana');
  });
  it('arroz: Inti, Qhapaq, Wayna; táper: Pacha, Killa, Ayni', () => {
    expect(ids(ofertasComparables(2, ofertas(), PROVEEDORES, HOY))).toEqual(['inti', 'qhapaq', 'wayna']);
    expect(ids(ofertasComparables(13, ofertas(), PROVEEDORES, HOY))).toEqual(['pacha', 'killa', 'ayni']);
  });
  it('al 10/11 el aceite muestra 2 ofertas', () => {
    expect(ids(ofertasComparables(1, ofertas(), PROVEEDORES, MANANA))).toEqual(['qhapaq', 'inti']);
  });
  it('al 10/11 el «desde» del aceite es S/ 118.00 (la oferta vencida no cuenta)', () => {
    const l = ofertasComparables(1, ofertas(), PROVEEDORES, MANANA);
    expect(Math.min(...l.map((c) => c.oferta.precio))).toBe(soles('118.00'));
  });
  it('desempate: menor plazo y luego confirmación más reciente (D-12)', () => {
    const o = ofertas().map((x) =>
      x.id === 'aceite-inti' ? { ...x, precio: soles('118.00') } : x.id === 'aceite-wayna' ? { ...x, precio: soles('118.00') } : x,
    );
    expect(ids(ofertasComparables(1, o, PROVEEDORES, HOY))).toEqual(['qhapaq', 'inti', 'wayna']);
    const iguales = PROVEEDORES.map((p) => ({ ...p, plazoHoras: 24 as const }));
    // mismo precio y plazo: Qhapaq (07/11) antes que Inti (05/11) antes que Wayna (03/11)
    expect(ids(ofertasComparables(1, o, iguales, HOY))).toEqual(['qhapaq', 'inti', 'wayna']);
    const o2 = o.map((x) => (x.id === 'aceite-wayna' ? { ...x, confirmadaEl: '2026-11-08' } : x));
    expect(ids(ofertasComparables(1, o2, iguales, HOY))).toEqual(['wayna', 'qhapaq', 'inti']);
  });
});
