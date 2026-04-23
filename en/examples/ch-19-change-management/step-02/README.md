# example_19_02

**Chapter 19: Change management** · step 02 (runnable jscodeshift codemod)

A real 10-line codemod that renames `<Button intent="...">` to
`<Button variant="...">` in any `.tsx`. The idea is that the DS ships this
alongside the step-01 breaking change and the product dev runs it once to
migrate fifty usages in seconds.

## How to run it

```bash
cd en/examples/ch-19-change-management/step-02
npm install
npm run codemod:dry     # see what it would do (no writes)
npm run codemod          # apply changes
```

The script operates on `fixture/App.tsx`. After running `codemod`, open it
and you'll see the four `intent=` attributes became `variant=`.

To return to the initial state before experimenting again:

```bash
npm run reset
```

## What the transform does

```js
root
  .findJSXElements('Button')
  .find(j.JSXAttribute, { name: { name: 'intent' } })
  .forEach((path) => {
    path.node.name.name = 'variant';
  });
```

Four lines. Find every Button JSX, locate the attribute named `intent`,
rename the identifier to `variant`. It doesn't touch the value
(`"primary"`, `{currentIntent}`, etc.), and it doesn't touch other
elements that might have an `intent` prop (because the selector first
filters by `Button`).

## What it doesn't do (on purpose)

The local variable `currentIntent` in the fixture is NOT renamed. That is
product code, not Button contract. Renaming it would overreach the
codemod's responsibility. If the product dev wants to, they do it by hand
or write a follow-up codemod.

For the reader coming from the book: this is part of the contract of a
good codemod. Cover the specific breaking change, don't use it as an
excuse to "tidy up" consumer code. That humility of scope is what makes
product devs trust running codemods automatically.

## How to publish it for real

In a real DS the flow is:

1. **Codemod lives in the DS monorepo**
   (`packages/codemods/button-variant.js`).
2. **Published as `@ds/codemods` on npm.**
3. **Product dev runs** `npx @ds/codemods button-variant ./src` in their
   repo.
4. **Reviews the diff, runs the tests, commits.**

The `npx @ds/codemods button-variant` shortcut is what makes it a single
shell line in the team's Slack, not a paragraph of README.

## Things worth tweaking

- Extend the transform to look for `MemberExpression` over `props`
  (rename `props.intent` inside a hypothetical `Button.tsx`). Twenty
  minutes of work, a separate codemod.
- Apply the codemod to multiple files by pointing it at a whole
  directory and you'll see jscodeshift report "1 ok, 0 nochange, 0
  error" per file.
- Try `--dry --print` to see the diff without writing anything. Useful
  in CI to detect leftover usages.

## Back to the book

- Source text: `ENG/06-governance/ch-19-change-management.md`, section
  "Codemods, the tool that saves hours"
- Related chapter: `ch-19-change-management/step-01` (changeset that
  introduces this breaking change)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the root of the repo.
