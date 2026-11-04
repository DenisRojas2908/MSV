// Pantallas del módulo M5. Cada entrada se reemplaza por la pantalla real.
import { createElement, type ComponentType } from 'react';
import { Provisional } from '../../ui/Provisional';

const prov = (id: string): ComponentType => () => createElement(Provisional, { id });

export const PANTALLAS_M5: Record<string, ComponentType> = {
  'M5-1': prov('M5-1'),
  'M5-2': prov('M5-2'),
  'M5-3': prov('M5-3'),
  'M5-4': prov('M5-4'),
};
