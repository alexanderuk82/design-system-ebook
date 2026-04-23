# example_15_04

**Chapter 15: Coding components** · step 04 · CSS Modules by data-attr

The Button CSS is not triggered by conditional classnames from TypeScript.
It is triggered by attribute selectors (`data-variant`, `data-size`).

## Excerpt

From `step-01/src/Button/Button.module.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font: var(--font-body-md);
  transition: background var(--motion-fast) var(--ease-out);
}

.button[data-variant='primary'] {
  background: var(--color-action-bg);
  color: var(--color-action-fg);
}

.button[data-size='sm'] { padding: var(--space-1) var(--space-3); }
.button[data-size='md'] { padding: var(--space-2) var(--space-4); }
.button[data-size='lg'] { padding: var(--space-3) var(--space-5); }
```

## Why it matters

The TSX exposes `data-variant={variant}` and `data-size={size}`. The CSS
responds with an attribute selector. Concrete wins:

1. **Inspectable DOM.** Open DevTools Elements and you see
   `data-variant="primary"` right on the button. Debugging a misapplied
   variant is instant.
2. **No conditional clsx.** No `clsx({ primary: variant === 'primary' })`.
   The TSX stays clean: one line, `data-variant={variant}`.
3. **Compatible with Storybook controls.** Changing `variant` from a
   Storybook control mutates the attribute, CSS responds, no JSX class
   re-renders.
4. **Predictable cascade.** `[data-variant='primary']` selectors have
   known specificity (0,1,1), higher than a class alone (0,1,0). An
   external utility classname cannot win by accident.

All CSS consumes tokens (`var(--color-action-bg)`, `var(--space-4)`). Zero
hex codes. Zero magic numbers.

## How to run it

```bash
cd ../step-01
npm install
npm run dev
```

## Back to the book

- Source text: `ENG/05-implementation/ch-15-coding-components.md`, section "The Button in real code"
- Full app: `step-01/`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
