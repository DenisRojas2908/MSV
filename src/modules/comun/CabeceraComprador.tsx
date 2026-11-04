import { COMPRADOR } from '../../data/comprador';

/** Contexto a la derecha de la marca en las pantallas del comprador. */
export function CabeceraComprador() {
  return <span className="text-sm font-medium text-texto/70">{COMPRADOR.razonSocial}</span>;
}
