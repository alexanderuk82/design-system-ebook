# example_16_01

**Chapter 16: Testing** · step 01 (runnable Vitest setup)

Vitest + Testing Library + vitest-axe project with a Button and ten tests
(five unit + four a11y + one meta test). Steps 02 to 05 are smaller
extracts from other pieces of the testing pipeline: Storybook
interactions, Chromatic CI, test runner config.

## Structure

```
src/
  Button.tsx              # component under test
  Button.test.tsx         # example_16_01 · unit tests with Testing Library
  Button.a11y.test.tsx    # example_16_04 · axe tests across variants
  setup.ts                # extends vitest-axe + jest-dom matchers
vitest.config.ts
tsconfig.json
package.json
```

## How to run it

```bash
cd en/examples/ch-16-testing/step-01
npm install
npm test
```

Expected output: ten tests passing in about two seconds. If one fails,
Vitest shows the test name, the diff, and the stack trace. The meta test
at the end verifies that axe DOES flag a button without an accessible
name, that is the "test of the test".

For watch mode during development:

```bash
npm run test:watch
```

## What this example shows

1. **userEvent, not fireEvent.** `userEvent.click()` simulates the full
   click (mousedown, mouseup, click, focus). `fireEvent.click()` fires
   just the event, which can give false positives. The modern Testing
   Library rule: userEvent always.
2. **Role-based queries.** `screen.getByRole('button', { name: 'Save' })`
   looks for the element the way a screen reader would. More robust to
   refactors than `getByTestId` or `getByClassName`.
3. **`loading` blocks clicks.** The handler is swapped for `undefined`
   in the TSX when `loading` is true. Four lines of logic validated by
   the "blocks clicks while loading" test.
4. **axe covers automatable violations.** Four a11y tests cover the
   main variants plus the loading state. If the Button loses its
   accessible text on any path, axe fails with the exact name of the
   rule violated.
5. **Meta test.** The last test in `Button.a11y.test.tsx` renders a
   deliberately broken button and checks that axe catches it. If
   somebody breaks the axe setup later (common: matchers not extended,
   everything passes silently), this red test flags it.

## Config worth knowing

**`pool: "forks" + singleFork: true`** in `vitest.config.ts`. Required
on Windows to bypass the `spawn UNKNOWN` bug in tinypool with esbuild.
Without it, Vitest crashes at boot on Windows.

**`setupFiles: ['./src/setup.ts']`**. Loads the jest-dom and vitest-axe
matchers before each test. Without it, `toHaveAttribute` and
`toHaveNoViolations` do not exist.

## What you'll see on stderr (and why to ignore it)

During the a11y tests you'll see warnings like
`Not implemented: HTMLCanvasElement.prototype.getContext`. That is
jsdom not implementing canvas in full. axe-core uses canvas to detect
icons with typographic ligatures; when canvas isn't there it skips
that check and carries on. All ten tests still pass. To silence the
warning you'd add `canvas` as a devDep (~40 MB), not worth it for this
example.

## Things worth tweaking

- Change `aria-busy={loading}` to `aria-busy={false}` in `Button.tsx`
  and run the tests. The loading a11y test should still pass (axe
  doesn't require aria-busy), but the unit test "blocks clicks while
  loading" still passes too. Useful: separating responsibilities
  between tests.
- Rename `variant` to `kind` in `Button.tsx`. TypeScript will force
  you to update five or more places. Without "public contract" tests
  that refactor would be riskier.

## Back to the book

- Source text: `ENG/05-implementation/ch-16-testing.md`, sections
  "Unit testing with Vitest and Testing Library" and "Accessibility
  testing with axe"
- Related chapter: `ch-10-accessibility/step-01` (a11y helper)
- Related chapter: `ch-09-building-components/step-08` (Button +
  tests)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
