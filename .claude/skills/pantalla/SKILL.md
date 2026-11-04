---
name: pantalla
description: Construye o modifica una de las 20 pantallas del prototipo (M1-1 a M5-4) respetando su ficha, el dominio y el estilo.
---

# Pantalla

1. Lee la ficha de la pantalla en `docs/ESPECIFICACION.md` §B.3 y sus precisiones en §B.4. Revisa `docs/DECISIONES.md` por decisiones o pendientes que la toquen.
2. El archivo vive en `src/modules/<módulo>/`. Usa `<Pantalla id="M?-?">` de `src/ui` (marco, marca y pie).
3. Todo dato sale de `src/data`, del store o de `src/store/selectores.ts`. Todo número derivado sale del dominio. Nada de montos, porcentajes ni fechas escritos a mano: usa `<Dinero>`, `<Porcentaje>`, `<Fecha>`.
4. Textos sobrios, en español, sin emojis ni signos de exclamación. Nada de §A.5. Colores solo de los tokens.
5. Si la pantalla muestra un valor derivado nuevo, agrega su prueba en `tests/`.
6. Genera su captura (`npm run capturas -- M?-?`, o el script provisional de la fase) y mírala: nada cortado, nada fuera del marco, sin scroll.
7. Termina con la skill checkpoint.
