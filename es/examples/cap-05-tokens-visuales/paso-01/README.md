# ejemplo_05_01

**Capítulo 5: Tokens visuales** · paso 01

La escala completa de color en OKLCH (azul 50 a 900 + gris 50 a 900) más dos capas semantic, una para light mode y otra para dark mode. El capítulo 5 mostró tres swatches en el snippet, aquí está el set entero más la integración de modos.

```
tokens/primitive.json         →  20 colores en OKLCH (azul 10 pasos + gris 10 pasos)
tokens/semantic-light.json    →  surface, text, border, brand   →  apuntan a primitivos claros
tokens/semantic-dark.json     →  los mismos nombres             →  apuntan a primitivos oscuros
                              ↓
                       build.mjs (resuelve cada capa contra los primitivos)
                              ↓
dist/variables-light.css      →  set completo para light
dist/variables-dark.css       →  set completo para dark
                              ↓
index.html                    →  toggle entre light y dark, paleta + componente
```

El componente nunca cambia. Lee `--color-surface-base`, `--color-text-primary` y `--color-brand-primary`. Esos nombres son idénticos en los dos modos. Lo único que cambia es a qué primitivo apuntan dentro del archivo CSS cargado.

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias.

```bash
cd es/examples/cap-05-tokens-visuales/paso-01
node build.mjs        # genera los dos CSS en dist/
```

Abre `index.html`. Tiene dos botones (Light, Dark) que intercambian el stylesheet, una visualización de las dos escalas primitivas y un componente "tarjeta" que demuestra que el HTML no se entera de qué modo está activo.

## Por qué OKLCH y no HSL

Una escala OKLCH con H constante y L variando linealmente da una progresión que el ojo lee como uniforme. La misma escala en HSL produce saltos visibles en los extremos (los azules muy claros se ven lavados, los muy oscuros se ven negros sin carácter). Mira las dos filas de swatches en el demo: cada paso del azul está separado del siguiente por el mismo salto perceptual de claridad. Esa coherencia es la que justifica la inversión de pasarse a OKLCH.

## La curva de chroma

Fíjate en el chroma de la escala azul: sube desde 0.02 en el 50, llega a un pico de 0.22 en el 500 y baja otra vez hasta 0.08 en el 900. Esto no es decoración, es práctica. Los grises tienen chroma casi nulo (0.005 a 0.018) porque son grises y queremos que se mantengan neutros. El brand vive en el 500 porque es donde el OKLCH puede pintar el color más saturado. Si subieras chroma en el 900 obtendrías un azul demasiado vibrante para texto sobre fondo claro.

## Dark mode bien hecho

Tres detalles del dark que vienen del capítulo y este ejemplo materializa:

1. **No usar gray.50 puro como texto en dark.** Vibra y cansa la vista. Aquí `text.primary` en dark apunta a `gray.100`, no a `gray.50`.
2. **No usar gray.900 puro como surface base.** Aquí sí lo uso porque el primitivo gray.900 es OKLCH 12% (no negro puro 0%).
3. **Brand un punto más claro en dark.** El primitivo `blue.500` se ve sobresaturado contra fondo oscuro. En dark mapeo a `blue.400`. Detalle pequeño que cambia mucho la calidad percibida.

## Lo que vale la pena tocar

Cambia `oklch(55% 0.22 240)` a `oklch(55% 0.22 30)` en el primitivo `blue.500`. Toda la escala "azul" se vuelve naranja, manteniendo la curva de luminosidad y chroma. Esa es la potencia de OKLCH como base.

Edita `semantic-dark.json` y haz que `text.primary` apunte a `gray.50` en lugar de `gray.100`. Recarga. Observa el ligero efecto de vibración en el texto del header. Por eso usamos gray.100.

Añade un nuevo modo en `tokens/semantic-highcontrast.json` que mapee `text.primary` a `gray.900` y `surface.base` a `gray.50` (o sea, light pero más extremo). Modifica el `build.mjs` para que también lo emita. Tu sistema ya soporta tres modos, sin tocar primitivos.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-05-tokens-visuales.md`, sección "Color, la capa donde se gana y se pierde la accesibilidad"
- Donde se profundiza en accesibilidad APCA: misma sección
- Donde el theming se vuelve multi-marca: capítulo 20

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
