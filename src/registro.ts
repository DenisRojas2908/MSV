// Qué componente dibuja cada una de las 20 pantallas. Lo usan las rutas y el panel de simulación.
import type { ComponentType } from 'react';
import { PANTALLAS_M1 } from './modules/m1-registro';
import { PANTALLAS_M2 } from './modules/m2-proveedor';
import { PANTALLAS_M3 } from './modules/m3-comparador';
import { PANTALLAS_M4 } from './modules/m4-pedido-pago';
import { PANTALLAS_M5 } from './modules/m5-tablero';

export const COMPONENTES: Record<string, ComponentType> = {
  ...PANTALLAS_M1,
  ...PANTALLAS_M2,
  ...PANTALLAS_M3,
  ...PANTALLAS_M4,
  ...PANTALLAS_M5,
};
