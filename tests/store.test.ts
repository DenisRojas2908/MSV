import { beforeEach, describe, expect, it } from 'vitest';
import { formatearSoles } from '../src/domain/dinero';
import { fechaDeInstante } from '../src/domain/fechas';
import { estadoDeProveedor, resumirPedido } from '../src/domain/pedido';
import { useDemo } from '../src/store/demo';
import { tieneCaptura } from '../src/store/captura';
import { calcularResumenSemaforo, calcularTablero } from '../src/store/selectores';
import { CLAVE, esDatosDemo, guardar, leer } from '../src/store/persistencia';
import { estadoInicial } from '../src/store/inicial';
import { PROVEEDORES } from './ayuda';

const s = () => useDemo.getState();

/** Lo que dice la especificación del estado inicial, en literales (auditoría independiente #23). */
const INICIAL_ESPERADO = {
  fecha: '2026-11-09',
  hora: '09:00',
  precios: ['S/ 116.90', 'S/ 118.00', 'S/ 121.50', 'S/ 199.00', 'S/ 205.00', 'S/ 210.00', 'S/ 13.90', 'S/ 14.50', 'S/ 15.20'],
  confirmadas: ['2026-11-03', '2026-11-07', '2026-11-05', '2026-11-06', '2026-11-07', '2026-11-08', '2026-11-06', '2026-11-08', '2026-11-04'],
  pedidos: [['0042', 'pagado']],
  carrito: null,
  reclamos: 0,
  eventos: 0,
  precioDistinto: 30,
  escenarios: [],
  semaforo: [17, 5, 2],
};

function estadoComoEnLaEspecificacion() {
  const e = s();
  const minutos = e.ahora % 1440;
  const sem = calcularResumenSemaforo(e.ofertas, e.ahora).conteo;
  return {
    fecha: fechaDeInstante(e.ahora),
    hora: `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`,
    precios: e.ofertas.map((o) => formatearSoles(o.precio)),
    confirmadas: e.ofertas.map((o) => o.confirmadaEl),
    pedidos: e.pedidos.map((p) => [p.numero, p.etapa]),
    carrito: e.carrito,
    reclamos: e.reclamos.length,
    eventos: e.eventos.length,
    precioDistinto: e.precioDistintoHoyPb,
    escenarios: e.escenarios,
    semaforo: [sem.verde, sem.ambar, sem.rojo],
  };
}

describe('store de la demo', () => {
  beforeEach(() => s().reiniciarDemo());

  it('arranca el lunes 09/11/2026 con el pedido 0042 pagado y carrito vacío', () => {
    expect(fechaDeInstante(s().ahora)).toBe('2026-11-09');
    expect(s().carrito).toBeNull();
    expect(s().pedidos.map((p) => [p.numero, p.etapa])).toEqual([['0042', 'pagado']]);
  });

  it('al 09/11 los tres proveedores del 0042 están «Pagado»', () => {
    const p = s().pedidos[0]!;
    const estados = PROVEEDORES.filter((x) => ['qhapaq', 'inti', 'pacha'].includes(x.id)).map((x) =>
      estadoDeProveedor(p, x, s().reclamos, s().ahora),
    );
    expect(estados).toEqual(['Pagado', 'Pagado', 'Pagado']);
  });

  it('flujo en vivo: cargar 0042 → confirmar → pagar', () => {
    s().cargarPedido0042();
    expect(s().pedidos).toHaveLength(0);
    expect(s().carrito?.numero).toBe('0042');
    const r = resumirPedido(s().carrito!.lineas, s().ofertas, PROVEEDORES);
    expect(formatearSoles(r.total)).toBe('S/ 490.60');
    expect(s().confirmarPedido()).toBe('0042');
    expect(s().pedidos[0]?.etapa).toBe('confirmado');
    expect(estadoDeProveedor(s().pedidos[0]!, PROVEEDORES[0]!, [], s().ahora)).toBe('Confirmado');
    s().pagarPedido('0042');
    expect(s().pedidos[0]?.etapa).toBe('pagado');
    expect(s().carrito).toBeNull();
  });

  it('una línea con oferta vencida bloquea la confirmación (D-26)', () => {
    s().agregarAlCarrito('aceite-wayna', 1);
    s().fijarAhora('2026-11-10');
    expect(s().confirmarPedido()).toBeNull();
  });

  it('confirmar precio reinicia los 7 días', () => {
    s().fijarAhora('2026-11-10');
    s().confirmarPrecio('aceite-wayna');
    expect(s().ofertas.find((o) => o.id === 'aceite-wayna')?.confirmadaEl).toBe('2026-11-10');
    expect(calcularResumenSemaforo(s().ofertas, s().ahora).total.enVerde).toBe(17);
  });

  it('abrir reclamo marca «Reclamo abierto» solo para ese proveedor', () => {
    s().abrirReclamo('0042', 'qhapaq', 'Llegó un balde abollado');
    const p = s().pedidos[0]!;
    expect(estadoDeProveedor(p, PROVEEDORES[0]!, s().reclamos, s().ahora)).toBe('Reclamo abierto');
    expect(estadoDeProveedor(p, PROVEEDORES[1]!, s().reclamos, s().ahora)).toBe('Pagado');
  });

  it('el 10/11 a las 09:00 la parte de Qhapaq (24 h) figura «Entregado»', () => {
    s().fijarAhora('2026-11-10');
    expect(estadoDeProveedor(s().pedidos[0]!, PROVEEDORES[0]!, [], s().ahora)).toBe('Entregado');
  });

  it('Reiniciar demo vuelve al estado inicial', () => {
    s().fijarAhora('2026-11-10');
    s().cargarPedido0042();
    s().fijarPrecioDistinto(150);
    s().reiniciarDemo();
    expect(estadoComoEnLaEspecificacion()).toEqual(INICIAL_ESPERADO);
  });

  it('tablero: cobertura calculada, 0.3 % hoy, comisión S/ 4,660', () => {
    const t = calcularTablero(s());
    expect(t.cobertura.porcentaje).toBe(71);
    expect(t.precioDistintoHoyPb).toBe(30);
    expect(t.senal.activa).toBe(false);
    expect(t.comisionDelMes).toBe(466_000);
  });

  it('persistencia con localStorage bloqueado no rompe nada', () => {
    const original = globalThis.localStorage;
    const bloqueado = {
      getItem: () => { throw new Error('SecurityError'); },
      setItem: () => { throw new Error('SecurityError'); },
      removeItem: () => { throw new Error('SecurityError'); },
    };
    Object.defineProperty(globalThis, 'localStorage', { value: bloqueado, configurable: true });
    try {
      expect(() => guardar(estadoInicial())).not.toThrow();
      expect(leer()).toBeNull();
    } finally {
      Object.defineProperty(globalThis, 'localStorage', { value: original, configurable: true });
    }
  });

  it('un estado guardado con otra forma se descarta (auditoría independiente #12)', () => {
    const memoria = new Map<string, string>();
    const original = globalThis.localStorage;
    const falso = { getItem: (k: string) => memoria.get(k) ?? null, setItem: (k: string, v: string) => void memoria.set(k, v), removeItem: (k: string) => void memoria.delete(k) };
    Object.defineProperty(globalThis, 'localStorage', { value: falso, configurable: true });
    try {
      expect(CLAVE).toBe('mallki-demo-v2');
      guardar(estadoInicial());
      expect(leer()).not.toBeNull();
      const sinEscenarios = JSON.parse(memoria.get(CLAVE)!);
      delete sinEscenarios.escenarios;
      memoria.set(CLAVE, JSON.stringify(sinEscenarios));
      expect(leer()).toBeNull();
      memoria.set(CLAVE, '{"ahora":"lunes"}');
      expect(leer()).toBeNull();
      memoria.set(CLAVE, 'no es json');
      expect(leer()).toBeNull();
      expect(esDatosDemo(estadoInicial())).toBe(true);
    } finally {
      Object.defineProperty(globalThis, 'localStorage', { value: original, configurable: true });
    }
  });

  it('modo captura antes o después del #', () => {
    expect(tieneCaptura('?captura=1', '#/m1-1')).toBe(true);
    expect(tieneCaptura('', '#/m1-1?captura=1')).toBe(true);
    expect(tieneCaptura('', '#/m1-1')).toBe(false);
  });
});
