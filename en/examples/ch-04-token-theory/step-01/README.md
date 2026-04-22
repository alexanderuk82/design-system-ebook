# example_04_01

**Chapter 4: Token theory** · step 01

Three JSON files, one chain. This is what chapter 4 spells out in prose: primitive, intent and component tiers, chained for real and consumed by a button in the browser.

```
tokens/primitive.json   →  color.blue.500                  = #1F6FEB
tokens/intent.json      →  color.intent.action-primary     → {color.blue.500}
tokens/component.json   →  button.background.primary       → {color.intent.action-primary}
                              ↓
                       build.mjs (resolves chained references)
                              ↓
dist/variables.css      →  --button-background-primary: #1F6FEB
                              ↓
index.html              →  background: var(--button-background-primary)
```

The button only knows about its component token. It does not know an intent layer exists, let alone a primitive. That ignorance is exactly what lets you, on rebrand day, change the primitive in one place and watch the whole chain update on its own.

## How to run it

You need Node 18 or newer. No dependencies.

```bash
cd en/examples/ch-04-token-theory/step-01
node build.mjs        # rebuilds dist/variables.css
```

Or open `index.html` directly, the CSS is prebuilt.

## Things worth trying

Edit `#1F6FEB` in `tokens/primitive.json` to any other hex. Run the build. The button changed. You did not touch the intent layer, you did not touch the component layer, you did not touch the HTML.

Now give the Button its own slightly darker shade for higher contrast, without touching the rest of the system. In `tokens/component.json`, replace `{color.intent.action-primary}` with a fresh primitive (say, `{color.blue.700}`, which you would first have to add to the primitive layer). The intent layer stays as it was for everything else. Component tokens are the seam where you break inheritance for one component without disturbing the rest.

Point a token at something that does not exist (say `{color.blue.999}`). The build throws a readable error. It does not silently emit a broken value into your CSS.

## Difference from earlier examples

`example_01_01` showed two tiers (primitive and semantic). This one adds the third tier (component) and demonstrates the realistic case: a specific component consuming the token that belongs to it, instead of consuming the intent layer directly. The why behind the third tier is in the chapter, but the short version is: isolation, theming, and traceability in docs.

## Back to the book

- Source text: `ENG/02-tokens/ch-04-token-theory.md`, section "The three tiers: primitive, intent, component"
- Where naming conventions are unpacked: same chapter, naming section
- Where multi-brand applies this: chapter 20

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
