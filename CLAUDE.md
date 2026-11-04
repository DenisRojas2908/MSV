# Mallki · Prototipo de simulación (Feria FIIS 2026-II)

Este repositorio es el prototipo navegable de **Mallki**, un marketplace B2B asset-light de insumos no perecibles para las MYPE gastronómicas de Lima Centro. Es el entregable de software del curso Modelo del Sistema Viable (SI801, FIIS-UNI) y se presenta en la Feria de Proyectos FIIS 2026-II. **Mallki no opera**: todo lo que muestra es una simulación con datos de demostración.

Antes de cualquier tarea, lee en este orden:

1. `docs/ANALISIS.md`: qué es el proyecto, para quién y por qué está hecho así.
2. `docs/ESPECIFICACION.md`: la fuente de verdad (datos, pantallas, reglas, estilo).
3. `docs/PLAN.md`: fases, criterios de aceptación y qué sesión hace qué.
4. `docs/DECISIONES.md`: lo ya decidido y lo pendiente.

## Reglas de oro (no negociables)

1. **Los datos de `docs/ESPECIFICACION.md` §A se usan tal cual.** Nombres, precios, fechas, porcentajes y textos, letra por letra. No agregues proveedores, productos, compradores ni cifras.
2. **Lo que no está en la especificación no se inventa.** Si una pantalla necesita un dato que no existe (precio de otro SKU, lista de distritos, una cifra del tablero), no lo rellenes con algo plausible. Muestra solo lo definido, registra el faltante en `docs/DECISIONES.md` como `PENDIENTE` y avísame al cerrar la fase.
3. **Todo número derivado se calcula con el dominio**, nunca se escribe a mano en un componente. El 71 % sale de contar semáforos; S/ 478.33 sale de restar comisiones.
4. **Nada de la lista §A.5 «Lo que no va»** aparece en pantallas, textos visibles ni capturas.
5. **No modifiques `docs/ESPECIFICACION.md` ni `docs/ANALISIS.md`.** Si crees que algo está mal, dímelo y yo decido.
6. **Mallki no opera.** En textos visibles se escribe «se diseña», «se espera», «permitiría». Nunca «clientes actuales» ni «resultados obtenidos».

## Ojo con una ambigüedad: «M1» significa dos cosas

- **Módulo** del prototipo: M1 a M5 (pantallas M1-1 … M5-4).
- **Mecanismo** de coordinación del Sistema 2: en este repo se escribe **S2-M1 … S2-M8**.
- En las fichas de pantallas copiadas del lineamiento, una sigla entre paréntesis como «(M8)» o «(M3 del S2)» se refiere al **mecanismo** del S2, no al módulo. En código y comentarios usa siempre `S2-M8`, nunca `M8` a secas.

## Arquitectura: monolito modular, sin backend

- Una sola app web estática (SPA), un repo, un despliegue. Sin servidor, sin base de datos, sin autenticación real, sin pagos reales.
- «Modular»: cada módulo vive en su carpeta y solo se comunica a través del dominio y del store. Esa frontera refleja las unidades del MSV (ver `docs/ANALISIS.md` §6) y es el argumento de escalabilidad.
- Estado en un store único en memoria. Puede persistir en `localStorage` (siempre con try/catch) y debe haber un botón «Reiniciar demo» que vuelve al estado inicial del 09/11/2026.

## Stack

- Vite + React + TypeScript en modo `strict`.
- Tailwind CSS con los tokens de color de §A.4 y ningún otro color.
- React Router con `HashRouter` (hosting estático).
- Zustand para el estado.
- Fuente Inter con `@fontsource/inter` (local, sin CDN, para que las capturas salgan iguales sin internet).
- Vitest para el dominio. Playwright para las capturas.
- `lucide-react` si hacen falta íconos. Ninguna otra librería sin preguntarme (nada de MUI, Ant, Bootstrap, librerías de gráficos pesadas).

## Estructura

```
src/
  data/                 datos fijos de §A.2, tipados y copiados literalmente
  domain/               reglas puras sin React: dinero, semáforo, cobertura, vigencia,
                        comisión, liquidación, alerta de precio, precio fijado, reparto,
                        reclamos, umbrales y señales algedónicas
  store/                estado de la simulación: reloj simulado, ofertas, pedidos, eventos
  ui/                   PhoneFrame 390×844, WebFrame 1440×900, Marca, Pie, Semaforo, Dinero…
  modules/
    m1-registro/        U1 · celular
    m2-proveedor/       U2 · web
    m3-comparador/      U3 · celular
    m4-pedido-pago/     pagos y facturación con U1 · celular
    m5-tablero/         S3 + reglas del S2 + canal algedónico · web
  simulacion/           panel del presentador y escenarios (fase F5)
tests/                  Vitest
scripts/capturas.ts     Playwright: genera capturas/M1-1_Registro.png …
docs/
```

`src/data`, `src/domain` y `src/store` se crean en la fase F0. Después, **solo se modifican si te lo pido explícitamente**: varias sesiones trabajan en paralelo y esas carpetas son compartidas.

## Convenciones técnicas

- **Dinero en céntimos enteros.** Nunca floats para montos. Comisión = subtotal de cada línea × 2.5 %, redondeo half-up a céntimo, **por línea** y no sobre el total. Ojo: 199.00 × 2.5 % = 4.975, justo en la mitad, y debe dar **4.98**. Con floats depende del camino: en JavaScript `(4.975).toFixed(2)` da «4.97» y `199 * 0.025` da 4.98 por casualidad. En céntimos y con half-up explícito no hay casualidades.
- Formato de dinero: `S/ 1,234.50` (coma de miles, punto decimal, dos decimales, espacio después de «S/»).
- Fechas `dd/mm/aaaa`, en español, zona `America/Lima`.
- **Reloj simulado.** La demo es el lunes 09/11/2026. Ninguna regla usa `Date.now()` ni la fecha del sistema: todo lee el reloj del store.
- Porcentajes con espacio: `71 %`, `0.3 %`. Sin decimales salvo que el dato los tenga.
- Textos visibles en español, sobrios y concretos. Sin emojis, sin signos de exclamación, sin frases de marketing.
- Rutas: `#/` (índice de las 20 pantallas) y `#/m1-1` … `#/m5-4`. Cada pantalla se puede abrir directo por su ruta.
- Cada pantalla lleva el pie «Prototipo Mallki · datos de demostración» y la marca «Mallki» en negrita, verde #1F5F3F, arriba a la izquierda. Sin logo.
- Cuando la pantalla se abre con `?captura=1`, se oculta todo lo que no es la pantalla (índice, panel de simulación, bordes de marco).

## Pruebas que deben pasar siempre (`npm test`)

- Semáforo: 17 verdes, 5 ámbar, 2 rojos; cobertura 17 de 24 → «71 %».
- Pedido N.° 0042: subtotales 236.00, 199.00 y 55.60; total 490.60; comisiones 5.90, 4.98 y 1.39 = 12.27; liquidaciones 230.10, 194.02 y 54.21 = 478.33.
- El comprador paga 490.60: la comisión nunca se suma a su total.
- Vigencia: al 09/11 la oferta de aceite de Abarrotes Wayna (confirmada el 03/11) vence mañana; al 10/11 pasa a «No disponible» y el aceite queda en ámbar (cobertura 16 de 24).
- Ofertas por vencer en 48 h al 09/11: aceite de Abarrotes Wayna y táper de Descartables Ayni.
- Alerta: arroz extra de Abarrotes Wayna de S/ 198.00 a S/ 210.00 → «6 %», con alternativas Comercial Inti S/ 199.00 y Distribuidora Qhapaq S/ 205.00.
- Precio fijado: si un proveedor cambia su precio después de confirmado el pedido, el pedido conserva el precio anterior.

Si una prueba falla, se corrige el código, no la prueba. Las pruebas solo cambian si yo cambio la especificación.

## Cómo trabajamos

- Antes de cada fase: lee la fase en `docs/PLAN.md`, propón un plan corto (archivos, componentes, pruebas) y espera mi OK.
- Commits pequeños, en español, una pantalla o una regla por commit.
- Anota en `docs/DECISIONES.md` cada decisión técnica que tomes (qué, por qué, qué alternativa descartaste) y cada dato faltante como `PENDIENTE`.
- Al cerrar una fase: `npm test` y `npm run build` sin errores, y un resumen con lo hecho, lo que falta y lo que quedó pendiente de mí.
- Si algo es ambiguo, pregunta. No elijas en silencio.

## Comandos

- `npm run dev` · `npm test` · `npm run build` · `npm run capturas` · `npm run preview`
