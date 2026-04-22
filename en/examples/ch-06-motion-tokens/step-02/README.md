# example_06_02

**Chapter 6: Motion tokens** · step 02

The same motion tokens as `step-01`, this time compiled from JSON to Dart for Flutter. Same `tokens/primitive.json` (literally the same source of truth). Only the target of `build.mjs` changes: instead of emitting CSS, it emits a Dart class with `Duration` and `Cubic` constants ready to consume from any widget.

```
tokens/primitive.json   →  motion.duration (5 values) + motion.ease (4 curves)
                              ↓
                       build.mjs (parses ms and cubic-bezier, emits Dart code)
                              ↓
lib/motion_tokens.dart  →  class MotionTokens { static const ... }
                              ↓
example/main.dart       →  AnimatedContainer(duration: MotionTokens.durationNormal,
                                              curve:    MotionTokens.easeOut, ...)
```

## How to regenerate the tokens

```bash
cd en/examples/ch-06-motion-tokens/step-02
node build.mjs        # writes lib/motion_tokens.dart
```

## How to run the Flutter sample

This part needs the Flutter SDK installed locally. If you have it:

```bash
# Create any Flutter project
flutter create motion_demo
cd motion_demo

# Copy the two files from this folder into the project
cp ../en/examples/ch-06-motion-tokens/step-02/lib/motion_tokens.dart lib/
cp ../en/examples/ch-06-motion-tokens/step-02/example/main.dart lib/main.dart

# Run
flutter run
```

You will see two demos: an AnimatedContainer that resizes with `durationNormal` and `easeOut`, and an AnimatedOpacity with `durationSlow` and `easeEmphasized`. The token names are identical to the web version in `step-01`.

If you do not have Flutter, no problem: read `lib/motion_tokens.dart` and `example/main.dart`. The point of the example is to show that **the same JSON can produce CSS or Dart** without the design team having to maintain two truths. That is the value of the multi-platform pipeline chapter 7 covers.

## What the build does

The Node script reads `tokens/primitive.json` and translates two value types:

1. **Durations like `"250ms"`** → `Duration(milliseconds: 250)`. Flutter exposes `Duration` as a native type, so the mapping is direct.
2. **Curves like `"cubic-bezier(0.16, 1, 0.3, 1)"`** → `Cubic(0.16, 1, 0.3, 1)`. Flutter has a `Cubic` class that takes the four parameters of a cubic Bézier, exactly like CSS.

Each constant name comes from the token path. `motion.duration.normal` → `durationNormal`. `motion.ease.in-out` → `easeInOut`. Simple, predictable convention.

## Same shape for Swift and Kotlin

The pattern is identical, only the target changes. For Swift, the constants would be `TimeInterval` and `CAMediaTimingFunction`. For Kotlin, `Long` (in milliseconds) and `androidx.compose.animation.core.CubicBezierEasing`. Chapter 7 covers that whole piece with Style Dictionary, where adding a new target is a transformer file and nothing more.

## Difference from step-01

`step-01` emits CSS. This one emits Dart. The source JSON is identical. If in six months the team decides `motion.duration.normal` should be 200ms instead of 250, you edit the JSON and regenerate. The web changes. Flutter changes. iOS and Android change. Zero divergence between platforms. Zero PRs across five repos. That is the real promise of the pipeline.

## Back to the book

- Source text: `ENG/02-tokens/ch-06-motion-tokens.md`, section "Developer's view" (Flutter snippet)
- Where the multi-platform pipeline gets built for real: chapter 7 (Style Dictionary)
- Where reduced motion is added: `step-03`

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
