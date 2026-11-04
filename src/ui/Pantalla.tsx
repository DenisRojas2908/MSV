// Marco de cada pantalla: tamaño exacto de §B.1, marca arriba a la izquierda,
// barra verde con el título y pie. En modo captura solo se dibuja el marco.
import { useContext, type ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pantalla, TAMANOS } from '../data/pantallas';
import { useDemo } from '../store/demo';
import { Marca } from './Marca';
import { Pie } from './Pie';
import { SoloMarco } from './incrustada';
import { useModoCaptura } from './useModoCaptura';

interface Props {
  id: string;
  titulo: string;
  /** A la derecha de la marca (por ejemplo, el nombre del negocio). */
  contexto?: ReactNode;
  /** Ruta a la que vuelve la flecha de la barra verde. */
  volver?: string;
  /** Debajo de la barra verde (pestañas). */
  subbarra?: ReactNode;
  /** Controles del expositor: se dibujan fuera del marco y nunca salen en capturas. */
  expositor?: ReactNode;
  children: ReactNode;
}

export function Pantalla({ id, titulo, contexto, volver, subbarra, expositor, children }: Props) {
  const info = pantalla(id);
  const { ancho, alto } = TAMANOS[info.dispositivo];
  const captura = useModoCaptura();
  const incrustada = useContext(SoloMarco);
  // §F: todo lo que cambia un escenario se rotula. En captura el estado es el inicial: nunca aparece.
  const escenario = useDemo((s) => s.escenarios.length > 0);
  const web = info.dispositivo === 'web';

  const marco = (
    <div
      data-pantalla={id}
      className={`flex flex-col overflow-hidden bg-crema ${captura ? '' : 'shadow-xl ring-1 ring-texto/20'} ${!captura && !web ? 'rounded-[28px]' : ''}`}
      style={{ width: ancho, height: alto }}
    >
      <header className={`flex shrink-0 items-center justify-between bg-blanco ${web ? 'h-16 px-10' : 'h-14 px-5'}`}>
        <Marca grande={web} />
        <div className="text-right text-sm text-texto/70">{contexto}</div>
      </header>
      <div className={`flex shrink-0 items-center bg-mallki font-semibold text-blanco ${web ? 'h-12 px-10 text-lg' : 'h-11 px-5 text-base'}`}>
        {volver && (
          <Link to={volver} aria-label="Volver" className="-ml-1 mr-1 text-blanco">
            <ChevronLeft size={web ? 24 : 22} />
          </Link>
        )}
        <span className="min-w-0 truncate">{titulo}</span>
        {escenario && (
          <span className={`ml-auto shrink-0 whitespace-nowrap rounded-full border border-dashed border-blanco/70 px-2 py-0.5 font-medium ${web ? 'text-xs' : 'text-[10px]'}`}>
            Escenario de simulación
          </span>
        )}
      </div>
      {subbarra}
      <main data-contenido className={`min-h-0 flex-1 overflow-hidden ${web ? 'px-10 py-6' : 'px-4 py-3'}`}>
        {children}
      </main>
      <Pie />
    </div>
  );

  if (captura || incrustada) return marco;

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-6">
      <div className="flex w-full max-w-[1440px] flex-wrap items-center gap-3 text-sm">
        <Link to="/" className="font-semibold text-mallki underline underline-offset-2">
          Índice
        </Link>
        <span className="text-texto/60">
          {info.id} {info.nombre} · {ancho} × {alto}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">{expositor}</div>
      </div>
      {marco}
    </div>
  );
}
