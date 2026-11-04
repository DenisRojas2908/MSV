// Pantallas del módulo M1. Cada entrada se reemplaza por la pantalla real.
import { createElement, type ComponentType } from 'react';
import { Provisional } from '../../ui/Provisional';

const prov = (id: string): ComponentType => () => createElement(Provisional, { id });

export const PANTALLAS_M1: Record<string, ComponentType> = {
  'M1-1': prov('M1-1'),
  'M1-2': prov('M1-2'),
  'M1-3': prov('M1-3'),
  'M1-4': prov('M1-4'),
};
