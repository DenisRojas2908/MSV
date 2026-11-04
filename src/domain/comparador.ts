// S2-M4 · Orden neutral del comparador (§B.4 M3, D-12).
import { MAX_OFERTAS_POR_SKU } from './reglas';
import { diasRestantes, esVigente, estadoVigencia, type EstadoVigencia } from './vigencia';
import type { FechaISO, Oferta, Proveedor } from './tipos';

export interface OfertaComparada {
  oferta: Oferta;
  proveedor: Proveedor;
  diasRestantes: number;
  estado: EstadoVigencia;
}

/**
 * Precio de menor a mayor; a igual precio, menor plazo; si sigue el empate,
 * la confirmación más reciente (D-12). Nunca depende de un pago.
 */
export function compararOfertas(a: OfertaComparada, b: OfertaComparada): number {
  if (a.oferta.precio !== b.oferta.precio) return a.oferta.precio - b.oferta.precio;
  if (a.proveedor.plazoHoras !== b.proveedor.plazoHoras) return a.proveedor.plazoHoras - b.proveedor.plazoHoras;
  if (a.oferta.confirmadaEl !== b.oferta.confirmadaEl) return a.oferta.confirmadaEl < b.oferta.confirmadaEl ? 1 : -1;
  return 0; // sort es estable: se conserva el orden de §A.2
}

/** Ofertas vigentes de proveedores activos para un SKU, ordenadas, máximo 3. */
export function ofertasComparables(
  skuN: number,
  ofertas: readonly Oferta[],
  proveedores: readonly Proveedor[],
  hoy: FechaISO,
): OfertaComparada[] {
  return ofertas
    .filter((o) => o.skuN === skuN && esVigente(o, hoy))
    .flatMap((oferta) => {
      const proveedor = proveedores.find((p) => p.id === oferta.proveedorId);
      if (!proveedor || !proveedor.activo) return [];
      return [{ oferta, proveedor, diasRestantes: diasRestantes(oferta, hoy), estado: estadoVigencia(oferta, hoy) }];
    })
    .sort(compararOfertas)
    .slice(0, MAX_OFERTAS_POR_SKU);
}

/** SKU que tienen al menos una oferta con precio (P-02: solo estos abren comparador). */
export function skusConPrecio(ofertas: readonly Oferta[]): number[] {
  return [...new Set(ofertas.map((o) => o.skuN))].sort((a, b) => a - b);
}
