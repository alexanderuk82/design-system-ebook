# example_09_04

**Chapter 9: Building components** · step 04

Select built on Radix UI. You get keyboard navigation, type-to-jump, escape to close and portal to escape the parent's overflow, all for free. Your job is to style.

## How to run it

Open `index.html` in the browser. Needs an internet connection because it pulls React, ReactDOM and `@radix-ui/react-select` from [esm.sh](https://esm.sh) using an importmap. No local npm install.

## What changed since step-01 and step-03

Here I drop the React UMD `<script>` tags and set up an **importmap** that resolves `react`, `react-dom/client` and `@radix-ui/react-select` against esm.sh. The script then uses `data-type="module"` so Babel standalone treats the TSX as an ES module and the `import`s resolve through the importmap.

```html
<script type="importmap">
{ "imports": {
  "react":              "https://esm.sh/react@18",
  "react-dom/client":   "https://esm.sh/react-dom@18/client",
  "@radix-ui/react-select": "https://esm.sh/@radix-ui/react-select@2"
}}
</script>
```

It is a pattern that works for any npm library in a standalone example.

## Why Radix and not from scratch

The book says it clearly: building an accessible combobox properly is weeks of work. Radix gives you the right behavioural tree (focus, keyboard, type-to-jump, escape, portal, ARIA roles) without writing a line of accessibility logic. You just wire the parts (`Trigger`, `Content`, `Viewport`, `Item`, `ItemText`, `ItemIndicator`) and apply your CSS.

If your product lives on a single platform, this is the sensible call. The serious alternatives are Ariakit and Headless UI, same model.

## What the component exposes

```tsx
<Select
  label="Country"
  value={country}
  onValueChange={setCountry}
  options={countries}
/>
```

Minimal API. Four props. The Radix complexity stays inside. The consumer (a product dev) sees the same shape they would see from a native `<select>`, but gets a decent combobox in return.

## CSS reads Radix data attributes

Look at the CSS:

```css
.select-item[data-highlighted] { background: var(--color-emerald-soft); }
.select-item[data-state="checked"] { font-weight: 500; }
```

Radix manages the states (`data-highlighted` when the item is keyboard-navigated, `data-state="checked"` when it is the selected one) and leaves the decoration to your CSS. Same idea as the Button in `step-01` with `data-variant`: states as attributes, not as conditional classnames.

## Things worth tweaking

Type a letter when the panel is open: it jumps to the first matching item. Type-to-jump comes free with Radix.

Press Escape to close. Click outside to close. Tab navigates items. Shift+Tab navigates back. Zero keyboard handling code written by you.

Swap `position="popper"` for `position="item-aligned"` on the `Content`. Changes the panel placement (item-aligned tries to centre the selected item under the trigger, popper places it fixed below). Both are valid, popper is more predictable.

## Back to the book

- Source text: `ENG/03-components/ch-09-building-components.md`, section "Molecule 1, Select with combobox"
- Where build-from-scratch vs compose is discussed: same section
- Official Radix Select docs: https://www.radix-ui.com/primitives/docs/components/select

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
