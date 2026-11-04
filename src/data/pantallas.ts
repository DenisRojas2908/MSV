// §B.1 · Rutas, tamaños y archivos de captura de las 20 pantallas.
export type Dispositivo = 'celular' | 'web';

export interface PantallaInfo {
  id: string;
  modulo: 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
  nombre: string;
  ruta: string;
  dispositivo: Dispositivo;
  archivo: string;
}

export const TAMANOS: Record<Dispositivo, { ancho: number; alto: number }> = {
  celular: { ancho: 390, alto: 844 },
  web: { ancho: 1440, alto: 900 },
};

export const MODULOS: Record<PantallaInfo['modulo'], string> = {
  M1: 'Registro y onboarding del comprador',
  M2: 'Catálogo y precios del proveedor',
  M3: 'Comparador por SKU ancla',
  M4: 'Pedido a varios proveedores y pago',
  M5: 'Panel de indicadores y alertas',
};

function p(id: string, nombre: string, dispositivo: Dispositivo, corto: string): PantallaInfo {
  return {
    id,
    modulo: id.slice(0, 2) as PantallaInfo['modulo'],
    nombre,
    ruta: `/${id.toLowerCase()}`,
    dispositivo,
    archivo: `${id}_${corto}.png`,
  };
}

export const PANTALLAS: readonly PantallaInfo[] = [
  p('M1-1', 'Registro', 'celular', 'Registro'),
  p('M1-2', 'Onboarding', 'celular', 'Onboarding'),
  p('M1-3', 'Inicio', 'celular', 'Inicio'),
  p('M1-4', 'Mis pedidos y reclamos', 'celular', 'Pedidos'),
  p('M2-1', 'Registro', 'web', 'Registro'),
  p('M2-2', 'Catálogo', 'web', 'Catalogo'),
  p('M2-3', 'Confirmación de precios', 'web', 'Confirmacion'),
  p('M2-4', 'Panel', 'web', 'Panel'),
  p('M3-1', 'Buscador', 'celular', 'Buscador'),
  p('M3-2', 'Comparador', 'celular', 'Comparador'),
  p('M3-3', 'Alerta de precio', 'celular', 'Alerta'),
  p('M3-4', 'Semáforo', 'celular', 'Semaforo'),
  p('M4-1', 'Carrito', 'celular', 'Carrito'),
  p('M4-2', 'Confirmación', 'celular', 'Confirmacion'),
  p('M4-3', 'Pago', 'celular', 'Pago'),
  p('M4-4', 'Seguimiento', 'celular', 'Seguimiento'),
  p('M5-1', 'Tablero', 'web', 'Tablero'),
  p('M5-2', 'Semáforos', 'web', 'Semaforos'),
  p('M5-3', 'Alertas', 'web', 'Alertas'),
  p('M5-4', 'Compromisos', 'web', 'Compromisos'),
];

export function pantalla(id: string): PantallaInfo {
  const x = PANTALLAS.find((q) => q.id === id);
  if (!x) throw new Error(`Pantalla inexistente: ${id}`);
  return x;
}
