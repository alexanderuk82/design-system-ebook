# ejemplo_04_02

**Capítulo 4: Teoría de tokens** · paso 02

El mismo set de tokens, compilado de dos maneras distintas. Las dos son válidas y resuelven problemas diferentes. El capítulo 4 cuenta la teoría, este ejemplo te deja tocar el interruptor en vivo.

```
tokens/primitive.json   →  color.blue.500          = #0052CC
tokens/semantic.json    →  color.brand.primary     → {color.blue.500}
                              ↓
                       build.mjs (emite DOS archivos)
                              ↓
dist/variables-resolved.css
   :root {
     --color-blue-500: #0052CC;
     --color-brand-primary: #0052CC;     ← hex literal, cadena aplanada
   }

dist/variables-referenced.css
   :root {
     --color-blue-500: #0052CC;
     --color-brand-primary: var(--color-blue-500);   ← cadena viva en runtime
   }
```

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias.

```bash
cd es/examples/cap-04-teoria-tokens/paso-02
node build.mjs        # genera los dos archivos en dist/
```

Luego abre `index.html` en el navegador. Tiene dos botones para cargar uno u otro stylesheet, y un color picker que altera `--color-blue-500` en runtime. Vas a ver de inmediato la diferencia entre los dos modos.

## Lo que vale la pena probar

Carga el modo **referenciado** (es el que viene por defecto) y mueve el color picker. El cuadrado cambia, porque `--color-brand-primary` apunta a `var(--color-blue-500)` y la cadena se resuelve en cada repintado del navegador.

Cambia al modo **resuelto** y mueve el picker otra vez. El cuadrado no cambia, porque ahí `--color-brand-primary` ya tiene `#0052CC` literal compilado dentro. El primitivo cambió en runtime, pero el semantic ni se entera.

Abre `dist/variables-resolved.css` y `dist/variables-referenced.css` en paralelo. La diferencia entre los dos archivos es visualmente exactamente lo que el capítulo 4 está intentando explicar con palabras.

## Cuándo elegir qué modo

**Resuelto** sirve cuando los tokens no van a cambiar en runtime. Ese es el caso del 95% de productos. Pierdes flexibilidad dinámica pero ganas algo de rendimiento (el navegador no resuelve cadenas de variables) y tu CSS es 100% inspeccionable sin saber el árbol de tokens completo.

**Referenciado** sirve cuando vas a hacer theming en runtime: dark mode, multi-marca, o cualquier escenario donde un primitivo cambia y todo el sistema tiene que heredar sin recargar la página. La cadena viva permite un solo `setProperty` que actualiza decenas de variables aguas abajo.

La mayoría de equipos terminan haciendo un híbrido: resuelven los component tokens (donde casi nunca quieres flexibilidad runtime) y dejan referenciados los semantic (donde sí quieres). Style Dictionary tiene transformers para esto, los vamos a ver en el capítulo 7.

## Volver al libro

- Texto fuente: `SPA/02-tokens/cap-04-teoria-tokens.md`, sección "Resolución vs referencia"
- Donde se aplica al pipeline real: capítulo 7 (Style Dictionary)
- Donde se conecta con dark mode: capítulo 5 (tokens visuales)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
