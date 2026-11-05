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

- **D-55 · Rótulo del umbral algedónico (auditoría independiente #1)** (DP, 05/11/2026). §A.2 y M5-1 dicen «Más de 1 % de los pedidos de un día con precio distinto activa el canal algedónico». Criterio: el S3 entregado y D-10 mandan sobre el literal del lineamiento. El DP autorizó cambiar `ESPECIFICACION.md` §A.2; la prueba literal está en `tests/especificacion.test.ts`. Cierra la observación anterior sobre este rótulo.
- **D-56 · Comparador solo con ofertas vigentes (auditoría independiente #9)** (DP, 05/11/2026). M3-2 lista solo las ofertas vigentes («2 ofertas» en E1). Debajo va una línea gris: «La oferta de Abarrotes Wayna salió del comparador: precio no confirmado en 7 días.», rotulada como escenario. Reemplaza la parte de D-54 que listaba las ofertas «No disponible».
- **D-57 · «Alerta del S3» (auditoría independiente #20)** (DP, 05/11/2026). Una categoría ancla bajo 50 % se sigue rotulando «Alerta del S3». Para los reclamos, M5-3 conserva «Excepción al S3».
- **D-58 · Plazo de Qhapaq en M2-2** (DP, 05/11/2026). Se aprueba D-46: el plazo de 24 h se queda lleno en M2-2.
- **D-59 · Cierre de pendientes** (DP, 05/11/2026). Quedan decididos con su valor provisional:
  - P-02: solo los 3 SKU con precio abren el comparador.
  - P-03: «Cercado de Lima» seleccionado, sin lista.
  - P-06: los valores de E3 y E4 los escribe el expositor, sin valor por defecto (validados, D-62).
  - P-07: no se agrega el escenario de campaña.
  - P-09: se usan los nombres de captura de §B.1.
  - P-10: «Bajo la meta», en ámbar.
  - P-11: M2-2 de Qhapaq, sin la casilla.
  - P-12: marcados los tres SKU del pedido N.° 0042.

## Pendientes del DP

Ninguno.

## Observaciones para el DP

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
- **D-46 · Plazo lleno en M2-2** (04/11/2026). El campo «Plazo de entrega» de M2-2 muestra «24 h», que es dato de §A.2 (plazo de Qhapaq), no un valor inventado. D-20 enumera como vacíos RUC, distritos, documentos y stock. El auditor lo marcó como menor: si el DP prefiere placeholder, se cambia en `src/modules/m2-proveedor/M2_2Catalogo.tsx`.
- **D-47 · Un precio nuevo en vivo marca E3** (04/11/2026). `actualizarPrecio` registra el escenario E3, así M2-3, M5 y M3-3 rotulan «Escenario de simulación» cuando el expositor cambia un precio desde M2-2.
- **D-48 · Tabla de escenarios literal** (04/11/2026). `src/simulacion/escenarios.ts` copia la tabla de §F (qué hace el presentador y qué debe pasar) como texto de referencia; por eso la prueba de cifras escritas a mano lo exceptúa. Lo que el panel muestra como resultado se calcula con el dominio.
- **D-49 · Rótulo «Escenario de simulación»** (04/11/2026). Se dibuja con borde punteado gris, no en ámbar: §A.4 reserva el ámbar para el semáforo y las alertas (hallazgo menor del auditor de M5).
- **D-50 · Una sola etiqueta para E4** (04/11/2026). M5-1 y M5-3 dicen «Señal algedónica activa» cuando el precio distinto pasa de 1 %.
- **D-51 · Panel y pantallas en paralelo** (04/11/2026). El panel `#/simulacion` muestra las pantallas afectadas incrustadas y escaladas, con el mismo store. Si el expositor abre las pantallas en otra pestaña, ambas se sincronizan por `localStorage`.
- **D-52 · Acciones atómicas del store** (04/11/2026, auditoría F7 #1). Cada acción hace un solo `set()` con el cambio, su evento y la marca de escenario; el estado que llega de otra pestaña no se vuelve a guardar. Una prueba exige una sola actualización por escenario.
- **D-53 · Rótulo de escenario en la barra verde** (04/11/2026, auditoría F7 #2 y #3). Con cualquier escenario aplicado, todas las pantallas llevan «Escenario de simulación» en la barra verde. Las marcas puntuales (reclamo, retención, valor de E4) se conservan. En captura nunca aparece: el estado inicial no tiene escenarios.
- **D-54 · Ajustes menores de la auditoría F7** (04/11/2026; la parte de M3-2 la reemplaza D-56). M3-2 lista las ofertas «No disponible»; M1-4 permite elegir entre pedidos y M1-3 muestra el último; plurales de «proveedor»; los avisos de precio indican cuántos más hay; M5-3 toma el monto de cada reclamo de su propio pedido; espacios de no separación en «N.° 0042» del panel.
- **D-60 · Archivo único para la feria (auditoría independiente #16)** (DP, 05/11/2026). `npm run build:feria` usa `vite-plugin-singlefile` (librería autorizada por el DP) y genera `feria/mallki-demo.html`, con el JS, el CSS y la fuente Inter incrustados (1.46 MB). Abre con doble clic por `file://`, sin servidor ni internet. Verificado con Chromium sin red: 0 peticiones externas, Inter cargada y dos ventanas sincronizadas. El archivo se versiona para poder descargarlo desde GitHub. Descartado: un service worker para que GitHub Pages funcione sin conexión (más frágil y no resuelve el caso sin Node).
- **D-61 · Escalado en vivo (auditoría independiente #17)** (DP, 05/11/2026). Fuera de captura, `Pantalla` reduce el marco con `transform: scale` para que quepa en el ancho disponible; nunca lo agranda. Verificado de 360 a 1920 px sin scroll horizontal. Con `?captura=1` y en el panel no se aplica. Descartado: `overflow-x-auto`, porque obliga a desplazarse en la feria.
- **D-62 · Reglas de la auditoría independiente** (DP, 05/11/2026):
  - Un solo reclamo abierto por proveedor y pedido (`puedeAbrirReclamo`, #7).
  - Entradas validadas en `domain/entradas.ts`: precio mayor que 0 y porcentaje de 0 a 100 (#8).
  - Plazo propio de S2-M6: `PLAZO_CONCENTRACION_U2_H` (#22).
  - Estado de `localStorage` validado, con clave `mallki-demo-v2` (#12).
- **D-63 · Pantallas de la auditoría independiente** (DP, 05/11/2026):
  - M4-1: la línea vencida tiene «Elegir otra oferta» (la quita y abre M3-2 de ese SKU con la misma cantidad) y «Quitar» (#4). No hizo falta `cambiarCantidad`: la cantidad viaja al comparador.
  - M1-4: filtra los reclamos por el pedido elegido y no ofrece un proveedor que ya tiene reclamo (#5, #7); con un reclamo sobre S/ 550 dice «Tu reclamo pasa a revisión especial» (#19).
  - M3-3, M1-4 y M5-3: scroll interno con la cabecera fija (#13, #14).
  - M4-4: antes de pagar, muestra el último pedido pagado o «Aún no hay pedidos pagados» (#10).
  - M3-3: «Sin alternativas vigentes por ahora» (#21).
  - Constantes en lugar de «0042» y «N horas» en los módulos; `AYUDA_WHATSAPP_HORAS_HABILES` (#11).
- **D-64 · Pruebas y capturas de la auditoría independiente** (DP, 05/11/2026):
  - `tests/especificacion.test.ts` compara con literales toda la tabla de §A.2 y los 20 archivos de §B.1. Verificado: cambiar 14.50 por 14.05 hace fallar la prueba (#24).
  - Sin aserciones tautológicas (#23).
  - `textos.test.ts` detecta «0042» y «N horas» escritos a mano (#11).
  - `scripts/capturas.ts` detecta cortes en los cuatro bordes, texto truncado y listas con scroll interno (#25).
