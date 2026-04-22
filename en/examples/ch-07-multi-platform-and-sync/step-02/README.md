# example_07_02

**Chapter 7: Multi-platform and sync** · step 02

Style Dictionary configured for real. The same config that appears literally in the chapter 7 snippet. Run `npm install && npm run build` and you get the four files from `step-01`, this time produced not by a homemade script but by Amazon's tool that has held up token pipelines in production since 2016.

```
tokens/colors.json              →  3 colours (same set as step-01)
                              ↓
                       style-dictionary build (config in style-dictionary.config.js)
                              ↓
build/css/tokens.css            :root { --color-brand-primary: #1f6feb; ... }
build/ios/Tokens.swift          public class DSTokens { static let colorBrandPrimary = UIColor(...) }
build/android/Tokens.kt         object DSTokens { val colorBrandPrimary = Color(0xff1f6feb) }
build/flutter/tokens.dart       class DSTokens { static const colorBrandPrimary = Color(0xFF1F6FEB) }
```

## How to run it

Unlike the earlier examples, this one does need `npm install`.

```bash
cd en/examples/ch-07-multi-platform-and-sync/step-02
npm install           # installs style-dictionary
npm run build         # runs style-dictionary build
```

Outputs land in `build/`. Four folders, four files, all from a single JSON in `tokens/`.

## The config, block by block

`style-dictionary.config.js` is the entire document. Five blocks:

1. **`source`**: where the source tokens live. Here, every `.json` under `tokens/`.
2. **`platforms.css`**: uses `transformGroup: "css"` (a preset that flattens references and formats names in kebab-case), builds into `build/css/`, emits a file in format `css/variables`.
3. **`platforms.ios`**: uses `transformGroup: "ios-swift"` (converts hex to `UIColor` with floats), builds into `build/ios/`, emits Swift in format `ios-swift/class.swift` with className `DSTokens`.
4. **`platforms.android`**: `transformGroup: "compose"`, format `compose/object`, packageName `com.yourcompany.ds`, className `DSTokens`. The `object` is the Kotlin equivalent of a namespace.
5. **`platforms.flutter`**: `transformGroup: "flutter"`, format `flutter/class.dart`, className `DSTokens`. A Dart class with a private constructor and static constants.

Every platform reuses the same `source`. That is the load-bearing piece: one source, four destinations.

## Difference from step-01

`step-01` does exactly the same with a homemade `build.mjs` of about 80 lines. This folder does it with Style Dictionary, a tool that ships hundreds of pre-built transformers, supports more platforms (CSS, SCSS, JSON, Swift, Objective-C, Kotlin, Java, Dart, Android XML, JavaScript, TypeScript), and has an active community maintaining the formats.

Why have both steps? Because `step-01` teaches the idea without the ceremony, and `step-02` teaches the actual tool. The progression works better than starting straight on a configured SD.

## Things worth tweaking

Swap `#1F6FEB` for `#0052CC` in `tokens/colors.json`. Run `npm run build`. Look at the four files in `build/`. Every one changed, no config edit needed.

Add a new colour in `tokens/colors.json`, say `color.feedback.success` with value `#22C55E`. Run the build. It appears in all four outputs with each platform's idiomatic naming (`colorFeedbackSuccess` in Swift/Kotlin/Dart, `--color-feedback-success` in CSS).

Look at the Swift output and compare it with the Kotlin output. Same colour, two syntaxes. One does `UIColor(red: 0.122, green: 0.435, blue: 0.922, alpha: 1)`. The other does `Color(0xff1f6feb)`. That difference, multiplied by every token in the system, multiplied by a year of changes, is exactly what you do not want to maintain by hand.

## Spacing needs extra transforms

This folder uses colours only because, for spacing, the default `transformGroup`s need an extra transform (`size/dp` for Compose, etc.) and the config grows without adding much to the concept. If you want to extend it: add `tokens/spacing.json` with raw numeric values (not `"4px"`, just `4`), and modify each platform in the config to concatenate the appropriate spacing transform onto the base transformGroup. The exact shape lives in the Style Dictionary v3 docs.

`step-01` shows that exercise solved with a homemade script, which is more explicit about the per-platform conversions.

## Style Dictionary v3, not v4

This folder pins Style Dictionary v3. The v4 release changed a lot of API surface (formats with namespaces, W3C tokens schema by default instead of the classic schema). The chapter 7 snippet was written for v3, and this `package.json` pins it explicitly. When the ecosystem finishes migrating to v4 (some time in 2026 / 2027) this folder will get updated.

## Back to the book

- Source text: `ENG/02-tokens/ch-07-multi-platform-and-sync.md`, section "Style Dictionary, the workhorse"
- Where this connects to CI: chapter 12 (DS Sync, pipeline automation)
- Official SD v3 docs: https://amzn.github.io/style-dictionary/

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
