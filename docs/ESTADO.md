# Estado del proyecto

## Último checkpoint
- 04/11/2026 14:40 (Lima) · rama `claude/bold-mendel-7xx6g7` · último commit antes del checkpoint: `4ba1058`.

## Fase actual y avance
- F0 y F1 cerradas (M3 y M4 auditados y corregidos).
- F2 (M2) y F3 (M1) construidas y capturadas; auditor en curso sobre M1 y M2.
- Falta: F4 (M5), F5 (simulación), F6 (capturas y despliegue), F7.

## Qué funciona y cómo verlo
- `npm test`: 65 pruebas. `npm run dev` → `#/`.
- Flujo comprador: `#/m4-1` → «Cargar pedido N.° 0042» (arriba, fuera del marco) → Confirmar → Pagar → Seguimiento.
- Reclamo: `#/m1-4` → Abrir reclamo → se ve retenido en `#/m4-4` y `#/m2-4`.

## Siguiente paso exacto
- Aplicar hallazgos del auditor de M1/M2; luego F4: `src/modules/m5-tablero/M5_1Tablero.tsx`.

## Pendientes del DP
- P-02, P-03, P-06, P-07, P-09, P-10, P-11, P-12 (con su valor provisional).
- Observación: rótulo del umbral en M5-1 (ver DECISIONES.md).

## Riesgos o deudas
- Script de capturas provisional en el scratchpad hasta F6.
