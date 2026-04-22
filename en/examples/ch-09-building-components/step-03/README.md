# example_09_03

**Chapter 9: Building components** · step 03

Accessible Input. Label required in TypeScript, helper and error wired to the input through `aria-describedby`, error with `role="alert"`, `forwardRef` so it plays nice with react-hook-form and friends.

## How to run it

Open `index.html` in the browser. React UMD and Babel standalone load from unpkg, everything else lives in the HTML.

## The three decisions that matter

**Label required in TypeScript.** The `label: string` prop is required, not optional. The compiler enforces it and runtime expects it. Impossible to forget. For the rare cases where the label needs to be visually hidden (compact search bar), the `visuallyHiddenLabel` prop hides it visually without breaking accessibility for screen readers (classic `clip: rect(0,0,0,0)` technique on the `visually-hidden` class).

**Helper and error with the right ARIA wiring.** The helper adds context when the label is not enough ("we will send the confirmation here"). The error appears when validation fails. Both connect to the input via `aria-describedby`, and the error takes precedence over the helper. The error carries `role="alert"` so the screen reader announces it as soon as it appears, not only when the user lands on the field.

**`useId` for the input id.** React 18 ships `useId` which generates a stable, unique, SSR-safe id. The input id + helper id + error id all share a prefix, so they never clash with other fields on the page.

## What the demo shows

Four scenarios:
1. Common case with helper. Type an invalid email, blur the field, the error appears.
2. Error preset. Shows how the helper is replaced by the error and the border turns red.
3. Disabled. The input is locked but the label still reads.
4. Visually hidden label. Useful in search bars where the magnifier icon implies purpose.

## Things worth tweaking

Remove the `error` from an Input and check the browser console for TypeScript warnings (they will not appear at runtime because TSX compiles to plain JS without type checking). If you copy the code into a real TS project you will see how the compiler enforces the `label`.

Inspect the generated HTML in devtools. The input has `aria-describedby` pointing at the right span. When there is an error, that describedby swaps automatically to the error span.

Wire the component to react-hook-form: the `forwardRef` is already there, just `<Input {...register("email")} label="..." />` and it works.

## Back to the book

- Source text: `ENG/03-components/ch-09-building-components.md`, section "Atom 2, Input"
- Where the ARIA chain is unpacked: same section
- Where the Input gets axe-audited: `step-08`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
