// F5 · Una prueba por escenario de §F.
import { beforeEach, describe, expect, it } from 'vitest';
import { alertasActivas } from '../src/domain/alerta';
import { ofertasComparables } from '../src/domain/comparador';
import { formatearPorcentaje, formatearSoles, soles } from '../src/domain/dinero';
import { fechaDeInstante } from '../src/domain/fechas';
import { estadoDeProveedor, resumirPedido } from '../src/domain/pedido';
import { esExcepcionS3, liquidacionRetenida, plazosReclamo } from '../src/domain/reclamos';
import { estadoVigencia } from '../src/domain/vigencia';
import {
  e1PrecioVencido,
  e2Antes,
  e2Subida,
  e3PedidoNuevo,
  e3PrecioNuevo,
  e4PrecioDistinto,
  e5Reclamo,
  ESCENARIOS,
  leerMonto,
  leerPorcentaje,
} from '../src/simulacion/escenarios';
import { useDemo } from '../src/store/demo';
import { calcularResumenSemaforo, calcularTablero } from '../src/store/selectores';
import { PROVEEDORES, SKUS } from './ayuda';

const s = () => useDemo.getState();
const hoy = () => fechaDeInstante(s().ahora);
const prov = (l: ReturnType<typeof ofertasComparables>) => l.map((c) => c.proveedor.id);

describe('escenarios de §F', () => {
  beforeEach(() => s().reiniciarDemo());

  it('la tabla tiene E1 a E5', () => {
    expect(ESCENARIOS.map((e) => e.id)).toEqual(['E1', 'E2', 'E3', 'E4', 'E5']);
  });

  it('E1: al 10/11 el aceite de Wayna no está disponible, 2 ofertas, ámbar, 16 de 24 (67 %), bajo la meta', () => {
    e1PrecioVencido();
    expect(hoy()).toBe('2026-11-10');
    const wayna = s().ofertas.find((o) => o.id === 'aceite-wayna')!;
    expect(estadoVigencia(wayna, hoy())).toBe('no-disponible');
    expect(prov(ofertasComparables(1, s().ofertas, PROVEEDORES, hoy()))).toEqual(['qhapaq', 'inti']);
    const sem = calcularResumenSemaforo(s().ofertas, s().ahora);
    expect(sem.lista[0]?.color).toBe('ambar');
    expect([sem.total.enVerde, formatearPorcentaje(sem.total.porcentaje)]).toEqual([16, '67 %']);
    expect(sem.zona).toBe('bajo-meta');
    expect(calcularTablero(s()).zonaCobertura).toBe('bajo-meta');
    expect(s().escenarios).toContain('E1');
  });

  it('E2: con 198 Wayna va primero y no hay alerta; con 210 baja al tercer lugar y aparece la alerta de 6 %', () => {
    e2Antes();
    expect(prov(ofertasComparables(2, s().ofertas, PROVEEDORES, hoy()))).toEqual(['wayna', 'inti', 'qhapaq']);
    expect(alertasActivas(s().ofertas, SKUS, PROVEEDORES, hoy())).toHaveLength(0);
    expect(s().ofertas.find((o) => o.id === 'arroz-wayna')?.confirmadaEl).toBe('2026-11-08');
    e2Subida();
    expect(prov(ofertasComparables(2, s().ofertas, PROVEEDORES, hoy()))).toEqual(['inti', 'qhapaq', 'wayna']);
    const a = alertasActivas(s().ofertas, SKUS, PROVEEDORES, hoy());
    expect(a).toHaveLength(1);
    expect(a[0]?.variacion).toBe(6);
    expect(a[0]?.alternativas.map((c) => `${c.proveedor.nombre} ${formatearSoles(c.oferta.precio)}`)).toEqual([
      'Comercial Inti S/ 199.00',
      'Distribuidora Qhapaq S/ 205.00',
    ]);
  });

  it('E3: el pedido 0042 conserva S/ 118.00, un pedido nuevo usa el precio nuevo y el 0.3 % no cambia', () => {
    e3PrecioNuevo(soles('125.00'));
    const p = s().pedidos.find((x) => x.numero === '0042')!;
    const r = resumirPedido(p.lineas, s().ofertas, PROVEEDORES);
    expect(formatearSoles(r.grupos[0]!.lineas[0]!.precioUnitario)).toBe('S/ 118.00');
    expect(formatearSoles(r.total)).toBe('S/ 490.60');
    e3PedidoNuevo();
    const nuevo = resumirPedido(s().carrito!.lineas, s().ofertas, PROVEEDORES);
    expect(formatearSoles(nuevo.total)).toBe('S/ 125.00');
    expect(calcularTablero(s()).precioDistintoHoyPb).toBe(30);
    expect(s().escenarios).toContain('E3');
  });

  it('E4: más de 1 % dispara la señal (2 h la unidad, 24 h el S3); 1 % exacto no', () => {
    e4PrecioDistinto(100);
    expect(calcularTablero(s()).senal.activa).toBe(false);
    e4PrecioDistinto(leerPorcentaje('1.5')!);
    const t = calcularTablero(s());
    expect(t.senal).toEqual({ activa: true, plazoUnidadHoras: 2, plazoS3Horas: 24 });
  });

  it('E5: reclamo a Qhapaq: liquidación retenida, 48 h de U1, 24 h de U2, S/ 236.00 no escala', () => {
    e5Reclamo('Un balde llegó abollado');
    const r = s().reclamos[0]!;
    expect(r.proveedorId).toBe('qhapaq');
    expect(liquidacionRetenida(s().reclamos, '0042', 'qhapaq')).toBe(true);
    expect(liquidacionRetenida(s().reclamos, '0042', 'inti')).toBe(false);
    expect(fechaDeInstante(plazosReclamo(r).cierreU1)).toBe('2026-11-11');
    expect(fechaDeInstante(plazosReclamo(r).descargoU2)).toBe('2026-11-10');
    const p = s().pedidos[0]!;
    const sub = resumirPedido(p.lineas, s().ofertas, PROVEEDORES).grupos[0]!.subtotal;
    expect(formatearSoles(sub)).toBe('S/ 236.00');
    expect(esExcepcionS3(sub)).toBe(false);
    expect(estadoDeProveedor(p, PROVEEDORES[0]!, s().reclamos, s().ahora)).toBe('Reclamo abierto');
  });

  it('Reiniciar demo después de los cinco escenarios vuelve al estado inicial del 09/11', () => {
    e1PrecioVencido();
    e2Antes();
    e3PrecioNuevo(soles('125.00'));
    e4PrecioDistinto(150);
    e5Reclamo();
    s().reiniciarDemo();
    expect(hoy()).toBe('2026-11-09');
    expect(s().ofertas.find((o) => o.id === 'arroz-wayna')!.precio).toBe(soles('210.00'));
    expect(s().ofertas.find((o) => o.id === 'aceite-qhapaq')!.precio).toBe(soles('118.00'));
    expect([s().reclamos.length, s().precioDistintoHoyPb, s().escenarios.length, s().carrito]).toEqual([0, 30, 0, null]);
    expect(calcularResumenSemaforo(s().ofertas, s().ahora).conteo).toEqual({ verde: 17, ambar: 5, rojo: 2 });
  });

  it('cada escenario cambia el estado en una sola actualización, con su marca y su evento (auditoría F7)', () => {
    const acciones: [string, () => void][] = [
      ['E1', e1PrecioVencido],
      ['E2', e2Antes],
      ['E3', () => e3PrecioNuevo(soles('125.00'))],
      ['E4', () => e4PrecioDistinto(150)],
      ['E5', () => e5Reclamo()],
    ];
    for (const [id, accion] of acciones) {
      s().reiniciarDemo();
      let cambios = 0;
      const fin = useDemo.subscribe(() => (cambios += 1));
      accion();
      fin();
      expect(cambios, id).toBe(1);
      expect(s().escenarios, id).toEqual([id]);
      expect(s().eventos[0]?.escenario, id).toBe(id);
    }
  });

  it('un solo reclamo abierto por proveedor y pedido (S2-M8, auditoría independiente #7)', () => {
    e5Reclamo('primero');
    e5Reclamo('segundo');
    s().abrirReclamo('0042', 'qhapaq', 'tercero');
    expect(s().reclamos.map((r) => r.descripcion)).toEqual(['primero']);
    s().abrirReclamo('0042', 'inti', 'otro proveedor');
    expect(s().reclamos).toHaveLength(2);
  });

  it('lectura de valores del expositor', () => {
    expect(leerPorcentaje('0.3')).toBe(30);
    expect(leerPorcentaje('2')).toBe(200);
    expect(leerPorcentaje('abc')).toBeNull();
    expect(leerMonto('125.5')).toBe(12550);
    expect(leerMonto('')).toBeNull();
    // Auditoría independiente #8: precio mayor que 0, porcentaje entre 0 y 100.
    expect(leerMonto('0')).toBeNull();
    expect(leerMonto('0.00')).toBeNull();
    expect(leerMonto('0.01')).toBe(1);
    expect(leerPorcentaje('0')).toBe(0);
    expect(leerPorcentaje('100')).toBe(10000);
    expect(leerPorcentaje('100.01')).toBeNull();
    expect(leerPorcentaje('250')).toBeNull();
  });
});
