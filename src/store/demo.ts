// Store único de la simulación (Zustand). Las reglas viven en src/domain;
// aquí solo se cambia el estado y se deja constancia en `eventos`.
import { create } from 'zustand';
import { NUMERO_PEDIDO_EJEMPLO } from '../data/demo';
import { LINEAS_PEDIDO_0042 } from '../data/pedido0042';
import { PROVEEDORES } from '../data/proveedores';
import { SKUS } from '../data/skus';
import { fechaDeInstante, instante } from '../domain/fechas';
import { buscarOferta, fijarPrecios, lineasVencidas, siguienteNumero } from '../domain/pedido';
import type { Centimos, FechaISO, Oferta, ProveedorId, PuntosBasicos } from '../domain/tipos';
import { esModoCaptura } from './captura';
import { estadoInicial, type DatosDemo, type EscenarioId } from './inicial';
import { borrar, CLAVE, guardar, leer } from './persistencia';

export interface AccionesDemo {
  /** M2-3: el proveedor confirma su precio; la vigencia vuelve a 7 días. */
  confirmarPrecio: (ofertaId: string) => void;
  /** Precio nuevo: cuenta como confirmación (D-27). Si sube, aparece la alerta (D-11). */
  actualizarPrecio: (ofertaId: string, nuevo: Centimos) => void;
  /** Para escenarios: reemplaza una oferta tal cual (E2 conserva la fecha 08/11). */
  reemplazarOferta: (oferta: Oferta) => void;
  agregarAlCarrito: (ofertaId: string, cantidad: number) => void;
  cambiarCantidad: (ofertaId: string, cantidad: number) => void;
  quitarDelCarrito: (ofertaId: string) => void;
  /** Atajo de la demo: deja el carrito exactamente como el pedido N.° 0042 (D-08). */
  cargarPedido0042: () => void;
  /** Fija los precios (S2-M5). Devuelve el número del pedido o null si hay líneas vencidas. */
  confirmarPedido: () => string | null;
  pagarPedido: (numero: string) => void;
  abrirReclamo: (numero: string, proveedorId: ProveedorId, descripcion: string) => void;
  fijarAhora: (fecha: FechaISO, hhmm?: string) => void;
  avanzarHoras: (horas: number) => void;
  fijarPrecioDistinto: (pb: PuntosBasicos) => void;
  marcarEscenario: (id: EscenarioId) => void;
  reiniciarDemo: () => void;
}

export type EstadoDemo = DatosDemo & AccionesDemo;

const captura = esModoCaptura();

function nombreOferta(o: Oferta): string {
  const sku = SKUS.find((s) => s.n === o.skuN);
  const prov = PROVEEDORES.find((p) => p.id === o.proveedorId);
  return `${sku?.nombre ?? ''} · ${prov?.nombre ?? ''}`;
}

export const useDemo = create<EstadoDemo>()((set, get) => {
  const evento = (texto: string, escenario?: EscenarioId) =>
    set((s) => ({ eventos: [{ en: s.ahora, texto, ...(escenario ? { escenario } : {}) }, ...s.eventos] }));
  const hoy = () => fechaDeInstante(get().ahora);

  return {
    ...((!captura && leer()) || estadoInicial()),

    confirmarPrecio: (ofertaId) => {
      set((s) => ({ ofertas: s.ofertas.map((o) => (o.id === ofertaId ? { ...o, confirmadaEl: hoy() } : o)) }));
      evento(`Precio confirmado: ${nombreOferta(buscarOferta(get().ofertas, ofertaId))}`);
    },

    actualizarPrecio: (ofertaId, nuevo) => {
      set((s) => ({
        ofertas: s.ofertas.map((o) =>
          o.id === ofertaId ? { ...o, precioAnterior: o.precio, precio: nuevo, confirmadaEl: hoy() } : o,
        ),
        // Un precio nuevo en vivo es el escenario E3 (§F): se rotula «Escenario de simulación».
        escenarios: s.escenarios.includes('E3') ? s.escenarios : [...s.escenarios, 'E3'],
      }));
      evento(`Precio nuevo: ${nombreOferta(buscarOferta(get().ofertas, ofertaId))}`);
    },

    reemplazarOferta: (oferta) =>
      set((s) => ({ ofertas: s.ofertas.map((o) => (o.id === oferta.id ? { ...oferta } : o)) })),

    agregarAlCarrito: (ofertaId, cantidad) =>
      set((s) => {
        const carrito = s.carrito ?? { numero: siguienteNumero(s.pedidos.map((p) => p.numero)), lineas: [] };
        const existe = carrito.lineas.some((l) => l.ofertaId === ofertaId);
        const lineas = existe
          ? carrito.lineas.map((l) => (l.ofertaId === ofertaId ? { ...l, cantidad: l.cantidad + cantidad } : l))
          : [...carrito.lineas, { ofertaId, cantidad }];
        return { carrito: { ...carrito, lineas } };
      }),

    cambiarCantidad: (ofertaId, cantidad) =>
      set((s) =>
        s.carrito
          ? { carrito: { ...s.carrito, lineas: s.carrito.lineas.map((l) => (l.ofertaId === ofertaId ? { ...l, cantidad } : l)) } }
          : {},
      ),

    quitarDelCarrito: (ofertaId) =>
      set((s) => {
        if (!s.carrito) return {};
        const lineas = s.carrito.lineas.filter((l) => l.ofertaId !== ofertaId);
        return { carrito: lineas.length ? { ...s.carrito, lineas } : null };
      }),

    cargarPedido0042: () => {
      set((s) => ({
        pedidos: s.pedidos.filter((p) => p.numero !== NUMERO_PEDIDO_EJEMPLO),
        reclamos: s.reclamos.filter((r) => r.pedidoNumero !== NUMERO_PEDIDO_EJEMPLO),
        carrito: { numero: NUMERO_PEDIDO_EJEMPLO, lineas: LINEAS_PEDIDO_0042.map((l) => ({ ...l })) },
      }));
      evento(`Pedido N.° ${NUMERO_PEDIDO_EJEMPLO} cargado en el carrito`);
    },

    confirmarPedido: () => {
      const s = get();
      if (!s.carrito || s.carrito.lineas.length === 0) return null;
      if (lineasVencidas(s.carrito.lineas, s.ofertas, hoy()).length > 0) return null;
      const numero = s.carrito.numero;
      set({
        carrito: null,
        pedidos: [
          ...s.pedidos.filter((p) => p.numero !== numero),
          { numero, fecha: hoy(), etapa: 'confirmado', lineas: fijarPrecios(s.carrito.lineas, s.ofertas), confirmadoEn: s.ahora },
        ],
      });
      evento(`Pedido N.° ${numero} confirmado: precio fijado`);
      return numero;
    },

    pagarPedido: (numero) => {
      set((s) => ({ pedidos: s.pedidos.map((p) => (p.numero === numero ? { ...p, etapa: 'pagado', pagadoEn: s.ahora } : p)) }));
      evento(`Pedido N.° ${numero} pagado en una sola operación`);
    },

    abrirReclamo: (numero, proveedorId, descripcion) => {
      set((s) => ({
        reclamos: [...s.reclamos, { id: `R-${s.reclamos.length + 1}`, pedidoNumero: numero, proveedorId, descripcion, abiertoEn: s.ahora }],
      }));
      const prov = PROVEEDORES.find((p) => p.id === proveedorId);
      evento(`Reclamo abierto: pedido N.° ${numero} · ${prov?.nombre ?? ''}`);
    },

    fijarAhora: (fecha, hhmm = '09:00') => set({ ahora: instante(fecha, hhmm) }),
    avanzarHoras: (horas) => set((s) => ({ ahora: s.ahora + horas * 60 })),
    fijarPrecioDistinto: (pb) => set({ precioDistintoHoyPb: pb }),
    marcarEscenario: (id) => set((s) => ({ escenarios: s.escenarios.includes(id) ? s.escenarios : [...s.escenarios, id] })),

    reiniciarDemo: () => {
      borrar();
      set(estadoInicial());
    },
  };
});

if (!captura) {
  useDemo.subscribe((s) => {
    const { ahora, ofertas, carrito, pedidos, reclamos, eventos, precioDistintoHoyPb, escenarios } = s;
    guardar({ ahora, ofertas, carrito, pedidos, reclamos, eventos, precioDistintoHoyPb, escenarios });
  });
}

// Si el panel de simulación y las pantallas están en pestañas distintas, se mantienen al día:
// cada pestaña escucha los cambios que la otra guarda en localStorage.
if (!captura && typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== CLAVE) return;
    useDemo.setState(e.newValue ? leer() ?? estadoInicial() : estadoInicial());
  });
}
