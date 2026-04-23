# example_13_01

**Chapter 13: Storybook and living documentation** · step 01

Minimal Storybook 8 setup with Vite for a Design System. One Button with seven
stories, an MDX page with living docs generated from TypeScript types, an
accessibility panel powered by axe-core, and a light/dark theme toolbar.

## Structure

```
.storybook/
  main.ts               # Addons, framework, type extraction.
  preview.ts            # Theme decorator, global a11y parameters.
src/
  Button.tsx            # The component, with JSDoc feeding the props table.
  Button.css            # Per theme variables and data-variant styles.
  Button.stories.tsx    # Seven CSF 3 stories, referenced from the MDX.
  Button.mdx            # Manual Docs page composing stories with prose.
package.json
tsconfig.json
```

## How to run it

```bash
cd en/examples/ch-13-storybook/step-01
npm install
npm run storybook
```

Opens on `http://localhost:6006`. In the sidebar, `Atoms/Button` contains the
Docs page (MDX with prose, controls, and all stories underneath) plus the seven
individual stories.

To produce the static build ready to deploy:

```bash
npm run build-storybook
```

The `storybook-static/` folder will contain static HTML + JS that works on any
host (Netlify, Vercel, GitHub Pages). This is the path Chapter 13 recommends
for publishing the public Storybook of the DS.

## What this example demonstrates

1. **CSF 3 and MDX side by side.** Each story is defined once in
   `Button.stories.tsx`. The MDX imports them with `import * as ButtonStories`
   and composes them with prose. Zero duplication.
2. **Auto generated docs.** The component props table is extracted from
   TypeScript types and JSDoc comments in `Button.tsx`. Rename a prop, the
   table updates automatically.
3. **Theme toolbar.** The `addon-themes` addon adds a top bar selector that
   swaps `data-theme` on `<html>`. The CSS reacts with per theme variables.
4. **Accessibility panel.** `addon-a11y` runs axe-core automatically against
   every story. The Accessibility tab shows passes, violations, and
   inconclusive. This is the integration that connects Chapter 10 to Storybook.
5. **Automatic controls.** Every prop declared in `argTypes` becomes a control
   in the bottom panel. The designer can change `variant`, `size`, `loading`
   and see the component react without touching code.

## Included addons

- `@storybook/addon-essentials`: bundles docs, controls, actions, viewport,
  backgrounds, toolbars, measure, outline, highlight. The Storybook 8 base.
- `@storybook/addon-a11y`: accessibility panel with axe-core.
- `@storybook/addon-themes`: toolbar for switching themes.

These are the three highest value addons per Chapter 13.
`addon-interactions` and `chromatic` are added in Chapter 16 (testing), where
they have their context.

## Things worth tweaking

- Change `--ds-primary-bg` to `#8fb8ff` in `Button.css` and watch the
  Accessibility panel flag the `Primary` story in dark mode for
  `color-contrast` violation.
- Add a new prop to the Button (`fullWidth?: boolean`) with its JSDoc and
  watch the row appear in the props table without touching anything else.
- Write a custom `render` story with multiple states visible at once (like
  `AllSizes`) to use Storybook as an exploration playground.

## Back to the book

- Source text: `ENG/04-tools/ch-13-storybook.md`
- Referenced sections: "Anatomy of an MDX story" and "Minimum setup worth having"
- Base component: `ch-09-building-components/step-08` (typed Button)
- Chapter adding visual regression: `ch-16-testing` (visual + Chromatic)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
