# ejemplo_04_01

**Capítulo 4: Teoría de tokens** · paso 01

Tres archivos JSON, una sola cadena. Aquí ves los tres tiers que el capítulo 4 explica con palabras: primitivo, semantic y component, encadenados de verdad y consumidos por un botón en el navegador.

```
tokens/primitive.json   →  color.blue.500              = #0052CC
tokens/semantic.json    →  color.brand.primary         → {color.blue.500}
tokens/component.json   →  button.primary.background   → {color.brand.primary}
                              ↓
                       build.mjs (resuelve referencias en cadena)
                              ↓
dist/variables.css      →  --button-primary-background: #0052CC
                              ↓
index.html              →  background: var(--button-primary-background)
```

El botón solo conoce su token de componente. Ni se entera de que hay un semantic debajo, ni mucho menos del primitivo. Esa ignorancia es la que te deja, en el día del rebranding, cambiar el primitivo y que la cadena entera se actualice sola.

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias.

```bash
cd es/examples/cap-04-teoria-tokens/paso-01
node build.mjs        # regenera dist/variables.css
```

Si solo quieres ver el resultado, abre `index.html` y listo.

## Lo que vale la pena probar

Cambia `#0052CC` por un violeta cualquiera en `tokens/primitive.json`. Corre el build. El botón cambió. No tocaste ni el semantic ni el component, ni una sola línea del HTML.

Ahora dale al botón su propio matiz, sin afectar al resto del sistema. En `tokens/component.json`, sustituye `{color.brand.primary}` por un nuevo primitivo (por ejemplo `{color.blue.700}`, que primero tendrías que añadir al primitivo). El semantic `color.brand.primary` se queda como estaba para todo lo demás. El component token es el sitio donde rompes la herencia cuando un componente lo necesita.

Pon una referencia a un token que no existe (por ejemplo `{color.blue.999}`). El build te avisa con error claro. No pasa silencioso al CSS.

## Diferencia con caps anteriores

`ejemplo_01_01` mostró dos tiers (primitive y semantic). Este añade el tercer tier (component) y demuestra el caso real de uso: un componente concreto consumiendo el token que le pertenece, no consumiendo directamente el semantic. La razón de tener el tercer tier la cuenta el capítulo en detalle, pero el resumen es: aislamiento, theming y trazabilidad de docs.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-04-teoria-tokens.md`, sección "Los tres tiers: primitive, semantic, component"
- Donde se profundiza en naming: misma sección, parte de naming
- Donde se aplica multi-marca: capítulo 20

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
