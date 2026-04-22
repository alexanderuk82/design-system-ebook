# example_02_01

**Chapter 2: Principles and business case** · step 01

Chapter 2 closes with a small artefact: a principle, encoded as a token. The principle is "clarity beats cleverness". Its consequence on visual design is that the action colour must be unambiguous and held against the brand at full strength. That decision lives in the token's `$description`, and the build script carries it across to the CSS as a comment. The principle leaves the JSON and arrives at the stylesheet without anyone retyping it.

```
tokens/primitive.json   →  color.brand.500            = #1F6FEB
tokens/intent.json      →  color.intent.action-primary → {color.brand.500}
                            ↑ $description carries the principle
                              ↓
                       build.mjs (resolves refs + emits descriptions as CSS comments)
                              ↓
dist/variables.css      →  /* Main interactive colour. Encodes the principle... */
                            --color-intent-action-primary: #1F6FEB;
                              ↓
index.html              →  background: var(--color-intent-action-primary)
                            (and the principle is quoted on the page itself)
```

This is not the same shape as `example_01_01`. The first chapter showed how a token reaches a button. This one shows how the **reasoning** behind the token reaches the codebase, instead of dying inside a Notion page that nobody opens after launch week.

## How to run it

You need Node 18 or newer. No dependencies.

```bash
cd en/examples/ch-02-principles-and-business-case/step-01
node build.mjs        # rebuilds dist/variables.css from the JSON
```

Or open `index.html` straight away, the CSS is prebuilt.

## Things worth trying

Open `dist/variables.css` after the build runs. Notice the `$description` from each JSON token sits as a CSS comment right above its variable. That comment is searchable, greppable, and survives Storybook docs generation later in the book.

Edit the `$description` in `tokens/intent.json` to capture a different principle (say, "accessible by default"). Run the build. The CSS comment updates. The variable's value did not change, but the **reason it exists** did, and now that reason rides shotgun next to the value forever.

Try removing the `$description` from `tokens/primitive.json`. The build still works, the comment just disappears for that variable. Descriptions are optional, the resolver does not care.

## Difference from example_01_01

The first example showed the chain: token to button. This one shows that tokens are not just colours, they are **decisions**, and decisions need to carry their justification with them. That is why the file is called `intent.json` and not `semantic.json`. Same architectural slot in the system, different framing for this chapter's lesson.

The deeper treatment of intent versus value tokens lives in chapter 4. For now the takeaway is that your tokens can be a more honest place to write down "why" than your design docs ever were.

## Back to the book

- Source text: `ENG/01-foundations/ch-02-principles-and-business-case.md`, section "A small artefact: the principle as a token"
- Where this is unpacked properly: chapter 4 (token theory) and chapter 19 (governance and change management)
- Where principles meet documentation surface: chapter 13 (Storybook)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
