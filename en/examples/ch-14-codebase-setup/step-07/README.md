# example_14_07

**Chapter 14: Codebase setup** · step 07 · `turbo.json`

Turborepo task pipeline. Declares which tasks exist, their dependencies,
and which files they produce.

## File

Lives at `step-01/turbo.json` inside the real monorepo:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

## Why it matters

Turborepo reads this file and understands the dependency graph of the
monorepo.

`"dependsOn": ["^build"]` means "before building this package, build its
dependencies". When you run `pnpm build` at the root, Turborepo sees that
`@ds/react` depends on `@ds/tokens` (via `package.json`) and orchestrates:

1. `@ds/tokens` builds first.
2. `@ds/react` waits and then builds.

Without Turborepo you would maintain this order by hand (or each package
would have to know how to rebuild its deps), which scales poorly to ten
packages.

`"outputs": ["dist/**"]` declares what files the task produces. That
activates Turborepo cache: every build is hashed with the package content
plus the config. Run `pnpm build` twice without changes and the second run
takes zero seconds because it serves from cache.

`"cache": false` on `clean` turns off caching for that specific task.
Makes sense because clean removes files, does not produce anything to
cache.

In large teams the cache can be shared remotely (Turborepo Cloud, or your
own S3 bucket), so a dev running `git pull` does not rebuild anything
another dev already built. Saves hours per week.

## In action

```bash
cd ../step-01
pnpm build      # first run, ~5s
pnpm build      # second run, ~0s (cache hit)
```

## Back to the book

- Source text: `ENG/05-implementation/ch-14-codebase-setup.md`, section "turbo.json, the task pipeline"
- Full monorepo: `step-01/`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
