---
name: cambio-dp
description: Aplica un cambio pedido por el DP (dato, texto, pantalla, regla o estructura), verificándolo antes contra la especificación.
disable-model-invocation: true
---

# Cambio del DP

Pedido: $ARGUMENTS

1. Clasifica el cambio: dato o texto · pantalla · regla o estructura.
2. Compáralo con `docs/ESPECIFICACION.md`. Si lo contradice, **detente** y muestra la contradicción con la sección exacta (por ejemplo §A.2, tabla de ofertas). No implementes nada.
3. Si no lo contradice, impleméntalo en el lugar que indica `docs/COMO_CAMBIAR.md`. Si es una regla, ajusta o agrega su prueba solo si el DP cambió la regla.
4. Regístralo en `docs/DECISIONES.md` como D-xx (qué, por qué, quién lo pidió, fecha).
5. Actualiza `docs/COMO_CAMBIAR.md` si cambió la ubicación de un dato o texto.
6. Haz checkpoint (skill checkpoint).
7. Termina diciendo qué cambió (archivos) y qué tiene que revisar el DP, con la ruta de la pantalla.
