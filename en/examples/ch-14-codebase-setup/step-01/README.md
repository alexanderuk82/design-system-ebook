# example_14_01

**Chapter 14: Codebase setup** · step 01 (full monorepo)

The real monorepo referenced in Chapter 14. The other six steps (`step-02`
through `step-07`) do not duplicate the repo; they are documented excerpts
pointing at specific files inside this folder.

## What is inside

```
package.json              # example_14_01 · monorepo root
pnpm-workspace.yaml       # declarative workspace
tsconfig.base.json        # example_14_02 · shared TS config
.eslintrc.cjs             # example_14_04 · lint with jsx-a11y + react
.prettierrc               # example_14_05 · shared formatting
turbo.json                # example_14_07 · task pipeline
packages/
  tokens/
    package.json          # @ds/tokens package
    tsconfig.json         # extends base
    tsup.config.ts        # builds ESM + CJS + .d.ts
    src/index.ts          # typed record of tokens
    src/tokens.css        # CSS with the variables
  react/
    package.json          # @ds/react package, depends on @ds/tokens
    tsconfig.json         # example_14_03 · extends base
    tsup.config.ts        # example_14_06 · marks react as external
    src/index.ts          # Button re-export
    src/Button.tsx        # component consuming tokens
```

## How to run it

Requires **pnpm 9** installed globally.

```bash
cd en/examples/ch-14-codebase-setup/step-01
pnpm install
pnpm build
pnpm typecheck
pnpm lint
```

`pnpm build` makes Turborepo orchestrate:
1. `@ds/tokens` builds first (tsup produces `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`).
2. `@ds/react` waits for tokens (`dependsOn: ["^build"]`) and then builds.
3. Run `pnpm build` a second time without changes and Turborepo serves from cache.

## What this example demonstrates

1. **Real workspace.** `@ds/react` imports `@ds/tokens` with `workspace:*`. No relative paths between packages, pnpm symlinks the package.
2. **Shared config.** Both packages extend `tsconfig.base.json`. One TypeScript config governs the monorepo.
3. **Unified build tooling.** tsup with the same shape in both packages. Zero custom webpack or rollup.
4. **Typed pipeline.** Turborepo knows the graph. You never have to tell it tokens goes before react.
5. **Lint with a11y built in.** `eslint-plugin-jsx-a11y` runs automatically over the Button JSX and flags violations without waiting for tests.

## Things worth tweaking

- Add a third package (`@ds/icons`) with an SVG component. `pnpm install` detects it automatically and Turborepo wires it into the pipeline.
- Change `target` in `tsconfig.base.json` from `ES2022` to `ES2024` and run `pnpm typecheck`. The new config applies to both packages without touching either.
- Open `packages/react/src/Button.tsx` and write `<img src="x" />`. `eslint-plugin-jsx-a11y` should flag the missing alt.

## Back to the book

- Source text: `ENG/05-implementation/ch-14-codebase-setup.md`
- This monorepo gets extended in Chapter 15 (coding components) and Chapter 16 (testing).

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
