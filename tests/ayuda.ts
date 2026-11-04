import { PROVEEDORES } from '../src/data/proveedores';
import { SKUS } from '../src/data/skus';
import { OFERTAS_INICIALES } from '../src/data/ofertas';
import type { Oferta } from '../src/domain/tipos';

export const HOY = '2026-11-09';
export const MANANA = '2026-11-10';
export const ofertas = (): Oferta[] => OFERTAS_INICIALES.map((o) => ({ ...o }));
export { PROVEEDORES, SKUS };
export const oferta = (lista: readonly Oferta[], id: string): Oferta => {
  const o = lista.find((x) => x.id === id);
  if (!o) throw new Error(id);
  return o;
};
