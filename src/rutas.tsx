// Registro de rutas: #/ (índice), #/m1-1 … #/m5-4 y #/simulacion.
// Cada módulo exporta sus pantallas en su index.ts; este archivo no cambia al construirlas.
import { Navigate, Route, Routes } from 'react-router-dom';
import { PANTALLAS } from './data/pantallas';
import { COMPONENTES } from './registro';
import { Simulacion } from './simulacion';
import { Indice } from './ui/Indice';

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
