# Análisis del proyecto

## 1. Contexto

- **Curso:** Modelo del Sistema Viable (SI801), FIIS-UNI, ciclo 2026-II. Docente: Ing. Javier Tolentino Canchano Caro.
- **Equipo de Proyecto N.° 2**, cinco integrantes. Director de Proyecto (DP): Denis Rojas.
- **Proyecto:** Mallki: Organización Viable y Marketplace B2B de Insumos para las MYPE Gastronómicas de Lima Centro.
- **Ya entregado:** diagnóstico de viabilidad, diseño del Sistema 1 (tres unidades: U1 Comprador, U2 Proveedor, U3 Analítica y Riesgo), del Sistema 2 (ocho mecanismos de coordinación) y del Sistema 3 con S3* (cuadro de mando, asignación de recursos, auditoría y canal algedónico). El S4 y el S5 están en curso: **no se simulan**.
- **Fechas que mandan sobre este repo:**

| Fecha | Hito |
|---|---|
| 09/11/2026 | Fecha de los datos de la demo (lunes) |
| 13/11/2026 | Cierre de los pantallazos de los cinco módulos; el equipo envía la inscripción |
| 15/11/2026 | Cierre de inscripción a la feria |
| 16/11/2026 | Mismos archivos en el Univirtual; desde aquí, prototipo navegable integrado |
| 28/11/2026 | Prototipo casi final |
| 01/12/2026 | Simulacro de la exposición |
| 02 y 03/12/2026 | Correcciones del simulacro y demo final |
| 04/12/2026 | Feria |

## 2. Qué es Mallki

Mallki es un marketplace B2B asset-light que permite a las MYPE gastronómicas de Lima Centro comparar precios de insumos no perecibles y comprar a varios proveedores en un solo pedido. Mallki es el producto; la organización que lo lanza se diseña con el Modelo del Sistema Viable: sus unidades operativas, su coordinación, su control, su inteligencia y su identidad se diseñan antes de operar.

## 3. Qué es este repositorio

Una **simulación** de Mallki con datos de demostración, que sirve para tres cosas:

1. **Capturas.** Las 20 pantallas (cinco módulos, cuatro pantallas cada uno) se exportan en PNG con el tamaño y el nombre exactos. Van a las diapositivas, al artículo, al video y al banner. Es el uso más urgente: hay plazo hasta el 13/11.
2. **Prototipo navegable.** En la exposición y en el stand se recorre el pedido N.° 0042 de punta a punta: Rosa compara, arma un pedido a tres proveedores, paga una sola vez y ve cómo se reparte su pago.
3. **Modo simulación.** Un panel del presentador dispara escenarios (vencimiento de un precio, alerta de precio, precio fijado, reclamo, error masivo de precios) y muestra cómo reaccionan las reglas del S2 y el tablero del S3. Esto es lo que separa a Mallki de «una tienda en línea más»: se ve la organización viable funcionando, no solo el catálogo.

## 4. Quién lo usa en la demo

| Rol | Vista | Dispositivo | Módulos |
|---|---|---|---|
| Rosa Quispe, dueña de la Pollería Sumaq (comprador) | Comprador | Celular 390 × 844 | M1, M3, M4 |
| Distribuidora Qhapaq (proveedor) | Proveedor | Web 1440 × 900 | M2 |
| Fundador 5, titular del S3 | Tablero | Web 1440 × 900 | M5 |
| Expositor del equipo | Panel de simulación | Web | Escenarios E1 a E5 |

## 5. Público y criterio de éxito

- **Jurado de la feria y docente.** Tienen pocos minutos. Tienen que entender en una pantalla que el comparador es neutral, que hay tres ofertas por producto y que la comisión la paga el proveedor.
- **El propio equipo.** Las capturas tienen que coincidir con el artículo, las diapositivas y el video: mismos nombres, mismos precios, mismos números.
- **Éxito:** ningún número contradice a otro entre las 20 pantallas y los documentos; el pedido N.° 0042 cuadra al céntimo; nada de la lista «Lo que no va» aparece; el docente reconoce los mecanismos del S2 y el tablero del S3 que ya se le entregaron.

## 6. Relación entre módulos y MSV

| Módulo | Pantallas | Unidad o sistema del MSV | Mecanismos del S2 que se ven |
|---|---|---|---|
| M1 Registro y onboarding del comprador | M1-1 a M1-4 | U1 Comprador | S2-M8 (reclamo en 48 h) |
| M2 Catálogo y precios del proveedor | M2-1 a M2-4 | U2 Proveedor | S2-M2 (curaduría), S2-M3 (vigencia), S2-M8 (descargo en 24 h) |
| M3 Comparador por SKU ancla | M3-1 a M3-4 | U3 Analítica y Riesgo | S2-M1 (semáforo), S2-M4 (orden neutral y aviso), S2-M6 (alertas y alternativas) |
| M4 Pedido a varios proveedores y pago | M4-1 a M4-4 | Pagos y facturación (servicio compartido del S3) con U1 | S2-M5 (precio fijado), S2-M8 (retención) |
| M5 Panel de indicadores y alertas | M5-1 a M5-4 | S3 (cuadro de mando y C4), reglas del S2, canal algedónico | S2-M1, S2-M3, S2-M5, S2-M6, S2-M8 |

## 7. Alcance

**Dentro**

- Las 20 pantallas de `ESPECIFICACION.md` §B, con los datos de §A.
- El flujo del pedido N.° 0042, navegable y con estado: confirmar fija el precio; pagar genera el reparto.
- Las reglas del S2 que tienen pantalla, calculadas en el dominio.
- El tablero con los 8 indicadores de la demo.
- El modo simulación con los escenarios E1 a E5.
- Generación automática de las 20 capturas y despliegue en una URL estática.

**Fuera**

- Backend, base de datos, login real, pasarela real, correos o mensajes reales.
- Otros compradores o proveedores en pantalla (el tablero muestra totales de plataforma, pero no lista a nadie más).
- Perecibles, Lima Metropolitana, app nativa.
- El S4 y el S5 (no están diseñados todavía).
- Los 7 indicadores del cuadro de mando del S3 que no están en la demo.

## 8. Por qué monolito, si nos pidieron escalabilidad

- El prototipo se presenta una vez y termina con el curso. Un backend agrega riesgo (caídas, credenciales, internet de la feria) y ningún valor visible para el jurado.
- La escalabilidad que evalúa el curso es la de la **organización**: un S1 que crece por unidades autónomas y la recursividad del MSV. Eso está en los documentos del S1 al S3, no en el código.
- Aun así, el prototipo es un **monolito modular**: cada módulo es una frontera que coincide con una unidad del MSV, y las reglas viven en un dominio puro separado de la interfaz. Si Mallki operara, cada módulo podría pasar a un servicio propio sin reescribir las reglas.
- **Respuesta corta para el jurado:** «El prototipo es una simulación en un solo bloque porque su función es demostrar el diseño. Está dividido igual que la organización: cada módulo corresponde a una unidad, y por eso podría separarse cuando Mallki opere».

## 9. Riesgos y cómo se controlan

| Riesgo | Control |
|---|---|
| La IA inventa datos plausibles (precios de otros SKU, distritos, cifras) | Regla de oro 2 de `CLAUDE.md`, `PENDIENTE` en `DECISIONES.md`, auditoría F7 |
| Montos que no cuadran por usar floats | Céntimos enteros, redondeo half-up por línea, pruebas del pedido N.° 0042 |
| Confundir el módulo M1 con el mecanismo M1 del S2 | Convención `S2-M1` … `S2-M8` en código y documentos |
| Textos que suenan a IA o a publicidad | Tono sobrio en `CLAUDE.md`; el DP revisa los textos visibles en cada fase |
| Capturas con tamaño, escala o fuente distinta | Playwright con viewport exacto, `deviceScaleFactor: 1`, Inter local, `?captura=1` |
| Playwright no puede descargar Chromium en la nube | Correr `npm run capturas` en la computadora del DP |
| Contradecir lo ya entregado (S1 a S3, diapositivas) | `ESPECIFICACION.md` manda; cualquier cambio lo decide el DP |
| Cambios del equipo que contradicen la especificación | El DP construye todo (D-06); el equipo verifica y sus observaciones pasan por el DP antes de entrar al código |
| Dos sesiones de Claude Code editando lo mismo | `src/data` y `src/domain` se congelan después de F0; cada sesión tiene sus carpetas (ver `PLAN.md`) |
