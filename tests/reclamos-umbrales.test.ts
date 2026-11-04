import { describe, expect, it } from 'vitest';
import { soles } from '../src/domain/dinero';
import { fechaDeInstante } from '../src/domain/fechas';
import { esExcepcionS3, liquidacionRetenida, plazosReclamo } from '../src/domain/reclamos';
import { comisionDelMes, enRevision, formatearCalificacion, reclamosEscalanS3, reclamosFuera48h, senalPrecioDistinto } from '../src/domain/umbrales';
import { formatearSoles } from '../src/domain/dinero';
import { INICIO } from '../src/store/inicial';
import { TABLERO } from '../src/data/tablero';
import type { Reclamo } from '../src/domain/tipos';

describe('S2-M8 reclamos', () => {
  const r: Reclamo = { id: 'R-1', pedidoNumero: '0042', proveedorId: 'qhapaq', descripcion: '', abiertoEn: INICIO };
  it('U1 cierra en 48 h y U2 da su descargo en 24 h', () => {
    expect(fechaDeInstante(plazosReclamo(r).cierreU1)).toBe('2026-11-11');
    expect(fechaDeInstante(plazosReclamo(r).descargoU2)).toBe('2026-11-10');
  });
  it('retiene solo la liquidación del proveedor reclamado', () => {
    expect(liquidacionRetenida([r], '0042', 'qhapaq')).toBe(true);
    expect(liquidacionRetenida([r], '0042', 'inti')).toBe(false);
  });
  it('S/ 236.00 no escala; sobre S/ 550 sí', () => {
    expect(esExcepcionS3(soles('236.00'))).toBe(false);
    expect(esExcepcionS3(soles('550.00'))).toBe(false);
    expect(esExcepcionS3(soles('550.01'))).toBe(true);
  });
});

describe('umbrales', () => {
  it('señal algedónica estricta: más de 1 % (D-10)', () => {
    expect(senalPrecioDistinto(30).activa).toBe(false);
    expect(senalPrecioDistinto(100).activa).toBe(false);
    expect(senalPrecioDistinto(101).activa).toBe(true);
    expect(senalPrecioDistinto(150)).toEqual({ activa: true, plazoUnidadHoras: 2, plazoS3Horas: 24 });
  });
  it('curaduría: menos de 3.5 pasa a revisión', () => {
    expect(enRevision(34)).toBe(true);
    expect(enRevision(35)).toBe(false);
    expect(formatearCalificacion(46)).toBe('4.6');
  });
  it('reclamos fuera de 48 h = 4 %, no escala (menos de 5 %)', () => {
    expect(reclamosFuera48h(TABLERO.reclamosCerradosEn48hPct)).toBe(4);
    expect(reclamosEscalanS3(4)).toBe(false);
  });
  it('comisión del mes = S/ 4,660 (D-14)', () => {
    expect(formatearSoles(comisionDelMes(TABLERO.ventasDelMes), { sinDecimales: true })).toBe('S/ 4,660');
    expect(formatearSoles(TABLERO.ventasDelMes, { sinDecimales: true })).toBe('S/ 186,400');
  });
});
