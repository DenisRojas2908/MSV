# Cómo cambiar datos y textos

Para editar a mano desde GitHub (botón del lápiz en el archivo). Después de cambiar, la Action corre `npm test`: si una prueba falla, el cambio contradice una invariante de `CLAUDE.md` y no se despliega.

**Antes de cambiar un dato de §A.2, cámbialo en `docs/ESPECIFICACION.md`**: el código lo copia.

## Datos de la demo

| Qué | Archivo y línea |
|---|---|
| Fecha de la demo (09/11/2026) | `src/data/demo.ts:5` |
| Hora inicial (no se muestra) | `src/data/demo.ts:7` |
| Tipos de negocio del registro | `src/data/demo.ts:16` |
| Pie «Prototipo Mallki · datos de demostración» | `src/data/demo.ts:22` |
| Comprador: razón social, distrito, dueña, WhatsApp, RUC, tipo | `src/data/comprador.ts:6-11` |
| Proveedores (nombre, categoría, calificación en décimas, plazo) | `src/data/proveedores.ts:5-10` |
| SKU (nombre, presentación, ecológica, quién lo ofrece) | `src/data/skus.ts`, una línea por SKU en el orden de §A.2 |
| Precios y fechas de confirmación | `src/data/ofertas.ts:7-15` (precio con `soles('116.90')`, fecha `'2026-11-03'`) |
| Cantidades del pedido 0042 | `src/data/pedido0042.ts:6-8` |
| Rótulo del tablero | `src/data/tablero.ts:7` |
| Indicadores del tablero | `src/data/tablero.ts:10-22` |
| Nombres de los indicadores | `src/data/tablero.ts:25-34` |
| Nombres de archivo de las capturas | `src/data/pantallas.ts`, lista `PANTALLAS` |

## Reglas (umbrales)

Todas en `src/domain/reglas.ts`: vigencia 7 días (línea 5), por vencer 2 días (7), comisión 250 pb = 2.5 % (9), meta 17 de 24 (11), máximo 3 ofertas (14), 50 % por categoría (16), calificación 3.5 (18), señal algedónica 100 pb = 1 % (20), plazos 2 h / 24 h (21-22), reclamos 48 h / 24 h (26-27), S/ 550 (29), 5 % (31). Cambiar una regla puede hacer fallar una prueba a propósito: avísale al DP.

## Textos de pantallas

Se completa por módulo.
