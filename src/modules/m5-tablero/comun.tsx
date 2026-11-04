// Piezas comunes del M5 (tablero del S3).
import type { ReactNode } from 'react';
import { ROTULO_TABLERO } from '../../data/tablero';
import type { ZonaCobertura } from '../../domain/semaforo';
import { useDemo } from '../../store/demo';
import { Etiqueta, Pantalla, Pestanas, RotuloEscenario, Semaforo } from '../../ui';

export function PantallaTablero({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  const escenario = useDemo((s) => s.escenarios.length > 0);
  return (
    <Pantalla
      id={id}
      titulo={titulo}
      contexto={
        <span className="flex items-center gap-3">
          {escenario && <RotuloEscenario />}
          <span>
            <span className="font-semibold text-texto">Sistema 3</span> · tablero de indicadores
          </span>
        </span>
      }
      subbarra={<Pestanas modulo="M5" activa={id} />}
    >
      <div className="flex h-full flex-col gap-5">
        <div><Etiqueta tono="neutro">{ROTULO_TABLERO}</Etiqueta></div>
        {children}
      </div>
    </Pantalla>
  );
}

const ZONA: Record<ZonaCobertura, { color: 'verde' | 'ambar' | 'rojo'; texto: string }> = {
  'dentro-meta': { color: 'verde', texto: 'Dentro de la meta' },
  'bajo-meta': { color: 'ambar', texto: 'Bajo la meta' },
  'alerta-s3': { color: 'rojo', texto: 'Alerta del S3' },
};

/** P-10: bajo la meta sin cruzar la alerta del S3 → «Bajo la meta», en ámbar. */
export function ZonaCob({ zona }: { zona: ZonaCobertura }) {
  return <Semaforo color={ZONA[zona].color} etiqueta={ZONA[zona].texto} />;
}
