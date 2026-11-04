# Especificación del prototipo

Fuente: Lineamiento de la semana 9 de la feria (29/10/2026) y base fija de la feria (28/10/2026), diseño del Sistema 2 (entregado) y del Sistema 3 (entregado el 03/11/2026). Las tablas de §A.2, §A.4, §A.5 y las fichas de §B están copiadas sin cambios del lineamiento. Si el equipo cambió algo después, el DP lo corrige aquí antes de construir.

Este documento es la fuente de verdad. Lo que no está aquí no existe en el prototipo.

---

## A. Datos fijos

### A.1 Identidad

- **Título:** Mallki: Organización Viable y Marketplace B2B de Insumos para las MYPE Gastronómicas de Lima Centro
- **Mallki en una frase:** Mallki es un marketplace B2B asset-light que permite a las MYPE gastronómicas de Lima Centro comparar precios de insumos no perecibles y comprar a varios proveedores en un solo pedido.
- **Alcance:** Lima Centro · solo no perecibles · abarrotes secos; envases y empaques · 24 SKU ancla · seis meses.
- **Metas del piloto:** 200 compradores activos (un pedido en 30 días) · 50 proveedores activos (catálogo vigente y un pedido en 30 días) · cobertura de 70 % o más: 17 de 24 SKU con tres ofertas.
- **Ingresos:** comisión de 2.5 % al proveedor por venta cerrada; el comprador no paga. La suscripción de U3 no tiene precio definido: no se pone monto en ninguna pantalla.
- **Valoración ambiental:** pedidos agrupados por proveedor y entregas programadas; envases sin tecnopor, con la marca «Opción ecológica (Ley 30884)» en el catálogo y un filtro en el comparador; sin flota ni almacenes propios.
- **Mallki no opera:** todo dato del prototipo es de demostración y todo resultado es esperado.

### A.2 Datos de la demostración

> En las fichas de §B, «2.3» se refiere a esta sección.

Son los únicos datos que van en pantallas, diapositivas y video. Los nombres son ficticios. Fecha de la demo: **lunes 9/11/2026**.

***Comprador***

Pollería Sumaq · Cercado de Lima · dueña: Rosa Quispe · WhatsApp +51 9 \* 321 · RUC 20000012345 (ficticio).

***Proveedores***

En pantallas solo aparecen estos seis; el tablero del M5 muestra el total de la plataforma. Ninguno está en revisión.

|                      |                    |                  |           |
| -------------------- | ------------------ | ---------------- | --------- |
| **Proveedor**        | **Categoría**      | **Calificación** | **Plazo** |
| Distribuidora Qhapaq | Abarrotes secos    | 4.6              | 24 h      |
| Comercial Inti       | Abarrotes secos    | 4.2              | 48 h      |
| Abarrotes Wayna      | Abarrotes secos    | 3.9              | 72 h      |
| Envases Killa        | Envases y empaques | 4.5              | 24 h      |
| Empaques Pacha       | Envases y empaques | 4.1              | 48 h      |
| Descartables Ayni    | Envases y empaques | 3.8              | 72 h      |

***Los 24 SKU ancla y su semáforo***

Verde: 3 ofertas · ámbar: 2 · rojo: 1 o ninguna. Total: **17 verdes, 5 ámbar y 2 rojos = cobertura de 71 %**. «Verde» quiere decir que los tres proveedores de su categoría lo ofrecen.

|         |                                            |                    |                       |               |
| ------- | ------------------------------------------ | ------------------ | --------------------- | ------------- |
| **N.°** | **SKU**                                    | **Presentación**   | **Semáforo**          | **Ecológica** |
| 1       | Aceite vegetal                             | Balde de 18 L      | Verde                 |               |
| 2       | Arroz extra                                | Saco de 50 kg      | Verde                 |               |
| 3       | Azúcar rubia                               | Saco de 50 kg      | Verde                 |               |
| 4       | Harina sin preparar                        | Saco de 50 kg      | Verde                 |               |
| 5       | Sal de mesa yodada                         | Saco de 25 kg      | Verde                 |               |
| 6       | Lenteja                                    | Saco de 50 kg      | Verde                 |               |
| 7       | Fideo spaghetti                            | Caja de 20 × 500 g | Verde                 |               |
| 8       | Leche evaporada                            | Caja de 48 × 400 g | Verde                 |               |
| 9       | Mayonesa                                   | Galonera de 3.8 kg | Verde                 |               |
| 10      | Manteca vegetal                            | Caja de 20 kg      | Verde                 |               |
| 11      | Levadura seca instantánea                  | Caja de 20 × 500 g | Ámbar (Qhapaq e Inti) |               |
| 12      | Café tostado molido                        | Bolsa de 1 kg      | Verde                 |               |
| 13      | Táper de polipropileno 1 lb con tapa       | Paquete de 50      | Verde                 |               |
| 14      | Táper de polipropileno 32 oz con tapa      | Paquete de 25      | Verde                 |               |
| 15      | Envase de bagazo 1 lb con bisagra          | Paquete de 50      | Ámbar (Killa y Pacha) | Sí            |
| 16      | Vaso de papel 12 oz                        | Paquete de 50      | Ámbar (Killa y Ayni)  | Sí            |
| 17      | Tapa para vaso de 12 oz                    | Paquete de 50      | Ámbar (Killa y Ayni)  |               |
| 18      | Bolsa de papel kraft con asa               | Paquete de 100     | Verde                 | Sí            |
| 19      | Bolsa de papel kraft sin asa               | Paquete de 100     | Verde                 | Sí            |
| 20      | Caja de cartón para pollo a la brasa (1/4) | Paquete de 100     | Verde                 | Sí            |
| 21      | Caja de cartón para torta 20 × 20 cm       | Paquete de 25      | Rojo (Killa)          | Sí            |
| 22      | Tenedor de madera                          | Paquete de 100     | Rojo (Pacha)          | Sí            |
| 23      | Servilleta de papel                        | Paquete de 300     | Verde                 |               |
| 24      | Papel aluminio 30 cm                       | Rollo de 100 m     | Ámbar (Pacha y Ayni)  |               |

***Tres SKU con ofertas completas***

Orden por defecto: precio de menor a mayor. Precio vigente: confirmado en los últimos 7 días. Precios con IGV, de demostración.

|                                            |                      |            |           |                  |                            |
| ------------------------------------------ | -------------------- | ---------- | --------- | ---------------- | -------------------------- |
| **SKU**                                    | **Proveedor**        | **Precio** | **Plazo** | **Calificación** | **Confirmado**             |
| Aceite vegetal, balde de 18 L              | Abarrotes Wayna      | S/ 116.90  | 72 h      | 3.9              | 03/11 · vence mañana       |
|                                            | Distribuidora Qhapaq | S/ 118.00  | 24 h      | 4.6              | 07/11                      |
|                                            | Comercial Inti       | S/ 121.50  | 48 h      | 4.2              | 05/11                      |
| Arroz extra, saco de 50 kg                 | Comercial Inti       | S/ 199.00  | 48 h      | 4.2              | 06/11                      |
|                                            | Distribuidora Qhapaq | S/ 205.00  | 24 h      | 4.6              | 07/11                      |
|                                            | Abarrotes Wayna      | S/ 210.00  | 72 h      | 3.9              | 08/11 · subió de S/ 198.00 |
| Táper de polipropileno 1 lb, paquete de 50 | Empaques Pacha       | S/ 13.90   | 48 h      | 4.1              | 06/11                      |
|                                            | Envases Killa        | S/ 14.50   | 24 h      | 4.5              | 08/11                      |
|                                            | Descartables Ayni    | S/ 15.20   | 72 h      | 3.8              | 04/11                      |

***Pedido de ejemplo N.° 0042 · Pollería Sumaq · 09/11/2026***

|                      |                     |           |              |               |             |                    |                 |
| -------------------- | ------------------- | --------- | ------------ | ------------- | ----------- | ------------------ | --------------- |
| **Proveedor**        | **Producto**        | **Cant.** | **P. unit.** | **Subtotal**  | **Entrega** | **Comisión 2.5 %** | **Liquidación** |
| Distribuidora Qhapaq | Aceite vegetal 18 L | 2         | 118.00       | 236.00        | 24 h        | 5.90               | 230.10          |
| Comercial Inti       | Arroz extra 50 kg   | 1         | 199.00       | 199.00        | 48 h        | 4.98               | 194.02          |
| Empaques Pacha       | Táper PP 1 lb × 50  | 4         | 13.90        | 55.60         | 48 h        | 1.39               | 54.21           |
| **Total**            |                     |           |              | **S/ 490.60** |             | **S/ 12.27**       | **S/ 478.33**   |

Rosa paga S/ 490.60 en una sola operación. Mallki retiene el 2.5 % a cada proveedor y les paga S/ 478.33 en la liquidación semanal. La comisión nunca se suma a lo que paga el comprador. Eligió el aceite de Qhapaq aunque Wayna era S/ 1.10 más barato, porque lo necesitaba en 24 horas.

***Tablero de demostración (M5)***

Mes 3 del piloto, supuesto. **En el artículo y en la diapositiva de resultados se usan las metas, nunca estos números.**

|                                         |                       |                                                |
| --------------------------------------- | --------------------- | ---------------------------------------------- |
| **Indicador**                           | **Demo**              | **Meta o umbral**                              |
| Compradores activos                     | 112                   | 200                                            |
| Proveedores activos                     | 31                    | 50                                             |
| Cobertura del comparador                | 71 % (17 de 24)       | 70 % o más                                     |
| Recompra a 60 días                      | 34 %                  | 30 % o más                                     |
| Precios vigentes                        | 93 %                  | —                                              |
| Reclamos cerrados en 48 h               | 96 %                  | —                                              |
| Pedidos con precio distinto al mostrado | 0.3 %                 | 1 % en un día activa el canal algedónico (2 h) |
| Ventas del mes / comisión del mes       | S/ 186,400 / S/ 4,660 | —                                              |

### A.3 Definiciones para calcular

- **Hoy** = reloj simulado. Valor inicial: 09/11/2026.
- **Días restantes de una oferta** = 7 − (hoy − fecha de confirmación), en días calendario.
- **Oferta vigente** si le queda al menos 1 día. Con 1 día se muestra «vence mañana». Con 0 o menos pasa a «No disponible»: sale del comparador y no cuenta para el semáforo.
- **Por vencer en 48 h**: ofertas vigentes con 2 días restantes o menos. Al 09/11 son dos: aceite de Abarrotes Wayna (confirmado el 03/11) y táper de Descartables Ayni (confirmado el 04/11).
- **Semáforo de un SKU** = número de ofertas vigentes de proveedores activos: 3 verde, 2 ámbar, 1 o 0 rojo. Para los 21 SKU sin precios, la tabla de §A.2 dice qué proveedores lo ofrecen («Verde» = los tres de su categoría); se considera que esas ofertas están vigentes durante toda la demo.
- **Cobertura** = SKU en verde ÷ 24. Se muestra como «17 de 24» y «71 %» (redondeo al entero).
- **Comisión** = 2.5 % de cada línea del pedido, en céntimos, redondeo half-up por línea.
- **Liquidación de un proveedor** = su subtotal − su comisión. Se paga cada semana.
- **Variación de precio** = (nuevo − anterior) ÷ anterior, redondeada al entero: 198.00 → 210.00 = 6 %.
- **Valores fijos del tablero.** Los indicadores de la demo son totales de la plataforma (112 compradores, 31 proveedores…), no salen de los seis proveedores en pantalla. Solo la cobertura y los semáforos se calculan; los demás no se recalculan en ningún escenario, salvo el porcentaje de pedidos con precio distinto en el escenario E4.

### A.4 Estilo de las pantallas

|                          |                                                                                                                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cómo se hacen**        | En HTML, capturadas en PNG al 100 %.                                                                                                                                                            |
| **Marca**                | La palabra «Mallki» en negrita, en verde Mallki, arriba a la izquierda. Sin logo.                                                                                                               |
| **Colores**              | Verde Mallki \#1F5F3F en barra superior y botones · fondo crema \#F7F3EA · tarjetas blancas · texto \#1F2937. Verde \#16A34A, ámbar \#F59E0B y rojo \#DC2626 solo en el semáforo y las alertas. |
| **Letra**                | Inter; si no está, Arial.                                                                                                                                                                       |
| **Tamaño**               | Comprador (M1, M3, M4): celular 390 × 844 px. Proveedor (M2) y tablero (M5): web 1440 × 900 px.                                                                                                 |
| **Formatos**             | S/ 1,234.50 · 09/11/2026 · en español                                                                                                                                                           |
| **Pie de cada pantalla** | «Prototipo Mallki · datos de demostración»                                                                                                                                                      |
| **Nombre del archivo**   | M1-1\_Registro.png, M1-2\_Onboarding.png… (módulo, número de pantalla, nombre corto)                                                                                                            |

### A.5 Lo que no va

  - «Health Meter»: se dice **tablero de indicadores**.

  - Marcas reales de productos, bancos o billeteras, y nombres de empresas reales.

  - Tecnopor en el catálogo, o el táper de polipropileno marcado como ecológico.

  - «Ya opera», «clientes actuales», «resultados obtenidos».

  - Mallki entregando, con almacén o con flota: cada proveedor despacha lo suyo.

  - Perecibles, Lima Metropolitana como piloto, «U4» o «Unidad 1.1».

  - Nombres de integrantes dentro del contenido; solo en portada, autores y formatos.

Además, tomado de los «Errores a evitar» del lineamiento y de este repo:

  - Más de tres ofertas por producto en pantalla, o etiquetas como «patrocinado» o «recomendado».
  - Logos de marcas reales. WhatsApp se nombra como canal, con texto y sin su logo.
  - Un cobro al comprador en el M1, o la comisión sumada a su total en el M4.

---

## B. Pantallas

### B.1 Rutas, tamaños y archivos de captura

| Pantalla | Ruta | Tamaño | Archivo de captura |
|---|---|---|---|
| M1-1 Registro | `#/m1-1` | 390 × 844 | `M1-1_Registro.png` |
| M1-2 Onboarding | `#/m1-2` | 390 × 844 | `M1-2_Onboarding.png` |
| M1-3 Inicio | `#/m1-3` | 390 × 844 | `M1-3_Inicio.png` |
| M1-4 Mis pedidos y reclamos | `#/m1-4` | 390 × 844 | `M1-4_Pedidos.png` |
| M2-1 Registro | `#/m2-1` | 1440 × 900 | `M2-1_Registro.png` |
| M2-2 Catálogo | `#/m2-2` | 1440 × 900 | `M2-2_Catalogo.png` |
| M2-3 Confirmación de precios | `#/m2-3` | 1440 × 900 | `M2-3_Confirmacion.png` |
| M2-4 Panel | `#/m2-4` | 1440 × 900 | `M2-4_Panel.png` |
| M3-1 Buscador | `#/m3-1` | 390 × 844 | `M3-1_Buscador.png` |
| M3-2 Comparador | `#/m3-2` | 390 × 844 | `M3-2_Comparador.png` |
| M3-3 Alerta de precio | `#/m3-3` | 390 × 844 | `M3-3_Alerta.png` |
| M3-4 Semáforo | `#/m3-4` | 390 × 844 | `M3-4_Semaforo.png` |
| M4-1 Carrito | `#/m4-1` | 390 × 844 | `M4-1_Carrito.png` |
| M4-2 Confirmación | `#/m4-2` | 390 × 844 | `M4-2_Confirmacion.png` |
| M4-3 Pago | `#/m4-3` | 390 × 844 | `M4-3_Pago.png` |
| M4-4 Seguimiento | `#/m4-4` | 390 × 844 | `M4-4_Seguimiento.png` |
| M5-1 Tablero | `#/m5-1` | 1440 × 900 | `M5-1_Tablero.png` |
| M5-2 Semáforos | `#/m5-2` | 1440 × 900 | `M5-2_Semaforos.png` |
| M5-3 Alertas | `#/m5-3` | 1440 × 900 | `M5-3_Alertas.png` |
| M5-4 Compromisos | `#/m5-4` | 1440 × 900 | `M5-4_Compromisos.png` |

Las capturas se toman siempre con el estado inicial del 09/11/2026 y la URL con `?captura=1`. Si la pantalla no cabe en el tamaño, se ajusta el diseño: no se corta contenido ni se hace scroll dentro de la captura.

### B.2 Navegación del prototipo

- Comprador: M1-1 → M1-2 → M1-3. Desde Inicio: Comparar (M3-1), Mis pedidos (M1-4), Reclamos (M1-4).
- M3-1 → M3-2 (aceite) → «Agregar al pedido». La alerta M3-3 se abre desde un aviso en M3-1 o M1-3. M3-4 se abre desde M3-1.
- Carrito M4-1 → Confirmar M4-2 → Pagar M4-3 → Seguimiento M4-4 → Mis pedidos M1-4.
- El carrito se arma con las elecciones de Rosa. Para la demo hay un atajo «Cargar pedido N.° 0042» que deja el carrito exactamente como en §A.2.
- Proveedor: M2-1 → M2-2 → M2-3 → M2-4. Tablero: M5-1 a M5-4 con pestañas.
- Índice `#/` con las 20 pantallas agrupadas por módulo, para el expositor.

### B.3 Fichas (copiadas del lineamiento)

**Ficha del M1 · Registro y onboarding del comprador** (U1 · celular · Pollería Sumaq)

|                                 |                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pantalla**                    | **Qué muestra**                                                                                                                                                  |
| **M1-1 Registro**               | RUC, razón social, tipo de negocio (restaurante, pollería, panadería, pastelería o cafetería), distrito de Lima Centro y WhatsApp. Botón «Registrarme».          |
| **M1-2 Onboarding**             | Categorías que compra y su lista habitual, elegida de los 24 SKU. Opción «Prefiero que me ayuden por WhatsApp» (vía asistida, política de accesibilidad del S5). |
| **M1-3 Inicio**                 | Accesos a Comparar, Mis pedidos y Reclamos. Botón «Ayuda por WhatsApp» con «Respondemos en menos de 4 horas hábiles».                                            |
| **M1-4 Mis pedidos y reclamos** | El pedido N.° 0042 con su estado por proveedor. Botón «Abrir reclamo» con «Lo resolvemos en 48 horas» (M8).                                                      |

**Ficha del M2 · Catálogo y precios del proveedor** (U2 · web · Distribuidora Qhapaq)

|                                  |                                                                                                                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Pantalla**                     | **Qué muestra**                                                                                                                                                                                                                            |
| **M2-1 Registro**                | RUC, razón social, categorías, distritos de reparto en Lima Centro y carga de documentos sanitarios (los presenta el proveedor; los verifica U2).                                                                                          |
| **M2-2 Catálogo**                | Elegir el SKU de la lista de 24 y llenar precio, stock referencial y plazo. Opción «Subir Excel». En envases, casilla «Opción ecológica (Ley 30884)».                                                                                      |
| **M2-3 Confirmación de precios** | Sus ofertas con «Confirmar precio» y los días que les quedan. Sin confirmar en 7 días, la oferta pasa a «No disponible» (M3 del S2).                                                                                                       |
| **M2-4 Panel**                   | Su parte del pedido N.° 0042: 2 aceites, S/ 236.00. Calificación 4.6. Liquidación semanal: S/ 236.00 − S/ 5.90 = S/ 230.10. Aviso «Si tu calificación baja de 3.5, tu cuenta pasa a revisión» (M2). Descargo de reclamos en 24 horas (M8). |

**Ficha del M3 · Comparador por SKU ancla** (U3 · celular)

|                           |                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pantalla**              | **Qué muestra**                                                                                                                                                                                                                                                                                            |
| **M3-1 Buscador**         | Por categoría o producto, por ejemplo «aceite vegetal 18 L». Filtro «Opción ecológica».                                                                                                                                                                                                                    |
| **M3-2 Comparador**       | Aceite vegetal de 18 L con sus tres ofertas de 2.3: precio, plazo, calificación y fecha de confirmación, de menor a mayor precio. Wayna lleva «vence mañana». Enlace «¿Cómo ordenamos?»: el orden no cambia porque alguien pague (neutralidad del S5) y un cambio de criterios se avisa con 72 horas (M4). |
| **M3-3 Alerta de precio** | «El arroz extra de 50 kg de Abarrotes Wayna subió de S/ 198.00 a S/ 210.00 (6 %).» Debajo, las alternativas: Comercial Inti S/ 199.00 y Distribuidora Qhapaq S/ 205.00 (M6).                                                                                                                               |
| **M3-4 Semáforo**         | Los 24 SKU con su color de 2.3 y el resumen «17 de 24 en verde: 71 %» (M1 del S2).                                                                                                                                                                                                                         |

**Ficha del M4 · Pedido a varios proveedores y pago** (pagos y facturación, con U1 · celular)

|                       |                                                                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Pantalla**          | **Qué muestra**                                                                                                                                                                                                                                              |
| **M4-1 Carrito**      | Pedido N.° 0042 agrupado por proveedor, con subtotal y plazo de cada uno. Total S/ 490.60.                                                                                                                                                                   |
| **M4-2 Confirmación** | Al confirmar, «Precio fijado»: ya no cambia aunque el proveedor lo actualice (M5 del S2).                                                                                                                                                                    |
| **M4-3 Pago**         | Pasarela con medios genéricos (tarjeta, transferencia o billetera digital, sin marcas) y comprobante electrónico. Un solo pago de S/ 490.60.                                                                                                                 |
| **M4-4 Seguimiento**  | Estado y fecha de entrega con cada proveedor. Vista «Cómo se reparte tu pago»: Rosa paga S/ 490.60; Mallki retiene el 2.5 % (S/ 12.27) y paga S/ 478.33 cada semana. Aviso: «Si abres un reclamo, el pago a ese proveedor se retiene hasta resolverlo» (M8). |

**Ficha del M5 · Panel de indicadores y alertas** (tablero del S3, reglas del S2 y canal algedónico · web)

|                      |                                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pantalla**         | **Qué muestra**                                                                                                                                                             |
| **M5-1 Tablero**     | Los indicadores de 2.3 frente a su meta, con el rótulo «Datos de demostración · mes 3 del piloto».                                                                          |
| **M5-2 Semáforos**   | Cobertura por SKU, igual que el M3 (17, 5 y 2). Ofertas por vencer en 48 horas (M3).                                                                                        |
| **M5-3 Alertas**     | Precio distinto al mostrado: 0.3 % hoy; desde 1 % en un día, canal algedónico con 2 horas. Proveedor con 30 % o más de una categoría (M6). Reclamos fuera de 48 horas (M8). |
| **M5-4 Compromisos** | Lo comprometido por U1, U2 y U3 frente a lo logrado en el mes (canal C4).                                                                                                   |

### B.4 Precisiones por módulo

**M1 · Registro y onboarding del comprador**

- Los campos de M1-1 se muestran llenos con los datos de la Pollería Sumaq (§A.2): RUC 20000012345, tipo de negocio pollería, distrito Cercado de Lima, WhatsApp +51 9 * 321.
- La lista de distritos de Lima Centro no está definida: ver P-03.
- En M1-2 la lista habitual se elige de los 24 SKU de §A.2. Los SKU que Rosa marque no se definen en la base: por defecto se marcan los tres del pedido N.° 0042 (aceite, arroz y táper de 1 lb). Ver P-12.
- Nunca se muestra un cobro, tarifa o suscripción al comprador.

**M2 · Catálogo y precios del proveedor (Distribuidora Qhapaq)**

- Qhapaq solo tiene precio definido en aceite (S/ 118.00, confirmado el 07/11) y arroz (S/ 205.00, confirmado el 07/11). M2-2 y M2-3 muestran esas dos ofertas; el resto de su catálogo queda en P-02.
- En M2-3, «días que les quedan» sale de §A.3: al 09/11 a ambas les quedan 5 días.
- La casilla «Opción ecológica (Ley 30884)» aparece solo para envases y empaques. Qhapaq es de abarrotes: en su pantalla la casilla no aparece. Ver P-11.
- M2-4: ningún proveedor está en revisión; el aviso de 3.5 es informativo.

**M3 · Comparador por SKU ancla**

- Máximo tres ofertas por SKU, ordenadas por precio de menor a mayor. Sin destacados pagados ni etiquetas de recomendación.
- El orden muestra el criterio («¿Cómo ordenamos?»): precio de menor a mayor; el orden no cambia porque alguien pague; un cambio de criterios se avisa con 72 horas.
- En el comparador del aceite, la oferta de Wayna lleva «vence mañana» (calculado, no escrito a mano).
- M3-4 lista los 24 SKU en el orden de §A.2 con su color, y arriba «17 de 24 en verde: 71 %».

**M4 · Pedido a varios proveedores y pago**

- Una sola operación de pago por S/ 490.60. La comisión no aparece como cargo al comprador.
- «Cómo se reparte tu pago» muestra por proveedor: subtotal, comisión de 2.5 % y lo que recibe, y los totales S/ 490.60, S/ 12.27 y S/ 478.33.
- Medios de pago genéricos: tarjeta, transferencia, billetera digital. Sin nombres ni logos.
- Fechas de entrega: se calculan como hoy + plazo de cada proveedor (24 h → 10/11/2026; 48 h → 11/11/2026). Cada proveedor despacha lo suyo.

**M5 · Panel de indicadores y alertas**

- M5-1: los 8 indicadores de la tabla «Tablero de demostración» con su meta o umbral, y el rótulo «Datos de demostración · mes 3 del piloto».
- M5-2: el mismo semáforo que M3-4 (calculado con la misma función) y la lista de ofertas por vencer en 48 h.
- M5-3: «precio distinto al mostrado: 0.3 % hoy» está definido. La concentración de un proveedor (30 % o más de una categoría) y los reclamos fuera de 48 h no tienen valor en la base: ver P-04. Mientras tanto se muestran la regla, el umbral y «—» como valor.
- M5-4: lo comprometido y lo logrado por U1, U2 y U3 no está definido: ver P-05. Mientras tanto, la pantalla muestra la estructura (unidad, compromiso, logrado, canal C4) con «—».

---

## C. Reglas del Sistema 2 (mecanismos S2-M1 a S2-M8)

| Mecanismo | Regla | Dónde se ve | Escala al S3 cuando |
|---|---|---|---|
| S2-M1 Semáforo de liquidez | 3 ofertas vigentes de proveedores activos = verde; 2 = ámbar; 1 o 0 = rojo. Meta: 17 de 24 en verde. Una categoría con SKU en rojo no se abre a campaña | M3-4, M5-2 | Categoría en rojo 4 semanas seguidas o cobertura menor a 50 % |
| S2-M2 Curaduría | Proveedor con calificación menor a 3.5 sobre 5 pasa a revisión. U2 decide alta y suspensión | M2-4 | Revisiones por encima de la capacidad 2 semanas seguidas |
| S2-M3 Vigencia de 7 días | Solo es vigente el precio confirmado en los últimos 7 días; vencido, pasa a «No disponible» | M2-3, M3-2, M5-2 | Más de 10 % de ofertas vencidas en un SKU ancla durante 2 ciclos |
| S2-M4 Registro de cambios del ranking | Todo cambio de orden se registra y se avisa a U1 y U2 con 72 horas | M3-2 («¿Cómo ordenamos?») | Cambio sin registro detectado por el S3* |
| S2-M5 Fuente única de precios | U3 es la única fuente de precios; el precio se fija al confirmar el pedido | M4-2, M5-3 | 0.5 % o más de pedidos con precio distinto en el mes; más de 1 % en un día es señal algedónica |
| S2-M6 Reparto de alertas | Cada alerta reparte la demanda entre 2 o 3 alternativas, con tope por capacidad declarada | M3-3, M5-3 | Proveedor con 30 % o más de la categoría después de las 24 h de U2 |
| S2-M7 Calendario compartido | Campañas con aviso de 7 días y cupo semanal de onboarding asistido | Sin pantalla | Demanda sobre el cupo 2 semanas seguidas |
| S2-M8 Dueño único del reclamo | U1 conduce y cierra en 48 h; U2 da el descargo en 24 h; pagos retiene la liquidación de ese proveedor | M1-4, M2-4, M4-4, M5-3 | Reclamo sobre 0.1 UIT (S/ 550) o plazo incumplido en 5 % o más de los casos |

Ninguna regla exige la aprobación previa de una persona: el S2 informa, no aprueba.

## D. Tablero (M5) y zonas de control del S3

- El cuadro de mando del S3 tiene 15 indicadores. **El tablero de la demo muestra solo los 8 de §A.2.** Los otros 7 no se agregan sin decisión del DP.
- Zonas: **verde** (dentro de la meta, nadie interviene); **alerta** (la unidad corrige dentro de su autonomía; si es entre unidades, el S2); **excepción al S3** (cruza un umbral de escalada de §C); **algedónica** (una de las señales de §E).
- En la demo, la cobertura (71 %) está dentro de la meta de 70 %.
- En el escenario E1 baja a 16 de 24 (67 %): queda bajo la meta, pero no cruza el umbral de alerta del S3, que es menos de 50 % en una categoría ancla (abarrotes queda en 10 de 12 y envases sigue en 6 de 12, justo 50 %). Cómo se rotula ese estado intermedio: P-10.

## E. Canal algedónico

| Señal | Plazo de la unidad | Si vence, el S3 |
|---|---|---|
| Error masivo de precios: más de 1 % de los pedidos del día con precio distinto | 2 h | 24 h |
| Salida de un proveedor ancla con 30 % o más de la oferta de una categoría | 24 h | 48 h |
| Fuga de datos transaccionales | Inmediato | Inmediato |
| Oferta condicionada a romper la neutralidad | No definido | No definido |
| Denuncia pública de sesgo en el ranking | No definido | No definido |
| Señal de placer: un gremio ofrece adopción en bloque | No definido | No definido |

Al S5 llega lo que exige una decisión de política. La caída de la pasarela de pagos no es señal algedónica: es un incidente del S3. En el prototipo solo se simula la primera señal (escenario E4).

## F. Modo simulación (panel del presentador)

- Vive en `#/simulacion`, en una vista web separada. Nunca aparece en las capturas.
- Muestra el reloj simulado, un botón «Reiniciar demo» y los escenarios. Todo lo que cambia un escenario se rotula «Escenario de simulación».
- Cada escenario sale de un caso ya entregado en el S2 o el S3. No se agregan escenarios sin decisión del DP.

| Escenario | Qué hace el presentador | Qué debe pasar | Mecanismo | Origen |
|---|---|---|---|---|
| E1 Precio vencido | Avanza el reloj al 10/11/2026 | La oferta de aceite de Wayna pasa a «No disponible»; el comparador del aceite muestra 2 ofertas; el aceite pasa a ámbar; la cobertura baja a 16 de 24 (67 %) y M5 la muestra bajo la meta (ver §D) | S2-M3, S2-M1 | S2: bucle de un proveedor que no confirma su precio en 7 días |
| E2 Alerta de precio | Aplica la subida del arroz de Wayna (desde S/ 198.00) | Aparece la alerta de 6 % con las alternativas Comercial Inti S/ 199.00 y Distribuidora Qhapaq S/ 205.00 | S2-M6 | Ficha M3-3; S2-M6 |
| E3 Precio fijado | Con el pedido N.° 0042 confirmado, escribe un nuevo precio para el aceite de Qhapaq | El pedido conserva S/ 118.00; un pedido nuevo usa el precio nuevo; el indicador de precio distinto no cambia | S2-M5 | S2: caso de prueba 2 |
| E4 Error masivo de precios | Escribe el porcentaje de pedidos del día con precio distinto | Desde más de 1 % se dispara la señal algedónica: la unidad tiene 2 h; si vence, el S3 24 h | S2-M5, canal algedónico | S2: caso de prueba 2; S3 §6.5 |
| E5 Reclamo | Rosa abre un reclamo sobre la parte de un proveedor del pedido N.° 0042 | La liquidación de ese proveedor queda retenida; corren las 48 h de U1 y las 24 h del descargo de U2; si el monto superara S/ 550 sería excepción al S3 (en el pedido N.° 0042 no ocurre) | S2-M8 | S2-M8; S3 §6.5 |

Los valores que escribe el presentador (E3, E4) no tienen valor por defecto hasta que el DP decida (P-06).

## G. Glosario

- **Comprador activo:** al menos un pedido en los últimos 30 días.
- **Proveedor activo:** catálogo vigente y al menos un pedido en los últimos 30 días.
- **Precio vigente:** confirmado por el proveedor en los últimos 7 días.
- **SKU ancla:** producto de una categoría ancla (abarrotes secos; envases y empaques). Son 24 en el piloto.
- **Cobertura:** SKU ancla con 3 ofertas comparables de proveedores activos ÷ 24.
- **Liquidación semanal:** pago de Mallki a cada proveedor: su venta menos la comisión de 2.5 %.
- **U1, U2, U3:** unidades operativas del Sistema 1: Comprador, Proveedor, Analítica y Riesgo.
- **C3, C4, C5, C6:** canales del S3: decisiones fuera de la autonomía (C3), negociación de recursos y rendición (C4), coordinación del S2 (C5), auditoría del S3* (C6).
- **Canal algedónico:** alarma que salta niveles cuando algo amenaza la viabilidad o la identidad.
