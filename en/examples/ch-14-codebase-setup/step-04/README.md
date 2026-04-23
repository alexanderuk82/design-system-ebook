# example_14_04

**Chapter 14: Codebase setup** · step 04 · `.eslintrc.cjs`

Shared ESLint configuration at the root, with emphasis on JSX accessibility
and preventing relative imports between packages.

## File

Lives at `step-01/.eslintrc.cjs` inside the real monorepo:

```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  settings: {
    react: { version: "18" },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",
      { patterns: ["../../packages/*"] },
    ],
  },
  ignorePatterns: ["dist", "node_modules", "*.cjs"],
};
```

## Why it matters

`eslint-plugin-jsx-a11y` complements the axe tests from Chapter 10. It
detects common JSX violations (img without alt, label without htmlFor,
div with onClick but no role) **before** code reaches CI. This is
lint level validation that fails fast and gives instant feedback in the
editor.

`no-restricted-imports` with the pattern `../../packages/*` prevents one
package importing from another via relative paths. It forces imports by
name (`import { tokens } from '@ds/tokens'`) rather than
`import { tokens } from '../../packages/tokens/src'`. Keeps the dependency
graph clean.

`react/react-in-jsx-scope: off` is required for React 17+ because you no
longer have to import React explicitly to use JSX (the new `react-jsx`
runtime handles it).

## Running the monorepo

```bash
cd ../step-01
pnpm install
pnpm lint
```

## Back to the book

- Source text: `ENG/05-implementation/ch-14-codebase-setup.md`, section "ESLint and Prettier"
- Full monorepo: `step-01/`
- Related chapter: `ch-10-accessibility/step-01` (axe in tests)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
