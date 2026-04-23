# example_16_02

**Chapter 16: Testing** · step 02 (Storybook interaction tests)

Extract from `Button.stories.tsx` showing two stories with a `play`
block. The `play` block runs user interaction inside the story, it
shows step by step in Storybook (Interactions panel) and runs in CI
via `@storybook/test-runner` (see step 05).

This example is not runnable standalone. It is a fragment that lives
inside the Storybook set up in `ch-13-storybook/step-01`, where the
runner and base Button stories are already configured.

## How to plug it in

1. Copy `Button.stories.tsx` over the existing one in the Storybook
   (`ch-13-storybook/step-01/src/components/Button.stories.tsx`).
2. Add `@storybook/test@^8.0.0` to the Storybook `package.json`.
3. Run `npm run storybook`.
4. Open the `ClickFires` story. You'll see the interaction
   visualised in the Interactions panel with a timeline.
5. Open `LoadingBlocksClick`. The click doesn't fire the `fn()`
   because the Button blocks it while loading, and the assert
   verifies that.

## Three things to notice

**`fn()` inside args.** `@storybook/test` exposes `fn()`, equivalent
to `vi.fn()` but wired into the Actions panel. When the handler is
called you see the invocation recorded with its arguments.

**`within(canvasElement)`.** Scope limited to the story canvas, not
to the whole document. Useful when stories land in docs pages with
multiple instances of the component.

**Same tests, two environments.** The `play` is almost identical to
the unit test in `step-01`. The difference: here you get visual
debug, in the unit test you don't. The rule: pure contract tests in
Vitest (fast, no UI), tests with visual context or complex state in
Storybook (slower, with timeline).

## When to use one or the other

Vitest unit test for:
- Component logic (props → output).
- Internal maths (position calculations, validation).
- Happy path and simple edge cases.

Storybook interaction test for:
- Multi-step flows (open modal, tab keyboard, close).
- Debugging flaky tests. The visualisation helps.
- Compound components with animation or transient state.

## Back to the book

- Source text: `ENG/05-implementation/ch-16-testing.md`, section
  "Interaction tests in Storybook"
- Related chapter: `ch-13-storybook/step-01` (Storybook base)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
