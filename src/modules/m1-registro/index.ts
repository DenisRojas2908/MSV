// Pantallas del módulo M1 · Registro y onboarding del comprador (U1).
import type { ComponentType } from 'react';
import { M1_1Registro } from './M1_1Registro';
import { M1_2Onboarding } from './M1_2Onboarding';
import { M1_3Inicio } from './M1_3Inicio';
import { M1_4Pedidos } from './M1_4Pedidos';

export const PANTALLAS_M1: Record<string, ComponentType> = {
  'M1-1': M1_1Registro,
  'M1-2': M1_2Onboarding,
  'M1-3': M1_3Inicio,
  'M1-4': M1_4Pedidos,
};
