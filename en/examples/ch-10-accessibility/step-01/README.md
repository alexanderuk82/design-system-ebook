# example_10_01

**Chapter 10: Accessibility** · step 01

Reusable a11y testing helper. A small function (`expectNoA11yViolations`) any dev on the team can call from any component's test. The base test chapter 10 proposes as a mandatory CI check.

```
src/
  a11y-helper.ts        # The function. 12 lines, copy-pasteable into any project.
  components.tsx        # Three sample components: Button, Input, Card.
  components.test.tsx   # a11y audit applied to each one + meta-test.
  setup.ts              # Extends matchers with jest-dom.
vitest.config.ts
tsconfig.json
package.json
```

## How to run it

```bash
cd en/examples/ch-10-accessibility/step-01
npm install
npm test
```

Validated locally: 4 tests pass in ~2.5s.

## The helper

```ts
export async function expectNoA11yViolations(jsx: ReactElement) {
  const { container } = render(jsx);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
```

Twelve lines. Copy the file into your project, import the function from any component test, done.

```ts
await expectNoA11yViolations(<Button>Accessible</Button>);
await expectNoA11yViolations(<Input label="Email" />);
```

Splitting "helper" from "component-specific test" has a core benefit: if tomorrow jest-axe's API changes, or you want to add extra rules (say load experimental ones), you edit one file. One hundred components, one edit.

## The meta-test, proof the helper works

The fourth test in the demo is the meta-test:

```tsx
it("BrokenButton with no label fails with a clear violation", async () => {
  await expect(
    expectNoA11yViolations(<BrokenButton onClick={() => {}} />)
  ).rejects.toThrow();
});
```

`BrokenButton` is a `<button>` with no inner text and no `aria-label`. To a screen reader it is indistinguishable from any other unlabelled button. The test verifies the helper **catches** the problem (throws). If in the future someone breaks the helper (classic regression: the helper does not extend the matchers correctly and every assertion silently passes), this red test tells you.

It is the "test of the test" rule: when you build a validation tool, make sure the tool actually catches what it is supposed to catch. If all your tests always pass, you are not verifying.

## What axe catches and what it does not

axe-core catches 30-50% of real accessibility problems according to Deque research. What it covers well:
- Colour contrast against a flat background
- ARIA attributes wrongly applied
- Form elements without a label
- Headings out of order
- Images without alt
- Duplicated landmarks without aria-label
- Implicit roles broken by div onClick

What it **does not** catch and needs human verification:
- Whether animation causes discomfort
- Whether focus moves where the user expects
- Whether dynamic screen reader announcements are useful or noisy
- Whether keyboard-only navigation completes real tasks
- Whether contrast over images or gradients is readable

The chapter's operational rule: every new DS component goes through a fifteen-minute a11y validation session before merging. Keyboard-only first, screen reader next, axe last. If all three pass, merge. If any fails, iterate. Fifteen minutes per new component is trivial next to the rework when the external audit lands.

## Back to the book

- Source text: `ENG/03-components/ch-10-accessibility.md`, section "Developer's view"
- Where this is applied to the Button: `ch-09-building-components/step-08`
- Where this wires into CI: chapter 16 (testing) and chapter 12 (DS Sync)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
