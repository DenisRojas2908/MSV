# Estado del proyecto

## Último checkpoint
- 04/11/2026 14:44 (Lima) · rama `claude/bold-mendel-7xx6g7` · último commit antes del checkpoint: `b5fe341`.

## Fase actual y avance
- F0, F1, F2 y F3 cerradas: M1, M2, M3 y M4 construidas, capturadas y auditadas.
- F4 (M5) construida; auditor en curso.
- Falta: F5 (simulación), F6 (capturas y despliegue), F7.

## Qué funciona y cómo verlo
- `npm test`: 65 pruebas. `npm run dev` → `#/` con las 20 pantallas.
- Comprador: `#/m1-1` → `#/m1-3` → Comparar → `#/m3-2` → Agregar → `#/m4-1` → pagar → `#/m4-4` → `#/m1-4`.
- Proveedor: `#/m2-1` … `#/m2-4` (pestañas). Tablero: `#/m5-1` … `#/m5-4`.

## Siguiente paso exacto
- Hallazgos del auditor de M5; luego F5: `src/simulacion/index.tsx` con E1 a E5.

## Pendientes del DP
- P-02, P-03, P-06, P-07, P-09, P-10, P-11, P-12 (con su valor provisional).
- Observaciones: rótulo del umbral en M5-1; plazo lleno en M2-2 (D-46).

## Riesgos o deudas
- Script de capturas provisional en el scratchpad hasta F6.
