// Registro de rutas: #/ (índice), #/m1-1 … #/m5-4 y #/simulacion.
// Cada módulo exporta sus pantallas en su index.ts; este archivo no cambia al construirlas.
import type { ComponentType } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PANTALLAS } from './data/pantallas';
import { PANTALLAS_M1 } from './modules/m1-registro';
import { PANTALLAS_M2 } from './modules/m2-proveedor';
import { PANTALLAS_M3 } from './modules/m3-comparador';
import { PANTALLAS_M4 } from './modules/m4-pedido-pago';
import { PANTALLAS_M5 } from './modules/m5-tablero';
import { Simulacion } from './simulacion';
import { Indice } from './ui/Indice';

const COMPONENTES: Record<string, ComponentType> = {
  ...PANTALLAS_M1,
  ...PANTALLAS_M2,
  ...PANTALLAS_M3,
  ...PANTALLAS_M4,
  ...PANTALLAS_M5,
};

export default function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Indice />} />
      {PANTALLAS.map((p) => {
        const C = COMPONENTES[p.id];
        return C ? <Route key={p.id} path={p.ruta} element={<C />} /> : null;
      })}
      <Route path="/simulacion" element={<Simulacion />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
