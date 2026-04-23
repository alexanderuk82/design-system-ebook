# example_15_05

**Chapter 15: Coding components** · step 05 · Polymorphic Button with forwardRef

The Button accepts an `as` prop that swaps the rendered element
(`<button>`, `<a>`, etc.) while keeping every style and every typed prop
correct. `forwardRef` lets the consumer access the DOM node.

## Excerpt

From `step-01/src/Button/Button.tsx`:

```tsx
import { forwardRef, type ComponentPropsWithoutRef, type ElementType, type Ref } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonOwnProps<C extends ElementType> = {
  as?: C;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
};

export type ButtonProps<C extends ElementType = 'button'> =
  ButtonOwnProps<C> & Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>;

function ButtonInner<C extends ElementType = 'button'>(
  { as, variant = 'secondary', size = 'md', loading, className, children, ...rest }: ButtonProps<C>,
  ref: Ref<Element>
) {
  const Component = (as ?? 'button') as ElementType;
  return (
    <Component
      ref={ref}
      className={clsx(styles.button, className)}
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

export const Button = forwardRef(ButtonInner) as <C extends ElementType = 'button'>(
  props: ButtonProps<C> & { ref?: Ref<Element> }
) => JSX.Element;
```

## Why it matters

**Typed polymorphism.** `<Button as="a" href="/detail">` renders an `<a>`
with `href` validated by TypeScript. Write `<Button as="a" type="submit">`
and TypeScript rejects it because `type` is not valid on `<a>`. The
`C extends ElementType` generic is what makes this possible.

**forwardRef enables integration.** Libraries like Floating UI (Tooltip
and Popover positioning) and Modal focus management need the ref to the
DOM node. Without `forwardRef` the ref points at the React component,
not the element, and the library silently breaks.

**Safe overrides.** `Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>`
guarantees the consumer cannot accidentally override `variant` or `size`
via native element props.

**Pragmatism of the cast.** The final `as` cast on `forwardRef` is the
price TypeScript charges for generics + forwardRef. Five obscure lines in
exchange for a perfectly typed external API. You accept it once and the
rest of the DS benefits.

## How to run it

```bash
cd ../step-01
npm install
npm run dev
# the "Polymorphism" section renders Button as="a" as real <a> elements
```

## Back to the book

- Source text: `ENG/05-implementation/ch-15-coding-components.md`, section "The Button in real code, condensed version"
- Full app: `step-01/`
- Related chapter: `ch-08` (API design, the `as` prop)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
