# example_09_01

**Chapter 9: Building components** · step 01

Accessible Button with four variants, three sizes, five states, and slots for icons. The whole component lives inside the `<script type="text/babel">` block in `index.html`, compiled in the browser with Babel standalone. No `npm install`, no bundler, just open the HTML.

```
index.html          # Babel compiles the TSX in the browser
├── Button.tsx      # embedded, with React types + variants + states
├── App.tsx         # embedded, demo with every combination
styles.css          # Tokens + Button styles (data-variant, data-size)
README.md
```

## How to run it

Open `index.html` directly in the browser. No local dependencies, React and Babel load from unpkg.com.

If you want to use the Button in your real project, copy the TSX from `index.html` into a `Button.tsx` file. In a project running Vite or Next, it works without changes because the code is standard TSX.

## What the Button demonstrates

**Four nameable variants.** Primary for the screen's main action, Secondary for alternatives, Ghost for tertiary actions inside a group, Danger for destruction. Four fit in one sentence. Twelve is a sign that the system is substituting design decisions with prop configuration.

**Three fixed sizes.** sm, md, lg. No custom size, because the typography scale in chapter 5 already fixes proportions. If product asks for an "extra large" button for a hero section, the system answer is: the hero uses its own piece, not a Button forced to be something else.

**Complete states from day one.** default, hover, focus (with `outline: 2px solid var(--color-focus)` using `:focus-visible`), disabled, loading. Loading blocks the click without visually disabling the button and sets `aria-busy` so a screen reader announces the change. A keyboard-and-audio user gets the same complete experience as a mouse user.

**Slots, not string props for icons.** `leftIcon` and `rightIcon` accept `ReactNode`. Any SVG, any icon component, or none. The `iconName: string` alternative forces you to maintain an internal name map and breaks the moment someone needs a custom icon.

**`data-variant` and `data-size` in the DOM, not conditional classnames.** CSS reads attribute selectors (`button[data-variant="primary"]`). The React code has no `className={loading ? 'loading' : ''}` nor string concatenation. The component reads cleanly, the CSS too.

## Why the code is embedded in the HTML

Fase B examples (chapters 1 to 7) needed no `npm install` and opened with a double-click. Same rule stays in Fase C. React UMD plus Babel standalone loaded from a CDN compile the TSX in the browser. Slower than a bundle (Babel at runtime) and you would not ship this to production, but for a book example it is perfect: the reader sees all the code in one file, opens it, plays.

When you reach chapter 14 (codebase setup) and Fase D of the companion repo, you will see these same components inside a pnpm monorepo with Vite, real TypeScript and Vitest tests, which is how you assemble it for production.

## Things worth tweaking

Change `variant="primary"` to `variant="secondary"` in the demo and reload. Same component, different face. CSS only decorates data attributes.

Add a fifth variant, say `success` (green). Add it to the `Variant` union, add the selector `button[data-variant="success"]` in `styles.css`. Do not touch `Button.tsx`. You just extended the system.

Make a button `loading={true}` permanently and navigate to it with Tab. The focus ring appears, but the click does nothing. That is the difference between `disabled` (the browser skips the tab order) and `aria-disabled` (navigable but not activatable). Both applied together give the right loading experience.

## Back to the book

- Source text: `ENG/03-components/ch-09-building-components.md`, section "Atom 1, Button"
- Where the 80/20 of DS scope is discussed: same section, end of chapter
- Where the Button's a11y tests get automated: `step-08` of this same chapter

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
