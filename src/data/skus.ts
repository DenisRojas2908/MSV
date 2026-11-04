// §A.2 · Los 24 SKU ancla, en su orden. `ofertantes` sale de la columna «Semáforo»:
// «Verde» = los tres proveedores de su categoría. Categoría: 1 a 12 abarrotes, 13 a 24 envases (D-25).
import type { ProveedorId, Sku } from '../domain/tipos';

const ABARROTES: ProveedorId[] = ['qhapaq', 'inti', 'wayna'];
const ENVASES: ProveedorId[] = ['killa', 'pacha', 'ayni'];

export const SKUS: readonly Sku[] = [
  { n: 1, nombre: 'Aceite vegetal', presentacion: 'Balde de 18 L', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES,
    nombreOferta: 'Aceite vegetal, balde de 18 L', nombrePedido: 'Aceite vegetal 18 L', nombreEnFrase: 'aceite vegetal de 18 L' },
  { n: 2, nombre: 'Arroz extra', presentacion: 'Saco de 50 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES,
    nombreOferta: 'Arroz extra, saco de 50 kg', nombrePedido: 'Arroz extra 50 kg', nombreEnFrase: 'arroz extra de 50 kg' },
  { n: 3, nombre: 'Azúcar rubia', presentacion: 'Saco de 50 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 4, nombre: 'Harina sin preparar', presentacion: 'Saco de 50 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 5, nombre: 'Sal de mesa yodada', presentacion: 'Saco de 25 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 6, nombre: 'Lenteja', presentacion: 'Saco de 50 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 7, nombre: 'Fideo spaghetti', presentacion: 'Caja de 20 × 500 g', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 8, nombre: 'Leche evaporada', presentacion: 'Caja de 48 × 400 g', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 9, nombre: 'Mayonesa', presentacion: 'Galonera de 3.8 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 10, nombre: 'Manteca vegetal', presentacion: 'Caja de 20 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 11, nombre: 'Levadura seca instantánea', presentacion: 'Caja de 20 × 500 g', categoria: 'abarrotes', ecologica: false, ofertantes: ['qhapaq', 'inti'] },
  { n: 12, nombre: 'Café tostado molido', presentacion: 'Bolsa de 1 kg', categoria: 'abarrotes', ecologica: false, ofertantes: ABARROTES },
  { n: 13, nombre: 'Táper de polipropileno 1 lb con tapa', presentacion: 'Paquete de 50', categoria: 'envases', ecologica: false, ofertantes: ENVASES,
    nombreOferta: 'Táper de polipropileno 1 lb, paquete de 50', nombrePedido: 'Táper PP 1 lb × 50', nombreEnFrase: 'táper de polipropileno 1 lb' },
  { n: 14, nombre: 'Táper de polipropileno 32 oz con tapa', presentacion: 'Paquete de 25', categoria: 'envases', ecologica: false, ofertantes: ENVASES },
  { n: 15, nombre: 'Envase de bagazo 1 lb con bisagra', presentacion: 'Paquete de 50', categoria: 'envases', ecologica: true, ofertantes: ['killa', 'pacha'] },
  { n: 16, nombre: 'Vaso de papel 12 oz', presentacion: 'Paquete de 50', categoria: 'envases', ecologica: true, ofertantes: ['killa', 'ayni'] },
  { n: 17, nombre: 'Tapa para vaso de 12 oz', presentacion: 'Paquete de 50', categoria: 'envases', ecologica: false, ofertantes: ['killa', 'ayni'] },
  { n: 18, nombre: 'Bolsa de papel kraft con asa', presentacion: 'Paquete de 100', categoria: 'envases', ecologica: true, ofertantes: ENVASES },
  { n: 19, nombre: 'Bolsa de papel kraft sin asa', presentacion: 'Paquete de 100', categoria: 'envases', ecologica: true, ofertantes: ENVASES },
  { n: 20, nombre: 'Caja de cartón para pollo a la brasa (1/4)', presentacion: 'Paquete de 100', categoria: 'envases', ecologica: true, ofertantes: ENVASES },
  { n: 21, nombre: 'Caja de cartón para torta 20 × 20 cm', presentacion: 'Paquete de 25', categoria: 'envases', ecologica: true, ofertantes: ['killa'] },
  { n: 22, nombre: 'Tenedor de madera', presentacion: 'Paquete de 100', categoria: 'envases', ecologica: true, ofertantes: ['pacha'] },
  { n: 23, nombre: 'Servilleta de papel', presentacion: 'Paquete de 300', categoria: 'envases', ecologica: false, ofertantes: ENVASES },
  { n: 24, nombre: 'Papel aluminio 30 cm', presentacion: 'Rollo de 100 m', categoria: 'envases', ecologica: false, ofertantes: ['pacha', 'ayni'] },
];
