# example_14_06

**Chapter 14: Codebase setup** · step 06 · `packages/react/tsup.config.ts`

tsup config for the `@ds/react` package. Ten lines producing ESM, CJS and
`.d.ts` bundles in parallel.

## File

Lives at `step-01/packages/react/tsup.config.ts` inside the real monorepo:

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
});
```

## Why it matters

tsup wraps esbuild with sensible library defaults. Zero custom config. The
output covers the three consumption scenarios:

- **ESM** (`dist/index.js`), for modern apps with tree shaking bundlers.
- **CJS** (`dist/index.cjs`), for classic Node and legacy tooling.
- **DTS** (`dist/index.d.ts`), so TypeScript infers types from the package
  when consumed.

`external: ['react', 'react-dom']` is the critical line. Without it your
bundle includes React and the consuming app ends up with two copies (its
own plus yours). That breaks hooks, doubles the bundle size, and produces
bugs that are impossible to debug. Marking React as external is non
negotiable in any React DS package.

`clean: true` wipes `dist/` before each build. Prevents old files from
surviving after you rename exports.

## The `@ds/tokens` package has a similar tsup

See `step-01/packages/tokens/tsup.config.ts`. Identical pattern without
`external` because tokens does not depend on React.

## How it runs

```bash
cd ../step-01
pnpm build      # turbo orchestrates tokens first, then react
```

## Back to the book

- Source text: `ENG/05-implementation/ch-14-codebase-setup.md`, section "Build tooling"
- Full monorepo: `step-01/`
- Pipeline that orchestrates: `step-07` (turbo.json)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
