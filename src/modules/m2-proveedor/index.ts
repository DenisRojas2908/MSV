// Pantallas del módulo M2 · Catálogo y precios del proveedor (U2).
import type { ComponentType } from 'react';
import { M2_1Registro } from './M2_1Registro';
import { M2_2Catalogo } from './M2_2Catalogo';
import { M2_3Confirmacion } from './M2_3Confirmacion';
import { M2_4Panel } from './M2_4Panel';

export const PANTALLAS_M2: Record<string, ComponentType> = {
  'M2-1': M2_1Registro,
  'M2-2': M2_2Catalogo,
  'M2-3': M2_3Confirmacion,
  'M2-4': M2_4Panel,
};
