// Pruebas literales de ESPECIFICACION.md §A.2 y §B.1 (regla de oro 1).
// Cada fila está copiada de la especificación: una errata en src/data hace fallar esta prueba.
import { describe, expect, it } from 'vitest';
import { COMPRADOR } from '../src/data/comprador';
import { OFERTAS_INICIALES } from '../src/data/ofertas';
import { LINEAS_PEDIDO_0042 } from '../src/data/pedido0042';
import { PANTALLAS, TAMANOS } from '../src/data/pantallas';
import { PROVEEDORES } from '../src/data/proveedores';
import { SKUS } from '../src/data/skus';
import { NOMBRES_INDICADORES, ROTULO_TABLERO, TABLERO } from '../src/data/tablero';
import { formatearSoles } from '../src/domain/dinero';
import { formatearDiaMes } from '../src/domain/fechas';
import { formatearCalificacion } from '../src/domain/umbrales';

describe('§A.2 · tablas literales', () => {
  it('comprador', () => {
    expect([COMPRADOR.razonSocial, COMPRADOR.distrito, COMPRADOR.duena, COMPRADOR.whatsapp, COMPRADOR.ruc]).toEqual([
      'Pollería Sumaq',
      'Cercado de Lima',
      'Rosa Quispe',
      '+51 9 * 321',
      '20000012345',
    ]);
  });

  it('los 6 proveedores: categoría, calificación y plazo', () => {
    expect(PROVEEDORES.map((p) => [p.nombre, p.categoria, formatearCalificacion(p.calificacionDecimas), `${p.plazoHoras} h`])).toEqual([
      ['Distribuidora Qhapaq', 'abarrotes', '4.6', '24 h'],
      ['Comercial Inti', 'abarrotes', '4.2', '48 h'],
      ['Abarrotes Wayna', 'abarrotes', '3.9', '72 h'],
      ['Envases Killa', 'envases', '4.5', '24 h'],
      ['Empaques Pacha', 'envases', '4.1', '48 h'],
      ['Descartables Ayni', 'envases', '3.8', '72 h'],
    ]);
  });

  it('los 24 SKU ancla: nombre, presentación y ecológica', () => {
    expect(SKUS.map((s) => [s.n, s.nombre, s.presentacion, s.ecologica ? 'Sí' : ''])).toEqual([
      [1, 'Aceite vegetal', 'Balde de 18 L', ''],
      [2, 'Arroz extra', 'Saco de 50 kg', ''],
      [3, 'Azúcar rubia', 'Saco de 50 kg', ''],
      [4, 'Harina sin preparar', 'Saco de 50 kg', ''],
      [5, 'Sal de mesa yodada', 'Saco de 25 kg', ''],
      [6, 'Lenteja', 'Saco de 50 kg', ''],
      [7, 'Fideo spaghetti', 'Caja de 20 × 500 g', ''],
      [8, 'Leche evaporada', 'Caja de 48 × 400 g', ''],
      [9, 'Mayonesa', 'Galonera de 3.8 kg', ''],
      [10, 'Manteca vegetal', 'Caja de 20 kg', ''],
      [11, 'Levadura seca instantánea', 'Caja de 20 × 500 g', ''],
      [12, 'Café tostado molido', 'Bolsa de 1 kg', ''],
      [13, 'Táper de polipropileno 1 lb con tapa', 'Paquete de 50', ''],
      [14, 'Táper de polipropileno 32 oz con tapa', 'Paquete de 25', ''],
      [15, 'Envase de bagazo 1 lb con bisagra', 'Paquete de 50', 'Sí'],
      [16, 'Vaso de papel 12 oz', 'Paquete de 50', 'Sí'],
      [17, 'Tapa para vaso de 12 oz', 'Paquete de 50', ''],
      [18, 'Bolsa de papel kraft con asa', 'Paquete de 100', 'Sí'],
      [19, 'Bolsa de papel kraft sin asa', 'Paquete de 100', 'Sí'],
      [20, 'Caja de cartón para pollo a la brasa (1/4)', 'Paquete de 100', 'Sí'],
      [21, 'Caja de cartón para torta 20 × 20 cm', 'Paquete de 25', 'Sí'],
      [22, 'Tenedor de madera', 'Paquete de 100', 'Sí'],
      [23, 'Servilleta de papel', 'Paquete de 300', ''],
      [24, 'Papel aluminio 30 cm', 'Rollo de 100 m', ''],
    ]);
  });

  it('quién ofrece los SKU que no están en verde', () => {
    const corto = (id: string) => PROVEEDORES.find((p) => p.id === id)!.nombre.split(' ').pop();
    const no3 = SKUS.filter((s) => s.ofertantes.length < 3).map((s) => [s.n, s.ofertantes.map(corto).join(' y ')]);
    expect(no3).toEqual([
      [11, 'Qhapaq y Inti'],
      [15, 'Killa y Pacha'],
      [16, 'Killa y Ayni'],
      [17, 'Killa y Ayni'],
      [21, 'Killa'],
      [22, 'Pacha'],
      [24, 'Pacha y Ayni'],
    ]);
  });

  it('las 9 ofertas: SKU, proveedor, precio y confirmación', () => {
    const nombre = (n: number) => SKUS.find((s) => s.n === n)!.nombreOferta;
    const prov = (id: string) => PROVEEDORES.find((p) => p.id === id)!.nombre;
    expect(
      OFERTAS_INICIALES.map((o) => [nombre(o.skuN), prov(o.proveedorId), formatearSoles(o.precio), formatearDiaMes(o.confirmadaEl)]),
    ).toEqual([
      ['Aceite vegetal, balde de 18 L', 'Abarrotes Wayna', 'S/ 116.90', '03/11'],
      ['Aceite vegetal, balde de 18 L', 'Distribuidora Qhapaq', 'S/ 118.00', '07/11'],
      ['Aceite vegetal, balde de 18 L', 'Comercial Inti', 'S/ 121.50', '05/11'],
      ['Arroz extra, saco de 50 kg', 'Comercial Inti', 'S/ 199.00', '06/11'],
      ['Arroz extra, saco de 50 kg', 'Distribuidora Qhapaq', 'S/ 205.00', '07/11'],
      ['Arroz extra, saco de 50 kg', 'Abarrotes Wayna', 'S/ 210.00', '08/11'],
      ['Táper de polipropileno 1 lb, paquete de 50', 'Empaques Pacha', 'S/ 13.90', '06/11'],
      ['Táper de polipropileno 1 lb, paquete de 50', 'Envases Killa', 'S/ 14.50', '08/11'],
      ['Táper de polipropileno 1 lb, paquete de 50', 'Descartables Ayni', 'S/ 15.20', '04/11'],
    ]);
    expect(OFERTAS_INICIALES.map((o) => o.confirmadaEl.slice(0, 4))).toEqual(Array(9).fill('2026'));
    expect(formatearSoles(OFERTAS_INICIALES.find((o) => o.id === 'arroz-wayna')!.precioAnterior!)).toBe('S/ 198.00');
  });

  it('pedido N.° 0042: producto y cantidad', () => {
    const o = (id: string) => OFERTAS_INICIALES.find((x) => x.id === id)!;
    expect(LINEAS_PEDIDO_0042.map((l) => [SKUS.find((s) => s.n === o(l.ofertaId).skuN)!.nombrePedido, l.cantidad])).toEqual([
      ['Aceite vegetal 18 L', 2],
      ['Arroz extra 50 kg', 1],
      ['Táper PP 1 lb × 50', 4],
    ]);
  });

  it('tablero de demostración: indicadores, valores y metas', () => {
    expect(ROTULO_TABLERO).toBe('Datos de demostración · mes 3 del piloto');
    expect(Object.values(NOMBRES_INDICADORES)).toEqual([
      'Compradores activos',
      'Proveedores activos',
      'Cobertura del comparador',
      'Recompra a 60 días',
      'Precios vigentes',
      'Reclamos cerrados en 48 h',
      'Pedidos con precio distinto al mostrado',
      'Ventas del mes / comisión del mes',
    ]);
    expect([TABLERO.compradoresActivos, TABLERO.metaCompradores, TABLERO.proveedoresActivos, TABLERO.metaProveedores]).toEqual([112, 200, 31, 50]);
    expect([TABLERO.recompra60DiasPct, TABLERO.preciosVigentesPct, TABLERO.reclamosCerradosEn48hPct, TABLERO.precioDistintoHoyPb]).toEqual([34, 93, 96, 30]);
    expect([TABLERO.metaCoberturaTexto, TABLERO.metaRecompraTexto]).toEqual(['70 % o más', '30 % o más']);
    // D-55: rótulo actualizado por el DP en §A.2.
    expect(TABLERO.metaPrecioDistintoTexto).toBe('Más de 1 % de los pedidos de un día con precio distinto activa el canal algedónico');
    expect(formatearSoles(TABLERO.ventasDelMes, { sinDecimales: true })).toBe('S/ 186,400');
  });
});

describe('§B.1 · rutas, tamaños y archivos', () => {
  it('las 20 pantallas con su archivo de captura literal', () => {
    expect(PANTALLAS.map((p) => [p.ruta, `${TAMANOS[p.dispositivo].ancho} × ${TAMANOS[p.dispositivo].alto}`, p.archivo])).toEqual([
      ['/m1-1', '390 × 844', 'M1-1_Registro.png'],
      ['/m1-2', '390 × 844', 'M1-2_Onboarding.png'],
      ['/m1-3', '390 × 844', 'M1-3_Inicio.png'],
      ['/m1-4', '390 × 844', 'M1-4_Pedidos.png'],
      ['/m2-1', '1440 × 900', 'M2-1_Registro.png'],
      ['/m2-2', '1440 × 900', 'M2-2_Catalogo.png'],
      ['/m2-3', '1440 × 900', 'M2-3_Confirmacion.png'],
      ['/m2-4', '1440 × 900', 'M2-4_Panel.png'],
      ['/m3-1', '390 × 844', 'M3-1_Buscador.png'],
      ['/m3-2', '390 × 844', 'M3-2_Comparador.png'],
      ['/m3-3', '390 × 844', 'M3-3_Alerta.png'],
      ['/m3-4', '390 × 844', 'M3-4_Semaforo.png'],
      ['/m4-1', '390 × 844', 'M4-1_Carrito.png'],
      ['/m4-2', '390 × 844', 'M4-2_Confirmacion.png'],
      ['/m4-3', '390 × 844', 'M4-3_Pago.png'],
      ['/m4-4', '390 × 844', 'M4-4_Seguimiento.png'],
      ['/m5-1', '1440 × 900', 'M5-1_Tablero.png'],
      ['/m5-2', '1440 × 900', 'M5-2_Semaforos.png'],
      ['/m5-3', '1440 × 900', 'M5-3_Alertas.png'],
      ['/m5-4', '1440 × 900', 'M5-4_Compromisos.png'],
    ]);
  });
});
