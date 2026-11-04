// Pantallas del módulo M5 · Panel de indicadores y alertas (S3).
import type { ComponentType } from 'react';
import { M5_1Tablero } from './M5_1Tablero';
import { M5_2Semaforos } from './M5_2Semaforos';
import { M5_3Alertas } from './M5_3Alertas';
import { M5_4Compromisos } from './M5_4Compromisos';

export const PANTALLAS_M5: Record<string, ComponentType> = {
  'M5-1': M5_1Tablero,
  'M5-2': M5_2Semaforos,
  'M5-3': M5_3Alertas,
  'M5-4': M5_4Compromisos,
};
