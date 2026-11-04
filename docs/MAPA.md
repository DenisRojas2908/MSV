# Mapa del código

Para entrarle al código sin leerlo todo. Escrito para quien sabe Python y pandas pero no React.

## Cómo fluye un dato

`src/data` (tablas fijas, como un DataFrame que nunca cambia) → `src/store` (el estado que sí cambia: reloj, ofertas, pedidos) → `src/domain` (funciones puras que calculan: como funciones de pandas sin efectos) → `src/store/selectores.ts` (combina estado + dominio) → `src/modules/*` (pantallas que solo muestran).

Conceptos que aparecen:

- **TypeScript**: JavaScript con tipos. `interface Oferta { precio: Centimos }` es como un `@dataclass` de Python. `type Color = 'verde' | 'ambar' | 'rojo'` es como un `Literal[...]`.
- **Componente (React)**: una función que devuelve HTML (`<div>…</div>`, se llama JSX). `function Dinero({ c }) { return <span>…</span> }` es una función con argumentos con nombre.
- **Hook**: función de React que empieza con `use` (`useDemo`, `useMemo`) y solo se usa dentro de un componente. Permite leer estado y recalcular cuando cambia.
- **Store (Zustand)**: un diccionario global con funciones que lo modifican (`useDemo.getState().confirmarPrecio(id)`). Cuando cambia, las pantallas se vuelven a dibujar solas.
- **`useMemo`**: cachea un cálculo (como `functools.lru_cache`) y solo lo rehace si cambian sus entradas.
- **HashRouter**: la URL después del `#` decide qué pantalla se dibuja (`#/m3-2`), sin servidor.
- **Tailwind**: clases CSS cortas en el HTML (`bg-mallki` = fondo verde Mallki, `text-texto/60` = texto al 60 % de opacidad).

## Raíz

| Archivo | Qué hace |
|---|---|
| `package.json` | dependencias y comandos (`npm run dev`, `test`, `build`, `capturas`) |
| `vite.config.ts` | empaquetador; `base: './'` para GitHub Pages; configuración de Vitest |
| `tailwind.config.ts` | **los 7 colores de §A.4**; la paleta por defecto se borra (D-17) |
| `tsconfig.json` | TypeScript en modo `strict` |

## `src/data` · datos fijos de §A.2 (literales)

| Archivo | Contenido | Fuente |
|---|---|---|
| `demo.ts` | fecha 09/11/2026, hora 09:00, número 0042, nombres de categoría, tipos de negocio, pie | §A.2, §A.4, D-15 |
| `comprador.ts` | Pollería Sumaq | §A.2 Comprador |
| `proveedores.ts` | los 6 proveedores (calificación en décimas: 46 = 4.6) | §A.2 Proveedores |
| `skus.ts` | los 24 SKU con categoría, ecológica y qué proveedores lo ofrecen | §A.2 SKU ancla, D-25 |
| `ofertas.ts` | las 9 ofertas con precio y fecha de confirmación | §A.2 Tres SKU |
| `pedido0042.ts` | solo oferta y cantidad del pedido 0042 (los montos se calculan) | §A.2 Pedido |
| `tablero.ts` | los 8 indicadores (fijos), las ventas del mes | §A.2 Tablero, D-14 |
| `pantallas.ts` | las 20 pantallas: ruta, tamaño, archivo de captura | §B.1 |

## `src/domain` · reglas puras (sin React)

| Archivo | Funciones clave | Regla |
|---|---|---|
| `tipos.ts` | `Centimos`, `FechaISO`, `Minutos`, `Oferta`, `Pedido`, `Reclamo` | — |
| `reglas.ts` | constantes: 7 días, 2.5 %, 17 de 24, 50 %, 3.5, más de 1 %, 48 h, 24 h, S/ 550 | §A.3, §C, §E |
| `dinero.ts` | `soles('118.00')`, `aplicarPuntosBasicos` (half-up), `formatearSoles`, `porcentajeEntero`, `formatearPuntosBasicos` | D-03 |
| `fechas.ts` | `diasEntre`, `formatearFecha` (dd/mm/aaaa), `formatearDiaMes` (dd/mm), `instante`, `fechaDeInstante` | D-15, D-19 |
| `vigencia.ts` | `diasRestantes`, `estadoVigencia`, `ofertasPorVencer` | S2-M3 |
| `semaforo.ts` | `semaforo`, `conteoColores`, `cobertura` (total o por categoría), `zonaCobertura` | S2-M1, §D, P-10 |
| `comparador.ts` | `ofertasComparables` (vigentes, precio asc., desempate D-12, máximo 3) | S2-M4 |
| `pedido.ts` | `resumirPedido` (subtotal, comisión por línea, liquidación por proveedor), `fijarPrecios`, `lineasVencidas`, `estadoDeProveedor`, `fechaEntrega` | §A.3, S2-M5, D-16, D-26 |
| `alerta.ts` | `variacionPorcentual`, `alertaDePrecio`, `alertasActivas`, `alternativas` | S2-M6, D-11, D-24 |
| `reclamos.ts` | `plazosReclamo`, `liquidacionRetenida`, `esExcepcionS3` | S2-M8, D-21 |
| `umbrales.ts` | `senalPrecioDistinto` (> 1 %), `enRevision` (< 3.5), `reclamosFuera48h`, `comisionDelMes` | §E, S2-M2, D-10, D-14, D-22 |

## `src/store` · estado de la simulación

| Archivo | Qué hace |
|---|---|
| `inicial.ts` | `estadoInicial()`: 09/11/2026 09:00, ofertas de §A.2, pedido 0042 pagado (D-08) |
| `demo.ts` | `useDemo`: el store. Acciones: `confirmarPrecio`, `actualizarPrecio`, `reemplazarOferta`, `agregarAlCarrito`, `cargarPedido0042`, `confirmarPedido`, `pagarPedido`, `abrirReclamo`, `fijarAhora`, `fijarPrecioDistinto`, `marcarEscenario`, `reiniciarDemo` |
| `selectores.ts` | `calcularResumenSemaforo`, `calcularTablero` (puras) y los hooks `useResumenSemaforo`, `useComparador`, `useAlertas`, `usePorVencer`, `useResumenPedido`, `useTablero` |
| `persistencia.ts` | guarda en `localStorage` con try/catch |
| `captura.ts` | detecta `?captura=1` antes o después del `#` (D-18) |

## `src/ui` · piezas visuales comunes

| Archivo | Qué hace |
|---|---|
| `Pantalla.tsx` | marco 390 × 844 o 1440 × 900, marca, barra verde con título, pie; controles del expositor fuera del marco |
| `formato.tsx` | `<Dinero c>`, `<Fecha f corta?>`, `<Porcentaje valor | pb>` |
| `Semaforo.tsx` | `<Semaforo color>`, `<Punto color>` |
| `piezas.tsx` | `Tarjeta`, `Boton`, `Etiqueta`, `RotuloEscenario`, `Campo` |
| `Indice.tsx` | índice `#/` con las 20 pantallas |
| `useModoCaptura.ts` | oculta todo fuera del marco con `?captura=1` |

## `src/modules` · pantallas por módulo

Cada carpeta tiene `index.ts` (qué componente va en cada pantalla) y un archivo por pantalla. `src/rutas.tsx` las registra.

## `src/simulacion` · panel del presentador (F5)

## `tests/` · Vitest

Una prueba por regla. `textos.test.ts` revisa que no haya montos ni porcentajes escritos a mano ni palabras de §A.5.
