# example_20_01

**Chapter 20: Multi-brand** · step 01 (compiled tokens, three brands side by side)

Static HTML with the three brands from the book (fintech, health, retail)
rendering the same Button and Card. The only thing that changes between
them is the `data-brand` attribute on the parent element. CSS vars
cascading do the rest.

Open `index.html` in any modern browser. No build, no `npm install`, no
bundler.

```bash
start en/examples/ch-20-multi-brand/step-01/index.html
```

## The three layers

```
tokens.css
├── Layer 1: primitives       ← --blue-500, --grey-900, --radius-full, ...
├── Layer 2: semantic         ← [data-brand='fintech'] { --color-brand: ... }
└── Layer 3: components       ← .button { background: var(--color-brand) }
```

**Primitives**. Universal scale. `--blue-500`, `--radius-sm`,
`--font-sans`. They don't belong to any brand. Just inventory that can be
referenced.

**Semantic**. Each brand is a mode. `[data-brand='fintech']` makes
`--color-brand` point to `--blue-500`. `[data-brand='health']` points it
at `--green-500`. The component consumes `--color-brand`, not the
primitives.

**Components**. Identical across brands. `.button` writes
`background: var(--color-brand)` and never mentions `blue` or `green`.

## Why the Button stays untouched

Open `tokens.css` and find the `.button` declaration. Eight lines. No
`if fintech`, no brand-specific overrides. Just semantic vars.

Changing the brand means changing `data-brand` on the root. Nothing else.
Zero re-renders, zero JS, zero bundling. The CSS vars cascade does
everything.

If you flip from one brand to the next you can see:

- The Button fill changes (blue → green → red).
- The Button radius changes (sm → lg → full).
- The Card heading changes font family in `health` (serif instead of
  sans).

Three visual swaps, one HTML, one CSS.

## What it doesn't do (and why)

Common temptation: drop an `if brand === 'health' return <SpecialButton>`
inside the component. For a subtle difference like the radius it's already
noise; for three brands it scales into a component with three branches and
then no one wants to touch it.

The chapter rule: anything that varies between brands must be a token,
never an `if` branch in the component. If one brand asks for something
unique (an extra shadow, say), that thing enters as a semantic token
(`--shadow-button`) that is `none` for two brands and `shadow.sm` for the
third. The component stays singular.

## Things worth tweaking

- Change `--radius-control` in `[data-brand='fintech']` to
  `var(--radius-full)` and reload. You'll see the fintech button turn
  into a pill. A semantic token change propagates instantly without
  touching HTML or JS.
- Add a fourth brand `[data-brand='energy']` with `--color-brand` in
  yellow and the Button already works for it. The architecture extends
  by adding a CSS block, not by touching components.
- Duplicate the same Card twice under the same brand, change the
  `data-brand` on one individual Card. It works. `data-brand` can live
  on any ancestor, not only on the root.

## Back to the book

- Source text: `ENG/07-advanced/ch-20-multi-brand.md`, section "How it
  looks in code"
- Related chapter: `ch-20-multi-brand/step-02` (runtime switcher in
  React)
- Related chapter: `ch-05-visual-tokens/step-01` (the semantic pattern
  for light/dark, here applied to another dimension)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
