# example_15_01

**Chapter 15: Coding components** · step 01 (runnable app)

Vite + React app that shows every piece of Chapter 15 working together:
tokens as CSS variables keyed by `[data-theme]`, runtime theme switch with
zero re-renders, polymorphic Button with `forwardRef`, CSS Modules
tokenized by `data-variant` and `data-size`.

The other steps (`step-02` through `step-06`) do not duplicate the app.
They are excerpts pointing at specific files inside `step-01/src/`.

## Structure

```
src/
  tokens.css              # example_15_01 · CSS variables per theme
  reset.css               # minimal reset consuming tokens
  main.tsx                # entry point (React 18)
  App.tsx                 # example_15_02 · theme switch with useState
  Button/
    Button.tsx            # example_15_03 · 15_05 · polymorphic + forwardRef
    Button.module.css     # example_15_04 · 15_06 · data-attr variants
    index.ts              # barrel export
```

## How to run it

```bash
cd en/examples/ch-15-coding-components/step-01
npm install
npm run dev
```

Opens on `http://localhost:5173`. Click the "Theme: light" button on the top
right to toggle light/dark. In DevTools you can see React does not
re-render descendants. The change is purely CSS (the `data-theme`
attribute flips on the root `<div>` and the cascade recomputes).

For a production build:

```bash
npm run build      # typecheck + vite build
npm run preview    # serves the build on localhost:4173
```

## What this example demonstrates

1. **Theming without re-renders.** The theme switch flips `data-theme` on a
   single ancestor. Zero context providers, zero prop drilling. The browser
   recomputes variables in cascade. React is not involved.
2. **Real polymorphism.** `<Button as="a" href="...">` renders a clickable
   `<a>` with full styling. The generic `C extends ElementType` lets
   TypeScript infer the rest of the props (`href`, `target`, etc.).
3. **Correct forwardRef.** The component accepts `ref` and forwards it to
   the underlying element. Required by libraries that measure the DOM
   (Popper, Floating UI) and for programmatic focus.
4. **CSS Modules + data attributes.** Zero conditional classnames in TS.
   The component exposes `data-variant` and `data-size`, the CSS matches by
   attribute selector. Makes the DOM inspectable in browser DevTools.
5. **Tokens all the way down.** Zero hex codes in `Button.module.css`.
   Everything is `var(--token)`. Switching theme changes the tokens, the
   Button reacts without being touched.

## Things worth tweaking

- Open DevTools, Elements tab, and watch `data-theme` flip on the root as
  you click the toggle. The `:root` CSS variables recompute in cascade.
- Add `prefers-color-scheme` in `tokens.css` and sync with `useState` via
  `matchMedia`. Lets the app respect the user's system preference.
- Add a third `accent` variant to the `Variant` type and the CSS.
  TypeScript will force you to cover it anywhere a `switch` on variant
  exists.

## Back to the book

- Source text: `ENG/05-implementation/ch-15-coding-components.md`
- Theming section: "Tokens as CSS variables, the base layer"
- Structure section: "Internal structure of a DS component"
- Base tokens chapter: `ch-05-visual-tokens/step-02` (OKLCH + dark)
- Base component chapter: `ch-09-building-components/step-08`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
