// Persistencia opcional en localStorage. Siempre con try/catch: si falla, la demo sigue.
import type { DatosDemo } from './inicial';

export const CLAVE = 'mallki-demo-v1';

export function leer(): DatosDemo | null {
  try {
    const crudo = globalThis.localStorage?.getItem(CLAVE);
    return crudo ? (JSON.parse(crudo) as DatosDemo) : null;
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
