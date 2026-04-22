# example_09_08

**Chapter 9: Building components** · step 08

Accessibility tests with axe over the Button. Four tests, based on the user contract: renders with label, fires click, respects states, and passes the axe audit with zero violations. If you only write one, write the axe one: it catches 70% of accessibility bugs before production.

## How to run it

Unlike the other steps in chapter 9, this one does need `npm install` (Vitest, testing-library, jest-axe).

```bash
cd en/examples/ch-09-building-components/step-08
npm install
npm test
```

Validated locally: 4 tests pass in ~2.5s.

## The four tests, contract not implementation

```tsx
it("renders with its label and fires the click")
it("does not fire click when disabled")
it("blocks click while loading and exposes aria-busy")
it("has no accessibility violations")
```

None looks at internal detail. None does `expect(wrapper.find('.btn-primary')).toBeDefined()`. They all use Testing Library's semantic queries (`getByRole`) and check observable behaviour. If tomorrow you refactor the Button internally but keep the contract, the tests still pass. That is what makes them useful long term.

## The axe test, the highest leverage line you can write

```tsx
it("has no accessibility violations", async () => {
  const { container } = render(<Button>Accessible</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

`axe-core` (the library `jest-axe` wraps) runs 90+ accessibility rules over the rendered HTML. It catches things like colour contrast, ARIA attributes wrongly applied, missing labels, headings out of order, and a lot more.

It does not catch everything (some rules need human context), but **it catches 70% of the real problems that would reach production**. It is the highest ROI per line of test you will write in your DS.

## Important configuration

**Vitest pool set to `forks` with `singleFork: true`.** Without this, Vitest fails on Windows with `spawn UNKNOWN` due to a tinypool worker pool limitation on certain Node + Windows setups. Process pool instead of threads, with one fork, sidesteps the problem at very little speed cost.

**`@testing-library/jest-dom` extended in `setup.ts`.** Enables matchers like `toHaveAttribute`, `toBeDisabled`, `toHaveClass`. Without it, the DOM matchers are not available in base Vitest.

## Things worth tweaking

Break the Button's accessibility: remove the `aria-busy` from the component and set `loading` to true. Run `npm test`. Test 4 (axe) still passes because axe does not flag that specific missing attribute by itself (rule sensitivity varies by version). But test 3 (which checks `aria-busy`) does fail. Covering what axe leaves out is exactly why we write behaviour tests on top of the global axe one.

Swap the inner `<button>` for a `<div onClick>`. Run the tests. Multiple fail: `getByRole("button")` no longer finds anything (a div has no `button` role by default), and axe flags that a clickable element lacks a semantic role.

Add an Input to the Button (weird but hypothetical) without a label. Axe flags: "Form elements must have labels". The red test catches it before you merge.

## Back to the book

- Source text: `ENG/03-components/ch-09-building-components.md`, section "Minimum tests per component"
- Where accessibility is unpacked: chapter 10 (a11y by design)
- Where this connects to CI: chapter 16 (testing) and chapter 12 (DS Sync pipeline)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
