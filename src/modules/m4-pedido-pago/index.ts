// Pantallas del módulo M4. Cada entrada se reemplaza por la pantalla real.
import { createElement, type ComponentType } from 'react';
import { Provisional } from '../../ui/Provisional';

const prov = (id: string): ComponentType => () => createElement(Provisional, { id });

export const PANTALLAS_M4: Record<string, ComponentType> = {
  'M4-1': prov('M4-1'),
  'M4-2': prov('M4-2'),
  'M4-3': prov('M4-3'),
  'M4-4': prov('M4-4'),
};
