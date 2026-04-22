# example_05_01

**Chapter 5: Visual tokens** · step 01

The full OKLCH colour scale (blue 50 to 900 and gray 50 to 900) plus two semantic layers, one for light mode and one for dark mode. Chapter 5 showed three swatches in the snippet, this folder ships the whole set with mode integration.

```
tokens/primitive.json         →  20 colours in OKLCH (blue 10 steps + gray 10 steps)
tokens/semantic-light.json    →  surface, text, border, brand   →  point at light primitives
tokens/semantic-dark.json     →  same names                     →  point at dark primitives
                              ↓
                       build.mjs (resolves each layer against the primitives)
                              ↓
dist/variables-light.css      →  full set for light
dist/variables-dark.css       →  full set for dark
                              ↓
index.html                    →  toggle light and dark, palette + a small component
```

The component never changes. It reads `--color-surface-base`, `--color-text-primary` and `--color-brand-primary`. Those names are identical across both modes. The only thing that swaps is which primitive each name resolves to inside the loaded CSS file.

## How to run it

You need Node 18 or newer. No dependencies.

```bash
cd en/examples/ch-05-visual-tokens/step-01
node build.mjs        # writes both files into dist/
```

Open `index.html`. Two buttons (Light, Dark) swap the stylesheet, the two primitive scales render below as swatches, and a small "card" component shows that the HTML stays the same regardless of mode.

## Why OKLCH and not HSL

An OKLCH scale with H constant and L varying linearly produces a progression the eye reads as uniform. The same scale in HSL produces visible jumps at the extremes (very light blues look washed, very dark blues look characterless). Look at the two rows of swatches in the demo: each step on the blue scale is separated from the next by the same perceptual lightness jump. That coherence is what justifies moving to OKLCH.

## The chroma curve

Notice the chroma in the blue scale: it climbs from 0.02 at step 50 up to a peak of 0.22 at step 500, then drops back to 0.08 at step 900. That is not decoration, it is craft. Grays sit at almost zero chroma (0.005 to 0.018) because they are grays and we want them neutral. The brand lives at step 500 because that is where OKLCH can paint the most saturated version. Push the chroma up at step 900 and you get a blue too vibrant to use under text on a light surface.

## Dark mode done right

Three details from the chapter that this example bakes in:

1. **Avoid pure gray.50 as text in dark.** It shimmers and tires the eye. Here `text.primary` in dark points at `gray.100`, not `gray.50`.
2. **Avoid pure black as base surface.** I do use `gray.900` here because the primitive is OKLCH 12% (not 0%), so it sits comfortably dark without being pure black.
3. **Brand one step lighter in dark.** The primitive `blue.500` looks oversaturated against dark surfaces. In dark mode I map to `blue.400`. Small detail, big quality lift.

## Things worth tweaking

Change `oklch(55% 0.22 240)` to `oklch(55% 0.22 30)` in the primitive `blue.500`. The whole "blue" scale turns orange while keeping its lightness and chroma curve. That is the OKLCH leverage.

Edit `semantic-dark.json` and point `text.primary` at `gray.50` instead of `gray.100`. Reload. Notice the slight shimmer on the heading text. That is why we use `gray.100`.

Add a third mode in `tokens/semantic-highcontrast.json` that maps `text.primary` to `gray.900` and `surface.base` to `gray.50` (light, but more extreme). Edit `build.mjs` to emit it too. Your system now supports three modes without touching the primitive layer.

## Back to the book

- Source text: `ENG/02-tokens/ch-05-visual-tokens.md`, section "Colour, the layer where accessibility is won and lost"
- Where APCA accessibility is unpacked: same section
- Where theming becomes multi-brand: chapter 20

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
