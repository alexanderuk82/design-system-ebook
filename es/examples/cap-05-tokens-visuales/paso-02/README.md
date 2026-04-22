# ejemplo_05_02

**Capítulo 5: Tokens visuales** · paso 02

La escala tipográfica completa que el capítulo 5 promete "en el repo". Ocho tamaños primitivos en escala modular, semantic con `clamp()` para los headings (H1 a H4 fluidos, H5 y H6 fijos), pesos, leading, tracking y family. Todo encadenado y consumido por una página de specimen que ya puedes redimensionar.

```
tokens/primitive.json   →  font.size.0 a font.size.7  (escala modular 12 a 48px)
                            font.weight (regular/medium/bold)
                            font.leading.tight = 1.1
                            font.leading.relaxed = 1.5
                            font.tracking.tight = -0.02em
                            font.tracking.wide = 0.05em
                            font.family.sans
tokens/semantic.json    →  font.size.h1 = clamp(2.375rem, 1.5rem + 3vw, 3rem)
                            font.size.h2 = clamp(1.875rem, 1.4rem + 2vw, 2.375rem)
                            font.size.h3 = clamp(1.5rem, 1.2rem + 1.4vw, 1.875rem)
                            font.size.h4 = clamp(1.25rem, 1rem + 1vw, 1.5rem)
                            font.size.h5/h6/body/caption = referencia a primitivos fijos
                            font.leading.body = {font.leading.relaxed}
                            font.leading.heading = {font.leading.tight}
                              ↓
                       build.mjs (resuelve referencias)
                              ↓
dist/variables.css      →  32 variables CSS listas para usar
                              ↓
index.html              →  specimen completa, redimensiona y mira clamp en accion
```

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias.

```bash
cd es/examples/cap-05-tokens-visuales/paso-02
node build.mjs        # genera dist/variables.css con los 32 tokens
```

Abre `index.html` y cambia el ancho de la ventana del navegador. Los headings H1 a H4 escalan suavemente entre su mínimo y su máximo. H5, H6, body, body-sm y caption se quedan estáticos porque no necesitan ser fluidos (el cuerpo de texto debería seguir el setting del usuario, no el viewport).

## Por qué clamp y no media queries

Las media queries con breakpoints producen saltos visibles cuando el ancho del navegador cruza el umbral. `clamp(min, preferred, max)` interpola continuamente entre los dos extremos en función del viewport. El ojo lee la transición como suave y la página se siente más sólida en cualquier ancho intermedio (tablets, ventanas redimensionadas, móviles raros).

La fórmula del valor preferido `1.5rem + 3vw` se construye así: el `1.5rem` ancla el tamaño base contra el setting del usuario (un usuario que escaló su font a 20px obtiene un tamaño base proporcional), el `3vw` añade la parte fluida que escala con el ancho. Mantener siempre el ancla en `rem` es importante para WCAG 2.2 1.4.4 (resize text 200%).

## Lo que vale la pena tocar

Cambia `font.size.7` (el tope de la escala primitiva) de `3rem` a `4rem`. Mira que H1 ahora puede crecer más alto en pantallas grandes porque su clamp toca techo más arriba. Pero si lo subes mucho, recuerda recalcular los breakpoints de la fórmula `min + Xvw + max`.

Pon `font.leading.body = 1.8` en el primitivo. El cuerpo respira más. Útil si tu producto tiene mucho texto largo y mucha edad de usuario media.

Añade un `font.family.mono` en primitivo y un semantic `font.family.code`. Aplica el code en un `<code>` del HTML. Tu sistema ya tiene capa de family.

## Diferencia con paso-01

`paso-01` es color y dark mode. Este es tipografía y tipografía fluida. Usan exactamente la misma arquitectura de tokens y exactamente el mismo `build.mjs`. La prueba de que la teoría del capítulo 4 (tres tiers genéricos) escala a cualquier tipo de token sin tocar el resolver.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-05-tokens-visuales.md`, sección "Tipografía, la capa que la gente subestima"
- Donde se ve el lado Figma de tipografía: misma sección, "Mirada de diseñador en Figma"
- Donde la fuente cruza plataformas: capítulo 7 (multi-plataforma)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
