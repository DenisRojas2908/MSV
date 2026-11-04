---
name: capturas
description: Genera las 20 capturas PNG del prototipo, verifica nombres y tamaños, revisa cada imagen y busca palabras prohibidas de §A.5 en el texto renderizado.
---

# Capturas

1. Corre `npm run capturas` (o `npm run capturas -- M3-1 M3-2` para algunas). El script abre cada ruta con `?captura=1`, viewport exacto y `deviceScaleFactor: 1`, y guarda en `capturas/`.
2. El script verifica nombre y tamaño de cada PNG (390 × 844 o 1440 × 900) y que no haya scroll. Si reporta error, corrígelo.
3. Mira cada PNG con la herramienta Read: nada cortado, nada fuera del marco, textos legibles.
4. El script busca en el texto renderizado las palabras de §A.5 («Health Meter», «patrocinado», «recomendado», «tecnopor», «ya opera», «clientes actuales», «resultados obtenidos», «U4», «Unidad 1.1»). Reporta cualquier coincidencia.
5. Reporta una tabla: pantalla, archivo, tamaño, problemas.
