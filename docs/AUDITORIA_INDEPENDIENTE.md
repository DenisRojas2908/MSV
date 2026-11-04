# Auditoría independiente

Hecha el 04/11/2026 por un auditor que no escribió el código y no corrigió nada. Fuente de verdad: `docs/ESPECIFICACION.md` y las decisiones D-xx de `docs/DECISIONES.md`. `docs/AUDITORIA.md` y `docs/BITACORA.md` no se leyeron hasta cerrar la auditoría.

Método: lectura completa de `src/`, `tests/` y `scripts/`; `npm test` (74 de 74), `npm run build` y `npm run capturas` (20 de 20, byte a byte iguales a las versionadas); recorrido con Playwright sobre `dist/` servido con `vite preview` de las 20 rutas, los escenarios E1 a E5 desde `#/simulacion`, los bordes pedidos y las condiciones de la feria. Los scripts de prueba quedaron fuera del repo.

## Resumen

1. **Capturas del 13/11: listas.** Los 20 PNG tienen nombre y tamaño exactos, salen idénticos al regenerarlos, usan Inter local y no tienen texto truncado, cortes ni elementos del panel. Los datos de §A.2 están correctos en todas.
2. **Feria: apta, sin hallazgos que bloqueen.** E1 a E5 dan exactamente lo de §F, y también los bordes: 1 % no activa la señal, 1.01 % sí; S/ 550.00 no escala, S/ 550.02 sí.
3. Los 7 hallazgos para corregir aparecen **solo en vivo y fuera del guion**: un carrito que queda bloqueado, contenido cortado en M3-3, reclamos mezclados entre pedidos y las pantallas web cortadas en laptops de 1366 px.
4. **Sin internet hay que llevar un servidor local:** `dist/index.html` no abre con doble clic, y `GUIA_DEMO.md` da a entender que no hace falta nada.
5. Una contradicción visible en M5-1 al probar E4 con 1 % exacto necesita decisión del DP. Las pruebas son literales en lo esencial, pero no cubren 3 precios ni 4 fechas de §A.2.

## Las 10 correcciones más importantes

1. **Plan sin internet** (#16). Escribir en `GUIA_DEMO.md` cómo levantar `dist/` con un servidor local; las instrucciones están en la sección «Cómo abrir la demo sin internet». Con la URL de GitHub Pages, cualquier recarga sin conexión deja la pestaña en blanco.
2. **Carrito bloqueado por una oferta vencida** (#4). M4-1 dice «Precio vencido: elige otra oferta», pero no hay forma de quitar esa línea. `quitarDelCarrito` y `cambiarCantidad` existen en el store y ninguna pantalla los usa.
3. **M5-1 contradice a E4 en el borde** (#1). Con 1 % exacto, M5-1 muestra «1 %» junto a «1 % en un día activa el canal algedónico (2 h)» y no hay señal. La guía de la demo pide mostrar justamente ese borde. Decisión del DP (ver la observación en `DECISIONES.md`).
4. **M3-3 se corta con dos alertas** (#13). Después de E3 con un precio mayor que 118.00 aparecen dos alertas, y la segunda pierde una alternativa y el botón, sin scroll. Además, E3 genera una alerta S2-M6 que §F no menciona y la guía no explica (#6).
5. **M1-4 mezcla los reclamos de todos los pedidos** (#5). Con el pedido N.° 0043 elegido aparece «Reclamo a Distribuidora Qhapaq … queda retenido» (que es del 0042), mientras Qhapaq figura «Pagado». El umbral de S/ 550 se compara con el subtotal del pedido equivocado.
6. **Pantallas web cortadas a la izquierda** (#17). En viewports de menos de 1488 px, unos 37 px del borde izquierdo de M2 y M5 quedan fuera y no se alcanzan con scroll (laptop de 1366 × 768). En un celular, el tablero queda inaccesible por la izquierda.
7. **localStorage con otra forma deja la pantalla en blanco** (#12). Si falta un campo, como `escenarios`, todas las pantallas y el panel quedan en blanco; solo `#/` funciona. Validar lo leído o cambiar la clave, y avisarlo en la guía.
8. **Reclamos duplicados y cortes en M1-4 y M5-3** (#7, #14). Se puede abrir otro reclamo sobre el mismo proveedor y pedido. Con 3 o más reclamos, M5-3 se corta y M1-4 se desplaza y esconde la cabecera del pedido.
9. **Vocabulario del S3 y comparador** (#20, #9). El DP debe decidir entre «Alerta del S3» y «Excepción al S3» para una categoría bajo 50 % (§D), y si M3-2 debe listar las ofertas «No disponible» (§A.3 dice que salen del comparador; D-54 es una decisión técnica, no del DP).
10. **Pruebas y literales** (#23, #24, #11). Agregar aserciones literales para S/ 121.50, S/ 14.50, S/ 15.20 y las fechas 05/11, 06/11, 06/11 y 08/11, y para los nombres de los 24 SKU y los 20 archivos. Sacar de los componentes los «48 horas» y «0042» escritos a mano.

## Tabla de hallazgos

Áreas: 1 datos · 2 reglas · 3 textos · 4 código · 5 capturas · 6 demo en la feria · 7 coherencia con el MSV.

| N.° | Área | Pantalla o archivo | Qué hay | Qué debería haber | Severidad | Cómo verificarlo |
|---|---|---|---|---|---|---|
| 1 | 1, 7 | M5-1 (`src/data/tablero.ts:19`) y M5-3 | El mismo umbral dice dos cosas: M5-1 «1 % en un día activa el canal algedónico (2 h)» y M5-3 «Más de 1 % de los pedidos de un día con precio distinto activa el canal algedónico». Con E4 = 1, M5-1 muestra «1 %», ese rótulo y ninguna señal. | Un solo criterio visible. D-10 manda «más de 1 %»; la regla de oro 1 manda copiar §A.2. Lo decide el DP (ya figura como observación en `DECISIONES.md`). | corregir | `#/simulacion` → E4 → escribir `1` → Aplicar → abrir `#/m5-1`. |
| 2 | 2 | E1 a E5 | Todos dan el resultado de §F. E1: 2 ofertas, aceite en ámbar, 16 de 24 (67 %), «Bajo la meta». E2: con 198 Wayna va primero; con 210 queda tercero, con alerta de 6 %, Inti S/ 199.00 y Qhapaq S/ 205.00. E3: el 0042 conserva S/ 118.00, el pedido 0043 usa el precio nuevo y el indicador sigue en 0.3 %. E4: «1», «1.0», «1,00» y «0.99» sin señal; «1.01» y «1,5» con señal, 2 h y 24 h. E5: retención, cierre 11/11, descargo 10/11, «No escala». | §F, D-09, D-10, D-21 | conforme | Panel `#/simulacion`, escenario por escenario. |
| 3 | 2 | Bordes | 0 días restantes: «No disponible» (Wayna al 10/11; Qhapaq al 14/11 con «0 días» en M2-3). Reclamo de S/ 550.00 (2 × S/ 275.00): «No escala». S/ 550.02: «Excepción al S3» y «Monto sobre el umbral: pasa al S3.». Reloj al 11/11: 15 de 24 (63 %); envases 5 de 12; táper de Ayni «No disponible». | §A.3, §C S2-M8 («superara S/ 550»), §D | conforme | E3 con 275 o 275.01 → comparar 2 aceites de Qhapaq → confirmar, pagar y reclamar en M1-4. Para el 11/11, sumar 1440 a `ahora` en localStorage. |
| 4 | 2 | M4-1 (`GruposProveedor.tsx:43`; `store/demo.ts:103` y `:110`) | Una línea con oferta vencida muestra «Precio vencido: elige otra oferta» y desactiva «Confirmar pedido». No hay ningún control para quitarla o cambiarla, y agregar otra oferta no la desbloquea. Solo salen de ahí «Cargar pedido N.° 0042» o «Reiniciar demo». | D-26: la línea se bloquea, pero Rosa tiene que poder «elegir otra oferta». | corregir | M3-2 → «Agregar al pedido» en Wayna → panel E1 → `#/m4-1`. |
| 5 | 2 | M1-4 (`M1_4Pedidos.tsx:86-99`) | La lista de reclamos no filtra por el pedido elegido. Con el N.° 0043 aparece «Reclamo a Distribuidora Qhapaq… El pago a Distribuidora Qhapaq queda retenido», pero en el 0043 Qhapaq figura «Pagado». `sub` sale del pedido elegido, no del reclamado. | D-21 (subtotal del proveedor reclamado), D-16, S2-M8. D-54 ya lo corrigió en M5-3, pero no en M1-4. | corregir | E5 → M3-2 → agregar Qhapaq → confirmar → pagar → `#/m1-4`. |
| 6 | 2, 7 | E3 / M1-3 / M3-3 | Si el precio nuevo es mayor que 118.00, E3 dispara además una alerta S2-M6: «Aviso de precio: Aceite vegetal de Distribuidora Qhapaq subió 6 %. Y 1 aviso más.». | Coherente con D-11, pero §F E3 no lo menciona y `GUIA_DEMO.md` no lo advierte al expositor. | menor | E3 con 125 → `#/m1-3`. |
| 7 | 2, 7 | M1-4 | Se puede abrir un segundo reclamo sobre el mismo proveedor y pedido; en el panel, E5 sí lo impide. | S2-M8 «dueño único del reclamo»: un reclamo abierto por proveedor y pedido. | menor | M1-4 → «Abrir reclamo» dos veces sobre Qhapaq. |
| 8 | 2 | E3 (`escenarios.ts:133`), E4 (`escenarios.ts:126`), M2-2 (`M2_2Catalogo.tsx:23`) | Se aceptan un precio de «0» (S/ 0.00) y un porcentaje de «250» (se muestra «250 %» con la señal activa). | Un porcentaje de pedidos va de 0 a 100 y un precio debe ser mayor que 0. P-06 no fija valores, pero sí que sean válidos. | menor | E4 → `250` → `#/m5-3`. |
| 9 | 2, 7 | M3-2 (`M3_2Comparador.tsx:88`) | Debajo de las 2 ofertas lista «Abarrotes Wayna · confirmado 03/11 · No disponible». La cabecera dice «2 ofertas», pero se ven 3 proveedores. | §A.3: «pasa a "No disponible": sale del comparador»; §F E1: «el comparador del aceite muestra 2 ofertas». D-54 lo agregó como decisión técnica de Claude, no del DP. | menor (decisión DP) | Panel E1 → `#/m3-2`. |
| 10 | 2 | M4-4 (`vista.ts:31`) | Con el pedido confirmado pero sin pagar (flujo en vivo), M4-4 dice «Pagas S/ 490.60 en una sola operación» y muestra estados «Confirmado». | La ficha de M4-4 es posterior al pago: hasta pagar debería mostrar «No hay pedidos» o el último pedido pagado. | menor | M4-1 → Cargar 0042 → Confirmar → abrir `#/m4-4` sin pagar. |
| 11 | 4 | `M4_1Carrito.tsx:28`, `M5_2Semaforos.tsx:75`, `M5_3Alertas.tsx:89`, `M1_3Inicio.tsx:73` | Literales escritos a mano: «Cargar pedido N.° 0042», «Ofertas por vencer en 48 horas», «Reclamos fuera de 48 horas», «4 horas hábiles». `tests/textos.test.ts` solo busca «S/» y «%», así que no los detecta. | CLAUDE.md, regla 3 y convenciones: usar `NUMERO_PEDIDO_EJEMPLO`, `POR_VENCER_DIAS` y `PLAZO_RECLAMO_U1_H`. | menor | `grep -n "0042\|48 horas" src/modules`. |
| 12 | 4, 6 | `src/store/persistencia.ts:9` | `leer()` convierte el JSON sin validarlo. Un estado guardado sin `escenarios` deja en blanco todas las pantallas y `#/simulacion` («Cannot read properties of undefined (reading 'length')»); solo `#/` funciona. La clave `mallki-demo-v1` nunca cambió, aunque la forma del estado sí (D-53). | Validar la forma o descartar lo inválido y volver a `estadoInicial()`. En la guía: «Si sale en blanco, abrir `#/` → Reiniciar demo». | corregir | En DevTools, borrar `escenarios` de `mallki-demo-v1` y recargar `#/m3-2`. |
| 13 | 6 | M3-3 (`M3_3Alerta.tsx:16`; `Pantalla.tsx:60`, `overflow-hidden`) | Con dos alertas (E3 con subida), la segunda pierde parte de las alternativas y el botón «Ver el comparador»; no hay scroll. | §B.1: no cortar contenido. La regla es para capturas, pero en vivo también se pierde contenido. | corregir | E3 con 125 → `#/m3-3`. |
| 14 | 6 | M5-3 y M1-4 | Con 3 o más reclamos, M5-3 corta la tarjeta S2-M8. En M1-4, después de enviar varios reclamos, el contenido se desplaza: la cabecera del pedido queda oculta y no se puede volver arriba. | §B.1 | menor | M1-4 → abrir 4 reclamos → ver M1-4 y M5-3. |
| 15 | 6 | Ruta directa, recarga, Reiniciar, dos pestañas, localStorage bloqueado | Funcionan. Cada ruta abre directo; recargar en M4-2 conserva el pedido; «Reiniciar demo» vuelve al 09/11; E1 en la pestaña B actualiza M3-2 en la pestaña A. Con localStorage bloqueado la demo funciona, pero no persiste ni sincroniza pestañas, y no lo avisa. | D-18, D-51, CLAUDE.md (try/catch) | conforme (menor: avisar en la guía que sin localStorage no hay sincronización) | Playwright con `localStorage` que lanza `SecurityError`. |
| 16 | 6 | `dist/` y `GUIA_DEMO.md:70` | `file:///…/dist/index.html` no carga: Chromium bloquea por CORS el script `type="module" crossorigin` y el CSS. La guía dice «Sin internet: la app no necesita conexión una vez cargada», pero una recarga sin conexión desde GitHub Pages falla, porque no hay service worker. | Instrucción de servidor local (ver la sección siguiente). Verificado: con `python3 -m http.server` sobre `dist/` y todo lo externo bloqueado, la app carga con Inter y no hace ninguna petición externa. | corregir | Abrir `dist/index.html` con doble clic. |
| 17 | 6 | `src/ui/Pantalla.tsx:70` (`items-center`) | El marco web mide 1440 + 48 px. En 1366 × 768 sobresale por los dos lados y la parte izquierda no se alcanza con scroll: «Mallki» queda pegado al borde y los bordes de las tarjetas se cortan. En un iPhone (390 px) no se puede ver el tablero M5-1 por la izquierda. Las pantallas de celular entran justo en 390 px y se cortan en teléfonos de 375 px. | Que la pantalla se vea completa en la laptop de la feria y en un celular, por ejemplo con `items-start`, `overflow-x-auto` o escalado. Mientras tanto: zoom del navegador al 90 % o menos. | corregir | Viewport 1366 × 768 → `#/m2-2`; emulación iPhone 13 → `#/m5-1`. |
| 18 | 3 | Todas las pantallas | No aparece nada de §A.5: ni «Health Meter», ni marcas, ni tecnopor, ni «ya opera», ni Mallki entregando, ni U4, ni nombres de integrantes. Tampoco hay emojis ni signos de exclamación. Los medios de pago son genéricos y la comisión nunca se suma al comprador. Tono sobrio. | §A.5, CLAUDE.md, regla 6 | conforme | `npm run capturas` y `grep` sobre `src/`. |
| 19 | 3, 7 | M1-4 (`M1_4Pedidos.tsx:99`) | La compradora ve «Monto sobre el umbral: pasa al S3.» en su celular. | La escalada al S3 es interna (§C, §D). En la app de U1 basta con el plazo y la retención; «S3» ya se ve en M5-3. | menor | Reclamo de S/ 550.02 (ver #3) → M1-4. |
| 20 | 7 | M5-1 y M5-2 (`m5-tablero/comun.tsx:30`) y M5-3 | Una categoría con menos de 50 % se rotula «Alerta del S3» en rojo (al 11/11, con envases en 5 de 12). Para los reclamos, M5-3 usa «Excepción al S3». M3-4 muestra solo «Bajo la meta». | §D: las zonas son «alerta» (corrige la unidad) y «excepción al S3» (cruza un umbral de §C); menos de 50 % es un umbral de §C S2-M1. §D, viñeta 4, dice «umbral de alerta del S3». Lo decide el DP (relacionado con P-10). | menor (decisión DP) | Reloj al 11/11 → `#/m5-1`, `#/m5-2`. No se llega desde el panel: E1 se desactiva después del 10/11. |
| 21 | 7 | M3-3 al 14/11 | La alerta del arroz de Wayna sigue vigente con «Alternativas» vacía y sin mensaje. | §C S2-M6: «reparte la demanda entre 2 o 3 alternativas». No se llega desde el panel. | menor | Reloj al 14/11 → `#/m3-3`. |
| 22 | 4 | `M5_3Alertas.tsx:84` | «después de las {PLAZO_DESCARGO_U2_H} horas de U2»: usa la constante del descargo de reclamos (S2-M8) para el plazo de S2-M6. El valor coincide (24), pero es otra regla. | Una constante propia de S2-M6 en `domain/reglas.ts`. | menor | Lectura del código. |
| 23 | 4 | `tests/` | Hay aserciones casi tautológicas: `pedido0042.test.ts:28` (`not.toBe(r.total + r.comisionTotal)` siempre es verdadera, porque `totalComprador` devuelve `r.total`), `:29` (la función contra sí misma) y la prueba «Reiniciar» contra `estadoInicial()`. «persistencia sin localStorage» corre en Node, donde `localStorage` no existe, así que no prueba el bloqueo del navegador. No hay pruebas saltadas ni vacías. | Que cada prueba compare con el literal de la especificación (lo que sí hacen las pruebas obligatorias de CLAUDE.md). | menor | Lectura de `tests/`. |
| 24 | 4 | `tests/datos.test.ts` | Nada exige literalmente S/ 121.50 (aceite de Inti), S/ 14.50 (Killa), S/ 15.20 (Ayni), ni las confirmaciones 05/11 (aceite de Inti), 06/11 (arroz de Inti), 06/11 (Pacha) y 08/11 (Killa). Tampoco los nombres y presentaciones de los 24 SKU, ni 19 de los 20 nombres de archivo. Una errata ahí pasaría todas las pruebas. (Hoy los datos están bien: revisados a mano contra §A.2.) | Regla de oro 1: aserciones literales de toda la tabla de §A.2 y de §B.1. | menor | Cambiar `14.50` por `14.05` en `src/data/ofertas.ts` → `npm test` sigue en verde. |
| 25 | 5 | `scripts/capturas.ts:56` | El chequeo de cortes solo mira los bordes inferior y derecho; no detecta contenido desplazado hacia arriba ni texto con «…». Hoy no hay ninguno de los dos: se verificó aparte y hay 0 elementos truncados en las 20. | Revisar también `top < cb.top` y `scrollWidth > clientWidth` en elementos `truncate`. | menor | Lectura del script. |
| 26 | 5 | `capturas/*.png` | 20 de 20 con nombre y tamaño de §B.1. Regenerarlas da los mismos bytes. Inter 400 a 700 cargada (`document.fonts.check('16px Inter')`). Sin «Índice», sin el botón del expositor ni «Escenario de simulación». Con E1 guardado en localStorage, la URL `?captura=1` sigue mostrando el estado inicial (D-18). | §A.4, §B.1, D-18 | conforme | `npm run capturas` y `cmp` contra las versionadas. |
| 27 | 1 | Todas | Los nombres, presentaciones, precios, plazos, calificaciones, fechas, pedido N.° 0042 (236.00, 199.00, 55.60; 5.90, 4.98, 1.39; 230.10, 194.02, 54.21; 490.60, 12.27, 478.33), el tablero (112, 31, 71 % (17 de 24), 34 %, 93 %, 96 %, 0.3 %, S/ 186,400 / S/ 4,660) y las frases de las fichas coinciden letra por letra con §A.2 y §B.3, y dicen lo mismo en cada pantalla donde aparecen, con la única excepción de #1. | §A.2, §B.3 | conforme | Recorrido de las 20 pantallas. |
| 28 | 7 | Mecanismos con pantalla | S2-M1 (M3-4, M5-2), S2-M2 (M2-4), S2-M3 (M2-3, M3-2, M5-2), S2-M4 (M3-2), S2-M5 (M4-2, M5-3), S2-M6 (M3-3, M5-3) y S2-M8 (M1-4, M2-4, M4-4, M5-3) se ven como en §C. Los plazos del canal algedónico (2 h / 24 h), el 5 % de reclamos, S/ 550, 72 h y 7 días coinciden con §C y §E. S2-M7 no tiene pantalla, como dice §C. | §C, §E | conforme (salvo #1, #20 y #21) | Recorrido de M2, M3, M4 y M5. |

**Conteo:** 0 bloquean, 7 para corregir (#1, #4, #5, #12, #13, #16, #17) y 14 menores. Las 7 filas restantes son verificaciones conformes.

## Cómo abrir la demo sin internet

`dist/` no se puede abrir con doble clic: necesita un servidor local, aunque sea mínimo. Verificado: no hace ninguna petición externa y la fuente Inter va incluida.

Antes de la feria, con internet, en la laptop del stand:

```bash
npm ci
```

```bash
npm run build
```

En la feria, sin internet, hay dos opciones:

- **Opción A (con Node):**

  ```bash
  npm run preview -- --port 4173
  ```

  Abrir `http://localhost:4173/#/` y, en otra ventana, `http://localhost:4173/#/simulacion`.

- **Opción B (sin Node, con Python):**

  ```bash
  python -m http.server 8080 --directory dist
  ```

  En Windows, `py` en lugar de `python`. Abrir `http://localhost:8080/#/`.

Cada dirección guarda su propio estado en localStorage: localhost y GitHub Pages no comparten nada. Al empezar, pulsar «Reiniciar demo». Si una pantalla sale en blanco, abrir `#/` y pulsar «Reiniciar demo» (ver #12).

## Lo que no pude verificar

- **GitHub Pages publicado:** depende de que el DP lo active y de la visibilidad del repo. Solo revisé el flujo de `desplegar.yml`, que es correcto: corre `npm test` antes de publicar.
- **Celular físico, Safari de iOS y Chrome en Windows:** usé Chromium con emulación de iPhone 13 y viewports de 390, 1366 y 1440. El suavizado de la fuente puede variar en Windows, así que las capturas generadas allí pueden no ser idénticas byte a byte, aunque el contenido sí.
- **Documentos del S2 y del S3 originales** (el lineamiento y «S3 §6.5»): no están en el repo. La coherencia con el MSV se comprobó contra §C a §F de la especificación, no contra esas fuentes.
- **Pantalla o proyector de la feria:** no se conoce su resolución. Si es menor de 1488 px de ancho, aplica #17.
- **«Tono que suene a IA»:** es un juicio subjetivo. No encontré frases publicitarias. «Vía asistida: una persona te acompaña por WhatsApp.» (M1-2) es texto propio que no está en la ficha, aunque es neutro.

## Comparación con `docs/AUDITORIA.md`

El auditor anterior revisó sobre todo el recorrido guiado y el estado inicial, y sus 10 hallazgos están corregidos (lo confirmé en #2, #15 y #26). No vio lo siguiente:

- **Rutas fuera del guion:** carrito bloqueado por una oferta vencida (#4), reclamos mezclados entre pedidos y comparados con el subtotal equivocado en M1-4 (#5), reclamos duplicados (#7) y M4-4 antes del pago (#10).
- **Contenido cortado en vivo:** M3-3 con dos alertas (#13), y M5-3 y M1-4 con varios reclamos (#14). Su hallazgo #7 trató el aviso de M1-3, pero no la pantalla M3-3.
- **Condiciones de la feria:** `file://` no funciona y la guía promete más de lo que hay sin internet (#16); M2 y M5 cortadas en 1366 px y en celular (#17); pantalla en blanco con localStorage de otra forma (#12).
- **Bordes:** el rótulo de M5-1 contradice a E4 con 1 % exacto en pantalla (#1; antes solo era una observación sin severidad); valores de 0 y 250 % aceptados (#8); el 11/11 con «Alerta del S3» frente a «Excepción al S3» (#20); el 14/11 sin alternativas (#21).
- **Calidad de las pruebas:** aserciones tautológicas (#23), datos de §A.2 sin cobertura literal (#24) y chequeo de cortes incompleto (#25). El auditor anterior dio por buenas las pruebas porque pasaban.
- **Tensión con la especificación de su propia corrección #4:** al listar las ofertas «No disponible» en M3-2, chocó con §A.3, «sale del comparador» (#9).
