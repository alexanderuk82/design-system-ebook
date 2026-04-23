import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Semantic variant of the button. */
  variant?: Variant;
  /** Visual size. */
  size?: Size;
  /** Shows spinner and disables interaction. */
  loading?: boolean;
  /** Icon rendered to the left of the label. */
  leftIcon?: React.ReactNode;
  /** Icon rendered to the right of the label. */
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
      className="ds-button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={isDisabled}
      {...rest}
    >
      {loading && <span className="ds-button__spinner" aria-hidden="true" />}
      {!loading && leftIcon && (
        <span className="ds-button__icon" aria-hidden="true">{leftIcon}</span>
      )}
      <span className="ds-button__label">{children}</span>
      {!loading && rightIcon && (
        <span className="ds-button__icon" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  );
}
