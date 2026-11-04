// Pantallas del módulo M3 · Comparador por SKU ancla (U3).
import type { ComponentType } from 'react';
import { M3_1Buscador } from './M3_1Buscador';
import { M3_2Comparador } from './M3_2Comparador';
import { M3_3Alerta } from './M3_3Alerta';
import { M3_4Semaforo } from './M3_4Semaforo';

export const PANTALLAS_M3: Record<string, ComponentType> = {
  'M3-1': M3_1Buscador,
  'M3-2': M3_2Comparador,
  'M3-3': M3_3Alerta,
  'M3-4': M3_4Semaforo,
};
