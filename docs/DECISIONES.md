# Decisiones

## Decididas

- **D-01 · Monolito modular sin backend** (DP, 04/11/2026). El prototipo se presenta una vez y termina con el curso. La escalabilidad se argumenta con el diseño del MSV y con la separación por módulos (ver `ANALISIS.md` §8).
- **D-02 · Stack** (DP, 04/11/2026). Vite, React, TypeScript, Tailwind, Zustand, Vitest, Playwright, Inter local, `HashRouter`.
- **D-03 · Dinero en céntimos enteros con redondeo half-up por línea** (DP, 04/11/2026). Así 199.00 × 2.5 % = 4.98 y el pedido N.° 0042 cuadra en S/ 12.27.
- **D-04 · Nomenclatura S2-M1 … S2-M8 para los mecanismos** (DP, 04/11/2026), para no confundirlos con los módulos M1 a M5.
- **D-06 · El DP construye el prototipo completo** (DP, 04/11/2026). Los demás integrantes monitorean, verifican y proponen cambios sobre lo construido; no hay módulos en HTML por separado. Si llegan bocetos o capturas de revisión del equipo, se suben a `docs/referencias/` y se tratan como observaciones, no como fuente de datos.
- **D-05 · Supuesto técnico** (DP, por confirmar): los SKU sin precio definido tienen sus ofertas vigentes durante toda la demo; solo vencen las 9 ofertas con fecha de §A.2.

## Pendientes del DP

| Código | Antes de | Pregunta | Mientras no se decida |
|---|---|---|---|
| P-02 | F1 | ¿Solo los 3 SKU con precios (aceite, arroz, táper de 1 lb) abren comparador, o el DP define precios para más SKU? | Solo esos 3 abren comparador; el resto muestra su semáforo y qué proveedores lo ofrecen, sin precio |
| P-03 | F3 | Lista de distritos de Lima Centro para el registro | El campo muestra «Cercado de Lima» seleccionado, sin lista |
| P-04 | F4 | M5-3: ¿qué proveedor y categoría aparecen con 30 % o más, y cuántos reclamos fuera de 48 h? | Regla, umbral y «—» |
| P-05 | F4 | M5-4: lo comprometido y lo logrado por U1, U2 y U3 en el mes 3 | Estructura de la tabla con «—» |
| P-06 | F5 | Valores de E3 (nuevo precio del aceite de Qhapaq) y E4 (porcentaje de error): ¿fijos o los escribe el expositor en vivo? | Los escribe el expositor; sin valor por defecto |
| P-07 | F5 | ¿Se agrega un escenario de campaña bloqueada por el semáforo (S2-M1)? No hay pantalla de campañas entre las 20 | No se agrega |
| P-08 | F6 | Despliegue: repo público con GitHub Pages, o Vercel | Se prepara GitHub Pages; Vercel queda documentado en el README |
| P-09 | F6 | Nombres cortos de las capturas propuestos en `ESPECIFICACION.md` §B.1 | Se usan los propuestos |
| P-10 | F4 | Cómo se rotula la cobertura cuando está bajo la meta (70 %) pero sin cruzar la alerta del S3 (menos de 50 % en una categoría) | «Bajo la meta», en ámbar |
| P-11 | F2 | La casilla «Opción ecológica (Ley 30884)» solo aplica a envases, y M2 es de Distribuidora Qhapaq (abarrotes). ¿Se muestra M2-2 con un proveedor de envases para que la casilla salga en la captura? | M2-2 de Qhapaq, sin la casilla |
| P-12 | F3 | Lista habitual de Rosa en M1-2 | Marcados los tres SKU del pedido N.° 0042 |

## Observaciones para el DP

- Con los datos de la demo, envases y empaques tiene exactamente 50 % de cobertura (6 de 12 SKU en verde). Un SKU más que baje de verde dejaría esa categoría en alerta según el S3. Es un dato que el jurado podría notar.

## Registro de decisiones técnicas de Claude

(Claude Code agrega aquí cada decisión: fecha, qué, por qué, alternativa descartada.)
