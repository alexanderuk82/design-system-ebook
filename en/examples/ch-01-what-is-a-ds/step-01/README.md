# example_01_01

**Chapter 1: What is a design system?** · step 01

This is, in code, what chapter 1 spells out in prose: how a colour written once ends up painting a button in the browser, after passing through two token layers and a small script that ties them together.

```
tokens/primitive.json   →  color.blue.500    = #1F6FEB
tokens/semantic.json    →  color.brand.primary → {color.blue.500}
                              ↓
                       build.mjs (resolves references)
                              ↓
dist/variables.css      →  :root { --color-brand-primary: #1F6FEB }
                              ↓
index.html              →  .button-primary { background: var(--color-brand-primary) }
```

If brand decides next month that blue is now violet, you touch the primitive, run the build, and the button changes. None of the components know anything happened. That is the part worth keeping.

## How to run it

You need Node 18 or newer. No `npm install`, no dependencies.

```bash
cd en/examples/ch-01-what-is-a-ds/step-01
node build.mjs        # rebuilds dist/variables.css from the JSON
```

If you just want to see the result, open `index.html` straight away. The CSS is already prebuilt for you.

## Things you can poke at

Edit `tokens/primitive.json`, swap `#1F6FEB` for any other hex. Run `node build.mjs`. Refresh the browser. The button changed and you never touched the HTML.

Add another primitive, say `color.blue.700`, and a semantic `color.brand.primary-hover` that references it. The script flattens and resolves on its own, you do not have to teach it anything.

If you break the chain on purpose, say with `{color.blue.999}` which does not exist, the script throws a readable error. It does not fail quietly.

## Why a homemade script and not Style Dictionary?

Because chapter 1 has not introduced SD yet. Dropping it here would spoil the book's pacing. The `build.mjs` you see is forty lines of plain Node, no dependencies, doing only what is needed to make the concept visible. By `example_07_01` we move on to Style Dictionary properly, with multiple platforms and the rest of it.

## Back to the book

- Source text: `ENG/01-foundations/ch-01-what-is-a-ds.md`, section "A first taste of code"
- Where this is unpacked properly: chapter 4 (token theory) and chapter 5 (visual tokens)
- Where this pipeline is automated for production: chapter 7 (Style Dictionary) and chapter 12 (DS Sync)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
