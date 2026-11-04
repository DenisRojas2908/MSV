# Plan de construcción

Cada fase se cierra con `npm test` y `npm run build` sin errores, un resumen escrito y la revisión del DP. Ninguna fase empieza sin plan aprobado.

## Reglas para trabajar en paralelo

- **F0 va sola y primero.** Nada más empieza hasta que F0 esté integrada en `main`.
- Después de F0, `src/data`, `src/domain` y `src/store` quedan congelados. Si una sesión necesita algo ahí, se detiene y lo pide; el DP lo resuelve en la sesión principal.
- Cada sesión trabaja en su rama y solo toca sus carpetas:

| Sesión | Fases | Rama | Carpetas que puede tocar |
|---|---|---|---|
| Principal | F0, luego F5 | `f0-base`, `f5-simulacion` | todo en F0; en F5, `src/simulacion`, `src/store` y `src/domain` (A, B y C ya terminaron) |
| A · Comprador | F1, luego F3 | `f1-comprador` | `src/modules/m1-registro`, `m3-comparador`, `m4-pedido-pago` |
| B · Web | F2, luego F4 | `f2-web` | `src/modules/m2-proveedor`, `m5-tablero` |
| C · Capturas | F6 | `f6-capturas` | `scripts/`, configuración de despliegue, `README.md` |
| Auditoría | F7 | ninguna (solo lee) | escribe solo `docs/AUDITORIA.md` |

- Las rutas de las 20 pantallas se registran en F0 con un componente provisional, para que A y B no editen el mismo archivo de rutas.

## F0 · Base (sesión principal)

**Entrega**

- Proyecto Vite + React + TypeScript + Tailwind con los tokens de §A.4, Inter local y `HashRouter`.
- Índice `#/` con las 20 rutas y una pantalla provisional por ruta.
- `ui/`: PhoneFrame (390 × 844), WebFrame (1440 × 900), Marca, Pie, Semaforo, Dinero, Fecha. Modo `?captura=1`.
- `data/`: todo §A.2 tipado (comprador, proveedores, 24 SKU con qué proveedores los ofrecen, 9 ofertas con precio y fecha, pedido N.° 0042, tablero).
- `domain/`: dinero en céntimos y formato; días restantes y vigencia; semáforo y cobertura (total y por categoría); comisión y liquidación; variación de precio; alternativas de una alerta; precio fijado; estado de reclamo y retención; umbral de la señal algedónica.
- `store/`: reloj simulado (09/11/2026), ofertas, carrito, pedidos, reclamos, eventos; «Reiniciar demo». Incluye desde ya las acciones que usarán los módulos: confirmar precio, agregar al carrito, cargar pedido N.° 0042, confirmar, pagar, abrir reclamo.
- `tests/`: todas las pruebas de `CLAUDE.md`.

**Aceptación**

- [ ] `npm test` en verde con cada invariante de `CLAUDE.md`.
- [ ] El índice abre las 20 rutas; cada una muestra marco del tamaño correcto, marca y pie.
- [ ] Ningún componente tiene montos o porcentajes escritos a mano.

## F1 · Comprador: M3 y M4 (sesión A)

**Entrega:** M3-1 a M3-4 y M4-1 a M4-4 según §B, con la navegación de §B.2 y el atajo «Cargar pedido N.° 0042».

**Aceptación**

- [ ] M3-2 muestra las 3 ofertas del aceite en el orden Wayna, Qhapaq, Inti, con «vence mañana» en Wayna y el enlace «¿Cómo ordenamos?».
- [ ] M3-3 dice exactamente el texto de la ficha, con las dos alternativas.
- [ ] M3-4 da 17, 5 y 2, y «17 de 24 en verde: 71 %».
- [ ] M4-1 agrupa por proveedor con subtotal y plazo; total S/ 490.60.
- [ ] M4-2 muestra «Precio fijado»; M4-3, un solo pago de S/ 490.60 con medios genéricos.
- [ ] M4-4 muestra el reparto: S/ 490.60, S/ 12.27, S/ 478.33, y el aviso de retención por reclamo.
- [ ] Ningún texto cobra algo al comprador.

## F2 · Proveedor: M2 (sesión B)

**Entrega:** M2-1 a M2-4 para Distribuidora Qhapaq.

**Aceptación**

- [ ] M2-3 muestra aceite y arroz con 5 días restantes y el botón «Confirmar precio»; confirmar reinicia los días en el store.
- [ ] M2-4: 2 aceites, S/ 236.00, calificación 4.6, S/ 236.00 − S/ 5.90 = S/ 230.10, aviso de 3.5 y descargo en 24 h.
- [ ] Ningún dato de Qhapaq fuera de §A.2.

## F3 · Comprador: M1 (sesión A, después de F1)

**Entrega:** M1-1 a M1-4.

**Aceptación**

- [ ] M1-1 con los datos de la Pollería Sumaq; M1-2 con la opción de ayuda asistida por WhatsApp.
- [ ] M1-3 con Comparar, Mis pedidos, Reclamos y «Respondemos en menos de 4 horas hábiles».
- [ ] M1-4 muestra el pedido N.° 0042 con estado por proveedor y «Abrir reclamo» con «Lo resolvemos en 48 horas».

## F4 · Tablero: M5 (sesión B, después de F2)

**Entrega:** M5-1 a M5-4 en pestañas.

**Aceptación**

- [ ] M5-1: los 8 indicadores con su meta y el rótulo «Datos de demostración · mes 3 del piloto».
- [ ] M5-2 usa la misma función de semáforo que M3-4 y lista las 2 ofertas por vencer en 48 h.
- [ ] M5-3 y M5-4 respetan §B.4 (lo no definido se muestra con «—» y queda en `DECISIONES.md`).
- [ ] La palabra «Health Meter» no aparece en ningún lado.

## F5 · Modo simulación (sesión principal, con F1 a F4 integradas)

**Entrega:** `#/simulacion` con reloj, «Reiniciar demo» y los escenarios E1 a E5 de §F. Cada escenario puede verse en paralelo con la pantalla afectada.

**Aceptación**

- [ ] E1: al 10/11, aceite con 2 ofertas, ámbar, cobertura 16 de 24 (67 %) en M3-4 y M5.
- [ ] E2 a E5 producen exactamente lo descrito en §F.
- [ ] «Reiniciar demo» devuelve todo al 09/11 y las capturas vuelven a salir idénticas.
- [ ] Pruebas nuevas para cada escenario.

## F6 · Capturas y despliegue (sesión C)

**Entrega**

- `npm run capturas`: Playwright abre cada ruta con `?captura=1`, viewport exacto de §B.1, `deviceScaleFactor: 1`, y guarda los 20 PNG en `capturas/` con su nombre.
- Despliegue estático (GitHub Pages con GitHub Actions, o Vercel; ver P-08) y `README.md` con cómo correr, capturar y desplegar.

**Aceptación**

- [ ] 20 PNG, nombres exactos, tamaños exactos (verificados por el script).
- [ ] Si Chromium no se puede descargar en la nube, el README explica cómo correr `npm run capturas` en Windows.
- [ ] La URL publicada abre el índice y todas las rutas.

## F7 · Auditoría (sesión nueva, que no escribió el código)

**Entrega:** `docs/AUDITORIA.md` con cada hallazgo: pantalla, qué muestra, qué dice la especificación, severidad (bloquea / corregir / menor). No corrige nada.

**Aceptación**

- [ ] Recorrió las 20 pantallas y los 5 escenarios.
- [ ] Revisó cada número contra §A.2, cada texto contra §A.5 y cada ficha contra §B.3.

## Orden sugerido para hoy

1. Principal: F0 (hasta integrarla en `main`).
2. En paralelo: sesión A (F1 → F3), sesión B (F2 → F4), sesión C (F6 con pantallas provisionales; se vuelve a correr al final).
3. Principal: F5.
4. Sesión nueva: F7. Lo que salga como «bloquea» se corrige en la sesión dueña de esa carpeta.
