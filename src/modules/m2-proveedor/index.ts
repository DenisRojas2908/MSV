// Pantallas del módulo M2. Cada entrada se reemplaza por la pantalla real.
import { createElement, type ComponentType } from 'react';
import { Provisional } from '../../ui/Provisional';

const prov = (id: string): ComponentType => () => createElement(Provisional, { id });

export const PANTALLAS_M2: Record<string, ComponentType> = {
  'M2-1': prov('M2-1'),
  'M2-2': prov('M2-2'),
  'M2-3': prov('M2-3'),
  'M2-4': prov('M2-4'),
};
