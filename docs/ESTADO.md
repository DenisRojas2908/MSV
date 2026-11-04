# Estado del proyecto

## Último checkpoint
- 04/11/2026 14:28 (Lima) · rama `claude/bold-mendel-7xx6g7` · último commit antes del checkpoint: `adf81c0`.

## Fase actual y avance
- F0 cerrada: datos, dominio, store, UI base, índice y 20 rutas provisionales.
- Siguiente: F1 (M3 y M4).

## Qué funciona y cómo verlo
- `npm test`: 64 pruebas con todas las invariantes de CLAUDE.md.
- `npm run dev` → `#/` índice; cada `#/m?-?` abre su marco provisional; `?captura=1` oculta todo fuera del marco.

## Siguiente paso exacto
- F1: `src/modules/m3-comparador/M3_1Buscador.tsx` y siguientes; registrar en `src/modules/m3-comparador/index.ts`.

## Pendientes del DP
- P-02, P-03, P-06, P-07, P-09, P-10, P-11, P-12 (con su valor provisional).
- Observación: rótulo del umbral en M5-1 (ver DECISIONES.md).

## Riesgos o deudas
- Script de capturas provisional en el scratchpad hasta F6.
