// Pedido a varios proveedores: subtotal, comisión, liquidación (§A.3) y precio fijado (S2-M5).
import { aplicarPuntosBasicos, subtotal, sumar } from './dinero';
import { fechaDeInstante, sumarHoras } from './fechas';
import { COMISION_PB } from './reglas';
import { esVigente } from './vigencia';
import type {
  Centimos,
  EstadoProveedorPedido,
  FechaISO,
  LineaPedido,
  Minutos,
  Oferta,
  Pedido,
  Proveedor,
  ProveedorId,
  Reclamo,
} from './tipos';

export function buscarOferta(ofertas: readonly Oferta[], id: string): Oferta {
  const o = ofertas.find((x) => x.id === id);
  if (!o) throw new Error(`Oferta inexistente: ${id}`);
  return o;
}

/** Precio de una línea: el fijado al confirmar; si no hay, el precio actual de la oferta. */
export function precioDeLinea(linea: LineaPedido, ofertas: readonly Oferta[]): Centimos {
  return linea.precioFijado ?? buscarOferta(ofertas, linea.ofertaId).precio;
}

/** Comisión de 2.5 % de una línea, half-up a céntimo (por línea, no sobre el total). */
export function comisionLinea(subtotalLinea: Centimos): Centimos {
  return aplicarPuntosBasicos(subtotalLinea, COMISION_PB);
}

export interface LineaCalculada {
  linea: LineaPedido;
  oferta: Oferta;
  precioUnitario: Centimos;
  subtotal: Centimos;
  comision: Centimos;
  liquidacion: Centimos;
  fijado: boolean;
}

export function calcularLinea(linea: LineaPedido, ofertas: readonly Oferta[]): LineaCalculada {
  const oferta = buscarOferta(ofertas, linea.ofertaId);
  const precioUnitario = precioDeLinea(linea, ofertas);
  const sub = subtotal(precioUnitario, linea.cantidad);
  const comision = comisionLinea(sub);
  return {
    linea,
    oferta,
    precioUnitario,
    subtotal: sub,
    comision,
    liquidacion: sub - comision,
    fijado: linea.precioFijado !== undefined,
  };
}

export interface GrupoProveedor {
  proveedor: Proveedor;
  lineas: LineaCalculada[];
  subtotal: Centimos;
  comision: Centimos;
  liquidacion: Centimos;
}

export interface ResumenPedido {
  grupos: GrupoProveedor[];
  /** Lo que paga el comprador: suma de subtotales. La comisión nunca se suma. */
  total: Centimos;
  comisionTotal: Centimos;
  liquidacionTotal: Centimos;
}

/** Agrupa por proveedor en el orden en que aparecen las líneas. */
export function resumirPedido(
  lineas: readonly LineaPedido[],
  ofertas: readonly Oferta[],
  proveedores: readonly Proveedor[],
): ResumenPedido {
  const grupos: GrupoProveedor[] = [];
  for (const l of lineas) {
    const calc = calcularLinea(l, ofertas);
    let g = grupos.find((x) => x.proveedor.id === calc.oferta.proveedorId);
    if (!g) {
      const proveedor = proveedores.find((p) => p.id === calc.oferta.proveedorId);
      if (!proveedor) throw new Error(`Proveedor inexistente: ${calc.oferta.proveedorId}`);
      g = { proveedor, lineas: [], subtotal: 0, comision: 0, liquidacion: 0 };
      grupos.push(g);
    }
    g.lineas.push(calc);
    g.subtotal += calc.subtotal;
    g.comision += calc.comision;
    g.liquidacion += calc.liquidacion;
  }
  return {
    grupos,
    total: sumar(grupos.map((g) => g.subtotal)),
    comisionTotal: sumar(grupos.map((g) => g.comision)),
    liquidacionTotal: sumar(grupos.map((g) => g.liquidacion)),
  };
}

/** Lo que paga el comprador. Existe para que ninguna pantalla sume la comisión. */
export function totalComprador(resumen: ResumenPedido): Centimos {
  return resumen.total;
}

/** S2-M5: al confirmar, cada línea guarda su precio y ya no cambia. */
export function fijarPrecios(lineas: readonly LineaPedido[], ofertas: readonly Oferta[]): LineaPedido[] {
  return lineas.map((l) => ({ ...l, precioFijado: precioDeLinea(l, ofertas) }));
}

/** D-26: líneas sin fijar cuya oferta ya no está vigente («Precio vencido: elige otra oferta»). */
export function lineasVencidas(lineas: readonly LineaPedido[], ofertas: readonly Oferta[], hoy: FechaISO): string[] {
  return lineas
    .filter((l) => l.precioFijado === undefined && !esVigente(buscarOferta(ofertas, l.ofertaId), hoy))
    .map((l) => l.ofertaId);
}

/** Entrega = hora base + plazo del proveedor (§B.4 M4). */
export function fechaEntrega(base: Minutos, plazoHoras: number): FechaISO {
  return fechaDeInstante(sumarHoras(base, plazoHoras));
}

/** Instante desde el que corre la entrega: el pago; si aún no se paga, la confirmación. */
export function baseEntrega(pedido: Pedido): Minutos {
  return pedido.pagadoEn ?? pedido.confirmadoEn;
}

/** D-16: estado de la parte de un proveedor dentro de un pedido. */
export function estadoDeProveedor(
  pedido: Pedido,
  proveedor: Proveedor,
  reclamos: readonly Reclamo[],
  ahora: Minutos,
): EstadoProveedorPedido {
  if (reclamos.some((r) => r.pedidoNumero === pedido.numero && r.proveedorId === proveedor.id)) return 'Reclamo abierto';
  if (pedido.etapa === 'confirmado') return 'Confirmado';
  if (ahora >= sumarHoras(baseEntrega(pedido), proveedor.plazoHoras)) return 'Entregado';
  return 'Pagado';
}

/** Siguiente número de pedido con cuatro dígitos: '0042' → '0043'. */
export function siguienteNumero(numeros: readonly string[]): string {
  const max = numeros.reduce((m, n) => Math.max(m, Number(n)), 0);
  return String(max + 1).padStart(4, '0');
}

export function proveedoresDelPedido(lineas: readonly LineaPedido[], ofertas: readonly Oferta[]): ProveedorId[] {
  return [...new Set(lineas.map((l) => buscarOferta(ofertas, l.ofertaId).proveedorId))];
}
