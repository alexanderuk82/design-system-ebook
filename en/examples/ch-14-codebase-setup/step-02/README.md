# example_14_02

**Chapter 14: Codebase setup** · step 02 · `tsconfig.base.json`

Shared TypeScript config at the monorepo root. Each package extends this
base and only declares what is specific to it (outDir, rootDir, includes).

## File

Lives at `step-01/tsconfig.base.json` inside the real monorepo:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  }
}
```

## Why it matters

One config governs typing across the whole monorepo. When tomorrow you want
to bump the target to `ES2024` or enable `noUncheckedIndexedAccess`, you
change it here and both packages inherit without touching anything else.

`isolatedModules: true` is critical for tsup and other esbuild based
bundlers. It guarantees every file can be transpiled independently, which
is why builds are fast.

`declaration: true` activates `.d.ts` emission. tsup handles this per
package via `dts: true`, but leaving it in the base prevents accidents if
a package gets set up by hand.

## How it is consumed

Each package has a six line `tsconfig.json` that extends the base. See
`step-03` for the concrete example in the `@ds/react` package.

## Running the monorepo

```bash
cd ../step-01
pnpm install
pnpm typecheck
```

## Back to the book

- Source text: `ENG/05-implementation/ch-14-codebase-setup.md`, section "Shared tsconfig"
- Full monorepo: `step-01/`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
