import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <button
      type="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
