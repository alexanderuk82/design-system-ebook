# ejemplo_01_01

**Capítulo 1: ¿Qué es un design system?** · paso 01

Aquí está, en código, lo que el capítulo 1 te enseña con palabras: cómo un color que está escrito una sola vez termina pintando un botón en el navegador, pasando por dos capas de tokens y un script que las resuelve.

```
tokens/primitive.json   →  color.blue.500    = #0052CC
tokens/semantic.json    →  color.brand.primary → {color.blue.500}
                              ↓
                       build.mjs (resuelve referencias)
                              ↓
dist/variables.css      →  :root { --color-brand-primary: #0052CC }
                              ↓
index.html              →  .button-primary { background: var(--color-brand-primary) }
```

Si mañana el equipo de marca decide que el azul ahora es violeta, tocas el primitivo, corres el build, y el botón cambia. Ningún componente sabe que cambió nada. Esa es la parte que vale.

## Cómo correrlo

Necesitas Node 18 o superior. No hace falta `npm install`, no hay dependencias.

```bash
cd es/examples/cap-01-que-es-un-ds/paso-01
node build.mjs        # regenera dist/variables.css desde los JSON
```

Si solo quieres ver el resultado, abre `index.html` directamente. El CSS ya viene precompilado.

## Cosas que puedes tocar para entender mejor

Edita `tokens/primitive.json` y cambia `#0052CC` por otro hex. Corre `node build.mjs`. Refresca el navegador. El botón cambió y no tocaste ni una línea del HTML.

Añade un primitivo nuevo, por ejemplo `color.blue.700`, y un semantic `color.brand.primary-hover` que lo referencie. El script aplana y resuelve solo, no hay que tocarle nada.

Si rompes la cadena a propósito, por ejemplo poniendo `{color.blue.999}` (que no existe), el script te avisa con un error legible. No falla en silencio.

## ¿Por qué un script casero y no Style Dictionary?

Porque el capítulo 1 todavía no ha presentado SD. Meterlo aquí sería estropear la progresión del libro. El `build.mjs` que ves son cuarenta líneas de Node sin dependencias, hace solo lo necesario para que se vea el concepto. En `ejemplo_07_01` ya pasamos a Style Dictionary de verdad, con plataformas múltiples y todo.

## Volver al libro

- Texto fuente: `SPA/01-fundamentos/cap-01-que-es-un-ds.md`, sección "Un primer ejemplo de token"
- Donde se profundiza: capítulo 4 (teoría de tokens) y capítulo 5 (tokens visuales)
- Donde se automatiza para producción: capítulo 7 (Style Dictionary) y capítulo 12 (DS Sync)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
