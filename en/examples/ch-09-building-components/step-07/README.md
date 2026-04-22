# example_09_07

**Chapter 9: Building components** · step 07

Navigation that separates visual styling from semantic state. The active item carries `aria-current="page"` and the CSS decorates that attribute. No parallel conditional classname, no way for the visual style and the screen-reader information to drift apart.

## How to run it

Open `index.html`. React UMD from unpkg, Babel standalone compiles the TSX in the browser.

## The decision that matters

The common mistake when building navigation is decorating the active item with a manual classname:

```tsx
// Antipattern
<a className={isActive ? 'active' : ''}>Home</a>
```

This produces a nav that looks correct visually but a screen reader user cannot navigate: `aria-current` is missing, so assistive software does not know which page is current.

The right pattern puts `aria-current="page"` on the active item and lets CSS read that attribute:

```tsx
<a aria-current={isActive ? "page" : undefined}>Home</a>
```

```css
.nav-item[aria-current="page"] {
  background: var(--color-active-bg);
  color: var(--color-active-text);
}
```

Now you cannot decorate it without marking it accessible. The two travel together by design.

## The other two things almost no one gets right

**`<nav>` with a unique `aria-label`.** If your page has two `<nav>` elements (main and footer, or main and sidebar), each needs a distinct `aria-label`. The demo shows two navs: "Main" and "Footer links". A screen reader lists them in the landmarks menu by those names and the user can jump straight to either.

**Semantic links, not `<div onClick>`.** The item is an `<a href>` with real link semantics. The browser gives it the right behaviour for free: right-click → open in new tab, Ctrl+click → background, Tab focus, Enter activates. A `<div>` with onClick only works with a mouse.

## Focus ring distinct from the active state

In CSS:
```css
.nav-item[aria-current="page"] { background: var(--color-active-bg); color: var(--color-active-text); }  /* green */
.nav-item:focus-visible        { outline: 2px solid var(--color-focus); }                                  /* indigo blue */
```

Active is green (emerald), focus is blue (indigo). The user always knows where they are (aria-current) and where they are focused (focus ring). The two can overlap visually (you Tab-navigate past the active item) and remain distinguishable.

`:focus-visible` prevents the ring from showing on mouse click, only when the user is actually navigating with the keyboard.

## Things worth tweaking

Open devtools and inspect an active item. You will see `aria-current="page"`. On inactive ones the attribute is absent (undefined in React equals omitting).

Tab from anywhere outside the nav. When focus reaches an item, the indigo ring appears. Press Enter: it navigates to that path (the demo uses local state, in production you would wire useRouter from Next or similar).

Change the second nav's `label="Main"` to match the first. Chrome devtools > Accessibility tab will show the landmarks now have duplicate names. A screen reader user hears both as "nav, Main" and cannot tell them apart.

## Back to the book

- Source text: `ENG/03-components/ch-09-building-components.md`, section "Organism, Accessible Navigation"
- Where accessibility is unpacked: chapter 10 (a11y by design)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
