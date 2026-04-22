# example_06_01

**Chapter 6: Motion tokens** · step 01

Motion tokens consumed from CSS. Twelve variables (five durations, four easings, three staggers) feeding three components the chapter calls out as typical use cases: a button with hover, a modal with backdrop, and a toast with an emphasised curve.

```
tokens/primitive.json   →  motion.duration.fast/normal/slow/slower/instant
                            motion.ease.out/in/in-out/emphasized
                            motion.stagger.fast/normal/slow
                              ↓
                       build.mjs (no references yet, motion tokens are pure primitives)
                              ↓
dist/variables.css      →  12 CSS variables
                              ↓
index.html              →  modal: duration slow + ease.out
                            toast: duration normal + ease.emphasized
                            button: duration fast + ease.out
```

## How to run it

You need Node 18 or newer. No dependencies.

```bash
cd en/examples/ch-06-motion-tokens/step-01
node build.mjs        # writes dist/variables.css
```

Open `index.html`. Three buttons trigger three different animations, each using a different duration + ease pairing.

## The five durations

| Token | Value | When to use |
|---|---|---|
| `instant` | 0ms | For reduced motion or cases where animating adds nothing |
| `fast` | 150ms | Hover, focus, microinteractions |
| `normal` | 250ms | Default. Small modals, drawers |
| `slow` | 400ms | Larger modals, context shifts |
| `slower` | 600ms | Ceiling. Use sparingly, almost never |

Five is not arbitrary. More than five durations and nobody can tell them apart, and ten leads to indecision without any perceptual benefit. The chapter's practical rule: the type of animation defines the duration, not the component.

## The four curves

`ease.out` is the default. If you only take one curve from the book, take that one. The other three are nuance: `ease.in` for exits, `ease.in-out` for symmetrical long movements, `ease.emphasized` for success confirmations. The exact `cubic-bezier` values come from Apple and Material practice, and they are more pronounced than the browser defaults (`ease-out` with no values produces a flabby curve).

## Why no semantic layer here

Unlike colour or typography, motion tokens work fine as pure primitives. The reason is that animations get picked by intent (fast, normal, slow) more than by abstract semantic role. You will see some systems add a semantic layer (`motion.duration.modal-enter`), but the cost of maintaining that layer rarely pays for itself. Documented usage conventions beat extra abstractions here.

## Things worth tweaking

Change `motion.duration.slow` from `400ms` to `1000ms` and open the modal. Now it feels glacial. That sensitivity is exactly why the scale lives between 100 and 600.

Change `motion.ease.out` from `cubic-bezier(0.16, 1, 0.3, 1)` to `linear`. Open the modal. The difference between a curve and linear is the difference between "feels natural" and "feels mechanical". Easing is not decoration.

Set `motion.duration.fast` to `0.01ms` (not 0). The button loses all animation. That same trick is what we use in `step-03` for `prefers-reduced-motion`, but at the token layer.

## Back to the book

- Source text: `ENG/02-tokens/ch-06-motion-tokens.md`, section "Developer's view"
- Where this is unpacked: sections "The five durations" and "Easing curves"
- Where it crosses platforms (Flutter, Swift, Kotlin): `step-02` and chapter 7
- Where it respects accessibility: `step-03` (reduced motion)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
