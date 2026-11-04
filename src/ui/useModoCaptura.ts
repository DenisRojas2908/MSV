// Hook: función de React que lee algo del entorno dentro de un componente.
// Aquí: si la URL tiene ?captura=1 (antes o después del #), se oculta todo lo que no es la pantalla.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { tieneCaptura } from '../store/captura';

export function useModoCaptura(): boolean {
  const loc = useLocation();
  const captura = tieneCaptura(window.location.search, `#${loc.pathname}${loc.search}`);
  useEffect(() => {
    document.body.classList.toggle('captura', captura);
  }, [captura]);
  return captura;
}
