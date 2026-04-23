# ejemplo_13_01

**Capítulo 13: Storybook y documentación viva** · paso 01

Setup mínimo de Storybook 8 con Vite para un Design System. Un Button con siete
stories, página MDX con documentación viva generada desde los tipos TypeScript,
panel de accesibilidad con axe-core, y toolbar de light/dark mode.

## Estructura

```
.storybook/
  main.ts               # Addons, framework, extraccion de tipos.
  preview.ts            # Decorador de tema, parametros globales de a11y.
src/
  Button.tsx            # El componente, con JSDoc que alimenta la tabla de props.
  Button.css            # Variables por tema y estilos por data-variant.
  Button.stories.tsx    # Siete stories CSF 3, referenciadas desde el MDX.
  Button.mdx            # Pagina Docs manual que compone las stories con prosa.
package.json
tsconfig.json
```

## Cómo correrlo

```bash
cd es/examples/cap-13-storybook/paso-01
npm install
npm run storybook
```

Se abre en `http://localhost:6006`. En la sidebar, `Atoms/Button` contiene la
página Docs (MDX con la prosa, los controles y todas las stories abajo) y las
siete stories individuales.

Para generar el build estático listo para desplegar:

```bash
npm run build-storybook
```

La carpeta `storybook-static/` contendrá HTML + JS estático que funciona en
cualquier host (Netlify, Vercel, GitHub Pages). Es la forma recomendada por el
capítulo 13 para publicar el Storybook público del DS.

## Qué demuestra este ejemplo

1. **CSF 3 + MDX convivendo.** Cada story está definida una sola vez en
   `Button.stories.tsx`. El MDX las importa con `import * as ButtonStories`
   y las compone con prosa. Cero duplicación.
2. **Docs auto-generadas.** La tabla de props del componente se extrae de los
   tipos TypeScript y los comentarios JSDoc en `Button.tsx`. Si renombras una
   prop, la tabla se actualiza sola.
3. **Toolbar de temas.** El addon `addon-themes` añade un selector en la barra
   superior que cambia `data-theme` en el `<html>`. El CSS reacciona con
   variables distintas por tema.
4. **Panel Accessibility.** Addon `addon-a11y` corre axe-core automáticamente
   contra cada story. La tab Accessibility muestra passes, violations e
   inconclusive. Esto es la integración que conecta el Cap 10 con Storybook.
5. **Controles automáticos.** Cada prop declarada en `argTypes` aparece como
   control en el panel inferior. El diseñador puede cambiar `variant`, `size`,
   `loading` y ver el componente reaccionar sin tocar código.

## Addons incluidos

- `@storybook/addon-essentials`: agrupa docs, controls, actions, viewport,
  backgrounds, toolbars, measure, outline, highlight. La base de Storybook 8.
- `@storybook/addon-a11y`: panel de accesibilidad con axe-core.
- `@storybook/addon-themes`: toolbar para cambiar entre temas.

Son los tres más valiosos según el capítulo 13. `addon-interactions` y
`chromatic` se añaden en el capítulo 16 (testing), donde tienen su contexto.

## Cosas que vale la pena tocar

- Cambia el contraste de `--ds-primary-bg` a `#8fb8ff` en `Button.css` y mira
  cómo el panel Accessibility marca la story `Primary` en dark mode con
  violación de `color-contrast`.
- Añade una prop nueva al Button (`fullWidth?: boolean`) con su JSDoc y mira
  aparecer la fila en la tabla de props sin tocar nada más.
- Escribe una story `render` custom con múltiples estados visibles a la vez
  (como `AllSizes`) para usar Storybook como playground de exploración.

## Volver al libro

- Texto fuente: `SPA/04-herramientas/cap-13-storybook.md`
- Sección que lo referencia: "Anatomía de un story MDX" y "Setup mínimo que vale la pena"
- Componente base: `cap-09-construyendo-componentes/paso-08` (Button tipado)
- Capítulo que añade regression visual: `cap-16-testing` (visual + Chromatic)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
