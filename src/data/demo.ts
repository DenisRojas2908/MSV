// Hechos fijos de la demostración (§A.2, §A.3, D-15).
import type { Categoria } from '../domain/tipos';

/** Lunes 09/11/2026: fecha de los datos de la demo. */
export const FECHA_DEMO = '2026-11-09';
/** D-15: hora inicial del reloj simulado (no se muestra). */
export const HORA_INICIO = '09:00';
export const NUMERO_PEDIDO_EJEMPLO = '0042';

export const NOMBRE_CATEGORIA: Record<Categoria, string> = {
  abarrotes: 'Abarrotes secos',
  envases: 'Envases y empaques',
};

/** §B.3 M1-1: tipos de negocio. */
export const TIPOS_NEGOCIO = ['restaurante', 'pollería', 'panadería', 'pastelería', 'cafetería'] as const;

/** §A.1. */
export const MALLKI_EN_UNA_FRASE =
  'Mallki es un marketplace B2B asset-light que permite a las MYPE gastronómicas de Lima Centro comparar precios de insumos no perecibles y comprar a varios proveedores en un solo pedido.';

export const PIE = 'Prototipo Mallki · datos de demostración';
