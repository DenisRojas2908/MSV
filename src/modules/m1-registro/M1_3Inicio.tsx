// M1-3 Inicio (§B.3 M1): accesos a Comparar, Mis pedidos y Reclamos; «Ayuda por WhatsApp»
// con «Respondemos en menos de 4 horas hábiles». Aviso de alerta de precio (§B.2).
import { BellRing, ChevronRight, MessageCircle, MessageSquareWarning, Package, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPRADOR } from '../../data/comprador';
import { AYUDA_WHATSAPP_HORAS_HABILES } from '../../data/demo';
import { useDemo } from '../../store/demo';
import { useAlertas, useResumenPedido } from '../../store/selectores';
import { Dinero, Pantalla, Porcentaje } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';

const ACCESOS = [
  { a: '/m3-1', titulo: 'Comparar', texto: 'Compara precios de insumos, de menor a mayor', Icono: Search },
  { a: '/m1-4', titulo: 'Mis pedidos', texto: 'Estado y entrega de cada proveedor', Icono: Package },
  { a: '/m1-4', titulo: 'Reclamos', texto: 'Abre un reclamo sobre un pedido', Icono: MessageSquareWarning },
] as const;

export function M1_3Inicio() {
  const alertas = useAlertas();
  const alerta = alertas[0];
  const pedidos = useDemo((s) => s.pedidos);
  const pedido = pedidos[pedidos.length - 1] ?? null;
  const resumen = useResumenPedido(pedido?.lineas);
  const nombre = COMPRADOR.duena.split(' ')[0];

  return (
    <Pantalla id="M1-3" titulo="Inicio" contexto={<CabeceraComprador />}>
      <div className="flex h-full flex-col gap-3">
        <h1 className="text-xl font-bold">Hola, {nombre}</h1>

        {alerta && (
          <Link to="/m3-3" className="flex items-center gap-2.5 rounded-xl bg-ambar/15 px-3.5 py-3 ring-1 ring-ambar/50">
            <BellRing size={20} className="shrink-0 text-ambar" />
            <span className="text-sm leading-snug">
              <span className="font-semibold">Aviso de precio:</span> {alerta.sku.nombre} de {alerta.proveedor.nombre} subió{' '}
              <Porcentaje valor={alerta.variacion} />.{alertas.length > 1 && ` Y ${alertas.length - 1} ${alertas.length === 2 ? 'aviso' : 'avisos'} más.`} Ver alternativas
            </span>
            <ChevronRight size={18} className="ml-auto shrink-0" />
          </Link>
        )}

        <ul className="flex flex-col gap-2">
          {ACCESOS.map(({ a, titulo, texto, Icono }) => (
            <li key={titulo}>
              <Link to={a} className="flex items-center gap-3.5 rounded-xl bg-blanco px-4 py-3.5 ring-1 ring-texto/10">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mallki/10 text-mallki">
                  <Icono size={20} />
                </span>
                <span>
                  <span className="block font-semibold">{titulo}</span>
                  <span className="block text-xs text-texto/60">{texto}</span>
                </span>
                <ChevronRight size={18} className="ml-auto text-texto/40" />
              </Link>
            </li>
          ))}
        </ul>

        {pedido && resumen && (
          <Link to="/m1-4" className="rounded-xl bg-blanco px-4 py-3 ring-1 ring-texto/10">
            <span className="block text-xs text-texto/60">Último pedido</span>
            <span className="flex items-baseline justify-between">
              <span className="font-semibold">Pedido N.° {pedido.numero}</span>
              <span className="font-semibold"><Dinero c={resumen.total} /></span>
            </span>
            <span className="block text-xs text-texto/60">{resumen.grupos.length} {resumen.grupos.length === 1 ? 'proveedor' : 'proveedores'} · un solo pago</span>
          </Link>
        )}

        <div className="mt-auto rounded-xl bg-mallki/10 p-3.5 text-center">
          <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-mallki py-3 font-semibold text-blanco">
            <MessageCircle size={18} /> Ayuda por WhatsApp
          </button>
          <p className="mt-1.5 text-xs text-texto/70">Respondemos en menos de {AYUDA_WHATSAPP_HORAS_HABILES} horas hábiles.</p>
        </div>
      </div>
    </Pantalla>
  );
}
