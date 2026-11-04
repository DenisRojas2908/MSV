// S2-M1 · Semáforo de liquidez y cobertura (§A.3, §C, §D).
import { porcentajeEntero } from './dinero';
import { META_COBERTURA_SKU, OFERTAS_AMBAR, OFERTAS_VERDE, UMBRAL_CATEGORIA_PCT } from './reglas';
import { esVigente } from './vigencia';
import type { Categoria, Color, FechaISO, Oferta, Proveedor, ProveedorId, Sku } from './tipos';

export interface SemaforoSku {
  sku: Sku;
  color: Color;
  ofertantes: ProveedorId[];
}

/**
 * Proveedores activos con oferta vigente para el SKU. Si el proveedor tiene una
 * oferta con precio, cuenta solo si está vigente; si no la tiene, su oferta se
 * considera vigente toda la demo (D-05).
 */
export function ofertantesVigentes(
  sku: Sku,
  ofertas: readonly Oferta[],
  proveedores: readonly Proveedor[],
  hoy: FechaISO,
): ProveedorId[] {
  return sku.ofertantes.filter((pid) => {
    const prov = proveedores.find((p) => p.id === pid);
    if (!prov || !prov.activo) return false;
    const oferta = ofertas.find((o) => o.skuN === sku.n && o.proveedorId === pid);
    return oferta ? esVigente(oferta, hoy) : true;
  });
}

/** 3 = verde, 2 = ámbar, 1 o 0 = rojo. */
export function colorPorConteo(n: number): Color {
  if (n >= OFERTAS_VERDE) return 'verde';
  if (n === OFERTAS_AMBAR) return 'ambar';
  return 'rojo';
}

export function semaforo(
  skus: readonly Sku[],
  ofertas: readonly Oferta[],
  proveedores: readonly Proveedor[],
  hoy: FechaISO,
): SemaforoSku[] {
  return skus.map((sku) => {
    const ofertantes = ofertantesVigentes(sku, ofertas, proveedores, hoy);
    return { sku, color: colorPorConteo(ofertantes.length), ofertantes };
  });
}

export function conteoColores(lista: readonly SemaforoSku[]): Record<Color, number> {
  const c: Record<Color, number> = { verde: 0, ambar: 0, rojo: 0 };
  for (const s of lista) c[s.color] += 1;
  return c;
}

export interface Cobertura {
  enVerde: number;
  total: number;
  porcentaje: number;
}

/** Cobertura = SKU en verde ÷ total, total o de una categoría. */
export function cobertura(lista: readonly SemaforoSku[], categoria?: Categoria): Cobertura {
  const sub = categoria ? lista.filter((s) => s.sku.categoria === categoria) : lista;
  const enVerde = sub.filter((s) => s.color === 'verde').length;
  return { enVerde, total: sub.length, porcentaje: porcentajeEntero(enVerde, sub.length) };
}

export type ZonaCobertura = 'dentro-meta' | 'bajo-meta' | 'alerta-s3';

/** Una categoría está bajo el umbral del S3 si su cobertura exacta es menor a 50 %. */
export function categoriaEnAlerta(c: Cobertura): boolean {
  return c.enVerde * 100 < UMBRAL_CATEGORIA_PCT * c.total;
}

/**
 * Zona de la cobertura (§D, D-25, P-10): alerta del S3 si alguna categoría
 * baja de 50 %; dentro de la meta con 17 de 24 o más; si no, bajo la meta.
 */
export function zonaCobertura(lista: readonly SemaforoSku[]): ZonaCobertura {
  const categorias: Categoria[] = ['abarrotes', 'envases'];
  if (categorias.some((cat) => categoriaEnAlerta(cobertura(lista, cat)))) return 'alerta-s3';
  return cobertura(lista).enVerde >= META_COBERTURA_SKU ? 'dentro-meta' : 'bajo-meta';
}
