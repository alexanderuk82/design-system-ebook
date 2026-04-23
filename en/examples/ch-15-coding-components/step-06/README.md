# example_15_06

**Chapter 15: Coding components** · step 06 · Tokenized Button.module.css

The full Button CSS, with variants, sizes, focus, hover and
reduced-motion. Everything consumes tokens. Zero hardcoded values.

## File

See `step-01/src/Button/Button.module.css` in full (compressed here):

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 0;
  border-radius: var(--radius-md);
  font: var(--font-body-md);
  cursor: pointer;
  transition: background var(--motion-fast) var(--ease-out);
}

.button:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.button[data-variant='primary'] {
  background: var(--color-action-bg);
  color: var(--color-action-fg);
}

.button[data-variant='primary']:hover:not(:disabled) {
  background: var(--color-action-bg-hover);
}

/* ... variants secondary, ghost, danger ... */

@media (prefers-reduced-motion: reduce) {
  .button, .spinner {
    transition: none;
    animation: none;
  }
}
```

## Why it matters

**Everything tokenized.** Changing `--color-action-bg` in `tokens.css`
repaints the Button across the whole app without touching the component
CSS. This is the central promise of Chapter 5 applied to a real
component.

**`:focus-visible` over `:focus`.** The outline appears only on keyboard
navigation (or when the browser thinks it is warranted). A mouse click
does not add the blue ring, reducing visual noise. A `Tab` press does,
fulfilling the accessibility obligation.

**`prefers-reduced-motion` at the CSS layer.** The spinner and transitions
disable automatically for users who have requested it in their OS. No
JavaScript, no feature flag, no manual detection. The browser decides.

**Deliberate specificity.** `.button[data-variant='primary']:hover:not(:disabled)`
has specificity (0,3,1) that lets it win over an external utility class
without `!important`. Predictable, debuggable rules.

## How to run it

```bash
cd ../step-01
npm install
npm run dev
```

Click the theme toggle to see the same Button change colors as the tokens
change. Zero JS in the mix.

## Back to the book

- Source text: `ENG/05-implementation/ch-15-coding-components.md`, section "The Button in real code, condensed version"
- Full app: `step-01/`
- Tokens chapter: `ch-05-visual-tokens/step-01`
- Motion tokens chapter: `ch-06-motion-tokens/step-03` (reduced-motion)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
