# Estado del proyecto

## Último checkpoint
- 04/11/2026 14:49 (Lima) · rama `claude/bold-mendel-7xx6g7` · último commit antes del checkpoint: `6862a4c`.

## Fase actual y avance
- F0 a F5 cerradas: 20 pantallas auditadas y panel `#/simulacion` con E1 a E5.
- Falta: F6 (script de capturas, 20 PNG, GitHub Action y Pages) y F7 (auditoría completa).

## Qué funciona y cómo verlo
- `npm test`: 73 pruebas, una por escenario. `npm run dev` → `#/` y `#/simulacion`.
- Recorrido de la feria: `docs/GUIA_DEMO.md`.

## Siguiente paso exacto
- F6: `scripts/capturas.ts` (Playwright), `npm run capturas`, `.github/workflows/deploy.yml`, `README.md`.

## Pendientes del DP
- P-02, P-03, P-06, P-07, P-09, P-10, P-11, P-12 (con su valor provisional).
- Observaciones: rótulo del umbral en M5-1; plazo lleno en M2-2 (D-46).

## Riesgos o deudas
- GitHub Pages debe activarse a mano en el repo (Settings → Pages → GitHub Actions).
