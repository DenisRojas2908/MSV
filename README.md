# Mallki · Prototipo de simulación

Prototipo navegable de **Mallki**, un marketplace B2B asset-light de insumos no perecibles para las MYPE gastronómicas de Lima Centro. Curso Modelo del Sistema Viable (SI801, FIIS-UNI) · Feria de Proyectos FIIS 2026-II.

**Mallki no opera.** Todo lo que muestra el prototipo es una simulación con datos de demostración.

- Pantallas: `#/` (índice de las 20 pantallas), `#/m1-1` … `#/m5-4`.
- Panel del expositor: `#/simulacion` (escenarios E1 a E5).
- Recorrido de la feria: [`docs/GUIA_DEMO.md`](docs/GUIA_DEMO.md).
- Dónde cambiar un dato o un texto: [`docs/COMO_CAMBIAR.md`](docs/COMO_CAMBIAR.md).

## Requisitos

- Node.js 20 o superior (probado con 22) y npm.

## Correr en local

```bash
npm install
```

```bash
npm run dev
```

Abre la dirección que muestra la consola (por ejemplo `http://localhost:5173/#/`).

| Comando | Qué hace |
|---|---|
| `npm run dev` | servidor de desarrollo |
| `npm test` | pruebas del dominio y de los escenarios (Vitest) |
| `npm run build` | compila en `dist/` |
| `npm run preview` | sirve `dist/` como en producción |
| `npm run capturas` | compila y genera las 20 capturas en `capturas/` |
| `npm run build:feria` | genera `feria/mallki-demo.html`: un solo archivo que abre con doble clic, sin servidor y sin internet |

## Capturas

`npm run capturas` abre cada pantalla con `?captura=1` (solo la pantalla, sin índice ni bordes), con el tamaño exacto (390 × 844 para M1, M3 y M4; 1440 × 900 para M2 y M5), `deviceScaleFactor: 1` y el estado inicial del 09/11/2026. Guarda `capturas/M1-1_Registro.png` … `capturas/M5-4_Compromisos.png` y verifica:

- nombre y tamaño de cada PNG;
- que nada quede cortado ni haga scroll;
- que no aparezcan palabras de la lista «Lo que no va».

Para algunas pantallas: `npm run capturas -- M3-1 M3-2`.

### En Windows (computadora del DP)

Si Playwright no encuentra el navegador, instálalo una vez:

```bash
npx playwright install chromium
```

Luego, en PowerShell o en la terminal de VS Code, dentro de la carpeta del repo:

```bash
npm install
```

```bash
npm run capturas
```

Las capturas quedan en la carpeta `capturas\`. Las 20 de este repo ya están generadas y versionadas.

## Sin internet (feria)

`feria/mallki-demo.html` abre con doble clic y no necesita conexión. El plan completo está en [`docs/GUIA_DEMO.md`](docs/GUIA_DEMO.md), sección «Plan sin internet».

## Despliegue

### GitHub Pages (elegido, D-30)

El flujo `.github/workflows/desplegar.yml` corre en cada push a `main`: instala, **corre `npm test`** y, solo si pasa, compila y publica `dist/` en GitHub Pages. En un pull request solo corre las pruebas.

Para activarlo una sola vez: en GitHub, **Settings → Pages → Build and deployment → Source: GitHub Actions**. La URL queda como `https://<usuario>.github.io/<repo>/` y las pantallas en `https://<usuario>.github.io/<repo>/#/m1-1`. Si el repo es privado, Pages requiere un plan que lo permita; con el plan gratuito el repo debe ser público.

### Vercel (alternativa)

Importar el repo en Vercel con: framework «Vite», comando de compilación `npm run build`, carpeta de salida `dist`. No necesita configuración extra porque las rutas usan `#`.

## Estructura

```
src/data        datos fijos de la especificación (§A.2)
src/domain      reglas puras: dinero, vigencia, semáforo, comisión, alertas, reclamos
src/store       estado de la simulación (reloj del 09/11/2026, pedidos, «Reiniciar demo»)
src/ui          marco, marca, pie, semáforo, formato
src/modules     m1-registro · m2-proveedor · m3-comparador · m4-pedido-pago · m5-tablero
src/simulacion  panel del expositor y escenarios E1 a E5
tests/          pruebas (Vitest)
scripts/        capturas.ts (Playwright)
docs/           análisis, especificación, plan, decisiones, estado, bitácora, mapa
```

Más detalle en [`docs/MAPA.md`](docs/MAPA.md).
