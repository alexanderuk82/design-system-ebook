# ejemplo_15_05

**Capítulo 15: Codificando componentes** · paso 05 · Button polimórfico con forwardRef

El Button acepta una prop `as` que cambia el elemento renderizado
(`<button>`, `<a>`, etc) manteniendo todos los estilos y props tipadas
correctamente. `forwardRef` permite que el consumer acceda al DOM.

## Extracto

De `paso-01/src/Button/Button.tsx`:

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

## Por qué importa

**Polimorfismo tipado.** `<Button as="a" href="/detalle">` renderiza un `<a>`
con `href` validado por TypeScript. Si escribes `<Button as="a" type="submit">`,
TypeScript lo rechaza porque `type` no es válido en `<a>`. El tipo `C extends
ElementType` es lo que lo hace posible.

**forwardRef permite integración.** Librerías como Floating UI (posicionamiento
de Tooltip, Popover) y focus management de Modal necesitan el ref al DOM
node. Sin `forwardRef` el ref apunta al componente React, no al elemento, y
la librería falla silenciosamente.

**Overrides seguros.** `Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>`
garantiza que el consumer no pueda sobrescribir accidentalmente `variant` o
`size` vía props nativas del elemento.

**Pragmatismo del cast.** El `as` cast al final del `forwardRef` es el precio
que paga TypeScript por los genéricos + forwardRef. Cinco líneas oscuras a
cambio de un API externo perfectamente tipado. Lo aceptas una vez y el resto
del DS se beneficia.

## Cómo correrlo

```bash
cd ../paso-01
npm install
npm run dev
# la seccion "Polimorfismo" muestra Button as="a" renderizando <a> reales
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-15-codificando-componentes.md`, sección "El Button en código real, versión resumida"
- App completa: `paso-01/`
- Cap relacionado: `cap-08` (API design, la prop `as`)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
