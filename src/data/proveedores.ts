// §A.2 · Proveedores. Solo estos seis aparecen en pantalla.
import type { Proveedor } from '../domain/tipos';

export const PROVEEDORES: readonly Proveedor[] = [
  { id: 'qhapaq', nombre: 'Distribuidora Qhapaq', categoria: 'abarrotes', calificacionDecimas: 46, plazoHoras: 24, activo: true },
  { id: 'inti', nombre: 'Comercial Inti', categoria: 'abarrotes', calificacionDecimas: 42, plazoHoras: 48, activo: true },
  { id: 'wayna', nombre: 'Abarrotes Wayna', categoria: 'abarrotes', calificacionDecimas: 39, plazoHoras: 72, activo: true },
  { id: 'killa', nombre: 'Envases Killa', categoria: 'envases', calificacionDecimas: 45, plazoHoras: 24, activo: true },
  { id: 'pacha', nombre: 'Empaques Pacha', categoria: 'envases', calificacionDecimas: 41, plazoHoras: 48, activo: true },
  { id: 'ayni', nombre: 'Descartables Ayni', categoria: 'envases', calificacionDecimas: 38, plazoHoras: 72, activo: true },
];

/** Proveedor de las pantallas del M2. */
export const PROVEEDOR_M2 = 'qhapaq' as const;
