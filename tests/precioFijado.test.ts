import { beforeEach, describe, expect, it } from 'vitest';
import { formatearSoles, soles } from '../src/domain/dinero';
import { resumirPedido } from '../src/domain/pedido';
import { useDemo } from '../src/store/demo';
import { PROVEEDORES } from './ayuda';

const s = () => useDemo.getState();

describe('S2-M5 precio fijado', () => {
  beforeEach(() => s().reiniciarDemo());
  it('si el proveedor cambia su precio después de confirmado, el pedido conserva el anterior', () => {
    s().cargarPedido0042();
    expect(s().confirmarPedido()).toBe('0042');
    s().actualizarPrecio('aceite-qhapaq', soles('125.00'));
    const p = s().pedidos.find((x) => x.numero === '0042');
    const r = resumirPedido(p?.lineas ?? [], s().ofertas, PROVEEDORES);
    expect(formatearSoles(r.grupos[0]?.lineas[0]?.precioUnitario ?? 0)).toBe('S/ 118.00');
    expect(formatearSoles(r.total)).toBe('S/ 490.60');
  });
  it('un pedido nuevo usa el precio nuevo', () => {
    s().actualizarPrecio('aceite-qhapaq', soles('125.00'));
    s().agregarAlCarrito('aceite-qhapaq', 1);
    expect(s().carrito?.numero).toBe('0043');
    const r = resumirPedido(s().carrito?.lineas ?? [], s().ofertas, PROVEEDORES);
    expect(formatearSoles(r.total)).toBe('S/ 125.00');
  });
  it('el pedido 0042 del estado inicial ya está pagado con precios fijados', () => {
    const p = s().pedidos[0];
    expect(p?.etapa).toBe('pagado');
    expect(p?.lineas.every((l) => l.precioFijado !== undefined)).toBe(true);
  });
});
