// Pantallas del módulo M4 · Pedido a varios proveedores y pago.
import type { ComponentType } from 'react';
import { M4_1Carrito } from './M4_1Carrito';
import { M4_2Confirmacion } from './M4_2Confirmacion';
import { M4_3Pago } from './M4_3Pago';
import { M4_4Seguimiento } from './M4_4Seguimiento';

export const PANTALLAS_M4: Record<string, ComponentType> = {
  'M4-1': M4_1Carrito,
  'M4-2': M4_2Confirmacion,
  'M4-3': M4_3Pago,
  'M4-4': M4_4Seguimiento,
};
