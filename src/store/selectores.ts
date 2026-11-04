// Selectores: combinan el estado con el dominio. Las funciones `calcular*` son
// puras (se prueban sin React); los hooks `use*` las memorizan para la interfaz.
// Hook (React): función que empieza con `use` y lee estado dentro de un componente.
import { useMemo } from 'react';
import { PROVEEDORES } from '../data/proveedores';
import { SKUS } from '../data/skus';
import { TABLERO } from '../data/tablero';
import { alertasActivas } from '../domain/alerta';
import { ofertasComparables } from '../domain/comparador';
import { fechaDeInstante } from '../domain/fechas';
import { resumirPedido } from '../domain/pedido';
import { cobertura, conteoColores, semaforo, zonaCobertura, type SemaforoSku } from '../domain/semaforo';
import { comisionDelMes, reclamosFuera48h, senalPrecioDistinto } from '../domain/umbrales';
import { ofertasPorVencer } from '../domain/vigencia';
import type { LineaPedido, Oferta } from '../domain/tipos';
import { useDemo } from './demo';
import type { DatosDemo } from './inicial';

export function calcularSemaforo(ofertas: readonly Oferta[], ahora: number): SemaforoSku[] {
  return semaforo(SKUS, ofertas, PROVEEDORES, fechaDeInstante(ahora));
}

export function calcularResumenSemaforo(ofertas: readonly Oferta[], ahora: number) {
  const lista = calcularSemaforo(ofertas, ahora);
  return {
    lista,
    conteo: conteoColores(lista),
    total: cobertura(lista),
    abarrotes: cobertura(lista, 'abarrotes'),
    envases: cobertura(lista, 'envases'),
    zona: zonaCobertura(lista),
  };
}

export type ResumenSemaforo = ReturnType<typeof calcularResumenSemaforo>;

export function calcularTablero(d: Pick<DatosDemo, 'ofertas' | 'ahora' | 'precioDistintoHoyPb'>) {
  const sem = calcularResumenSemaforo(d.ofertas, d.ahora);
  const fuera = reclamosFuera48h(TABLERO.reclamosCerradosEn48hPct);
  return {
    ...TABLERO,
    cobertura: sem.total,
    zonaCobertura: sem.zona,
    comisionDelMes: comisionDelMes(TABLERO.ventasDelMes),
    precioDistintoHoyPb: d.precioDistintoHoyPb,
    senal: senalPrecioDistinto(d.precioDistintoHoyPb),
    reclamosFuera48hPct: fuera,
  };
}

export const useHoy = () => fechaDeInstante(useDemo((s) => s.ahora));

export function useResumenSemaforo(): ResumenSemaforo {
  const ofertas = useDemo((s) => s.ofertas);
  const ahora = useDemo((s) => s.ahora);
  return useMemo(() => calcularResumenSemaforo(ofertas, ahora), [ofertas, ahora]);
}

export function useComparador(skuN: number) {
  const ofertas = useDemo((s) => s.ofertas);
  const ahora = useDemo((s) => s.ahora);
  return useMemo(() => ofertasComparables(skuN, ofertas, PROVEEDORES, fechaDeInstante(ahora)), [skuN, ofertas, ahora]);
}

export function useAlertas() {
  const ofertas = useDemo((s) => s.ofertas);
  const ahora = useDemo((s) => s.ahora);
  return useMemo(() => alertasActivas(ofertas, SKUS, PROVEEDORES, fechaDeInstante(ahora)), [ofertas, ahora]);
}

export function usePorVencer() {
  const ofertas = useDemo((s) => s.ofertas);
  const ahora = useDemo((s) => s.ahora);
  return useMemo(() => ofertasPorVencer(ofertas, fechaDeInstante(ahora)), [ofertas, ahora]);
}

export function useResumenPedido(lineas: readonly LineaPedido[] | undefined) {
  const ofertas = useDemo((s) => s.ofertas);
  return useMemo(() => (lineas ? resumirPedido(lineas, ofertas, PROVEEDORES) : null), [lineas, ofertas]);
}

export function usePedido(numero: string) {
  const pedidos = useDemo((s) => s.pedidos);
  return useMemo(() => pedidos.find((p) => p.numero === numero) ?? null, [pedidos, numero]);
}

export function useTablero() {
  const ofertas = useDemo((s) => s.ofertas);
  const ahora = useDemo((s) => s.ahora);
  const precioDistintoHoyPb = useDemo((s) => s.precioDistintoHoyPb);
  return useMemo(() => calcularTablero({ ofertas, ahora, precioDistintoHoyPb }), [ofertas, ahora, precioDistintoHoyPb]);
}

export const buscarSku = (n: number) => {
  const s = SKUS.find((x) => x.n === n);
  if (!s) throw new Error(`SKU inexistente: ${n}`);
  return s;
};

export const buscarProveedor = (id: string) => {
  const p = PROVEEDORES.find((x) => x.id === id);
  if (!p) throw new Error(`Proveedor inexistente: ${id}`);
  return p;
};
