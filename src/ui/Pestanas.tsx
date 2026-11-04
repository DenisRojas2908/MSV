// Pestañas bajo la barra verde (M2 y M5). Cada pestaña es una ruta.
import { Link } from 'react-router-dom';
import { PANTALLAS } from '../data/pantallas';

export function Pestanas({ modulo, activa }: { modulo: 'M2' | 'M5'; activa: string }) {
  return (
    <nav className="flex shrink-0 gap-1 border-b border-texto/10 bg-blanco px-10">
      {PANTALLAS.filter((p) => p.modulo === modulo).map((p) => (
        <Link
          key={p.id}
          to={p.ruta}
          className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold ${p.id === activa ? 'border-mallki text-mallki' : 'border-transparent text-texto/60'}`}
        >
          {p.nombre}
        </Link>
      ))}
    </nav>
  );
}
