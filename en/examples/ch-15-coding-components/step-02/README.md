# example_15_02

**Chapter 15: Coding components** · step 02 · theme switch in React

The root component declares `data-theme` on an ancestor and a `useState`
hook flips it. Zero context providers, zero descendant re-renders. The
browser repaints on its own.

## File

Lives at `step-01/src/App.tsx`:

```tsx
import { useState } from 'react';
import { Button } from './Button';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div data-theme={theme}>
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Theme: {theme}
      </Button>
      {/* rest of the app */}
    </div>
  );
}
```

## Why it matters

The alternatives (Context carrying a theme object, prop drilling, CSS-in-JS
with a theme prop) re-render every descendant on theme change. With CSS
variables and `data-theme` the change is purely cosmetic at the browser
level. Open DevTools, Performance tab, record while you toggle the theme,
and you will see zero React renders between the `setState` and the next
painted frame.

## Key pair

This file works alongside `step-01/src/tokens.css` (step 01 of the chapter),
which defines the per theme variables. Without those variables, flipping
`data-theme` has no effect.

## How to run it

```bash
cd ../step-01
npm install
npm run dev
# click the "Theme: light" button on the top right
```

## Back to the book

- Source text: `ENG/05-implementation/ch-15-coding-components.md`, section "Tokens as CSS variables, the base layer"
- Full app: `step-01/`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
