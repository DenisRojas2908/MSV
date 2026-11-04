# Decisiones

## Decididas

- **D-01 · Monolito modular sin backend** (DP, 04/11/2026). El prototipo se presenta una vez y termina con el curso. La escalabilidad se argumenta con el diseño del MSV y con la separación por módulos (ver `ANALISIS.md` §8).
- **D-02 · Stack** (DP, 04/11/2026). Vite, React, TypeScript, Tailwind, Zustand, Vitest, Playwright, Inter local, `HashRouter`.
- **D-03 · Dinero en céntimos enteros con redondeo half-up por línea** (DP, 04/11/2026). Así 199.00 × 2.5 % = 4.98 y el pedido N.° 0042 cuadra en S/ 12.27.
- **D-04 · Nomenclatura S2-M1 … S2-M8 para los mecanismos** (DP, 04/11/2026), para no confundirlos con los módulos M1 a M5.
- **D-05 · SKU sin precio** (DP, confirmada el 04/11/2026): los SKU sin precio definido tienen sus ofertas vigentes durante toda la demo; solo vencen las 9 ofertas con fecha de §A.2. Coincide con §A.3.
- **D-06 · El DP construye el prototipo completo** (DP, 04/11/2026). Los demás integrantes monitorean, verifican y proponen cambios sobre lo construido; no hay módulos en HTML por separado. Si llegan bocetos o capturas de revisión del equipo, se suben a `docs/referencias/` y se tratan como observaciones, no como fuente de datos.
- **D-07 · Una sola sesión y rama** (DP, 04/11/2026). Claude Code trabaja en su rama asignada (`claude/bold-mendel-7xx6g7`) y, en cada checkpoint con pruebas en verde, integra en `main` y empuja las dos. Las reglas de carpetas por sesión de `PLAN.md` no aplican. Fases F0 a F6 en orden sin esperar aprobación; F7 con el subagente `auditor`.
- **D-08 · Estado inicial del pedido N.° 0042** (DP, 04/11/2026, era A1). El estado inicial tiene el pedido pagado. «Cargar pedido N.° 0042» lo devuelve a carrito para recorrer el flujo en vivo. En modo captura cada pantalla del M4 muestra la etapa de su ficha: M4-1 carrito, M4-2 confirmado con «Precio fijado», M4-3 pago, M4-4 pagado.
- **D-09 · Escenario E2** (DP, 04/11/2026, era A2). E2 pone el arroz de Wayna en S/ 198.00 (confirmación 08/11) y luego lo sube a S/ 210.00. Con 198 Wayna queda primero; con 210 baja al tercer lugar y aparece la alerta. Todo rotulado «Escenario de simulación».
- **D-10 · Umbral algedónico estricto** (DP, 04/11/2026, era A3): más de 1 % (> 1 %). Donde el lineamiento dice «desde 1 %», el texto visible dice «más de 1 %».
- **D-11 · Alerta de precio** (DP, 04/11/2026, era A4): solo con subidas; cualquier subida mayor a 0 %.
- **D-12 · Desempate del orden neutral** (DP, 04/11/2026, era A5): a igual precio, menor plazo de entrega; si sigue el empate, la confirmación más reciente. «¿Cómo ordenamos?» lo menciona en una línea.
- **D-13 · Formato de ventas y comisión del mes** (DP, 04/11/2026, era A6): sin decimales, tal cual §A.2 (S/ 186,400 / S/ 4,660). Todo lo demás con dos decimales.
- **D-14 · Comisión del mes calculada** (DP, 04/11/2026, era A7): se guardan las ventas del mes y la comisión se calcula (2.5 %); una prueba exige S/ 4,660.
- **D-15 · Reloj en minutos** (DP, 04/11/2026, era A8). Hora inicial 09/11/2026 09:00, que no se muestra. Los plazos se muestran como duración o como fecha.
- **D-16 · Estados por proveedor del pedido** (DP, 04/11/2026, era A9): «Confirmado», «Pagado», «Entregado» y «Reclamo abierto». Al 09/11 los tres muestran «Pagado» con su fecha de entrega (10/11 u 11/11).
- **D-17 · Colores** (DP, 04/11/2026, era A10): solo los 7 tokens de §A.4 y sus opacidades; la paleta por defecto de Tailwind se elimina.
- **D-18 · Modo captura** (DP, 04/11/2026, era A11): se reconoce `?captura=1` antes y después del `#`. En captura se ignora `localStorage` y se usa el estado inicial.
- **D-19 · Fechas** (DP, 04/11/2026, era A12): «03/11» (dd/mm) en las fechas de confirmación de ofertas; dd/mm/aaaa en todo lo demás.
- **D-20 · Formularios del M2** (DP, 04/11/2026). M2-1 y M2-2 muestran los campos sin dato con su placeholder (RUC, distritos de reparto, documentos sanitarios, stock referencial). Solo van llenos la razón social «Distribuidora Qhapaq» y la categoría «Abarrotes secos». No se inventan valores.
- **D-21 · Reclamo** (DP, 04/11/2026). Se compara con S/ 550 el subtotal del proveedor reclamado. El formulario tiene un texto libre «Describe el problema», sin lista de motivos. E5 se hace sobre Distribuidora Qhapaq (S/ 236.00, no escala).
- **D-22 · M5-3 (era P-04)** (DP, 04/11/2026). «30 % de la categoría» = participación en las ventas de la categoría; se muestra la regla con «—». Reclamos fuera de 48 h: 4 % (100 − 96), rotulado como derivado del 96 %. El 0.3 % se rotula «hoy» en M5-3; M5-1 usa el rótulo literal de §A.2. No se muestra ningún valor mensual.
- **D-23 · Indicadores bajo su meta** (DP, 04/11/2026): las metas son a seis meses; se muestra el avance («112 de 200 · meta a seis meses»), sin color de alerta.
- **D-24 · Reparto de alertas sin tope** (DP, 04/11/2026): no hay capacidades declaradas; las alternativas se muestran sin tope.
- **D-25 · Supuestos del semáforo** (DP, 04/11/2026): los 6 proveedores están activos; la escalada por cobertura (menos de 50 %) se mide por categoría; SKU 1 a 12 son abarrotes secos y 13 a 24 envases y empaques.
- **D-26 · Oferta vencida en el carrito** (DP, 04/11/2026): esa línea se bloquea con «Precio vencido: elige otra oferta».
- **D-27 · Precio nuevo = confirmación** (DP, 04/11/2026): un precio nuevo cuenta como confirmación y reinicia los 7 días.
- **D-28 · Texto del reparto en M4-4** (DP, 04/11/2026): se usa la frase de §A.2, «les paga S/ 478.33 en la liquidación semanal», sin fecha de liquidación.
- **D-29 · M5-4 (era P-05)** (DP, 04/11/2026): «Meta a seis meses» frente a «Logrado al mes 3», solo con datos existentes. U1: 200 / 112 compradores activos. U2: 50 / 31 proveedores activos. U3: 17 de 24 / 17 de 24 SKU en verde. Canal C4.
- **D-30 · Despliegue (era P-08)** (DP, 04/11/2026): GitHub Pages con GitHub Actions; la Action corre `npm test` antes de desplegar y no despliega si falla. Los 20 PNG se versionan en `capturas/`.
- **D-31 · Playwright** (DP, 04/11/2026): se instala en F6, no en F0.

## Pendientes del DP

Se usa el valor de «Mientras no se decida».

| Código | Antes de | Pregunta | Mientras no se decida |
|---|---|---|---|
| P-02 | F1 | ¿Solo los 3 SKU con precios (aceite, arroz, táper de 1 lb) abren comparador, o el DP define precios para más SKU? | Solo esos 3 abren comparador; el resto muestra su semáforo y qué proveedores lo ofrecen, sin precio |
| P-03 | F3 | Lista de distritos de Lima Centro para el registro | El campo muestra «Cercado de Lima» seleccionado, sin lista |
| P-06 | F5 | Valores de E3 (nuevo precio del aceite de Qhapaq) y E4 (porcentaje de error): ¿fijos o los escribe el expositor en vivo? | Los escribe el expositor; sin valor por defecto |
| P-07 | F5 | ¿Se agrega un escenario de campaña bloqueada por el semáforo (S2-M1)? No hay pantalla de campañas entre las 20 | No se agrega |
| P-09 | F6 | Nombres cortos de las capturas propuestos en `ESPECIFICACION.md` §B.1 | Se usan los propuestos |
| P-10 | F4 | Cómo se rotula la cobertura cuando está bajo la meta (70 %) pero sin cruzar la alerta del S3 (menos de 50 % en una categoría) | «Bajo la meta», en ámbar |
| P-11 | F2 | La casilla «Opción ecológica (Ley 30884)» solo aplica a envases, y M2 es de Distribuidora Qhapaq (abarrotes). ¿Se muestra M2-2 con un proveedor de envases para que la casilla salga en la captura? | M2-2 de Qhapaq, sin la casilla |
| P-12 | F3 | Lista habitual de Rosa en M1-2 | Marcados los tres SKU del pedido N.° 0042 |

## Observaciones para el DP

- M5-1 muestra el umbral literal de §A.2, «1 % en un día activa el canal algedónico (2 h)». D-10 dice que la regla es estricta (más de 1 %) y que donde el lineamiento dice «desde 1 %» se escribe «más de 1 %»; ese rótulo de §A.2 no dice «desde» y por la regla de oro 1 se copia tal cual. Si prefieres «Más de 1 % en un día…», se cambia en `src/data/tablero.ts:19`.

- Con los datos de la demo, envases y empaques tiene exactamente 50 % de cobertura (6 de 12 SKU en verde). Un SKU más que baje de verde dejaría esa categoría en alerta según el S3. Es un dato que el jurado podría notar.

## Registro de decisiones técnicas de Claude

(Claude Code agrega aquí cada decisión: fecha, qué, por qué, alternativa descartada.)

- **D-32 · Tailwind 3.4** (04/11/2026). `theme.colors` reemplaza la paleta completa: solo existen los 7 tokens (D-17). Descartado Tailwind 4: obliga a anular la paleta variable por variable.
- **D-33 · Vitest 3** (04/11/2026). Es la versión compatible con Vite 6; con Vitest 2 los tipos de la configuración no compilan.
- **D-34 · Cabecera** (04/11/2026). §A.4 pide la marca en verde arriba a la izquierda y el verde Mallki en la barra superior: la cabecera es blanca con «Mallki» en verde, y debajo va una barra verde con el título de la pantalla. Descartado: barra verde con la marca en blanco (contradice «en verde Mallki»).
- **D-35 · Números de pedido** (04/11/2026). «Cargar pedido N.° 0042» saca el 0042 de la lista de pedidos (y sus reclamos) y lo pone en el carrito con el mismo número; un carrito nuevo toma el siguiente número (0043).
- **D-36 · «Entregado»** (04/11/2026). La parte de un proveedor figura «Entregado» cuando el reloj alcanza pago + plazo (D-16). Con el reloj en 10/11 09:00 (E1), Qhapaq figura «Entregado».
- **D-37 · Calificación en décimas** (04/11/2026). 4.6 se guarda como 46 para comparar con 3.5 sin floats.
- **D-38 · Controles del expositor fuera del marco** (04/11/2026). Atajos como «Cargar pedido N.° 0042» se dibujan sobre el marco, no dentro, y nunca salen en capturas.
- **D-39 · Empate total en el orden** (04/11/2026). Si tras D-12 sigue el empate, se conserva el orden de §A.2 (orden estable). No ocurre con los datos de la demo.
- **D-40 · Porcentajes en puntos básicos** (04/11/2026). 0.3 % = 30 pb, para comparar con el umbral de 1 % sin floats.
- **D-41 · Montos sin «S/» en columnas** (04/11/2026). La tabla «Cómo se reparte tu pago» de M4-4 muestra los montos sin «S/» y con «S/» en el encabezado, como la tabla del pedido de §A.2; con «S/» en cada celda no cabe en 390 px. La frase de arriba repite S/ 490.60, S/ 12.27 y S/ 478.33 con «S/». Observado por el auditor como menor.
- **D-42 · Comparador solo para SKU con precio** (04/11/2026). `#/m3-2?sku=n` abre el SKU pedido si tiene ofertas con precio (P-02); si no, abre el aceite. Descartado: pantalla vacía o error.
- **D-43 · Reclamos y fechas de entrega** (04/11/2026). Un reclamo se abre desde M1-4 sobre la parte de un proveedor; se rotula «Escenario de simulación» (es el escenario E5). Las fechas de entrega se cuentan desde el pago (o la confirmación, si aún no se paga) más el plazo del proveedor.
- **D-44 · Lista habitual de M1-2** (04/11/2026). Las marcas iniciales se derivan de las líneas del pedido 0042 (P-12), no se escriben a mano. La lista se edita en la pantalla pero no se guarda en el store: no la usa ninguna regla.
- **D-45 · Catálogo de Qhapaq** (04/11/2026). En M2-2 los SKU de envases aparecen deshabilitados («fuera de tu categoría»), así la casilla ecológica nunca aparece para Qhapaq (P-11). «Guardar precio» solo actúa sobre las dos ofertas con precio; un precio nuevo cuenta como confirmación (D-27).

