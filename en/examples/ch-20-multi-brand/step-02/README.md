# example_20_02

**Chapter 20: Multi-brand** · step 02 (runtime switcher in React)

Same architecture as step-01, but with a runtime switcher. Click
`fintech`, `health` or `retail` and the Button swaps colour and radius
without being remounted. All through the CSS vars cascade.

```bash
start en/examples/ch-20-multi-brand/step-02/index.html
```

React loaded from CDN via UMD + Babel standalone. Zero build, zero
`npm install`.

## The switcher in three lines

```tsx
const [brand, setBrand] = useState('fintech');

return (
  <div data-brand={brand}>
    <Button>Continue with {brand}</Button>
  </div>
);
```

That's it. The `data-brand` on the container selects the semantic mode,
and the Button's CSS consumes `--color-brand` and `--radius-control`
without knowing which brand is active.

## Zero re-render on the component

If you open React DevTools and profile while flipping brands, you'll see
that `<Button>` does NOT re-render its children. React re-renders `App`
(because `brand` state changes), but the Button's DOM reuses the same
node. Only the applied CSS cascade changes.

This is cheap even with hundreds of components, because React only
reconciles the DOM of the ancestor holding the `data-brand`.

## Why this pattern scales

Imagine the final product has:

- 50 components (Button, Card, Modal, Toast, Input…).
- 30 screens, each with many of these components.
- 3 active brands.

Without this pattern: every component needs to know about brand, and the
bundle duplicates styles. With this pattern: a single bundle for the 50
components, three CSS blocks for the semantic modes, and the product can
change brand at page, section, or even individual component level. The
question "how much does a fourth brand cost?" answers with 20 lines of
CSS.

## Things worth tweaking

- Open React DevTools and check that the switcher changes state but does
  not remount the Button (same instance, same hooks, same refs).
- Add a second Button inside the same App and you'll see it shares the
  brand. To show two brands at once, move the `data-brand` inside the
  Button, not outside.
- Persist the selected brand in `localStorage`. Two lines:
  `useEffect(() => localStorage.setItem('brand', brand), [brand])` and
  read it in the initial `useState`.

## Back to the book

- Source text: `ENG/07-advanced/ch-20-multi-brand.md`, section "How it
  looks in code" (second block)
- Related chapter: `ch-20-multi-brand/step-01` (static tokens with the
  three brands side by side)
- Related chapter: `ch-15-coding-components/step-01` (same CSS vars
  pattern applied to light/dark runtime theming)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
