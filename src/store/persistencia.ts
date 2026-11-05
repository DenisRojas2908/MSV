// Persistencia opcional en localStorage. Siempre con try/catch: si falla, la demo sigue.
// Lo leído se valida: si no tiene la forma esperada, se descarta y la demo vuelve al
// estado inicial (auditoría independiente #12).
import { OFERTAS_INICIALES } from '../data/ofertas';
import type { DatosDemo } from './inicial';

/** v2 desde D-52/D-53: el estado guardado con v1 se ignora. */
export const CLAVE = 'mallki-demo-v2';

const esEntero = (x: unknown): x is number => typeof x === 'number' && Number.isSafeInteger(x);
const esTexto = (x: unknown): x is string => typeof x === 'string';
const esObjeto = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const ESCENARIOS = ['E1', 'E2', 'E3', 'E4', 'E5'];
const IDS_OFERTAS = OFERTAS_INICIALES.map((o) => o.id).join('|');

function esLinea(x: unknown): boolean {
  return esObjeto(x) && esTexto(x.ofertaId) && esEntero(x.cantidad) && (x.precioFijado === undefined || esEntero(x.precioFijado));
}

/** true si el valor tiene exactamente la forma de DatosDemo. */
export function esDatosDemo(x: unknown): x is DatosDemo {
  if (!esObjeto(x)) return false;
  const { ahora, ofertas, carrito, pedidos, reclamos, eventos, precioDistintoHoyPb, escenarios } = x;
  if (!esEntero(ahora) || !esEntero(precioDistintoHoyPb)) return false;
  if (!Array.isArray(ofertas) || ofertas.map((o) => (esObjeto(o) ? o.id : '')).join('|') !== IDS_OFERTAS) return false;
  if (!ofertas.every((o) => esObjeto(o) && esEntero(o.precio) && esEntero(o.skuN) && esTexto(o.proveedorId) && esTexto(o.confirmadaEl))) return false;
  if (carrito !== null && !(esObjeto(carrito) && esTexto(carrito.numero) && Array.isArray(carrito.lineas) && carrito.lineas.every(esLinea))) return false;
  if (!Array.isArray(pedidos) || !pedidos.every((p) => esObjeto(p) && esTexto(p.numero) && esTexto(p.etapa) && Array.isArray(p.lineas) && p.lineas.every(esLinea) && esEntero(p.confirmadoEn)))
    return false;
  if (!Array.isArray(reclamos) || !reclamos.every((r) => esObjeto(r) && esTexto(r.pedidoNumero) && esTexto(r.proveedorId) && esEntero(r.abiertoEn))) return false;
  if (!Array.isArray(eventos) || !eventos.every((e) => esObjeto(e) && esEntero(e.en) && esTexto(e.texto))) return false;
  if (!Array.isArray(escenarios) || !escenarios.every((e) => ESCENARIOS.includes(e as string))) return false;
  return true;
}

export function leer(): DatosDemo | null {
  try {
    const crudo = globalThis.localStorage?.getItem(CLAVE);
    if (!crudo) return null;
    const datos: unknown = JSON.parse(crudo);
    return esDatosDemo(datos) ? datos : null;
  } catch {
    return null;
  }
}

export function guardar(datos: DatosDemo): void {
  try {
    globalThis.localStorage?.setItem(CLAVE, JSON.stringify(datos));
  } catch {
    /* sin almacenamiento: la demo funciona igual */
  }
}

export function borrar(): void {
  try {
    globalThis.localStorage?.removeItem(CLAVE);
  } catch {
    /* nada */
  }
}
