---
name: retomar
description: Retoma el trabajo al iniciar una sesión o después de una compactación. Lee el estado del proyecto, verifica que las pruebas pasen y continúa con el siguiente paso registrado en docs/ESTADO.md.
---

# Retomar

1. Lee `docs/ESTADO.md` completo.
2. Corre `git log --oneline -10` y `git status`. Si hay cambios sin commit, entiende de qué son antes de seguir.
3. Si falta `node_modules` o cambió `package-lock.json`, corre `npm install`.
4. Corre `npm test`. Si algo falla, eso es lo primero que se arregla (se corrige el código, no la prueba).
5. Resume en 3 líneas: dónde quedó, qué funciona y cuál es el siguiente paso exacto.
6. Sigue con ese paso. Lee `docs/BITACORA.md` o `docs/MAPA.md` solo si lo necesitas.
