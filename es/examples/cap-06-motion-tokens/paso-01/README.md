# ejemplo_06_01

**Capítulo 6: Motion tokens** · paso 01

Motion tokens consumidos desde CSS. Doce variables (cinco duraciones, cuatro easings, tres staggers) feeding tres componentes que el capítulo menciona como casos de uso típicos: un botón con hover, un modal con backdrop y un toast con curva enfática.

```
tokens/primitive.json   →  motion.duration.fast/normal/slow/slower/instant
                            motion.ease.out/in/in-out/emphasized
                            motion.stagger.fast/normal/slow
                              ↓
                       build.mjs (sin referencias todavia, motion tokens son primitivos puros)
                              ↓
dist/variables.css      →  12 variables CSS
                              ↓
index.html              →  modal con duracion slow + ease.out
                            toast con duracion normal + ease.emphasized
                            boton con duracion fast + ease.out
```

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias.

```bash
cd es/examples/cap-06-motion-tokens/paso-01
node build.mjs        # genera dist/variables.css
```

Abre `index.html`. Tres botones disparan tres animaciones distintas, cada una usando un par duration + ease diferente.

## Las cinco duraciones

| Token | Valor | Cuándo |
|---|---|---|
| `instant` | 0ms | Para reduced motion o casos donde animar no aporta |
| `fast` | 150ms | Hover, focus, microinteracciones |
| `normal` | 250ms | Default. Modales pequeños, drawers |
| `slow` | 400ms | Modales grandes, cambios de contexto |
| `slower` | 600ms | Tope. Usar con criterio, casi nunca |

Cinco no es arbitrario. Más de cinco duraciones nadie las distingue, y meter diez genera indecisión sin beneficio perceptual. La regla práctica del capítulo: el tipo de animación define la duration, no el componente.

## Las cuatro curvas

`ease.out` es el defecto. Si solo te llevas una curva del libro, llévate esa. Las otras tres son matiz: `ease.in` para salidas, `ease.in-out` para movimientos largos simétricos, `ease.emphasized` para confirmaciones de éxito. Los `cubic-bezier` exactos vienen de las prácticas de Apple y Material, son más pronunciados que los defaults del navegador (`ease-out` sin valores produce una curva floja).

## Por qué no hay capa semantic aquí

A diferencia de color o tipografía, motion tokens funcionan bien como primitivos directos. La razón es que las animaciones se eligen por intención (rápido, normal, lento) más que por rol semántico abstracto. Verás algunos sistemas que sí añaden semantic (`motion.duration.modal-enter`), pero el coste de mantener esa capa rara vez compensa. Mejor convención de uso documentada que abstracciones extra.

## Lo que vale la pena tocar

Cambia `motion.duration.slow` de `400ms` a `1000ms` y abre el modal. Ahora se siente lentísimo. Esa sensibilidad es por la que la escala vive entre 100 y 600.

Cambia `motion.ease.out` de `cubic-bezier(0.16, 1, 0.3, 1)` a `linear`. Abre el modal. La diferencia entre una curva y linear es la diferencia entre "se siente natural" y "se siente mecánico". Las curvas ease no son decoración.

Pon `motion.duration.fast` en `0.01ms` (no 0). El botón pierde toda animación. Esa misma técnica es la que usaremos en `paso-03` para `prefers-reduced-motion`, pero al nivel de los tokens.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-06-motion-tokens.md`, sección "Mirada de dev"
- Donde se profundiza: secciones "Las cinco duraciones" y "Easing curves"
- Donde se cruzan plataformas (Flutter, Swift, Kotlin): `paso-02` y capítulo 7
- Donde se respeta accesibilidad: `paso-03` (reduced motion)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
