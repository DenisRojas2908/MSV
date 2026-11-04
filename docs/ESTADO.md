# Estado del proyecto

## Último checkpoint
- 04/11/2026 14:47 (Lima) · rama `claude/bold-mendel-7xx6g7` · último commit antes del checkpoint: `79f1cb8`.

## Fase actual y avance
- F0 a F4 cerradas: las 20 pantallas construidas, capturadas y auditadas.
- F5 en curso: escenarios E1 a E5 como acciones con pruebas (73 pasan); falta la interfaz del panel.
- Falta: F6 (capturas y despliegue), F7.

## Qué funciona y cómo verlo
- `npm test`: 65 pruebas. `npm run dev` → `#/` con las 20 pantallas.
- Comprador: `#/m1-1` → `#/m1-3` → Comparar → `#/m3-2` → Agregar → `#/m4-1` → pagar → `#/m4-4` → `#/m1-4`.
- Proveedor: `#/m2-1` … `#/m2-4` (pestañas). Tablero: `#/m5-1` … `#/m5-4`.

## Siguiente paso exacto
- F5: interfaz del panel en `src/simulacion/index.tsx` (reloj, Reiniciar demo, E1 a E5 con pantallas incrustadas).

## Pendientes del DP
- P-02, P-03, P-06, P-07, P-09, P-10, P-11, P-12 (con su valor provisional).
- Observaciones: rótulo del umbral en M5-1; plazo lleno en M2-2 (D-46).

## Riesgos o deudas
- Script de capturas provisional en el scratchpad hasta F6.
