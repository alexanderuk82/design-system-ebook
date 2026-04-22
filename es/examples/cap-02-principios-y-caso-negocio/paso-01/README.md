# ejemplo_02_01

**Capítulo 2: Principios y caso de negocio** · paso 01

El capítulo 2 cierra con una idea filosófica: tu sistema separa la intención del valor. El JSON primitivo dice qué tienes (un azul, un 8 píxeles). El JSON semantic dice qué significa eso en tu producto (color de la acción primaria, padding del botón). Los componentes solo hablan con la capa semantic y se enteran cero del valor de abajo.

Este ejemplo materializa esa idea con dos tipos de token (color y dimensión) viajando por el mismo pipeline.

```
tokens/primitive.json   →  color.blue.500       = #0052CC
                            size.space.100       = 8px

tokens/semantic.json    →  color.action.primary       → {color.blue.500}
                            spacing.button.horizontal  → {size.space.100}
                              ↓
                       build.mjs (resuelve referencias)
                              ↓
dist/variables.css      →  --color-action-primary: #0052CC
                            --spacing-button-horizontal: 8px
                              ↓
index.html              →  background: var(--color-action-primary)
                            padding: var(--spacing-button-horizontal) ...
```

El botón no sabe que su color es azul ni que su padding son 8 píxeles. Sabe que es la acción primaria y que su padding sigue el ritmo de espaciado del sistema. Esa indirección, repetida a escala de producto, es la que te deja repintar la marca en un sprint en vez de en un trimestre.

## Cómo correrlo

Necesitas Node 18 o superior. Sin dependencias.

```bash
cd es/examples/cap-02-principios-y-caso-negocio/paso-01
node build.mjs        # regenera dist/variables.css desde los JSON
```

O abres `index.html` directamente, el CSS ya viene precompilado.

## Lo que vale la pena probar

Cambia `#0052CC` por un violeta cualquiera en `tokens/primitive.json`. Corre el build. El botón cambió. La capa semantic no la tocaste, los componentes no se enteraron.

Cambia el primitivo `size.space.100` de `8px` a `12px`. El padding del botón crece. Si en otro componente tienes `spacing.card.padding` referenciando al mismo primitivo, también crece. Eso es ritmo coherente sin esfuerzo.

Pon una marca alternativa creando solo un nuevo `semantic.violeta.json` que use otros primitivos. La capa de abajo no se duplica. Esa es la base del multi-marca del capítulo 20.

## Diferencia con el ejemplo del capítulo 1

El `ejemplo_01_01` mostraba la cadena con un solo color. Este la muestra con dos tipos de token a la vez (color y dimensión) y aplica los dos en el mismo botón. El `build.mjs` es prácticamente el mismo, lo cual es la prueba visual de que la arquitectura es genérica: el resolver no sabe ni le importa si lo que está aplanando son colores, tamaños o cualquier otra cosa.

## Volver al libro

- Texto fuente: `SPA/01-fundamentos/cap-02-principios-y-caso-negocio.md`, sección "Un fragmento de tokens para aterrizar la idea"
- Donde se profundiza en intent vs value: capítulo 4 (teoría de tokens)
- Donde se aplica a multi-marca: capítulo 20

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
