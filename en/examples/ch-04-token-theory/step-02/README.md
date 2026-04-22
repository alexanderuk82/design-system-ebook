# example_04_02

**Chapter 4: Token theory** · step 02

The same set of tokens, compiled two different ways. Both are valid and they solve different problems. Chapter 4 lays out the theory, this example lets you flip the switch live.

```
tokens/primitive.json   →  color.blue.500              = #1F6FEB
                            color.intent.action-primary → {color.blue.500}
tokens/component.json   →  button.background.primary   → {color.intent.action-primary}
                              ↓
                       build.mjs (writes TWO files)
                              ↓
dist/variables-resolved.css
   :root {
     --color-blue-500: #1F6FEB;
     --color-intent-action-primary: #1F6FEB;
     --button-background-primary: #1F6FEB;     ← literal hex, chain flattened
   }

dist/variables-referenced.css
   :root {
     --color-blue-500: #1F6FEB;
     --color-intent-action-primary: var(--color-blue-500);
     --button-background-primary: var(--color-intent-action-primary);   ← chain alive
   }
```

## How to run it

You need Node 18 or newer. No dependencies.

```bash
cd en/examples/ch-04-token-theory/step-02
node build.mjs        # writes both files into dist/
```

Then open `index.html`. Two buttons swap which stylesheet is loaded, and a colour picker mutates `--color-blue-500` at runtime. The difference between the two modes shows up immediately on the swatch.

## Things worth trying

Load the **referenced** mode (it is the default) and move the picker. The swatch follows, because every variable downstream resolves through `var()` at paint time.

Switch to **resolved** mode and move the picker again. The swatch ignores you, because the component value was baked into a literal hex when the file was built. The primitive changed in runtime, but nothing downstream knows.

Open both `dist/*.css` files side by side. The diff between them is, visually, exactly what chapter 4 is trying to explain in prose.

## When to pick which mode

**Resolved** is the right call when tokens do not change at runtime. That covers maybe 95% of products. You give up dynamic flexibility but you gain a touch of runtime performance (the browser does not have to walk a chain of variables) and your CSS is fully inspectable without holding the whole token tree in your head.

**Referenced** is the right call when you do runtime theming: dark mode, multi-brand, or any situation where flipping a primitive needs to ripple through the system without a page reload. The live chain means a single `setProperty` call updates every downstream variable in one go.

Most teams end up doing a hybrid: resolve component tokens (where you almost never want runtime flexibility) and keep intent tokens referenced (where you usually do). Style Dictionary has transformers for exactly this, and we cover them in chapter 7.

## Back to the book

- Source text: `ENG/02-tokens/ch-04-token-theory.md`, section "Resolution versus reference"
- Where this lands in the real pipeline: chapter 7 (Style Dictionary)
- Where this connects to dark mode: chapter 5 (visual tokens)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
