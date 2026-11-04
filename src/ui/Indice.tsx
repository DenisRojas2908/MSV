// Índice para el expositor: las 20 pantallas agrupadas por módulo (§B.2).
import { Link } from 'react-router-dom';
import { MODULOS, PANTALLAS, TAMANOS } from '../data/pantallas';
import { useDemo } from '../store/demo';
import { Marca } from './Marca';
import { Pie } from './Pie';

export function Indice() {
  const reiniciar = useDemo((s) => s.reiniciarDemo);
  const modulos = Object.entries(MODULOS) as [keyof typeof MODULOS, string][];
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 bg-crema p-8">
      <header className="flex items-center justify-between">
        <div>
          <Marca grande />
          <p className="mt-1 text-sm text-texto/70">Índice de pantallas del prototipo</p>
        </div>
        <div className="flex gap-2">
          <Link to="/simulacion" className="rounded-lg bg-mallki px-4 py-2 text-sm font-semibold text-blanco">
            Panel de simulación
          </Link>
          <button type="button" onClick={reiniciar} className="rounded-lg px-4 py-2 text-sm font-semibold text-mallki ring-1 ring-mallki">
            Reiniciar demo
          </button>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {modulos.map(([m, nombre]) => (
          <section key={m} className="rounded-xl bg-blanco p-5 ring-1 ring-texto/10">
            <h2 className="font-semibold">
              {m} · {nombre}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {PANTALLAS.filter((p) => p.modulo === m).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2">
                  <Link to={p.ruta} className="text-mallki underline underline-offset-2">
                    {p.id} {p.nombre}
                  </Link>
                  <span className="text-xs text-texto/50">
                    {TAMANOS[p.dispositivo].ancho} × {TAMANOS[p.dispositivo].alto}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <Pie />
    </div>
  );
}
