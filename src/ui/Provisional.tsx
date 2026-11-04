import { pantalla } from '../data/pantallas';
import { Pantalla } from './Pantalla';

/** Pantalla provisional de F0: marco, marca y pie, sin contenido. */
export function Provisional({ id }: { id: string }) {
  const info = pantalla(id);
  return (
    <Pantalla id={id} titulo={info.nombre}>
      <p className="text-sm text-texto/60">Pantalla en construcción.</p>
    </Pantalla>
  );
}
