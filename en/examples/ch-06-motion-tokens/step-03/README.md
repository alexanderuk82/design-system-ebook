# example_06_03

**Chapter 6: Motion tokens** · step 03

`prefers-reduced-motion` implemented at the token layer, not at the component layer. This is the piece chapter 6 flags as mandatory for accessibility: WCAG 2.2 success criterion 2.3.3 requires it and a real percentage of your users need it.

```
tokens/primitive.json   →  motion.duration.fast/normal/slow + motion.ease.out  (normal values)
tokens/reduced.json     →  the same names                                      (all at 0.01ms)
                              ↓
                       build.mjs (emits the primitives + two overrides)
                              ↓
dist/variables.css      →  :root { ... normal values ... }
                            @media (prefers-reduced-motion: reduce) { :root { ... 0.01ms ... } }
                            html.reduced { ... 0.01ms ... }
                              ↓
index.html              →  modal uses the tokens. Enable reduce motion in the OS or
                            tick the checkbox and the modal pops in instantly.
```

## How to run it

You need Node 18 or newer. No dependencies.

```bash
cd en/examples/ch-06-motion-tokens/step-03
node build.mjs        # writes dist/variables.css with base + overrides
```

Open `index.html`. The status line tells you whether the OS asked for reduce motion and whether the manual toggle is on. If either is on, the modal appears with no animation.

## The key idea

The modal component is identical to `step-01`. It reads `--motion-duration-slow` and `--motion-ease-out`. It has no `@media (prefers-reduced-motion)` of its own. Zero component code to support motion accessibility.

When the browser detects the user enabled reduce motion, the `:root` variables are redefined on the spot. Every component in the product that consumes duration tokens inherits the change. Eighty components with animations? You do not edit eighty files. You edit one: the tokens file.

That is the difference between a healthy system and one that patches accessibility component by component.

## Why 0.01ms and not 0

Some implementations of `transitionend` do not fire when the duration is exactly 0. JavaScript that listens for the end of a transition gets stuck. `0.01ms` is perceived as instant by the eye and lets the event still fire. One of those details that look like a triviality until a component is wedged in production.

## Why two overrides (media query and class)

The `@media (prefers-reduced-motion: reduce)` is the respectful default for the OS setting. It is the right behaviour out of the box.

The `html.reduced` class is for an in-product toggle. Some users live on shared devices (work, library) where they will not change the global config. A "Reduce animations" toggle in product preferences that writes to `localStorage` and applies `html.reduced` solves that case. If your product is used in those contexts, this toggle widens your accessible reach.

## Things worth tweaking

Enable reduce motion at the OS level (System Settings → Accessibility → Reduce Motion on macOS, equivalents on iOS, Windows and Android). Reload the page. The status line reflects it. Open the modal. It pops in.

Remove the `@media` override from the generated CSS and leave only the `html.reduced` class. The manual toggle still works, but the OS setting is ignored. Users with motion sensitivity must use your in-product toggle or suffer the animations. Demonstrates why the media query is not optional.

Add one more override: `html.reduced .parallax-hero { display: none; }`. Some animations cause distress even at 0.01ms (parallax, autoplaying video, large scrolls). Those should not be reduced, they should be turned off. The chapter rule: if the animation moves more than 10% of the viewport, disable it entirely under reduce motion, do not just speed it up.

## Difference from step-01 and step-02

`step-01` shows how motion tokens get used in CSS. `step-02` shows how they are compiled to Dart for Flutter. This one shows how the system honours accessibility without asking anything of the components. Together the three pieces are the full cycle: define, distribute, respect.

## Back to the book

- Source text: `ENG/02-tokens/ch-06-motion-tokens.md`, section "prefers-reduced-motion as a first-class citizen"
- Where it is required by accessibility: WCAG 2.2 SC 2.3.3, cited in the same section
- Where it connects to the in-product toggle: same section, last paragraph

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
