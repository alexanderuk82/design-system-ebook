# example_15_03

**Chapter 15: Coding components** · step 03 · component file structure

The "one folder per component" convention from Chapter 15: everything
Button related lives together in its own folder.

## Structure

Inside `step-01/src/Button/`:

```
src/Button/
├── Button.tsx              # TSX implementation
├── Button.module.css       # scoped CSS Modules
├── index.ts                # barrel export
```

In a full DS the same folder would also contain:

```
├── Button.stories.mdx      # chapter 13
├── Button.test.tsx         # chapter 16
└── Button.a11y.tsx         # specific axe tests
```

## Why it matters

The old-school "one file per component" does not survive once the
component has stories, tests, and a11y checks. Folder grouping scales.
Inside the folder, names repeat (`Button.*`) so the file explorer sorts
alphabetically by type, not by component.

The `index.ts` lets consumers write `import { Button } from './Button'`
(the folder) instead of `./Button/Button`. It hides the internal detail
and leaves the door open to splitting the file later without touching
consumers.

## How to run it

```bash
cd ../step-01
npm install
npm run dev
```

## Back to the book

- Source text: `ENG/05-implementation/ch-15-coding-components.md`, section "Internal structure of a DS component"
- Full app: `step-01/`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
