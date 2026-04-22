# example_09_06

**Chapter 9: Building components** · step 06

Accessible Modal built on Radix Dialog. You get focus trap, escape to close, body scroll lock, portal and full ARIA dialog. Your job is to style and wire the state.

## How to run it

Open `index.html`. Needs internet because it pulls `@radix-ui/react-dialog` from esm.sh through an importmap (same pattern as `step-04`).

## The seven things Radix solves for you

These are the pieces you would have to build from scratch (and where almost everyone gets it wrong). Radix gives them to you on import:

1. **Focus trap.** Tab and Shift+Tab navigate only inside the modal. They do not escape to the background.
2. **Focus return.** When you close, focus returns to the element that opened the modal. Keyboard users do not lose their place.
3. **Escape closes.** Escape key triggers `onOpenChange(false)`.
4. **Click on overlay closes.** The dimmed background closes the modal on click. Configurable.
5. **Body scroll lock.** While the modal is open, the `<body>` does not scroll. Mobile especially appreciates this.
6. **Portal.** The content renders outside the parent's DOM tree, escaping any `overflow: hidden` and `transform` from the parent.
7. **Full ARIA dialog.** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at `Dialog.Title`, `aria-describedby` pointing at `Dialog.Description`. Nothing for you to write.

## The API I expose

```tsx
<Modal
  open={isPublishing}
  onOpenChange={setIsPublishing}
  title="Confirm publication"
  description="Review the changes before pushing"
>
  <p>You are about to publish 14 changes across 3 platforms.</p>
  <Button onClick={publish}>Publish now</Button>
</Modal>
```

Five props. `open` and `onOpenChange` make it controlled (the version you will want to integrate with product flows). `title` is required so `aria-labelledby` always exists. `description` is optional. `size` (sm/md/lg) tweaks the max-width through a data attribute.

## Why `title` is required

A Dialog without an accessible title is a Dialog that announces nothing to a screen reader when it opens. The only way to guarantee accessibility is to enforce the title in TypeScript. If your modal visually does not need a big title, set it and hide it with `visually-hidden` (same technique as the Input in `step-03`). The title is there, the screen reader reads it, the eye does not see it.

## Things worth tweaking

Open the modal. Press Tab twice. You go from Cancel to Publish to the X close button. One more and you are back at Cancel. Focus is trapped. Press Escape: it closes and focus returns to the "Publish release" button at the back.

Inspect the DOM while the modal is open (devtools). The `Dialog.Content` renders at the end of `<body>`, not inside `<main>`. That is the portal: it escapes the DOM tree so no parent `overflow: hidden` can affect it.

Swap `size="md"` for `size="sm"` or `size="lg"`. The CSS reads `data-size` and adjusts the max-width.

Open two nested modals in the demo (one inside the other). Radix supports it and keeps the right focus trap on the top one.

## Back to the book

- Source text: `ENG/03-components/ch-09-building-components.md`, section "Organism, Accessible Modal"
- Official Radix Dialog docs: https://www.radix-ui.com/primitives/docs/components/dialog

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
