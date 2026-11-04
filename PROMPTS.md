# Prompts para Claude Code (para el DP)

Modelo: Opus 5.5 o Fable, esfuerzo alto, en la sesión principal y en la auditoría. Entorno: Default (nube). Repo: el de Mallki con esta carpeta subida a la raíz.

---

## 1 · Sesión principal · F0 (en modo Plan)

```
Lee CLAUDE.md y todos los archivos de docs/. Todavía no escribas código.

1. Resume en 10 líneas qué vas a construir y qué queda fuera.
2. Lista toda contradicción, ambigüedad o dato faltante que encuentres entre ANALISIS.md, ESPECIFICACION.md, PLAN.md y DECISIONES.md.
3. Propón el plan de la fase F0 de docs/PLAN.md: archivos, tipos del dominio, funciones con su firma y las pruebas que vas a escribir.

Espera mi aprobación.
```

Cuando apruebes (cambia a modo de ejecución):

```
Aprobado. Ejecuta F0 en la rama f0-base. Al terminar: npm test y npm run build sin errores, commit y push, y dame el resumen de cierre con lo que quedó PENDIENTE en DECISIONES.md.
```

Revisa el diff, crea el PR y haz merge a `main` antes de abrir las sesiones A, B y C.

---

## 2 · Sesión A · Comprador (F1, luego F3)

```
Lee CLAUDE.md y docs/. La fase F0 ya está en main. Te toca la fase F1 (M3 y M4) y después la F3 (M1) de docs/PLAN.md, en la rama f1-comprador.
Solo puedes tocar src/modules/m1-registro, src/modules/m3-comparador y src/modules/m4-pedido-pago. No modifiques src/data, src/domain, src/store ni las rutas: si te falta algo ahí, detente y dime exactamente qué función necesitas.
Primero el plan de F1 con la lista de criterios de aceptación que vas a verificar. Espera mi OK.
```

## 3 · Sesión B · Web (F2, luego F4)

```
Lee CLAUDE.md y docs/. La fase F0 ya está en main. Te toca la fase F2 (M2) y después la F4 (M5) de docs/PLAN.md, en la rama f2-web.
Solo puedes tocar src/modules/m2-proveedor y src/modules/m5-tablero. No modifiques src/data, src/domain, src/store ni las rutas: si te falta algo ahí, detente y dime exactamente qué función necesitas.
Primero el plan de F2 con la lista de criterios de aceptación que vas a verificar. Espera mi OK.
```

## 4 · Sesión C · Capturas y despliegue (F6)

```
Lee CLAUDE.md y docs/. La fase F0 ya está en main. Te toca la fase F6 de docs/PLAN.md en la rama f6-capturas: el script npm run capturas con Playwright y el despliegue estático.
Solo puedes tocar scripts/, la configuración de despliegue, package.json (solo scripts y devDependencies) y README.md.
Las pantallas todavía son provisionales: el script tiene que funcionar igual y verificar nombres y tamaños de los 20 PNG.
Si no puedes descargar Chromium en este entorno, dilo y deja el README con los pasos para correrlo en Windows.
Primero el plan. Espera mi OK.
```

## 5 · Sesión principal · F5 (con A, B y C integradas en main)

```
Actualiza la rama desde main. Lee de nuevo docs/ESPECIFICACION.md §F y docs/DECISIONES.md.
Te toca la fase F5 de docs/PLAN.md en la rama f5-simulacion: el panel #/simulacion con los escenarios E1 a E5.
Cada escenario necesita su prueba. No cambies textos ni datos de las 20 pantallas.
Primero el plan. Espera mi OK.
```

## 6 · Sesión nueva · Auditoría (F7)

```
Eres auditor de este repositorio y no escribiste su código. Lee CLAUDE.md y docs/.
Levanta la app y recorre las 20 pantallas y los escenarios E1 a E5.
Compara cada número contra ESPECIFICACION.md §A.2, cada texto contra §A.5 y cada pantalla contra su ficha de §B.3 y §B.4.
Escribe solo docs/AUDITORIA.md con una tabla: pantalla, qué muestra, qué dice la especificación, severidad (bloquea / corregir / menor). No corrijas nada.
```

---

## Si algo sale mal

- **Inventó un dato:** «Ese dato no está en ESPECIFICACION.md. Quítalo, déjalo como PENDIENTE en DECISIONES.md y muéstrame qué otra cosa rellenaste sin fuente».
- **No cuadra un monto:** «Corre npm test y muéstrame qué invariante falla. No cambies la prueba».
- **Se sale de sus carpetas:** «Revierte los cambios fuera de tus carpetas y dime qué necesitabas de ellas».
- **La sesión se pausó:** ábrela de nuevo y escribe «Continúa la fase donde quedaste; relanza los comandos que se cortaron».
