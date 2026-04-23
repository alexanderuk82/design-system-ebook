# example_16_04

**Chapter 16: Testing** · step 04 (minimum runnable a11y test)

Isolated version of the Button a11y test. Four imports, one describe,
one it. Runnable with `npm install && npm test`. The point is to show
how small it is to add a11y coverage to an existing component.

Step 01 has the full version with five a11y tests covering variants
and a meta test. This step is the "minimum viable" one so you can
start with a single test and grow from there.

## How to run it

```bash
cd en/examples/ch-16-testing/step-04
npm install
npm test
```

Expected output: one test passing in about a second.

## The three effective lines

```ts
const { container } = render(<Button>Save</Button>);
const results = await axe(container);
expect(results).toHaveNoViolations();
```

That is all axe needs. The rest of the file (imports, describe, it)
is boilerplate you already have if you already have unit tests.

## What axe covers (and what it doesn't)

**Does cover** (~45 per cent of automatable WCAG 2.1 AA):
- Buttons without an accessible name
- Inputs without a label
- Images without alt text
- Insufficient contrast (when styles are inline or CSS is embedded)
- Misused ARIA (invalid attributes, impossible combinations)
- Broken heading hierarchy
- Duplicate IDs

**Does not cover** (the other ~55 per cent, requires a human):
- Focus management (where focus lands after closing a modal).
- Logical tab order (axe sees the DOM, not the flow).
- Screen reader announcements on state change.
- Keyboard usability in complex widgets.
- Contrast when colour comes from an image or gradient.

The rule: axe as the first line, a 15-minute QA session with a
screen reader per component as the second. Both in place and you are
covered.

## Scaling to a full DS

A pattern that works for a DS with 50 components:

```ts
// a11y.helper.ts
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ReactElement } from 'react';

export async function expectNoA11yViolations(ui: ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
```

Each component reduces to a one-liner test:

```ts
it('primary passes axe', async () => {
  await expectNoA11yViolations(<Button variant="primary">Save</Button>);
});
```

Equivalent helper already implemented in
`ch-10-accessibility/step-01`.

## Back to the book

- Source text: `ENG/05-implementation/ch-16-testing.md`, section
  "Accessibility testing with axe"
- Related chapter: `ch-10-accessibility/step-01` (reusable helper)
- Related chapter: `ch-16-testing/step-01` (full version)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
