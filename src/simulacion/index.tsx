// Panel del presentador (§F): reloj, «Reiniciar demo» y los escenarios E1 a E5.
// Vista web separada; nunca aparece en las capturas. Las pantallas afectadas se ven
// en paralelo, incrustadas y con el mismo estado.
import { ExternalLink, RotateCcw } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FECHA_DEMO, NUMERO_PEDIDO_EJEMPLO } from '../data/demo';
import { pantalla, TAMANOS } from '../data/pantallas';
import { PROVEEDOR_M2 } from '../data/proveedores';
import { formatearFecha, fechaDeInstante } from '../domain/fechas';
import { esExcepcionS3, liquidacionRetenida, plazosReclamo } from '../domain/reclamos';
import { COMPONENTES } from '../registro';
import { useDemo } from '../store/demo';
import type { EscenarioId } from '../store/inicial';
import {
  buscarProveedor,
  useAlertas,
  useComparador,
  useHoy,
  usePedido,
  useResumenPedido,
  useResumenSemaforo,
  useTablero,
} from '../store/selectores';
import { Dinero, Fecha, Marca, NOMBRE_COLOR, ParametrosVista, Porcentaje, Semaforo, SoloMarco } from '../ui';
import {
  e1PrecioVencido,
  e2Antes,
  e2Subida,
  e3Disponible,
  e3PedidoNuevo,
  e3PrecioNuevo,
  e4PrecioDistinto,
  e5Reclamo,
  ESCENARIOS,
  leerMonto,
  leerPorcentaje,
  type Escenario,
} from './escenarios';

const ZONA = { 'dentro-meta': 'Dentro de la meta', 'bajo-meta': 'Bajo la meta', 'alerta-s3': 'Alerta del S3' } as const;

function Boton({ children, onClick, disabled, sec }: { children: ReactNode; onClick: () => void; disabled?: boolean; sec?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-40 ${sec ? 'bg-blanco text-mallki ring-1 ring-mallki' : 'bg-mallki text-blanco'}`}
    >
      {children}
    </button>
  );
}

function Dato({ k, children }: { k: string; children: ReactNode }) {
  return (
    <li className="flex justify-between gap-3 border-t border-texto/10 py-1">
      <span className="text-texto/60">{k}</span>
      <span className="text-right font-medium">{children}</span>
    </li>
  );
}

function Vista({ id, params }: { id: string; params?: Record<string, string> }) {
  const info = pantalla(id);
  const { ancho, alto } = TAMANOS[info.dispositivo];
  const escala = info.dispositivo === 'web' ? 42 / 100 : 60 / 100;
  const C = COMPONENTES[id];
  const ruta = `${info.ruta}${params?.sku ? `?sku=${params.sku}` : ''}`;
  if (!C) return null;
  return (
    <figure className="flex flex-col gap-1">
      <figcaption className="flex items-center justify-between text-xs">
        <span className="font-semibold">{info.id} {info.nombre}</span>
        <Link to={ruta} className="inline-flex items-center gap-1 text-mallki underline">
          Abrir <ExternalLink size={12} />
        </Link>
      </figcaption>
      <div className="pointer-events-none overflow-hidden rounded-lg ring-1 ring-texto/20" style={{ width: ancho * escala, height: alto * escala }}>
        <div style={{ width: ancho, height: alto, transform: `scale(${escala})`, transformOrigin: 'top left' }}>
          <SoloMarco.Provider value>
            <ParametrosVista.Provider value={params ?? {}}>
              <C />
            </ParametrosVista.Provider>
          </SoloMarco.Provider>
        </div>
      </div>
    </figure>
  );
}

function ControlesE1() {
  const hoy = useHoy();
  const sem = useResumenSemaforo();
  const aceite = useComparador(1);
  return (
    <>
      <Boton onClick={e1PrecioVencido} disabled={hoy !== FECHA_DEMO}>Avanzar el reloj al día siguiente</Boton>
      <ul className="mt-3 text-xs">
        <Dato k="Hoy"><Fecha f={hoy} /></Dato>
        <Dato k="Ofertas del aceite en el comparador">{aceite.length}</Dato>
        <Dato k="Semáforo del aceite">{sem.lista[0] && <Semaforo color={sem.lista[0].color} etiqueta={NOMBRE_COLOR[sem.lista[0].color]} />}</Dato>
        <Dato k="Cobertura">{sem.total.enVerde} de {sem.total.total} · <Porcentaje valor={sem.total.porcentaje} /></Dato>
        <Dato k="Zona en M5">{ZONA[sem.zona]}</Dato>
      </ul>
    </>
  );
}

function ControlesE2() {
  const arroz = useComparador(2);
  const alerta = useAlertas().find((a) => a.oferta.id === 'arroz-wayna');
  return (
    <>
      <div className="flex gap-2">
        <Boton sec onClick={e2Antes}>1 · Antes de la subida</Boton>
        <Boton onClick={e2Subida}>2 · Aplicar la subida</Boton>
      </div>
      <ul className="mt-3 text-xs">
        <Dato k="Orden del arroz">
          {arroz.map((c, i) => (
            <span key={c.oferta.id} className="block">
              {i + 1}. {c.proveedor.nombre} · <Dinero c={c.oferta.precio} />
            </span>
          ))}
        </Dato>
        <Dato k="Alerta">
          {alerta ? (
            <>subió <Porcentaje valor={alerta.variacion} /> · {alerta.alternativas.length} alternativas</>
          ) : (
            'Sin alerta'
          )}
        </Dato>
      </ul>
    </>
  );
}

function ControlesE3() {
  const [texto, setTexto] = useState('');
  const monto = leerMonto(texto);
  const pedido = usePedido(NUMERO_PEDIDO_EJEMPLO);
  const resumen = useResumenPedido(pedido?.lineas);
  const aceite = useComparador(1).find((c) => c.oferta.id === 'aceite-qhapaq');
  const t = useTablero();
  const disponible = useDemo(() => e3Disponible());
  const linea = resumen?.grupos.find((g) => g.proveedor.id === PROVEEDOR_M2)?.lineas[0];
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-1 rounded-lg bg-blanco px-2 py-1.5 text-sm ring-1 ring-texto/20">
          S/
          <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="nuevo precio" className="w-28 bg-transparent outline-none" inputMode="decimal" />
        </label>
        <Boton onClick={() => monto !== null && e3PrecioNuevo(monto)} disabled={monto === null || !disponible}>Aplicar precio nuevo</Boton>
        <Boton sec onClick={e3PedidoNuevo}>Pedido nuevo con 1 aceite</Boton>
      </div>
      {!disponible && <p className="mt-2 text-xs text-texto/70">El pedido N.° {NUMERO_PEDIDO_EJEMPLO} está en el carrito: confírmalo primero.</p>}
      <ul className="mt-3 text-xs">
        <Dato k={`Aceite en el pedido N.° ${NUMERO_PEDIDO_EJEMPLO}`}>{linea ? <><Dinero c={linea.precioUnitario} /> · fijado</> : '—'}</Dato>
        <Dato k="Precio actual de Qhapaq">{aceite ? <Dinero c={aceite.oferta.precio} /> : '—'}</Dato>
        <Dato k="Precio distinto al mostrado"><Porcentaje pb={t.precioDistintoHoyPb} /></Dato>
      </ul>
    </>
  );
}

function ControlesE4() {
  const [texto, setTexto] = useState('');
  const pb = leerPorcentaje(texto);
  const t = useTablero();
  return (
    <>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1 rounded-lg bg-blanco px-2 py-1.5 text-sm ring-1 ring-texto/20">
          <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="porcentaje del día" className="w-36 bg-transparent outline-none" inputMode="decimal" />
          <span className="text-texto/60">por ciento</span>
        </label>
        <Boton onClick={() => pb !== null && e4PrecioDistinto(pb)} disabled={pb === null}>Aplicar</Boton>
      </div>
      <ul className="mt-3 text-xs">
        <Dato k="Pedidos de hoy con precio distinto"><Porcentaje pb={t.precioDistintoHoyPb} /></Dato>
        <Dato k="Señal algedónica">
          {t.senal.activa ? <Semaforo color="rojo" etiqueta={`Activa · unidad ${t.senal.plazoUnidadHoras} h · S3 ${t.senal.plazoS3Horas} h`} /> : 'Sin señal'}
        </Dato>
      </ul>
    </>
  );
}

function ControlesE5() {
  const [texto, setTexto] = useState('');
  const reclamos = useDemo((s) => s.reclamos);
  const pedido = usePedido(NUMERO_PEDIDO_EJEMPLO);
  const resumen = useResumenPedido(pedido?.lineas);
  const r = reclamos.find((x) => x.proveedorId === PROVEEDOR_M2 && x.pedidoNumero === NUMERO_PEDIDO_EJEMPLO);
  const sub = resumen?.grupos.find((g) => g.proveedor.id === PROVEEDOR_M2)?.subtotal ?? 0;
  const nombre = buscarProveedor(PROVEEDOR_M2).nombre;
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Describe el problema"
          className="min-w-0 flex-1 rounded-lg bg-blanco px-2 py-1.5 text-sm ring-1 ring-texto/20 outline-none"
        />
        <Boton onClick={() => e5Reclamo(texto.trim())} disabled={!pedido || Boolean(r)}>Abrir reclamo a {nombre}</Boton>
      </div>
      <ul className="mt-3 text-xs">
        <Dato k="Monto reclamado (subtotal)"><Dinero c={sub} /></Dato>
        <Dato k="Liquidación del proveedor">{pedido && liquidacionRetenida(reclamos, pedido.numero, PROVEEDOR_M2) ? 'Retenida' : 'Sin retención'}</Dato>
        <Dato k="Cierre de U1">{r ? <Fecha f={fechaDeInstante(plazosReclamo(r).cierreU1)} /> : '—'}</Dato>
        <Dato k="Descargo de U2">{r ? <Fecha f={fechaDeInstante(plazosReclamo(r).descargoU2)} /> : '—'}</Dato>
        <Dato k="Excepción al S3">{esExcepcionS3(sub) ? 'Sí' : 'No'}</Dato>
      </ul>
    </>
  );
}

const CONTROLES: Record<EscenarioId, () => JSX.Element> = { E1: ControlesE1, E2: ControlesE2, E3: ControlesE3, E4: ControlesE4, E5: ControlesE5 };

function TarjetaEscenario({ e, activo, elegir }: { e: Escenario; activo: boolean; elegir: () => void }) {
  const aplicado = useDemo((s) => s.escenarios.includes(e.id));
  const C = CONTROLES[e.id];
  return (
    <section className={`rounded-xl bg-blanco p-4 ring-1 ${activo ? 'ring-2 ring-mallki' : 'ring-texto/10'}`}>
      <button type="button" onClick={elegir} className="flex w-full items-start justify-between gap-2 text-left">
        <span>
          <span className="text-xs font-semibold text-texto/50">{e.id} · {e.mecanismo}</span>
          <span className="block text-base font-bold">{e.nombre}</span>
        </span>
        {aplicado && (
          <span className="whitespace-nowrap rounded-full border border-dashed border-texto/40 px-2 py-0.5 text-xs">Escenario de simulación</span>
        )}
      </button>
      {activo && (
        <div className="mt-2">
          <p className="text-xs text-texto/70"><span className="font-semibold">Qué hace:</span> {e.accion}.</p>
          <p className="mt-1 text-xs text-texto/70"><span className="font-semibold">Qué debe pasar:</span> {e.esperado}.</p>
          <p className="mt-1 text-[11px] text-texto/50">Origen: {e.origen}</p>
          <div className="mt-3"><C /></div>
        </div>
      )}
    </section>
  );
}

export function Simulacion() {
  const hoy = useHoy();
  const reiniciar = useDemo((s) => s.reiniciarDemo);
  const eventos = useDemo((s) => s.eventos);
  const [activo, setActivo] = useState<EscenarioId>('E1');
  const escenario = ESCENARIOS.find((e) => e.id === activo)!;

  return (
    <div className="min-h-screen bg-crema">
      <header className="flex items-center gap-4 border-b border-texto/10 bg-blanco px-8 py-3">
        <Marca grande />
        <span className="text-sm font-semibold">Panel de simulación</span>
        <span className="text-xs text-texto/60">Vista del expositor · no aparece en las capturas</span>
        <span className="ml-auto text-sm">Hoy: <span className="font-semibold"><Fecha f={hoy} /></span></span>
        <button type="button" onClick={reiniciar} className="inline-flex items-center gap-1.5 rounded-lg bg-mallki px-3 py-2 text-sm font-semibold text-blanco">
          <RotateCcw size={14} /> Reiniciar demo
        </button>
        <Link to="/" className="text-sm text-mallki underline">Índice</Link>
      </header>
      <div className="grid grid-cols-[480px_1fr] gap-6 p-6">
        <div className="flex flex-col gap-3">
          {ESCENARIOS.map((e) => (
            <TarjetaEscenario key={e.id} e={e} activo={e.id === activo} elegir={() => setActivo(e.id)} />
          ))}
          <section className="rounded-xl bg-blanco p-4 text-xs ring-1 ring-texto/10">
            <h2 className="font-semibold">Eventos</h2>
            {eventos.length === 0 ? (
              <p className="mt-1 text-texto/60">Sin cambios desde el {formatearFecha(FECHA_DEMO)}.</p>
            ) : (
              <ul className="mt-1 space-y-0.5">
                {eventos.slice(0, 8).map((ev, i) => (
                  <li key={i}><Fecha f={fechaDeInstante(ev.en)} /> · {ev.texto}</li>
                ))}
              </ul>
            )}
          </section>
        </div>
        <section>
          <h2 className="mb-3 text-sm font-semibold">Pantallas afectadas por {escenario.id} · {escenario.nombre}</h2>
          <div className="flex flex-wrap items-start gap-5">
            {escenario.pantallas.map((p) => (
              <Vista key={`${p.id}-${p.params?.sku ?? ''}`} id={p.id} params={p.params} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
