# Auditoría F7

Hecha el 04/11/2026 por el subagente `auditor`, en modo de solo lectura y sin haber escrito el código. Alcance: las 20 pantallas, el panel `#/simulacion` con los escenarios E1 a E5 y los criterios de aceptación de F1 a F6 de `PLAN.md`. Se revisó contra `ESPECIFICACION.md` y `DECISIONES.md`.

**Resultado:** no hay hallazgos que bloqueen. Hay 3 para corregir y 7 menores. La columna «Estado» indica cómo se resolvió cada uno después de la auditoría (ver `BITACORA.md`).

| # | Pantalla | Qué muestra | Qué dice la especificación | Severidad | Estado |
|---|---|---|---|---|---|
| 1 | `#/simulacion` y pantallas abiertas en otra pestaña (`src/store/demo.ts`) | Con una segunda pestaña abierta, los escenarios pierden su marca y su evento. Cada acción hacía dos `set()` seguidos: la otra pestaña recibía el estado intermedio por el evento `storage` y lo volvía a guardar. | §F: «Todo lo que cambia un escenario se rotula "Escenario de simulación"». D-51. | corregir | Corregido: cada acción hace un solo `set()` (estado, evento y marca juntos) y el estado que llega de otra pestaña no se vuelve a guardar. |
| 2 | M3-2, M3-1, M1-3, M4-1, M4-4 (y «Entregado» en M1-4 y M2-4 en E1) | Cambian con un escenario y no llevan el rótulo. | §F (misma regla) | corregir | Corregido: con cualquier escenario aplicado, la barra verde de **todas** las pantallas lleva «Escenario de simulación». En captura no aparece, porque el estado inicial no tiene escenarios. |
| 3 | M3-4 en E1 | «Bajo la meta» y el rótulo de escenario empujan la lista y la fila 24 queda cortada por el pie. | §B.1: no se corta contenido | corregir | Corregido: el rótulo pasó a la barra verde y el resumen ocupa una línea menos; verificado sin desborde en E1. |
| 4 | E1 (M3-2, M5-2, M2-3, panel) | El texto «No disponible» de la oferta de Wayna no aparece en ninguna parte. | §F E1 | menor | Corregido: M3-2 lista debajo las ofertas «No disponible». |
| 5 | M1-4 | Solo muestra el último pedido; con un pedido 0043, el 0042 desaparece. M1-3 rotula siempre el 0042 como «Último pedido». | §B.3 M1-4 | menor | Corregido: M1-4 permite elegir entre los pedidos; M1-3 muestra el último. |
| 6 | M1-4 y M1-3 | Con un solo proveedor se lee «1 proveedores». | Redacción | menor | Corregido |
| 7 | M1-3 y M3-1 | El aviso muestra solo la primera alerta; después de E3 la del arroz deja de verse. | §B.2 | menor | Corregido: el aviso indica cuántos avisos más hay. |
| 8 | `#/simulacion`, «Eventos» | E1, E2 y E4 no registran evento. | §F | menor | Corregido (junto con el #1) |
| 9 | M5-3 | Usa el literal `'0042'` y toma el monto de cada reclamo siempre del 0042. | CLAUDE.md, regla 3 | menor | Corregido |
| 10 | `#/simulacion`, tarjeta E5 | «N.° 0042» se parte en dos al cambiar de línea. | Estilo | menor | Corregido: espacio de no separación |

## Verificado conforme

**General.** `npm test` pasa con 73 pruebas. Las 20 capturas tienen el nombre y el tamaño exactos, la marca «Mallki» y el pie literal. Solo se usan los 7 tokens de color. No aparece nada de §A.5 ni signos de exclamación. Ninguna regla usa `Date.now`.

**M1.**
- M1-1: RUC, razón social, los 5 tipos de negocio, Cercado de Lima (P-03), WhatsApp. Ningún cobro.
- M1-2: los 3 SKU del 0042 marcados (P-12).
- M1-3: los 3 accesos y «Respondemos en menos de 4 horas hábiles».
- M1-4: el 0042 en «Pagado», con entregas el 10/11 y el 11/11. «Abrir reclamo» con «Lo resolvemos en 48 horas».

**M2.**
- M2-1 cumple D-20; M2-2 cumple D-45 y D-46.
- M2-3: 5 días a cada oferta; «Confirmar precio» reinicia a 7.
- M2-4: 2 × S/ 118.00 = S/ 236.00; calificación 4.6; S/ 236.00 − S/ 5.90 = S/ 230.10; aviso de 3.5; descargo en 24 horas.

**M3.**
- M3-2: orden Wayna, Qhapaq, Inti; «vence mañana» calculado; «¿Cómo ordenamos?».
- M3-3: el texto literal, con alternativas a S/ 199.00 y S/ 205.00.
- M3-4: 17, 5 y 2, y «17 de 24 en verde: 71 %».

**M4.**
- M4-1: total S/ 490.60.
- M4-2: «Precio fijado».
- M4-3: un solo pago de S/ 490.60 con medios genéricos.
- M4-4: totales S/ 490.60, S/ 12.27 y S/ 478.33, con el aviso de retención.
- El flujo en vivo funciona.

**M5.**
- M5-1: 8 indicadores, el rótulo literal, el avance de D-23 y S/ 186,400 / S/ 4,660.
- M5-2: la misma función de semáforo que M3-4 y las 2 ofertas por vencer.
- M5-3: 0.3 % hoy, «—» y el 4 % derivado.
- M5-4 cumple D-29.

**Escenarios.**
- **E1:** el reloj pasa al 10/11/2026. El aceite queda con 2 ofertas y en ámbar; la cobertura baja a 16 de 24 (67 %) y queda «Bajo la meta».
- **E2:** con S/ 198.00, Wayna va primero y no hay alerta. Con S/ 210.00, baja al tercer lugar y aparece la alerta de 6 % con sus 2 alternativas.
- **E3:** el pedido 0042 conserva S/ 118.00, el pedido nuevo toma el precio nuevo y el 0.3 % no cambia.
- **E4:** con 1 % no hay señal. Con 1.5 % aparece la señal con 2 h y 24 h.
- **E5:** la liquidación queda retenida, corren las 48 h y las 24 h, y no escala.
- **Reiniciar demo:** todo vuelve al 09/11.
