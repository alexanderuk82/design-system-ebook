import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled;
  return (
    <button
      type="button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={isDisabled}
      {...rest}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {!loading && leftIcon && <span className="icon" aria-hidden="true">{leftIcon}</span>}
      <span className="label">{children}</span>
      {!loading && rightIcon && <span className="icon" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}
