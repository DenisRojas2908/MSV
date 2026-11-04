// M4-1 Carrito (§B.3 M4): pedido agrupado por proveedor, con subtotal y plazo. Total S/ 490.60.
import { useNavigate } from 'react-router-dom';
import { NUMERO_PEDIDO_EJEMPLO } from '../../data/demo';
import { lineasVencidas, proveedoresDelPedido } from '../../domain/pedido';
import { useDemo } from '../../store/demo';
import { useHoy, useResumenPedido } from '../../store/selectores';
import { Boton, Pantalla } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';
import { FilaTotal, GruposProveedor } from './GruposProveedor';
import { useCarritoVista } from './vista';

export function M4_1Carrito() {
  const carrito = useCarritoVista();
  const resumen = useResumenPedido(carrito?.lineas);
  const ofertas = useDemo((s) => s.ofertas);
  const cargar = useDemo((s) => s.cargarPedido0042);
  const confirmar = useDemo((s) => s.confirmarPedido);
  const hoy = useHoy();
  const navegar = useNavigate();
  const vencidas = carrito ? lineasVencidas(carrito.lineas, ofertas, hoy) : [];
  const n = carrito ? proveedoresDelPedido(carrito.lineas, ofertas).length : 0;

  return (
    <Pantalla
      id="M4-1"
      titulo="Carrito"
      contexto={<CabeceraComprador />}
      volver="/m3-1"
      expositor={<Boton variante="secundario" className="px-3 py-1.5 text-xs" onClick={cargar}>Cargar pedido N.° {NUMERO_PEDIDO_EJEMPLO}</Boton>}
    >
      {!carrito || !resumen ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-texto/70">Tu carrito está vacío.</p>
          <Boton a="/m3-1">Comparar precios</Boton>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-2.5">
          <div>
            <h1 className="text-lg font-bold">Pedido N.° {carrito.numero}</h1>
            <p className="text-xs text-texto/70">
              {n} {n === 1 ? 'proveedor' : 'proveedores'} · cada proveedor despacha lo suyo
            </p>
          </div>
          <GruposProveedor resumen={resumen} vencidas={vencidas} />
          <FilaTotal total={resumen.total} nota={`Un solo pago para ${n === 1 ? 'el proveedor' : `los ${n} proveedores`}`} />
          <Boton
            className="mt-auto w-full py-3.5 text-base"
            disabled={vencidas.length > 0}
            onClick={() => { if (confirmar()) navegar('/m4-2'); }}
          >
            Confirmar pedido
          </Boton>
        </div>
      )}
    </Pantalla>
  );
}
