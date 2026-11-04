// Escenarios E1 a E5 del modo simulación (§F). Cada uno sale de un caso ya entregado en el S2 o el S3.
// Son funciones sobre el store para poder probarlas sin interfaz (tests/escenarios.test.ts).
import { FECHA_DEMO, NUMERO_PEDIDO_EJEMPLO } from '../data/demo';
import { OFERTAS_INICIALES } from '../data/ofertas';
import { PROVEEDOR_M2 } from '../data/proveedores';
import { sumarDias } from '../domain/fechas';
import type { Centimos, PuntosBasicos } from '../domain/tipos';
import { useDemo } from '../store/demo';
import type { EscenarioId } from '../store/inicial';

export interface Escenario {
  id: EscenarioId;
  nombre: string;
  accion: string;
  esperado: string;
  mecanismo: string;
  origen: string;
  pantallas: { id: string; params?: Record<string, string> }[];
}

/** Tabla de §F, copiada literalmente. */
export const ESCENARIOS: readonly Escenario[] = [
  {
    id: 'E1',
    nombre: 'Precio vencido',
    accion: 'Avanza el reloj al 10/11/2026',
    esperado:
      'La oferta de aceite de Wayna pasa a «No disponible»; el comparador del aceite muestra 2 ofertas; el aceite pasa a ámbar; la cobertura baja a 16 de 24 (67 %) y M5 la muestra bajo la meta',
    mecanismo: 'S2-M3, S2-M1',
    origen: 'S2: bucle de un proveedor que no confirma su precio en 7 días',
    pantallas: [{ id: 'M3-2' }, { id: 'M3-4' }, { id: 'M5-1' }, { id: 'M5-2' }],
  },
  {
    id: 'E2',
    nombre: 'Alerta de precio',
    accion: 'Aplica la subida del arroz de Wayna (desde S/ 198.00)',
    esperado: 'Aparece la alerta de 6 % con las alternativas Comercial Inti S/ 199.00 y Distribuidora Qhapaq S/ 205.00',
    mecanismo: 'S2-M6',
    origen: 'Ficha M3-3; S2-M6',
    pantallas: [{ id: 'M3-2', params: { sku: '2' } }, { id: 'M3-3' }, { id: 'M1-3' }],
  },
  {
    id: 'E3',
    nombre: 'Precio fijado',
    accion: 'Con el pedido N.° 0042 confirmado, escribe un nuevo precio para el aceite de Qhapaq',
    esperado: 'El pedido conserva S/ 118.00; un pedido nuevo usa el precio nuevo; el indicador de precio distinto no cambia',
    mecanismo: 'S2-M5',
    origen: 'S2: caso de prueba 2',
    pantallas: [{ id: 'M4-2' }, { id: 'M3-2' }, { id: 'M4-1' }, { id: 'M5-1' }],
  },
  {
    id: 'E4',
    nombre: 'Error masivo de precios',
    accion: 'Escribe el porcentaje de pedidos del día con precio distinto',
    esperado: 'Desde más de 1 % se dispara la señal algedónica: la unidad tiene 2 h; si vence, el S3 24 h',
    mecanismo: 'S2-M5, canal algedónico',
    origen: 'S2: caso de prueba 2; S3 §6.5',
    pantallas: [{ id: 'M5-3' }, { id: 'M5-1' }],
  },
  {
    id: 'E5',
    nombre: 'Reclamo',
    accion: 'Rosa abre un reclamo sobre la parte de un proveedor del pedido N.° 0042',
    esperado:
      'La liquidación de ese proveedor queda retenida; corren las 48 h de U1 y las 24 h del descargo de U2; si el monto superara S/ 550 sería excepción al S3 (en el pedido N.° 0042 no ocurre)',
    mecanismo: 'S2-M8',
    origen: 'S2-M8; S3 §6.5',
    pantallas: [{ id: 'M1-4' }, { id: 'M4-4' }, { id: 'M2-4' }, { id: 'M5-3' }],
  },
];

const s = () => useDemo.getState();
const ARROZ_WAYNA = 'arroz-wayna';
const ACEITE_QHAPAQ = 'aceite-qhapaq';

/** E1: el reloj pasa al día siguiente de la demo (10/11/2026). */
export function e1PrecioVencido(): void {
  s().fijarAhora(sumarDias(FECHA_DEMO, 1), { escenario: 'E1' });
}

function arrozInicial() {
  const o = OFERTAS_INICIALES.find((x) => x.id === ARROZ_WAYNA);
  if (!o || o.precioAnterior === undefined) throw new Error('Falta el arroz de Wayna en §A.2');
  return o;
}

/** E2, antes: el arroz de Wayna en su precio anterior, con la misma confirmación (08/11) (D-09). */
export function e2Antes(): void {
  const o = arrozInicial();
  s().reemplazarOferta({ id: o.id, skuN: o.skuN, proveedorId: o.proveedorId, precio: o.precioAnterior!, confirmadaEl: o.confirmadaEl }, 'E2');
}

/** E2, después: sube al precio de §A.2 y aparece la alerta. */
export function e2Subida(): void {
  s().reemplazarOferta({ ...arrozInicial() }, 'E2');
}

/** E3 requiere el pedido N.° 0042 confirmado o pagado (no en el carrito). */
export function e3Disponible(): boolean {
  return s().pedidos.some((p) => p.numero === NUMERO_PEDIDO_EJEMPLO);
}

/** E3: nuevo precio para el aceite de Qhapaq (lo escribe el expositor, P-06). */
export function e3PrecioNuevo(precio: Centimos): void {
  s().actualizarPrecio(ACEITE_QHAPAQ, precio);
}

/** E3: un pedido nuevo con un aceite de Qhapaq, para ver que usa el precio nuevo. */
export function e3PedidoNuevo(): void {
  s().agregarAlCarrito(ACEITE_QHAPAQ, 1);
}

/** E4: porcentaje de pedidos del día con precio distinto (lo escribe el expositor, P-06). */
export function e4PrecioDistinto(pb: PuntosBasicos): void {
  s().fijarPrecioDistinto(pb, 'E4');
}

/** E5: reclamo sobre la parte de Distribuidora Qhapaq del pedido N.° 0042 (D-21). */
export function e5Reclamo(descripcion = ''): void {
  if (!e3Disponible()) return;
  s().abrirReclamo(NUMERO_PEDIDO_EJEMPLO, PROVEEDOR_M2, descripcion);
}

/** Lectura validada de lo que escribe el expositor (auditoría independiente #8). */
export { leerMonto, leerPorcentaje } from '../domain/entradas';
