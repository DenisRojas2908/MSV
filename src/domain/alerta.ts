// S2-M6 · Alerta de precio y reparto entre alternativas (§A.3, D-11, D-24).
import { redondearRazon } from './dinero';
import { ofertasComparables, type OfertaComparada } from './comparador';
import { esVigente } from './vigencia';
import type { Centimos, FechaISO, Oferta, Proveedor, Sku } from './tipos';

/** (nuevo − anterior) ÷ anterior, redondeado al entero: 198.00 → 210.00 = 6. */
export function variacionPorcentual(anterior: Centimos, nuevo: Centimos): number {
  if (nuevo >= anterior) return redondearRazon((nuevo - anterior) * 100, anterior);
  return -redondearRazon((anterior - nuevo) * 100, anterior);
}

export interface AlertaPrecio {
  oferta: Oferta;
  sku: Sku;
  proveedor: Proveedor;
  anterior: Centimos;
  nuevo: Centimos;
  variacion: number;
  /** Las demás ofertas vigentes del mismo SKU, en el orden del comparador. Sin tope (D-24). */
  alternativas: OfertaComparada[];
}

/** Alternativas de una oferta: las otras ofertas comparables del mismo SKU. */
export function alternativas(
  oferta: Oferta,
  ofertas: readonly Oferta[],
  proveedores: readonly Proveedor[],
  hoy: FechaISO,
): OfertaComparada[] {
  return ofertasComparables(oferta.skuN, ofertas, proveedores, hoy).filter((c) => c.oferta.id !== oferta.id);
}

/** Hay alerta solo si la oferta vigente subió de precio (cualquier subida mayor a 0 %, D-11). */
export function alertaDePrecio(
  oferta: Oferta,
  ofertas: readonly Oferta[],
  skus: readonly Sku[],
  proveedores: readonly Proveedor[],
  hoy: FechaISO,
): AlertaPrecio | null {
  const anterior = oferta.precioAnterior;
  if (anterior === undefined || oferta.precio <= anterior || !esVigente(oferta, hoy)) return null;
  const sku = skus.find((s) => s.n === oferta.skuN);
  const proveedor = proveedores.find((p) => p.id === oferta.proveedorId);
  if (!sku || !proveedor) return null;
  return {
    oferta,
    sku,
    proveedor,
    anterior,
    nuevo: oferta.precio,
    variacion: variacionPorcentual(anterior, oferta.precio),
    alternativas: alternativas(oferta, ofertas, proveedores, hoy),
  };
}

export function alertasActivas(
  ofertas: readonly Oferta[],
  skus: readonly Sku[],
  proveedores: readonly Proveedor[],
  hoy: FechaISO,
): AlertaPrecio[] {
  return ofertas.flatMap((o) => {
    const a = alertaDePrecio(o, ofertas, skus, proveedores, hoy);
    return a ? [a] : [];
  });
}
