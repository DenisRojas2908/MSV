// Estado inicial de la demo: lunes 09/11/2026, 09:00 (D-08, D-15).
import { FECHA_DEMO, HORA_INICIO, NUMERO_PEDIDO_EJEMPLO } from '../data/demo';
import { OFERTAS_INICIALES } from '../data/ofertas';
import { LINEAS_PEDIDO_0042 } from '../data/pedido0042';
import { TABLERO } from '../data/tablero';
import { instante } from '../domain/fechas';
import { fijarPrecios } from '../domain/pedido';
import type { Carrito, Minutos, Oferta, Pedido, PuntosBasicos, Reclamo } from '../domain/tipos';

export type EscenarioId = 'E1' | 'E2' | 'E3' | 'E4' | 'E5';

export interface Evento {
  en: Minutos;
  texto: string;
  escenario?: EscenarioId;
}

export interface DatosDemo {
  /** Reloj simulado en minutos. Ninguna regla usa la fecha del sistema. */
  ahora: Minutos;
  ofertas: Oferta[];
  carrito: Carrito | null;
  pedidos: Pedido[];
  reclamos: Reclamo[];
  eventos: Evento[];
  /** Pedidos del día con precio distinto al mostrado (E4 lo cambia). */
  precioDistintoHoyPb: PuntosBasicos;
  /** Escenarios aplicados, para rotular «Escenario de simulación». */
  escenarios: EscenarioId[];
}

export const INICIO: Minutos = instante(FECHA_DEMO, HORA_INICIO);

/** El pedido N.° 0042 tal como está al iniciar: pagado, con sus precios fijados. */
export function pedido0042Pagado(ofertas: readonly Oferta[] = OFERTAS_INICIALES): Pedido {
  return {
    numero: NUMERO_PEDIDO_EJEMPLO,
    fecha: FECHA_DEMO,
    etapa: 'pagado',
    lineas: fijarPrecios(LINEAS_PEDIDO_0042, ofertas),
    confirmadoEn: INICIO,
    pagadoEn: INICIO,
  };
}

export function estadoInicial(): DatosDemo {
  const ofertas = OFERTAS_INICIALES.map((o) => ({ ...o }));
  return {
    ahora: INICIO,
    ofertas,
    carrito: null,
    pedidos: [pedido0042Pagado(ofertas)],
    reclamos: [],
    eventos: [],
    precioDistintoHoyPb: TABLERO.precioDistintoHoyPb,
    escenarios: [],
  };
}
