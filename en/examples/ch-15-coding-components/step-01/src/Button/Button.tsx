import { forwardRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode, type Ref } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type ButtonOwnProps<C extends ElementType> = {
  as?: C;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
};

export type ButtonProps<C extends ElementType = 'button'> = ButtonOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>;

function ButtonInner<C extends ElementType = 'button'>(
  {
    as,
    variant = 'secondary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  }: ButtonProps<C>,
  ref: Ref<Element>
) {
  const Component = (as ?? 'button') as ElementType;
  const disabled =
    'disabled' in rest && typeof rest.disabled === 'boolean'
      ? rest.disabled || loading
      : loading;

  return (
    <Component
      ref={ref}
      className={clsx(styles.button, className)}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      {...(Component === 'button' ? { type: 'button', disabled } : {})}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && leftIcon && <span className={styles.icon} aria-hidden="true">{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
      {!loading && rightIcon && <span className={styles.icon} aria-hidden="true">{rightIcon}</span>}
    </Component>
  );
}

export const Button = forwardRef(ButtonInner) as <C extends ElementType = 'button'>(
  props: ButtonProps<C> & { ref?: Ref<Element> }
) => JSX.Element;
