// Piezas visuales comunes: tarjeta, botones, etiquetas.
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Tarjeta({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl bg-blanco ring-1 ring-texto/10 ${className}`}>{children}</div>;
}

const BASE = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-40';
const VARIANTE = {
  primario: 'bg-mallki text-blanco hover:bg-mallki/90',
  secundario: 'bg-blanco text-mallki ring-1 ring-mallki hover:bg-mallki/5',
  texto: 'text-mallki underline underline-offset-2',
} as const;

interface PropsBoton {
  children: ReactNode;
  variante?: keyof typeof VARIANTE;
  className?: string;
  a?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Boton({ children, variante = 'primario', className = 'px-4 py-3 text-sm', a, onClick, disabled }: PropsBoton) {
  const cls = `${BASE} ${VARIANTE[variante]} ${className}`;
  if (a && !disabled) {
    return (
      <Link to={a} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Etiqueta({ children, tono = 'neutro' }: { children: ReactNode; tono?: 'neutro' | 'mallki' | 'ambar' | 'rojo' | 'verde' }) {
  const t = {
    neutro: 'bg-texto/5 text-texto/80',
    mallki: 'bg-mallki/10 text-mallki',
    ambar: 'bg-ambar/15 text-texto',
    rojo: 'bg-rojo/10 text-rojo',
    verde: 'bg-verde/10 text-texto',
  }[tono];
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${t}`}>{children}</span>;
}

/** Rótulo que acompaña todo lo que cambia un escenario (§F). */
export function RotuloEscenario() {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-dashed border-texto/40 px-2 py-0.5 text-xs font-medium text-texto/80">
      Escenario de simulación
    </span>
  );
}

export function Campo({ etiqueta, valor, placeholder }: { etiqueta: string; valor?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-texto/70">{etiqueta}</span>
      <span className={`block rounded-lg bg-blanco px-3 py-2.5 text-sm ring-1 ring-texto/20 ${valor ? 'text-texto' : 'text-texto/40'}`}>
        {valor ?? placeholder ?? ''}
      </span>
    </label>
  );
}
