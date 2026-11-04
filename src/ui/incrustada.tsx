// Pantallas incrustadas en el panel de simulación: se dibuja solo el marco (sin índice ni
// controles) y se pueden pasar parámetros que normalmente vienen de la URL (por ejemplo, ?sku=2).
import { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SoloMarco = createContext(false);
export const ParametrosVista = createContext<Record<string, string>>({});

/** Lee un parámetro de la vista incrustada o, si no hay, de la URL. */
export function useParametro(nombre: string): string | null {
  const ctx = useContext(ParametrosVista);
  const [params] = useSearchParams();
  return ctx[nombre] ?? params.get(nombre);
}
