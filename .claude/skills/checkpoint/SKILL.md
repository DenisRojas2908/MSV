---
name: checkpoint
description: Guarda la memoria del proyecto en el repo. Úsala al terminar cada pantalla, al cerrar cada fase, antes de una tarea larga, antes de detenerte y si pasaron más de 60 minutos desde el último checkpoint.
---

# Checkpoint

1. Corre `npm test` y `npm run build`. Si algo falla, corrígelo antes de seguir. No hay checkpoint en rojo.
2. Obtén la hora con `TZ=America/Lima date '+%d/%m/%Y %H:%M'`.
3. Sobrescribe `docs/ESTADO.md` (máximo 40 líneas) con estas secciones: Último checkpoint (fecha y hora de Lima, commit, rama) · Fase actual y avance · Qué funciona y cómo verlo · Siguiente paso exacto (archivo y tarea) · Pendientes del DP (P-xx abiertos) · Riesgos o deudas. El commit es el último antes del checkpoint; el del propio checkpoint no se conoce todavía.
4. Agrega una entrada **arriba** en `docs/BITACORA.md` (nunca reescribas las anteriores): fecha y hora · fase · qué se hizo · archivos tocados · decisiones (D-xx) · pruebas (cuántas pasan) · «Para revisar» (1 a 3 cosas concretas, con la ruta de la pantalla) · siguiente paso.
5. Si cambió la estructura, actualiza `docs/MAPA.md`. Si cambió un dato o texto visible, actualiza `docs/COMO_CAMBIAR.md` (archivo y línea).
6. Commit en español: `Checkpoint: <qué>`.
7. Integra en main: `git checkout main && git pull origin main && git merge --no-ff <rama> && git push -u origin main && git checkout <rama> && git push -u origin <rama>`. Si el push falla por red, reintenta hasta 4 veces (2 s, 4 s, 8 s, 16 s).
