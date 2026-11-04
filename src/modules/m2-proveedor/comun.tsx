// Piezas comunes del M2 (Distribuidora Qhapaq).
import type { ReactNode } from 'react';
import { NOMBRE_CATEGORIA } from '../../data/demo';
import { PROVEEDOR_M2 } from '../../data/proveedores';
import { buscarProveedor } from '../../store/selectores';
import { Pantalla, Pestanas } from '../../ui';

export const QHAPAQ = buscarProveedor(PROVEEDOR_M2);

export function PantallaProveedor({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <Pantalla
      id={id}
      titulo={titulo}
      contexto={
        <span>
          <span className="font-semibold text-texto">{QHAPAQ.nombre}</span> · {NOMBRE_CATEGORIA[QHAPAQ.categoria]}
        </span>
      }
      subbarra={<Pestanas modulo="M2" activa={id} />}
    >
      {children}
    </Pantalla>
  );
}
