# Bitácora

Solo se agrega. Una entrada por checkpoint, la más reciente arriba.

---

## 04/11/2026 14:47 · F4 · Tablero M5 cerrado

- **Qué se hizo:** M5-1 a M5-4 con pestañas. Auditor sobre M5: sin bloqueos; 4 menores aplicados (regla de 4 semanas, una sola etiqueta algedónica, espacios en por vencer, rótulo de escenario sin ámbar). Inicio de F5: escenarios E1 a E5 como funciones del store con una prueba cada uno; pantallas incrustables y sincronización entre pestañas.
- **Archivos:** `src/modules/m5-tablero/*`, `src/simulacion/escenarios.ts`, `src/ui/incrustada.tsx`, `src/registro.ts`, `tests/escenarios.test.ts`.
- **Decisiones:** D-48 a D-51.
- **Pruebas:** 73 pasan.
- **Para revisar:** `#/m5-1` (rótulo literal del umbral, ver observación); `#/m5-3` (textos de las tres alertas); `#/m5-4` (filas U1, U2, U3).
- **Siguiente paso:** interfaz del panel de simulación.

---

## 04/11/2026 14:44 · F2 y F3 · Proveedor M2 y comprador M1 cerrados

- **Qué se hizo:** M2-1 a M2-4 (Distribuidora Qhapaq, con pestañas) y M1-1 a M1-4. Flujo de reclamo probado: M1-4 → retenido en M4-4 y M2-4. Auditor sobre M1 y M2: 1 «corregir» (M1-3 prometía precios de 24 insumos) y 2 menores, aplicados o registrados (D-46, D-47). M5 (F4) construida.
- **Archivos:** `src/modules/m1-registro/*`, `src/modules/m2-proveedor/*`, `src/modules/m5-tablero/*`, `src/store/demo.ts`, `docs/COMO_CAMBIAR.md`.
- **Decisiones:** D-44 a D-47.
- **Pruebas:** 65 pasan.
- **Para revisar:** `#/m2-2` (plazo «24 h» lleno, D-46); `#/m1-2` (lista habitual); `#/m2-4` (liquidación S/ 236.00 − S/ 5.90 = S/ 230.10).
- **Siguiente paso:** hallazgos del auditor de M5 y F5.

---

## 04/11/2026 14:40 · F1 · Comprador M3 y M4 cerrado

- **Qué se hizo:** M3-1 a M3-4 y M4-1 a M4-4 con navegación de §B.2 y el atajo «Cargar pedido N.° 0042». Auditor sobre M3 y M4: 1 «bloquea» (precio «desde» con ofertas vencidas en E1) y 4 menores, corregidos. También quedaron construidas M2 (F2) y M1 (F3), en auditoría.
- **Archivos:** `src/modules/m3-comparador/*`, `src/modules/m4-pedido-pago/*`, `src/modules/m1-registro/*`, `src/modules/m2-proveedor/*`, `src/ui/Pestanas.tsx`, `src/domain/reglas.ts`.
- **Decisiones:** D-41 a D-45.
- **Pruebas:** 65 pasan.
- **Para revisar:** `#/m3-2` (texto de «¿Cómo ordenamos?»); `#/m4-4` (tabla del reparto sin «S/» por celda, D-41); `#/m4-3` (frase «La comisión de Mallki la paga cada proveedor»).
- **Siguiente paso:** hallazgos de M1/M2 y F4 (M5).

---

## 04/11/2026 14:28 · F0 · Base cerrada

- **Qué se hizo:** proyecto Vite + React + TS strict + Tailwind (7 tokens), datos de §A.2, dominio puro con todas las reglas, store con reloj simulado y pedido 0042 pagado, UI base (marco, marca, pie, semáforo, formato), índice y 20 rutas provisionales.
- **Archivos:** `src/data/*`, `src/domain/*`, `src/store/*`, `src/ui/*`, `src/modules/*/index.ts`, `tests/*`, configuración.
- **Decisiones:** D-32 a D-40.
- **Pruebas:** 64 pasan.
- **Para revisar:** `#/` (índice y botón «Reiniciar demo»); `#/m1-1?captura=1` (marco, marca y pie); la observación sobre el rótulo del umbral en DECISIONES.md.
- **Siguiente paso:** F1, M3-1 Buscador.

---

## 04/11/2026 14:20 · Preparación · Sistema de memoria y skills

- **Qué se hizo:** memoria del proyecto en el repo (`ESTADO`, `BITACORA`, `MAPA`, `COMO_CAMBIAR`), skills `retomar`, `checkpoint`, `pantalla`, `capturas` y `cambio-dp`, subagente `auditor`, hook SessionStart para `npm install` en la nube.
- **Archivos:** `CLAUDE.md`, `docs/*.md`, `.claude/`.
- **Decisiones:** D-07 (una sola sesión).
- **Pruebas:** aún no hay proyecto.
- **Para revisar:** `CLAUDE.md` sección «Memoria y checkpoints»; `.claude/skills/cambio-dp/SKILL.md`.
- **Siguiente paso:** F0.
