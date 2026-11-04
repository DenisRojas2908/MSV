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

Cada fila es un texto visible y dónde editarlo. Las partes entre `{…}` son datos calculados: no se editan aquí.

### M1

| Texto | Archivo y línea |
|---|---|
| Registro | `src/modules/m1-registro/M1_1Registro.tsx:9` |
| Crea tu cuenta | `src/modules/m1-registro/M1_1Registro.tsx:12` |
| Compara precios de insumos y compra a varios proveedores en un solo pedido. | `src/modules/m1-registro/M1_1Registro.tsx:13` |
| RUC | `src/modules/m1-registro/M1_1Registro.tsx:15` |
| Razón social | `src/modules/m1-registro/M1_1Registro.tsx:16` |
| Tipo de negocio | `src/modules/m1-registro/M1_1Registro.tsx:18` |
| Distrito de Lima Centro | `src/modules/m1-registro/M1_1Registro.tsx:35` |
| WhatsApp | `src/modules/m1-registro/M1_1Registro.tsx:41` |
| El comprador no paga comisión: la comisión la paga el proveedor. | `src/modules/m1-registro/M1_1Registro.tsx:42` |
| Registrarme | `src/modules/m1-registro/M1_1Registro.tsx:43` |
| Tu lista habitual | `src/modules/m1-registro/M1_2Onboarding.tsx:41` |
| Categorías que compras | `src/modules/m1-registro/M1_2Onboarding.tsx:44` |
| Tu lista habitual | `src/modules/m1-registro/M1_2Onboarding.tsx:56` |
| Prefiero que me ayuden por WhatsApp | `src/modules/m1-registro/M1_2Onboarding.tsx:96` |
| Vía asistida: una persona te acompaña por WhatsApp. | `src/modules/m1-registro/M1_2Onboarding.tsx:97` |
| Continuar | `src/modules/m1-registro/M1_2Onboarding.tsx:102` |
| Comparar | `src/modules/m1-registro/M1_3Inicio.tsx:12` |
| Compara precios de insumos, de menor a mayor | `src/modules/m1-registro/M1_3Inicio.tsx:12` |
| Mis pedidos | `src/modules/m1-registro/M1_3Inicio.tsx:13` |
| Estado y entrega de cada proveedor | `src/modules/m1-registro/M1_3Inicio.tsx:13` |
| Reclamos | `src/modules/m1-registro/M1_3Inicio.tsx:14` |
| Abre un reclamo sobre un pedido | `src/modules/m1-registro/M1_3Inicio.tsx:14` |
| Inicio | `src/modules/m1-registro/M1_3Inicio.tsx:26` |
| Hola, {nombre} | `src/modules/m1-registro/M1_3Inicio.tsx:28` |
| Aviso de precio: | `src/modules/m1-registro/M1_3Inicio.tsx:34` |
| Último pedido | `src/modules/m1-registro/M1_3Inicio.tsx:60` |
| Pedido N.° {pedido.numero} | `src/modules/m1-registro/M1_3Inicio.tsx:62` |
| Respondemos en menos de 4 horas hábiles. | `src/modules/m1-registro/M1_3Inicio.tsx:73` |
| Mis pedidos y reclamos | `src/modules/m1-registro/M1_4Pedidos.tsx:36` |
| Todavía no tienes pedidos. | `src/modules/m1-registro/M1_4Pedidos.tsx:38` |
| Pedido N.° {pedido.numero} | `src/modules/m1-registro/M1_4Pedidos.tsx:57` |
| Reclamos | `src/modules/m1-registro/M1_4Pedidos.tsx:85` |
| Reclamo a {p.nombre} | `src/modules/m1-registro/M1_4Pedidos.tsx:92` |
| Monto sobre el umbral: pasa al S3. | `src/modules/m1-registro/M1_4Pedidos.tsx:99` |
| ¿Sobre qué proveedor es el reclamo? | `src/modules/m1-registro/M1_4Pedidos.tsx:106` |
| Describe el problema | `src/modules/m1-registro/M1_4Pedidos.tsx:122` |
| Cancelar | `src/modules/m1-registro/M1_4Pedidos.tsx:127` |
| Enviar reclamo | `src/modules/m1-registro/M1_4Pedidos.tsx:128` |
| Mientras se resuelve, el pago a ese proveedor se retiene. | `src/modules/m1-registro/M1_4Pedidos.tsx:139` |

### M2

| Texto | Archivo y línea |
|---|---|
| Registro del proveedor | `src/modules/m2-proveedor/M2_1Registro.tsx:12` |
| Datos de la empresa | `src/modules/m2-proveedor/M2_1Registro.tsx:16` |
| Completa tus datos para ofrecer tus productos en el comparador. | `src/modules/m2-proveedor/M2_1Registro.tsx:17` |
| RUC | `src/modules/m2-proveedor/M2_1Registro.tsx:20` |
| 11 dígitos | `src/modules/m2-proveedor/M2_1Registro.tsx:20` |
| Razón social | `src/modules/m2-proveedor/M2_1Registro.tsx:21` |
| Categorías | `src/modules/m2-proveedor/M2_1Registro.tsx:24` |
| Distritos de reparto en Lima Centro | `src/modules/m2-proveedor/M2_1Registro.tsx:39` |
| Elige los distritos donde repartes | `src/modules/m2-proveedor/M2_1Registro.tsx:39` |
| Documentos sanitarios | `src/modules/m2-proveedor/M2_1Registro.tsx:41` |
| Arrastra tus documentos aquí o elige los archivos | `src/modules/m2-proveedor/M2_1Registro.tsx:44` |
| Los presenta el proveedor; los verifica U2. | `src/modules/m2-proveedor/M2_1Registro.tsx:45` |
| Registrarme | `src/modules/m2-proveedor/M2_1Registro.tsx:48` |
| Cómo funciona | `src/modules/m2-proveedor/M2_1Registro.tsx:53` |
| Publicas tus precios en el catálogo y los confirmas al menos cada {VIGENCIA_DIAS} días. | `src/modules/m2-proveedor/M2_1Registro.tsx:55` |
| El comparador ordena por precio, de menor a mayor. Nadie paga por aparecer primero. | `src/modules/m2-proveedor/M2_1Registro.tsx:56` |
| Cada proveedor despacha lo suyo. | `src/modules/m2-proveedor/M2_1Registro.tsx:60` |
| Catálogo | `src/modules/m2-proveedor/M2_2Catalogo.tsx:33` |
| Lista de 24 SKU ancla | `src/modules/m2-proveedor/M2_2Catalogo.tsx:36` |
| Elige el producto que vas a ofrecer. | `src/modules/m2-proveedor/M2_2Catalogo.tsx:37` |
| · fuera de tu categoría | `src/modules/m2-proveedor/M2_2Catalogo.tsx:44` |
| Precio con IGV (S/) | `src/modules/m2-proveedor/M2_2Catalogo.tsx:73` |
| oferta ? formatearMonto(oferta.precio) : 'Precio con IGV' | `src/modules/m2-proveedor/M2_2Catalogo.tsx:78` |
| Stock referencial | `src/modules/m2-proveedor/M2_2Catalogo.tsx:82` |
| Unidades disponibles | `src/modules/m2-proveedor/M2_2Catalogo.tsx:82` |
| Plazo de entrega | `src/modules/m2-proveedor/M2_2Catalogo.tsx:83` |
| Guardar precio | `src/modules/m2-proveedor/M2_2Catalogo.tsx:91` |
| Subir Excel | `src/modules/m2-proveedor/M2_2Catalogo.tsx:92` |
| Un precio nuevo cuenta como confirmación: vuelve a estar vigente por {VIGENCIA_DIAS} días. | `src/modules/m2-proveedor/M2_2Catalogo.tsx:94` |
| Mi catálogo | `src/modules/m2-proveedor/M2_2Catalogo.tsx:98` |
| Producto | `src/modules/m2-proveedor/M2_2Catalogo.tsx:102` |
| Precio | `src/modules/m2-proveedor/M2_2Catalogo.tsx:103` |
| Plazo | `src/modules/m2-proveedor/M2_2Catalogo.tsx:104` |
| Stock | `src/modules/m2-proveedor/M2_2Catalogo.tsx:105` |
| Confirmado | `src/modules/m2-proveedor/M2_2Catalogo.tsx:106` |
| Confirmación de precios | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:20` |
| Tus ofertas | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:24` |
| Producto | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:35` |
| Precio | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:36` |
| Confirmado | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:37` |
| Vigente hasta | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:38` |
| Días que le quedan | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:39` |
| Estado | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:40` |
| Vigente | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:69` |
| Vence mañana | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:70` |
| No disponible | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:71` |
| Vigencia de {VIGENCIA_DIAS} días | `src/modules/m2-proveedor/M2_3Confirmacion.tsx:88` |
| Panel del proveedor | `src/modules/m2-proveedor/M2_4Panel.tsx:26` |
| Tu parte del pedido | `src/modules/m2-proveedor/M2_4Panel.tsx:29` |
| Producto | `src/modules/m2-proveedor/M2_4Panel.tsx:41` |
| Cantidad | `src/modules/m2-proveedor/M2_4Panel.tsx:42` |
| P. unit. | `src/modules/m2-proveedor/M2_4Panel.tsx:43` |
| Subtotal | `src/modules/m2-proveedor/M2_4Panel.tsx:44` |
| Entrega | `src/modules/m2-proveedor/M2_4Panel.tsx:45` |
| Despachas tu parte directamente al comprador. | `src/modules/m2-proveedor/M2_4Panel.tsx:63` |
| Sin pedidos pagados. | `src/modules/m2-proveedor/M2_4Panel.tsx:66` |
| Calificación | `src/modules/m2-proveedor/M2_4Panel.tsx:71` |
| Liquidación semanal | `src/modules/m2-proveedor/M2_4Panel.tsx:82` |
| comisión la paga el proveedor. | `src/modules/m2-proveedor/M2_4Panel.tsx:96` |
| Sin ventas por liquidar. | `src/modules/m2-proveedor/M2_4Panel.tsx:105` |
| Reclamos | `src/modules/m2-proveedor/M2_4Panel.tsx:110` |
| No tienes reclamos abiertos. | `src/modules/m2-proveedor/M2_4Panel.tsx:115` |
| Reclamo del pedido N.° {r.pedidoNumero} | `src/modules/m2-proveedor/M2_4Panel.tsx:120` |
| Si recibes un reclamo, el comprador lo sigue con U1 y tu liquidación de ese pedido se reti | `src/modules/m2-proveedor/M2_4Panel.tsx:129` |
| titulo | `src/modules/m2-proveedor/comun.tsx:14` |

### M3

| Texto | Archivo y línea |
|---|---|
| Comparar precios | `src/modules/m3-comparador/M3_1Buscador.tsx:35` |
| Producto, por ejemplo «${EJEMPLO | `src/modules/m3-comparador/M3_1Buscador.tsx:42` |
| Aviso de precio: | `src/modules/m3-comparador/M3_1Buscador.tsx:74` |
| Sin resultados. | `src/modules/m3-comparador/M3_1Buscador.tsx:117` |
| Comparador | `src/modules/m3-comparador/M3_2Comparador.tsx:30` |
| Precio de menor a mayor · con IGV | `src/modules/m3-comparador/M3_2Comparador.tsx:41` |
| Entrega en {c.proveedor.plazoHoras} h | `src/modules/m3-comparador/M3_2Comparador.tsx:58` |
| subió de | `src/modules/m3-comparador/M3_2Comparador.tsx:71` |
| Agregar al pedido | `src/modules/m3-comparador/M3_2Comparador.tsx:79` |
| No disponible | `src/modules/m3-comparador/M3_2Comparador.tsx:91` |
| Cantidad | `src/modules/m3-comparador/M3_2Comparador.tsx:96` |
| ¿Cómo ordenamos? | `src/modules/m3-comparador/M3_2Comparador.tsx:106` |
| Por precio, de menor a mayor. A igual precio, primero el menor plazo de entrega y luego la | `src/modules/m3-comparador/M3_2Comparador.tsx:108` |
| El orden no cambia porque alguien pague. No hay destacados. | `src/modules/m3-comparador/M3_2Comparador.tsx:109` |
| Un cambio de criterios se avisa con {AVISO_CAMBIO_CRITERIOS_H} horas de anticipación. | `src/modules/m3-comparador/M3_2Comparador.tsx:110` |
| Solo se muestran precios confirmados en los últimos {VIGENCIA_DIAS} días. | `src/modules/m3-comparador/M3_2Comparador.tsx:111` |
| Alerta de precio | `src/modules/m3-comparador/M3_3Alerta.tsx:13` |
| No hay alertas de precio. | `src/modules/m3-comparador/M3_3Alerta.tsx:15` |
| Alternativas | `src/modules/m3-comparador/M3_3Alerta.tsx:26` |
| Otras ofertas vigentes del mismo producto, de menor a mayor precio. | `src/modules/m3-comparador/M3_3Alerta.tsx:27` |
| Entrega en {c.proveedor.plazoHoras} h | `src/modules/m3-comparador/M3_3Alerta.tsx:36` |
| Semáforo de cobertura | `src/modules/m3-comparador/M3_4Semaforo.tsx:14` |
| Bajo la meta | `src/modules/m3-comparador/M3_4Semaforo.tsx:24` |
| Verde: {OFERTAS_VERDE} ofertas · ámbar: {OFERTAS_AMBAR} · rojo: {OFERTAS_AMBAR - 1} o ning | `src/modules/m3-comparador/M3_4Semaforo.tsx:26` |

### M4

| Texto | Archivo y línea |
|---|---|
| Entrega | `src/modules/m4-pedido-pago/GruposProveedor.tsx:26` |
| Entrega en {g.proveedor.plazoHoras} h | `src/modules/m4-pedido-pago/GruposProveedor.tsx:28` |
| Precio vencido: elige otra oferta | `src/modules/m4-pedido-pago/GruposProveedor.tsx:43` |
| Subtotal | `src/modules/m4-pedido-pago/GruposProveedor.tsx:50` |
| Total | `src/modules/m4-pedido-pago/GruposProveedor.tsx:64` |
| Carrito | `src/modules/m4-pedido-pago/M4_1Carrito.tsx:25` |
| Cargar pedido N.° 0042 | `src/modules/m4-pedido-pago/M4_1Carrito.tsx:28` |
| Tu carrito está vacío. | `src/modules/m4-pedido-pago/M4_1Carrito.tsx:32` |
| Comparar precios | `src/modules/m4-pedido-pago/M4_1Carrito.tsx:33` |
| Pedido N.° {carrito.numero} | `src/modules/m4-pedido-pago/M4_1Carrito.tsx:38` |
| Un solo pago para ${n === 1 ? 'el proveedor' :  | `src/modules/m4-pedido-pago/M4_1Carrito.tsx:44` |
| Confirmar pedido | `src/modules/m4-pedido-pago/M4_1Carrito.tsx:50` |
| Confirmación | `src/modules/m4-pedido-pago/M4_2Confirmacion.tsx:15` |
| No hay un pedido confirmado. | `src/modules/m4-pedido-pago/M4_2Confirmacion.tsx:17` |
| Cada proveedor despacha lo suyo, según su plazo de entrega. | `src/modules/m4-pedido-pago/M4_2Confirmacion.tsx:30` |
| Ir a pagar | `src/modules/m4-pedido-pago/M4_2Confirmacion.tsx:32` |
| Ver seguimiento | `src/modules/m4-pedido-pago/M4_2Confirmacion.tsx:34` |
| Tarjeta | `src/modules/m4-pedido-pago/M4_3Pago.tsx:15` |
| Transferencia | `src/modules/m4-pedido-pago/M4_3Pago.tsx:16` |
| Billetera digital | `src/modules/m4-pedido-pago/M4_3Pago.tsx:17` |
| Pago | `src/modules/m4-pedido-pago/M4_3Pago.tsx:29` |
| No hay un pedido por pagar. | `src/modules/m4-pedido-pago/M4_3Pago.tsx:30` |
| Pago | `src/modules/m4-pedido-pago/M4_3Pago.tsx:38` |
| Pedido N.° {pedido.numero} · un solo pago | `src/modules/m4-pedido-pago/M4_3Pago.tsx:41` |
| Medio de pago | `src/modules/m4-pedido-pago/M4_3Pago.tsx:54` |
| Comprobante electrónico | `src/modules/m4-pedido-pago/M4_3Pago.tsx:73` |
| La comisión de Mallki la paga cada proveedor. No se suma a tu pago. | `src/modules/m4-pedido-pago/M4_3Pago.tsx:80` |
| Pago registrado · ver seguimiento | `src/modules/m4-pedido-pago/M4_3Pago.tsx:83` |
| Pagar | `src/modules/m4-pedido-pago/M4_3Pago.tsx:86` |
| Seguimiento | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:21` |
| No hay pedidos. | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:22` |
| Seguimiento | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:28` |
| Pedido N.° {pedido.numero} | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:31` |
| Cómo se reparte tu pago | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:51` |
| en una sola operación. Mallki retiene el | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:53` |
| ) y les paga | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:54` |
| Proveedor | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:59` |
| Subtotal | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:60` |
| Comisión | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:61` |
| Recibe | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:62` |
| Retenido | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:80` |
| Total | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:86` |
| La comisión la paga el proveedor: tu total no cambia. | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:93` |
| Si abres un reclamo, el pago a ese proveedor se retiene hasta resolverlo. | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:98` |
| Ir a Mis pedidos | `src/modules/m4-pedido-pago/M4_4Seguimiento.tsx:101` |

### M5

| Texto | Archivo y línea |
|---|---|
| Meta o umbral | `src/modules/m5-tablero/M5_1Tablero.tsx:16` |
| Tablero de indicadores | `src/modules/m5-tablero/M5_1Tablero.tsx:38` |
| <><Porcentaje valor={t.cobertura.porcentaje | `src/modules/m5-tablero/M5_1Tablero.tsx:44` |
| <Porcentaje valor={t.recompra60DiasPct | `src/modules/m5-tablero/M5_1Tablero.tsx:48` |
| <Porcentaje valor={t.preciosVigentesPct | `src/modules/m5-tablero/M5_1Tablero.tsx:49` |
| <Porcentaje valor={t.reclamosCerradosEn48hPct | `src/modules/m5-tablero/M5_1Tablero.tsx:50` |
| <Porcentaje pb={t.precioDistintoHoyPb | `src/modules/m5-tablero/M5_1Tablero.tsx:53` |
| Señal algedónica activa | `src/modules/m5-tablero/M5_1Tablero.tsx:55` |
| <span className= | `src/modules/m5-tablero/M5_1Tablero.tsx:59` |
| Semáforos y vigencia | `src/modules/m5-tablero/M5_2Semaforos.tsx:22` |
| Cobertura por SKU · S2-M1 | `src/modules/m5-tablero/M5_2Semaforos.tsx:27` |
| Verde: {OFERTAS_VERDE} ofertas · ámbar: {OFERTAS_AMBAR} · rojo: {OFERTAS_AMBAR - 1} o ning | `src/modules/m5-tablero/M5_2Semaforos.tsx:39` |
| Alerta del S3 | `src/modules/m5-tablero/M5_2Semaforos.tsx:51` |
| UMBRAL_CATEGORIA_PCT | `src/modules/m5-tablero/M5_2Semaforos.tsx:69` |
| Ofertas por vencer en 48 horas · S2-M3 | `src/modules/m5-tablero/M5_2Semaforos.tsx:75` |
| Hoy | `src/modules/m5-tablero/M5_2Semaforos.tsx:76` |
| · vigencia de {VIGENCIA_DIAS} días | `src/modules/m5-tablero/M5_2Semaforos.tsx:76` |
| quedan {d} días | `src/modules/m5-tablero/M5_2Semaforos.tsx:97` |
| Regla de vigencia | `src/modules/m5-tablero/M5_2Semaforos.tsx:107` |
| El proveedor confirma su precio en su catálogo; confirmar o cambiar el precio reinicia los | `src/modules/m5-tablero/M5_2Semaforos.tsx:111` |
| Valor | `src/modules/m5-tablero/M5_3Alertas.tsx:33` |
| Estado | `src/modules/m5-tablero/M5_3Alertas.tsx:38` |
| Alertas | `src/modules/m5-tablero/M5_3Alertas.tsx:54` |
| Precio distinto al mostrado | `src/modules/m5-tablero/M5_3Alertas.tsx:58` |
| <Porcentaje pb={t.precioDistintoHoyPb | `src/modules/m5-tablero/M5_3Alertas.tsx:59` |
| Señal algedónica activa | `src/modules/m5-tablero/M5_3Alertas.tsx:64` |
| La unidad tiene {t.senal.plazoUnidadHoras} h; si vence, el S3 {t.senal.plazoS3Horas} h. | `src/modules/m5-tablero/M5_3Alertas.tsx:65` |
| Sin señal | `src/modules/m5-tablero/M5_3Alertas.tsx:68` |
| Proveedor con ${UMBRAL_CONCENTRACION_PCT | `src/modules/m5-tablero/M5_3Alertas.tsx:78` |
| Sin dato en la demostración | `src/modules/m5-tablero/M5_3Alertas.tsx:81` |
| UMBRAL_CONCENTRACION_PCT | `src/modules/m5-tablero/M5_3Alertas.tsx:83` |
| Reclamos fuera de 48 horas | `src/modules/m5-tablero/M5_3Alertas.tsx:89` |
| <Porcentaje valor={fuera | `src/modules/m5-tablero/M5_3Alertas.tsx:90` |
| derivado de | `src/modules/m5-tablero/M5_3Alertas.tsx:91` |
| cerrados en {PLAZO_RECLAMO_U1_H} h | `src/modules/m5-tablero/M5_3Alertas.tsx:91` |
| Excepción al S3 | `src/modules/m5-tablero/M5_3Alertas.tsx:94` |
| Bajo el umbral de | `src/modules/m5-tablero/M5_3Alertas.tsx:96` |
| <>Bajo el umbral de <Porcentaje valor={UMBRAL_RECLAMOS_FUERA_PCT | `src/modules/m5-tablero/M5_3Alertas.tsx:96` |
| o más de los casos, o un reclamo sobre | `src/modules/m5-tablero/M5_3Alertas.tsx:101` |
| UMBRAL_RECLAMOS_FUERA_PCT | `src/modules/m5-tablero/M5_3Alertas.tsx:101` |
| · descargo U2 | `src/modules/m5-tablero/M5_3Alertas.tsx:112` |
| liquidación retenida | `src/modules/m5-tablero/M5_3Alertas.tsx:113` |
| Compromisos | `src/modules/m5-tablero/M5_4Compromisos.tsx:21` |
| Unidad | `src/modules/m5-tablero/M5_4Compromisos.tsx:26` |
| Meta a seis meses | `src/modules/m5-tablero/M5_4Compromisos.tsx:27` |
| Logrado al mes 3 | `src/modules/m5-tablero/M5_4Compromisos.tsx:28` |
| Canal | `src/modules/m5-tablero/M5_4Compromisos.tsx:29` |
| lo logrado son datos de demostración. | `src/modules/m5-tablero/M5_4Compromisos.tsx:46` |
| titulo | `src/modules/m5-tablero/comun.tsx:11` |
| Sistema 3 | `src/modules/m5-tablero/comun.tsx:14` |
| Dentro de la meta | `src/modules/m5-tablero/comun.tsx:28` |
| Bajo la meta | `src/modules/m5-tablero/comun.tsx:29` |
| Alerta del S3 | `src/modules/m5-tablero/comun.tsx:30` |
| ZONA[zona].texto | `src/modules/m5-tablero/comun.tsx:35` |

### Simulación

| Texto | Archivo y línea |
|---|---|
| Avanzar el reloj al día siguiente | `src/simulacion/index.tsx:99` |
| NOMBRE_COLOR[sem.lista[0].color] | `src/simulacion/index.tsx:103` |
| 1 · Antes de la subida | `src/simulacion/index.tsx:117` |
| 2 · Aplicar la subida | `src/simulacion/index.tsx:118` |
| subió | `src/simulacion/index.tsx:130` |
| nuevo precio | `src/simulacion/index.tsx:154` |
| Aplicar precio nuevo | `src/simulacion/index.tsx:156` |
| Pedido nuevo con 1 aceite | `src/simulacion/index.tsx:157` |
| El pedido N.° {NUMERO_PEDIDO_EJEMPLO} está en el carrito: confírmalo primero. | `src/simulacion/index.tsx:159` |
| · fijado | `src/simulacion/index.tsx:161` |
| porcentaje del día | `src/simulacion/index.tsx:177` |
| por ciento | `src/simulacion/index.tsx:178` |
| Aplicar | `src/simulacion/index.tsx:180` |
| Activa · unidad ${t.senal.plazoUnidadHoras | `src/simulacion/index.tsx:185` |
| Describe el problema | `src/simulacion/index.tsx:206` |
| Abrir reclamo a {nombre} | `src/simulacion/index.tsx:209` |
| Escenario de simulación | `src/simulacion/index.tsx:235` |
| Qué hace: | `src/simulacion/index.tsx:240` |
| Qué debe pasar: | `src/simulacion/index.tsx:241` |
| Origen: {e.origen} | `src/simulacion/index.tsx:242` |
| Panel de simulación | `src/simulacion/index.tsx:261` |
| Vista del expositor · no aparece en las capturas | `src/simulacion/index.tsx:262` |
| Hoy: | `src/simulacion/index.tsx:263` |
| Índice | `src/simulacion/index.tsx:267` |
| Eventos | `src/simulacion/index.tsx:275` |
| Sin cambios desde el {formatearFecha(FECHA_DEMO)}. | `src/simulacion/index.tsx:277` |
| Pantallas afectadas por {escenario.id} · {escenario.nombre} | `src/simulacion/index.tsx:288` |
