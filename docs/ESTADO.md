# Estado del proyecto

## Último checkpoint
- 04/11/2026 19:05 (Lima) · rama `claude/bold-mendel-7xx6g7` · último commit antes del checkpoint: `af33b66`.

## Fase actual y avance
- F0 a F7 cerradas. Aplicadas las correcciones de la auditoría independiente (`docs/AUDITORIA_INDEPENDIENTE.md`) y las decisiones del DP D-55 a D-64.
- 20 pantallas, panel `#/simulacion`, 20 capturas (solo cambió M5-1), archivo único `feria/mallki-demo.html`.

## Qué funciona y cómo verlo
- Publicado en GitHub Pages: https://denisrojas2908.github.io/MSV/ (índice) y https://denisrojas2908.github.io/MSV/#/simulacion. Cada push a `main` corre `npm test` y vuelve a publicar.
- `npm test` (85 pruebas), `npm run build`, `npm run build:feria`, `npm run capturas` (20 de 20).
- Sin internet: doble clic en `feria/mallki-demo.html` (ver `docs/GUIA_DEMO.md`, «Plan sin internet»).
- En vivo, las pantallas se reducen para caber en 1366 px y en celular.

## Siguiente paso exacto
- Nada pendiente. Cambios del DP: `/cambio-dp <pedido>`.

## Pendientes del DP
- Ninguno (D-59 cerró P-02 a P-12).

## Riesgos o deudas
- `feria/mallki-demo.html` se regenera a mano con `npm run build:feria` después de cada cambio.
