# example_05_02

**Chapter 5: Visual tokens** · step 02

The full typography scale chapter 5 promises "in the repo". Eight primitive sizes on a modular scale, semantic with `clamp()` for the headings (H1 to H4 fluid, H5 and H6 fixed), weights, leading, tracking and family. All chained and consumed by a specimen page you can resize right now.

```
tokens/primitive.json   →  font.size.0 to font.size.7   (modular scale 12 to 48px)
                            font.weight (regular/medium/bold)
                            font.leading.tight = 1.1
                            font.leading.relaxed = 1.5
                            font.tracking.tight = -0.02em
                            font.tracking.wide = 0.05em
                            font.family.sans
tokens/semantic.json    →  font.size.h1 = clamp(2.375rem, 1.5rem + 3vw, 3rem)
                            font.size.h2 = clamp(1.875rem, 1.4rem + 2vw, 2.375rem)
                            font.size.h3 = clamp(1.5rem, 1.2rem + 1.4vw, 1.875rem)
                            font.size.h4 = clamp(1.25rem, 1rem + 1vw, 1.5rem)
                            font.size.h5/h6/body/caption = reference fixed primitives
                            font.leading.body = {font.leading.relaxed}
                            font.leading.heading = {font.leading.tight}
                              ↓
                       build.mjs (resolves references)
                              ↓
dist/variables.css      →  32 CSS variables ready to use
                              ↓
index.html              →  full specimen, resize and watch clamp at work
```

## How to run it

You need Node 18 or newer. No dependencies.

```bash
cd en/examples/ch-05-visual-tokens/step-02
node build.mjs        # writes dist/variables.css with all 32 tokens
```

Open `index.html` and change the browser width. H1 to H4 scale smoothly between their min and max. H5, H6, body, body-sm and caption stay static, because body copy should follow the user's font setting, not the viewport.

## Why clamp and not media queries

Media queries with breakpoints produce visible jumps when the browser width crosses a threshold. `clamp(min, preferred, max)` interpolates continuously between the two ends as a function of viewport width. The eye reads the transition as smooth and the page feels more solid at any in-between width (tablets, resized windows, odd phones).

The preferred value formula `1.5rem + 3vw` works like this: the `1.5rem` anchors the size against the user's font setting (a user who scaled their font to 20px gets a proportionally bigger base), the `3vw` adds the fluid part that scales with width. Always anchor in `rem`, never in `px`, to satisfy WCAG 2.2 success criterion 1.4.4 (resize text 200%).

## Things worth tweaking

Change `font.size.7` (the top of the primitive scale) from `3rem` to `4rem`. Notice H1 can now grow taller on wide screens because its clamp ceiling sits higher. If you push it much further, recalculate the breakpoints in the `min + Xvw + max` formula.

Set `font.leading.body = 1.8` in the primitive. Body copy breathes more. Useful if your product is text-heavy and your audience skews older.

Add `font.family.mono` in the primitive layer and a semantic `font.family.code`. Apply the code family to a `<code>` in the HTML. Your system now has a family layer too.

## Difference from step-01

`step-01` is colour and dark mode. This is typography and fluid typography. They use exactly the same token architecture and exactly the same `build.mjs`. That is the proof that the chapter 4 theory (three generic tiers) scales to any token type without touching the resolver.

## Back to the book

- Source text: `ENG/02-tokens/ch-05-visual-tokens.md`, section "Typography, the layer people underestimate"
- Where the Figma side of typography is covered: same section, "Designer's view in Figma"
- Where fonts cross platforms: chapter 7 (multi-platform)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
