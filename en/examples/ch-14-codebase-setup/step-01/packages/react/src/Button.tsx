import React from 'react';
import { tokens } from '@ds/tokens';

type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: `${tokens.space.xs} ${tokens.space.sm}`, fontSize: '0.8125rem' },
  md: { padding: `${tokens.space.sm} ${tokens.space.md}`, fontSize: '0.9375rem' },
  lg: { padding: `${tokens.space.md} ${tokens.space.lg}`, fontSize: '1rem' },
};

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: { background: tokens.color.primary, color: tokens.color.primaryFg },
  secondary: { background: tokens.color.secondary, color: tokens.color.secondaryFg },
  danger: { background: tokens.color.danger, color: tokens.color.dangerFg },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled;
  return (
    <button
      type="button"
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={isDisabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.space.sm,
        border: 0,
        borderRadius: tokens.radius.md,
        fontWeight: 600,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
