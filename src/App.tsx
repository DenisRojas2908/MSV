// HashRouter: las rutas viven después del # (#/m1-1), así funciona en hosting estático.
import { HashRouter } from 'react-router-dom';
import Rutas from './rutas';

export default function App() {
  return (
    <HashRouter>
      <Rutas />
    </HashRouter>
  );
}
