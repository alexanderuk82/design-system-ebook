import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = 'secondary',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type="button" data-variant={variant} {...rest}>
      {children}
    </button>
  );
}
