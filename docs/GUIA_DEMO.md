# Guía de la demo · Feria FIIS 2026-II

Recorrido clic a clic para el stand y la exposición. Todo es una simulación con datos de demostración: al hablar, decir «se diseña», «se espera», «permitiría». Nunca «clientes actuales» ni «resultados obtenidos».

## Antes de empezar

1. Abrir la URL publicada (o `npm run dev`) en dos ventanas:
   - **Ventana A (pantallas):** `#/` (índice). Para el comprador conviene una ventana angosta o el modo celular del navegador.
   - **Ventana B (expositor):** `#/simulacion`.
2. En la ventana B, clic en **Reiniciar demo**. Todo vuelve al lunes 09/11/2026 y el pedido N.° 0042 queda pagado.
3. Las dos ventanas se sincronizan solas: lo que cambia un escenario en B se ve en A.

## Recorrido 1 · Rosa compra a tres proveedores en un solo pedido (3 minutos)

| Paso | Clic | Qué mostrar | MSV |
|---|---|---|---|
| 1 | `#/m1-1` | Registro de la Pollería Sumaq: RUC, tipo pollería, Cercado de Lima. «Registrarme». | U1 Comprador |
| 2 | Registrarme → M1-2 | Lista habitual elegida de los 24 SKU; «Prefiero que me ayuden por WhatsApp» (vía asistida). | U1 |
| 3 | Continuar → M1-3 | Accesos a Comparar, Mis pedidos y Reclamos; aviso de precio del arroz. | U1; S2-M6 |
| 4 | Comparar → M3-1 | Buscador por categoría o producto y filtro «Opción ecológica». | U3 |
| 5 | Aceite vegetal → M3-2 | **Tres ofertas, de menor a mayor precio.** Wayna «vence mañana». Abrir «¿Cómo ordenamos?»: el orden no cambia porque alguien pague; un cambio de criterios se avisa con 72 horas. | S2-M4, S2-M3 |
| 6 | Atrás → Semáforo (M3-4) | 17 de 24 en verde: 71 %. Verde = los tres proveedores de la categoría lo ofrecen. | S2-M1 |
| 7 | `#/m4-1` → **Cargar pedido N.° 0042** (botón sobre el marco) | Pedido agrupado por proveedor: Qhapaq, Inti y Pacha; total S/ 490.60. Rosa eligió Qhapaq aunque Wayna era S/ 1.10 más barato, porque lo necesitaba en 24 horas. | Pagos y facturación |
| 8 | Confirmar pedido → M4-2 | **«Precio fijado»**: ya no cambia aunque el proveedor lo actualice. | S2-M5 |
| 9 | Ir a pagar → M4-3 | Un solo pago de S/ 490.60, medios genéricos, comprobante electrónico. La comisión no se suma. | Pagos y facturación |
| 10 | Pagar → M4-4 | **«Cómo se reparte tu pago»**: S/ 490.60; Mallki retiene el 2.5 % (S/ 12.27) y les paga S/ 478.33 en la liquidación semanal. Aviso de retención si hay reclamo. | Pagos; S2-M8 |
| 11 | Ir a Mis pedidos → M1-4 | Estado por proveedor («Pagado», entrega 10/11 y 11/11). «Abrir reclamo · Lo resolvemos en 48 horas». | U1; S2-M8 |

Frase clave: **«El comparador es neutral, hay tres ofertas por producto y la comisión la paga el proveedor.»**

## Recorrido 2 · El proveedor (1 minuto)

| Paso | Clic | Qué mostrar | MSV |
|---|---|---|---|
| 1 | `#/m2-1` | Registro de Distribuidora Qhapaq; los documentos sanitarios los presenta el proveedor y los verifica U2. | U2 Proveedor |
| 2 | Catálogo (M2-2) | Elige el SKU de la lista de 24; precio, stock y plazo; «Subir Excel». | U2; S2-M2 |
| 3 | Confirmación de precios (M2-3) | A sus dos ofertas les quedan 5 días. Sin confirmar en 7 días, pasa a «No disponible». | S2-M3 |
| 4 | Panel (M2-4) | Su parte del pedido N.° 0042: S/ 236.00 − S/ 5.90 = S/ 230.10. Calificación 4.6 y aviso de 3.5. Descargo en 24 horas. | S2-M2, S2-M8 |

## Recorrido 3 · La organización viable funcionando (3 minutos)

Ventana B, `#/simulacion`. Cada escenario muestra a la derecha las pantallas afectadas.

| Escenario | Clic | Qué se ve | MSV |
|---|---|---|---|
| E1 Precio vencido | «Avanzar el reloj al día siguiente» | El aceite de Wayna pasa a «No disponible»; el comparador muestra 2 ofertas; el aceite pasa a ámbar; cobertura 16 de 24 (67 %); M5 la marca «Bajo la meta». | S2-M3, S2-M1, S3 |
| E2 Alerta de precio | «1 · Antes de la subida» y luego «2 · Aplicar la subida» | Con S/ 198.00 Wayna va primero; con S/ 210.00 baja al tercer lugar y aparece la alerta de 6 % con Comercial Inti S/ 199.00 y Distribuidora Qhapaq S/ 205.00. | S2-M6 |
| E3 Precio fijado | Escribir un precio nuevo → «Aplicar precio nuevo»; luego «Pedido nuevo con 1 aceite» | El pedido N.° 0042 conserva S/ 118.00; el pedido nuevo usa el precio nuevo; el indicador de precio distinto no cambia. | S2-M5 |
| E4 Error masivo | Escribir un porcentaje → «Aplicar» | Con más de 1 % se activa la señal algedónica: la unidad tiene 2 h; si vence, el S3 24 h. Con 1 % exacto no. | S2-M5, canal algedónico |
| E5 Reclamo | «Abrir reclamo a Distribuidora Qhapaq» | La liquidación de Qhapaq queda retenida; corren las 48 h de U1 (cierre 11/11) y las 24 h de U2 (descargo 10/11); S/ 236.00 no supera S/ 550, no escala. | S2-M8 |

Al terminar, **Reiniciar demo**.

## Recorrido 4 · El tablero del S3 (1 minuto)

| Clic | Qué mostrar | MSV |
|---|---|---|
| `#/m5-1` | Los 8 indicadores frente a su meta, «Datos de demostración · mes 3 del piloto». Las metas son a seis meses. | S3, cuadro de mando |
| Semáforos (M5-2) | El mismo semáforo que ve el comprador (17, 5 y 2) y las 2 ofertas por vencer en 48 horas. | S2-M1, S2-M3 |
| Alertas (M5-3) | 0.3 % de precio distinto hoy; más de 1 % activa el canal algedónico. Concentración de un proveedor (sin dato) y reclamos fuera de 48 h (4 %). | S2-M5, S2-M6, S2-M8, canal algedónico |
| Compromisos (M5-4) | Meta a seis meses frente a lo logrado al mes 3 de U1, U2 y U3 por el canal C4. | S3, C4 |

## Si preguntan por la arquitectura

«El prototipo es una simulación en un solo bloque porque su función es demostrar el diseño. Está dividido igual que la organización: cada módulo corresponde a una unidad, y por eso podría separarse cuando Mallki opere.»

## Si algo falla

- Pantalla rara o datos cambiados: **Reiniciar demo** en `#/simulacion` o en `#/`.
- Sin internet: la app no necesita conexión una vez cargada (la fuente Inter va incluida).
