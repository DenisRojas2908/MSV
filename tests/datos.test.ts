import { describe, expect, it } from 'vitest';
import { COMPRADOR } from '../src/data/comprador';
import { OFERTAS_INICIALES } from '../src/data/ofertas';
import { PANTALLAS, TAMANOS } from '../src/data/pantallas';
import { PROVEEDORES } from '../src/data/proveedores';
import { SKUS } from '../src/data/skus';
import { formatearCalificacion } from '../src/domain/umbrales';

describe('datos de §A.2', () => {
  it('seis proveedores con calificación y plazo de §A.2', () => {
    expect(PROVEEDORES.map((p) => `${p.nombre}|${formatearCalificacion(p.calificacionDecimas)}|${p.plazoHoras} h`)).toEqual([
      'Distribuidora Qhapaq|4.6|24 h',
      'Comercial Inti|4.2|48 h',
      'Abarrotes Wayna|3.9|72 h',
      'Envases Killa|4.5|24 h',
      'Empaques Pacha|4.1|48 h',
      'Descartables Ayni|3.8|72 h',
    ]);
    expect(PROVEEDORES.every((p) => p.activo)).toBe(true);
  });
  it('24 SKU: 12 abarrotes y 12 envases, numerados en orden', () => {
    expect(SKUS.map((s) => s.n)).toEqual(Array.from({ length: 24 }, (_, i) => i + 1));
    expect(SKUS.filter((s) => s.categoria === 'abarrotes').map((s) => s.n)).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
  });
  it('ecológicos: 15, 16, 18, 19, 20, 21 y 22; el táper de polipropileno no', () => {
    expect(SKUS.filter((s) => s.ecologica).map((s) => s.n)).toEqual([15, 16, 18, 19, 20, 21, 22]);
    expect(SKUS.filter((s) => s.nombre.includes('polipropileno')).every((s) => !s.ecologica)).toBe(true);
  });
  it('cada proveedor ofrece solo SKU de su categoría', () => {
    for (const s of SKUS) for (const pid of s.ofertantes) expect(PROVEEDORES.find((p) => p.id === pid)?.categoria).toBe(s.categoria);
  });
  it('9 ofertas, 3 por SKU, de ofertantes declarados', () => {
    expect(OFERTAS_INICIALES).toHaveLength(9);
    for (const n of [1, 2, 13]) expect(OFERTAS_INICIALES.filter((o) => o.skuN === n)).toHaveLength(3);
    for (const o of OFERTAS_INICIALES) expect(SKUS.find((s) => s.n === o.skuN)?.ofertantes).toContain(o.proveedorId);
  });
  it('comprador de §A.2', () => {
    expect(COMPRADOR).toMatchObject({ razonSocial: 'Pollería Sumaq', ruc: '20000012345', distrito: 'Cercado de Lima', whatsapp: '+51 9 * 321' });
  });
  it('20 pantallas con ruta, tamaño y archivo de §B.1', () => {
    expect(PANTALLAS).toHaveLength(20);
    expect(PANTALLAS.map((p) => p.archivo)).toContain('M4-4_Seguimiento.png');
    expect(PANTALLAS.find((p) => p.id === 'M5-2')?.ruta).toBe('/m5-2');
    expect(TAMANOS.celular).toEqual({ ancho: 390, alto: 844 });
    expect(TAMANOS.web).toEqual({ ancho: 1440, alto: 900 });
    for (const p of PANTALLAS) expect(p.dispositivo).toBe(['M2', 'M5'].includes(p.modulo) ? 'web' : 'celular');
  });
});
