# example_07_01

**Chapter 7: Multi-platform and sync** · step 01

Three colour tokens, one JSON source, four native outputs. CSS for web, Swift for iOS, Kotlin (Compose) for Android, Dart for Flutter. Each one in the syntax its platform expects, all generated from the same file.

```
tokens/colors.json      →  color.brand.primary    = #1F6FEB
                            color.brand.secondary  = #7B1FA2
                            color.text.primary     = #1A1A1A
                              ↓
                       build.mjs (reads JSON, emits 4 files in their native formats)
                              ↓
build/css/tokens.css         :root { --color-brand-primary: #1F6FEB; ... }
build/ios/Tokens.swift       Color(red: 0.122, green: 0.435, blue: 0.922)
build/android/Tokens.kt      Color(0xFF1F6FEB)
build/flutter/tokens.dart    Color(0xFF1F6FEB)
```

## How to run it

You need Node 18 or newer. No external dependencies.

```bash
cd en/examples/ch-07-multi-platform-and-sync/step-01
node build.mjs        # writes the 4 files into build/
```

Inspect the four files in `build/` to see, side by side, the four syntaxes chapter 7 unpacks in prose.

## The four syntaxes side by side

Same colour, `#1F6FEB`. Four ways to declare it:

| Platform | Syntax | Comment |
|---|---|---|
| CSS | `--color-brand-primary: #1F6FEB;` | Hex string, direct. CSS accepts hex out of the box, conversion is trivial |
| Swift | `Color(red: 0.122, green: 0.435, blue: 0.922)` | SwiftUI wants normalised floats between 0 and 1. The build divides each component by 255 |
| Kotlin | `Color(0xFF1F6FEB)` | Compose wants a Long with `0xFF` prefix (alpha in the high byte) followed by RGB |
| Dart | `Color(0xFF1F6FEB)` | Flutter uses Long too, syntax almost identical to Compose. Almost |

The differences are not the point. The point is that the differences **exist**, they are subtle, and they are exactly where humans make mistakes when they translate by hand. An iOS dev who copies the hex by eye ends up with `Color(red: 0, green: 111, blue: 235)` instead of normalised floats, and the blue comes out completely flat. An Android dev who forgets the `0xFF` ends up with a transparent colour. None of those mistakes happen when the pipeline does the translation.

## Why this example uses a homemade script

Style Dictionary, the real tool that automates this in production, lands in `step-02`. Here I use a custom Node generator with no dependencies to teach the idea without the install ceremony. When you see `step-02` with the full Style Dictionary config, the outputs will be virtually identical to what this script produces. That is the proof SD is not magic, it is discipline applied to the same problem.

## Things worth tweaking

Swap `#1F6FEB` for `#0052CC` in `tokens/colors.json`. Run the build. Look at the 4 files in `build/`. The hex changed in CSS, the Swift floats recalculated, the Kotlin and Dart longs swapped their internal six hex digits. One edit, four platforms updated, no application code touched.

Add a new colour in `tokens/colors.json`, say `color.feedback.success = "#22C55E"`. Run the build. It appears in all four outputs with the name `colorFeedbackSuccess` (Swift, Kotlin, Dart) or `--color-feedback-success` (CSS). Naming converts automatically to each platform's idiomatic style.

Read the `build.mjs`. You will see three conversions: hex to normalised RGB for Swift, hex to Long with `0xFF` for Kotlin and Dart, hex literal for CSS. That is the logic Style Dictionary has baked in for dozens of platforms. `step-02` shows it in action.

## Difference from earlier examples

Until now every example produced a single output (CSS, or Dart, or both). This one produces four different outputs from a single set of tokens. The JSON stops being "tokens for CSS" and becomes "tokens for the system, regardless of platform".

## Back to the book

- Source text: `ENG/02-tokens/ch-07-multi-platform-and-sync.md`, section "Why every platform asks for the same token in different syntax"
- Where the real pipeline gets built with Style Dictionary: `step-02`
- Where this connects to Figma: same chapter, "Designer's view" section

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
