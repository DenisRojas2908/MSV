// Panel del presentador (F5). En F0 solo tiene el reloj y «Reiniciar demo».
import { Link } from 'react-router-dom';
import { useDemo } from '../store/demo';
import { useHoy } from '../store/selectores';
import { Fecha, Marca } from '../ui';

export function Simulacion() {
  const hoy = useHoy();
  const reiniciar = useDemo((s) => s.reiniciarDemo);
  return (
    <div className="mx-auto max-w-5xl space-y-4 bg-crema p-8">
      <div className="flex items-center gap-4">
        <Marca grande />
        <span className="text-sm text-texto/70">Panel de simulación</span>
        <Link to="/" className="ml-auto text-sm text-mallki underline">Índice</Link>
      </div>
      <p className="text-sm">
        Hoy: <Fecha f={hoy} />
      </p>
      <button type="button" onClick={reiniciar} className="rounded-lg bg-mallki px-4 py-2 text-sm font-semibold text-blanco">
        Reiniciar demo
      </button>
    </div>
  );
}
