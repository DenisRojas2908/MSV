// M4-3 Pago (§B.3 M4, §B.4 M4): medios genéricos sin marcas, comprobante electrónico,
// un solo pago. La comisión no aparece como cargo al comprador.
import { Building2, Check, CreditCard, FileText, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPRADOR } from '../../data/comprador';
import { totalComprador } from '../../domain/pedido';
import { useDemo } from '../../store/demo';
import { useResumenPedido } from '../../store/selectores';
import { Boton, Dinero, Pantalla, Tarjeta } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';
import { usePedidoVista } from './vista';

const MEDIOS = [
  { id: 'tarjeta', nombre: 'Tarjeta', Icono: CreditCard },
  { id: 'transferencia', nombre: 'Transferencia', Icono: Building2 },
  { id: 'billetera', nombre: 'Billetera digital', Icono: Wallet },
] as const;

export function M4_3Pago() {
  const pedido = usePedidoVista('confirmado');
  const resumen = useResumenPedido(pedido?.lineas);
  const pagar = useDemo((s) => s.pagarPedido);
  const navegar = useNavigate();
  const [medio, setMedio] = useState<string>('tarjeta');

  if (!pedido || !resumen) {
    return (
      <Pantalla id="M4-3" titulo="Pago" contexto={<CabeceraComprador />} volver="/m4-2">
        <p className="text-sm text-texto/70">No hay un pedido por pagar.</p>
      </Pantalla>
    );
  }
  const total = totalComprador(resumen);
  const pagado = pedido.etapa === 'pagado';

  return (
    <Pantalla id="M4-3" titulo="Pago" contexto={<CabeceraComprador />} volver="/m4-2">
      <div className="flex h-full flex-col gap-3">
        <Tarjeta className="px-4 py-3 text-center">
          <p className="text-xs text-texto/70">Pedido N.° {pedido.numero} · un solo pago</p>
          <p className="mt-0.5 text-3xl font-bold"><Dinero c={total} /></p>
          <ul className="mt-2 space-y-0.5 text-left text-xs text-texto/70">
            {resumen.grupos.map((g) => (
              <li key={g.proveedor.id} className="flex justify-between">
                <span>{g.proveedor.nombre}</span>
                <Dinero c={g.subtotal} />
              </li>
            ))}
          </ul>
        </Tarjeta>

        <section>
          <h2 className="mb-1.5 text-sm font-semibold">Medio de pago</h2>
          <ul className="divide-y divide-texto/10 rounded-xl bg-blanco ring-1 ring-texto/10">
            {MEDIOS.map(({ id, nombre, Icono }) => (
              <li key={id}>
                <button type="button" onClick={() => setMedio(id)} className="flex w-full items-center gap-3 px-3.5 py-3 text-left text-sm">
                  <Icono size={18} className="text-texto/70" />
                  <span className="flex-1">{nombre}</span>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full ${medio === id ? 'bg-mallki text-blanco' : 'ring-1 ring-texto/30'}`}>
                    {medio === id && <Check size={13} />}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex gap-3 rounded-xl bg-blanco px-3.5 py-3 ring-1 ring-texto/10">
          <FileText size={18} className="mt-0.5 shrink-0 text-texto/70" />
          <p className="text-sm">
            <span className="block font-semibold">Comprobante electrónico</span>
            <span className="text-xs text-texto/70">
              A nombre de {COMPRADOR.razonSocial} · RUC {COMPRADOR.ruc}
            </span>
          </p>
        </section>

        <p className="text-xs text-texto/70">La comisión de Mallki la paga cada proveedor. No se suma a tu pago.</p>

        {pagado ? (
          <Boton a="/m4-4" variante="secundario" className="mt-auto w-full py-3.5 text-base">Pago registrado · ver seguimiento</Boton>
        ) : (
          <Boton className="mt-auto w-full py-3.5 text-base" onClick={() => { pagar(pedido.numero); navegar('/m4-4'); }}>
            <span>Pagar</span>
            <Dinero c={total} />
          </Boton>
        )}
      </div>
    </Pantalla>
  );
}
