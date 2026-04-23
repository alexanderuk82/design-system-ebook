# example_14_03

**Chapter 14: Codebase setup** · step 03 · `packages/react/tsconfig.json`

The tsconfig of a package that inherits the base. Six lines instead of fifty.

## File

Lives at `step-01/packages/react/tsconfig.json` inside the real monorepo:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

## Why it matters

The package only declares what is specific to its context: where sources
live (`rootDir`), where compiled output goes (`outDir`), and which files it
covers (`include`). Everything else (target, strict, jsx, moduleResolution)
is inherited from the base.

When the monorepo grows to ten packages, each one keeps this minimal
shape. If you add a ninth package tomorrow, copying this file literally
and adjusting the `extends` path is all the TypeScript setup you need.

## The `@ds/tokens` package uses the same pattern

See `step-01/packages/tokens/tsconfig.json`. Identical structure, different
package.

## Running the monorepo

```bash
cd ../step-01
pnpm install
pnpm typecheck
```

## Back to the book

- Source text: `ENG/05-implementation/ch-14-codebase-setup.md`, section "Shared tsconfig"
- Full monorepo: `step-01/`
- Base config being extended: `step-02`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
