// Pantallas del módulo M3. Cada entrada se reemplaza por la pantalla real.
import { createElement, type ComponentType } from 'react';
import { Provisional } from '../../ui/Provisional';

const prov = (id: string): ComponentType => () => createElement(Provisional, { id });

export const PANTALLAS_M3: Record<string, ComponentType> = {
  'M3-1': prov('M3-1'),
  'M3-2': prov('M3-2'),
  'M3-3': prov('M3-3'),
  'M3-4': prov('M3-4'),
};
