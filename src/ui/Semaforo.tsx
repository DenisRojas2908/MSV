// Verde, ámbar y rojo solo se usan en el semáforo y las alertas (§A.4).
import type { Color } from '../domain/tipos';

export const NOMBRE_COLOR: Record<Color, string> = { verde: 'Verde', ambar: 'Ámbar', rojo: 'Rojo' };

const FONDO: Record<Color, string> = { verde: 'bg-verde', ambar: 'bg-ambar', rojo: 'bg-rojo' };

export function Punto({ color, tamano = 10 }: { color: Color; tamano?: number }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rounded-full ${FONDO[color]}`}
      style={{ width: tamano, height: tamano }}
    />
  );
}

export function Semaforo({ color, etiqueta }: { color: Color; etiqueta?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <Punto color={color} />
      <span>{etiqueta ?? NOMBRE_COLOR[color]}</span>
    </span>
  );
}
