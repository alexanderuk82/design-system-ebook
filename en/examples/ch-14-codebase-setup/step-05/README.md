# example_14_05

**Chapter 14: Codebase setup** · step 05 · `.prettierrc`

Shared Prettier configuration. Five lines that end eternal style debates
in code review.

## File

Lives at `step-01/.prettierrc` inside the real monorepo:

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

## Why it matters

Prettier resolves formatting at a mechanical level, not a human one. Zero
PR discussions over quotes or line width. The formatter picks, and the
whole team follows the same rules.

`printWidth: 80` is deliberate. It matches what Kindle reflowable tolerates
for code blocks (see Chapter 2 on ebook reflow). If a DS snippet ends up
in documentation or in this book, wrapping stays clean.

`trailingComma: "es5"` adds trailing commas in arrays and objects but not
in function signatures (where they are not legal in `es5`). Reduces diff
noise: adding an element at the end of an array does not touch the
previous line.

## How to apply it

```bash
cd ../step-01
pnpm format     # runs prettier --write across the whole repo
```

Ideally wired to a pre-commit hook (Husky + lint-staged) that formats only
the staged files. That is out of Chapter 14 scope but the natural next step.

## Back to the book

- Source text: `ENG/05-implementation/ch-14-codebase-setup.md`, section "ESLint and Prettier"
- Full monorepo: `step-01/`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
