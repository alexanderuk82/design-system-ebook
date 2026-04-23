# example_16_05

**Chapter 16: Testing** · step 05 (Storybook test-runner + axe)

Config for `@storybook/test-runner` that injects axe-playwright into
each story and validates it before continuing. Every Storybook story
becomes an automated a11y test in CI, without writing anything
specific inside the story.

Not runnable standalone. It is a file to drop into the repo that hosts
your Storybook (typically next to the root `.storybook/`).

## Note on the book version

The snippet printed in Chapter 16 uses Jest
(`test-runner-jest.config.js`) because the historical test-runner
relied on Jest. Since Storybook 8 the recommended migration is
Playwright + `preVisit` / `postVisit` hooks, which is what this file
uses. Same outcome, updated API.

## How to plug it in

1. Install: `pnpm add -D @storybook/test-runner axe-playwright`.
2. Copy `test-runner.js` to the repo root of the Storybook project.
3. Add to `package.json`:
   ```json
   "scripts": {
     "test-storybook": "test-storybook --config-dir .storybook"
   }
   ```
4. Run Storybook in one terminal: `pnpm storybook`.
5. In another terminal: `pnpm test-storybook`. axe runs over every
   rendered story.

For CI, the runner can start Storybook on its own with
`concurrently`:

```json
"test-storybook:ci": "concurrently -k -s first -n 'SB,TEST' 'pnpm build-storybook && pnpm exec http-server storybook-static --port 6006 --silent' 'wait-on tcp:6006 && pnpm test-storybook'"
```

Add it to the workflow in step-03 as a parallel job.

## How to exclude a specific story

Add to the story:

```tsx
export const Loading: Story = {
  args: { loading: true },
  parameters: {
    a11y: {
      disable: true, // test-runner skips this story
    },
  },
};
```

To exclude a single rule instead of the whole story:

```tsx
parameters: {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
},
```

Useful when the contrast of the story comes from brand tokens you
already reviewed manually and don't want to re-validate.

## Relation to the other steps

- **step-01**: axe on components in Vitest, fast, no UI.
- **step-05**: axe on Storybook stories, with the component rendered
  in its real context.

Each brings something different. Vitest covers the component in
isolation, the test-runner covers how the stories the team actually
uses for docs and dev behave. In a serious DS you want both. If you
can only have one, start with Vitest.

- **step-03**: Chromatic (visual regression). Answers "did the
  pixel change?".
- **step-05**: axe on Storybook. Answers "is it still accessible?".

They complement each other. Chromatic does not catch new violations,
axe does not catch intentional visual changes.

## Back to the book

- Source text: `ENG/05-implementation/ch-16-testing.md`, section
  "Accessibility testing with axe" (end)
- Related chapter: `ch-13-storybook/step-01` (Storybook base)
- Related chapter: `ch-16-testing/step-03` (Chromatic workflow)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
