// Constantes de las reglas (§A.1, §A.3, §C, §E). Cambiar una regla es cambiar aquí.
import type { Centimos, PuntosBasicos } from './tipos';

/** S2-M3: un precio es vigente si se confirmó en los últimos 7 días. */
export const VIGENCIA_DIAS = 7;
/** §A.3: «por vencer en 48 h» = 2 días restantes o menos. */
export const POR_VENCER_DIAS = 2;
/** §A.1: comisión de 2.5 % al proveedor por venta cerrada. */
export const COMISION_PB: PuntosBasicos = 250;
/** §A.1: meta de cobertura, 17 de 24 SKU con tres ofertas (70 % o más). */
export const META_COBERTURA_SKU = 17;
export const META_COBERTURA_PCT = 70;
/** S2-M1: 3 ofertas vigentes = verde; 2 = ámbar; 1 o 0 = rojo. */
export const OFERTAS_VERDE = 3;
export const OFERTAS_AMBAR = 2;
/** S2-M1: máximo de ofertas por SKU en el comparador. */
export const MAX_OFERTAS_POR_SKU = 3;
/** §D y D-25: alerta del S3 si una categoría ancla baja de 50 % de cobertura. */
export const UMBRAL_CATEGORIA_PCT = 50;
/** S2-M2: calificación menor a 3.5 pasa a revisión (en décimas). */
export const CALIFICACION_REVISION_DECIMAS = 35;
/** §E y D-10: más de 1 % de pedidos del día con precio distinto. */
export const UMBRAL_ALGEDONICO_PB: PuntosBasicos = 100;
export const PLAZO_ALGEDONICO_UNIDAD_H = 2;
export const PLAZO_ALGEDONICO_S3_H = 24;
/** S2-M5: 0.5 % o más en el mes escala al S3 (no se muestra valor mensual, D-22). */
export const UMBRAL_PRECIO_DISTINTO_MES_PB: PuntosBasicos = 50;
/** S2-M8: U1 cierra el reclamo en 48 h; U2 da su descargo en 24 h. */
export const PLAZO_RECLAMO_U1_H = 48;
export const PLAZO_DESCARGO_U2_H = 24;
/** S2-M8: reclamo sobre 0.1 UIT (S/ 550) es excepción al S3 (D-21: subtotal del proveedor). */
export const UMBRAL_RECLAMO_S3: Centimos = 55_000;
/** S2-M8: plazo incumplido en 5 % o más de los casos escala al S3. */
export const UMBRAL_RECLAMOS_FUERA_PCT = 5;
/** S2-M6: proveedor con 30 % o más de las ventas de una categoría (D-22). */
export const UMBRAL_CONCENTRACION_PCT = 30;
/** S2-M4: un cambio de criterios del ranking se avisa con 72 horas. */
export const AVISO_CAMBIO_CRITERIOS_H = 72;
