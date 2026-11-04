// Tipos del dominio. Sin React: aquí solo hay datos y reglas.

/** Monto en céntimos enteros. S/ 118.00 = 11800. Nunca floats para dinero (D-03). */
export type Centimos = number;

/** Fecha calendario 'aaaa-mm-dd' en hora de Lima. */
export type FechaISO = string;

/**
 * Instante del reloj simulado, en minutos desde 1970-01-01 00:00 hora de Lima.
 * Lima está en UTC−5 todo el año (sin horario de verano), así que la hora de
 * pared se maneja directamente, sin conversiones de zona (D-15).
 */
export type Minutos = number;

/** Porcentaje en puntos básicos: 1 % = 100, 0.3 % = 30, 2.5 % = 250. */
export type PuntosBasicos = number;

export type Categoria = 'abarrotes' | 'envases';

export type ProveedorId = 'qhapaq' | 'inti' | 'wayna' | 'killa' | 'pacha' | 'ayni';

export type Color = 'verde' | 'ambar' | 'rojo';

export interface Comprador {
  id: 'sumaq';
  razonSocial: string;
  distrito: string;
  duena: string;
  whatsapp: string;
  ruc: string;
  tipoNegocio: string;
}

export interface Proveedor {
  id: ProveedorId;
  nombre: string;
  categoria: Categoria;
  /** Calificación en décimas: 4.6 = 46. */
  calificacionDecimas: number;
  plazoHoras: 24 | 48 | 72;
  /** §A.2: «Ninguno está en revisión»; D-25: los seis están activos. */
  activo: boolean;
}

export interface Sku {
  /** N.° de §A.2 (1 a 24). También es el orden de la lista. */
  n: number;
  nombre: string;
  presentacion: string;
  categoria: Categoria;
  ecologica: boolean;
  /** Proveedores que lo ofrecen según la columna «Semáforo» de §A.2. */
  ofertantes: ProveedorId[];
  /** Nombre en la tabla de ofertas de §A.2 (solo los 3 SKU con precio). */
  nombreOferta?: string;
  /** Nombre en el pedido N.° 0042 de §A.2. */
  nombrePedido?: string;
  /** Nombre dentro de una frase, como en las fichas M3-2 y M3-3. */
  nombreEnFrase?: string;
}

export interface Oferta {
  id: string;
  skuN: number;
  proveedorId: ProveedorId;
  precio: Centimos;
  confirmadaEl: FechaISO;
  /** Precio anterior, si el último cambio fue de precio (alerta S2-M6). */
  precioAnterior?: Centimos;
}

export interface LineaPedido {
  ofertaId: string;
  cantidad: number;
  /** Precio fijado al confirmar el pedido (S2-M5). Sin valor: aún en carrito. */
  precioFijado?: Centimos;
}

export interface Carrito {
  numero: string;
  lineas: LineaPedido[];
}

export type EtapaPedido = 'carrito' | 'confirmado' | 'pagado';

export interface Pedido {
  numero: string;
  fecha: FechaISO;
  etapa: Exclude<EtapaPedido, 'carrito'>;
  lineas: LineaPedido[];
  confirmadoEn: Minutos;
  pagadoEn?: Minutos;
}

export interface Reclamo {
  id: string;
  pedidoNumero: string;
  proveedorId: ProveedorId;
  descripcion: string;
  abiertoEn: Minutos;
}

export type EstadoProveedorPedido = 'Confirmado' | 'Pagado' | 'Entregado' | 'Reclamo abierto';
