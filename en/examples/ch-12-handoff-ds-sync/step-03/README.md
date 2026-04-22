# example_12_03

**Chapter 12: Handoff with DS Sync** · step 03

Simulation of step 3 in the DS Sync plugin flow: the CSS variables output generated from the JSON exported out of Figma. Shows what file the dev receives in the PR and how Figma **modes** (light/dark) map to `:root`, `@media (prefers-color-scheme)` and a manual `[data-theme="dark"]` override.

```
tokens-from-figma.json   # What DS Sync emits from Figma. W3C tokens with
                         # modes on the semantic layer ({"light": ..., "dark": ...}).
                              ↓
                       build.mjs
                              ↓
dist/tokens.css          # Three blocks: :root (light) + @media (auto)
                         #              + [data-theme="dark"] (manual)
                              ↓
index.html               # Card + 3 buttons to switch modes live.
```

## How to run it

```bash
cd en/examples/ch-12-handoff-ds-sync/step-03
node build.mjs
```

Open `index.html`. Three buttons: "OS mode" (respects the operating system preference), "Force light", "Force dark". The Card component reconfigures using only CSS variables.

## What this example simulates

DS Sync (the plugin) takes the Figma variables, validates them with axe-style checks (APCA contrast, naming conventions, no broken refs), and produces a CSS variables file like `dist/tokens.css`. This folder does not ship the plugin (it is a commercial product), but it does ship exactly the JSON format the plugin emits and the script that converts it to CSS.

If you have access to DS Sync or Tokens Studio, the real JSON will look similar to `tokens-from-figma.json` (W3C Design Tokens shape with embedded modes). If you do not, this JSON is a good template for designing your own export.

## The W3C shape with modes

```json
{
  "color": {
    "semantic": {
      "surface": {
        "base": {
          "$value": { "light": "{color.primitive.gray.50}",
                      "dark":  "{color.primitive.gray.900}" },
          "$type": "color"
        }
      }
    }
  }
}
```

`$value` can be a string (token without modes) or an object `{ "light": ..., "dark": ... }` when the token changes per mode. The W3C Design Tokens spec standardises this shape. Tools like DS Sync, Tokens Studio and Figma Variables Export can all produce this format.

The `build.mjs` detects which case is which and emits three distinct CSS blocks:
1. `:root { ... }` — primitives + semantic in light mode (default)
2. `@media (prefers-color-scheme: dark) { :root { ... } }` — only the semantic subset with its dark value
3. `[data-theme="dark"] { ... }` — same subset, accessible through a class for manual overrides

That last block (`[data-theme="dark"]`) is what lets an in-product theme toggle work independently of the OS setting.

## Things worth tweaking

Edit `tokens-from-figma.json` and swap `"#0052CC"` on `blue.500` for another colour. Run the build. The card's colour changes, both in light and dark.

Add a new semantic token with modes, say `color.semantic.feedback.error`. Map light to a soft red, dark to a darker red. Run the build. It appears in all three CSS blocks without touching the script.

Switch your OS to dark mode and open the page with "OS mode" active. The card should go dark without you pressing anything.

## Difference from step-01 and step-02

This folder is the **only** one in chapter 12 with code (steps 1, 2, 4-7 in the book are visual walkthroughs of the plugin, no executable needed). That is why only `step-03` materialises: it represents the point in the flow where the JSON leaves Figma and enters the repo ecosystem.

## Back to the book

- Source text: `ENG/04-tools/ch-12-handoff-ds-sync.md`, section "Step 3, CSS variables output generated"
- Where the full 8-step flow is explained: chapter 12 as a whole
- Comparison with Tokens Studio: same chapter, "Honest comparison with Tokens Studio"

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
