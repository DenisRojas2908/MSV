import { describe, expect, it } from 'vitest';
import { cobertura, conteoColores, semaforo, zonaCobertura } from '../src/domain/semaforo';
import { formatearPorcentaje } from '../src/domain/dinero';
import { HOY, MANANA, PROVEEDORES, SKUS, ofertas } from './ayuda';

// Columna «Semáforo» de §A.2, en orden.
const ESPERADO = [
  'verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'ambar', 'verde',
  'verde', 'verde', 'ambar', 'ambar', 'ambar', 'verde', 'verde', 'verde', 'rojo', 'rojo', 'verde', 'ambar',
];

describe('S2-M1 semáforo y cobertura', () => {
  const lista = semaforo(SKUS, ofertas(), PROVEEDORES, HOY);
  it('cada SKU tiene el color de §A.2', () => {
    expect(lista.map((s) => s.color)).toEqual(ESPERADO);
  });
  it('17 verdes, 5 ámbar, 2 rojos', () => {
    expect(conteoColores(lista)).toEqual({ verde: 17, ambar: 5, rojo: 2 });
  });
  it('cobertura 17 de 24 → 71 %, dentro de la meta', () => {
    const c = cobertura(lista);
    expect([c.enVerde, c.total]).toEqual([17, 24]);
    expect(formatearPorcentaje(c.porcentaje)).toBe('71 %');
    expect(zonaCobertura(lista)).toBe('dentro-meta');
  });
  it('por categoría: abarrotes 11 de 12, envases 6 de 12 (50 %)', () => {
    expect(cobertura(lista, 'abarrotes').enVerde).toBe(11);
    expect(cobertura(lista, 'envases')).toEqual({ enVerde: 6, total: 12, porcentaje: 50 });
  });
  it('al 10/11: aceite en ámbar, 16 de 24 (67 %), bajo la meta sin alerta del S3', () => {
    const l = semaforo(SKUS, ofertas(), PROVEEDORES, MANANA);
    expect(l[0]?.color).toBe('ambar');
    const c = cobertura(l);
    expect([c.enVerde, c.porcentaje]).toEqual([16, 67]);
    expect(cobertura(l, 'abarrotes').enVerde).toBe(10);
    expect(zonaCobertura(l)).toBe('bajo-meta');
  });
  it('una categoría bajo 50 % es alerta del S3', () => {
    const sinPacha = PROVEEDORES.map((p) => (p.id === 'pacha' ? { ...p, activo: false } : p));
    expect(zonaCobertura(semaforo(SKUS, ofertas(), sinPacha, HOY))).toBe('alerta-s3');
  });
});
