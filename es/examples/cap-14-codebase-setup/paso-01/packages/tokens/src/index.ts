export const tokens = {
  color: {
    primary: 'var(--ds-color-primary)',
    primaryFg: 'var(--ds-color-primary-fg)',
    secondary: 'var(--ds-color-secondary)',
    secondaryFg: 'var(--ds-color-secondary-fg)',
    danger: 'var(--ds-color-danger)',
    dangerFg: 'var(--ds-color-danger-fg)',
    focusRing: 'var(--ds-color-focus-ring)',
  },
  radius: {
    sm: 'var(--ds-radius-sm)',
    md: 'var(--ds-radius-md)',
    lg: 'var(--ds-radius-lg)',
  },
  space: {
    xs: 'var(--ds-space-xs)',
    sm: 'var(--ds-space-sm)',
    md: 'var(--ds-space-md)',
    lg: 'var(--ds-space-lg)',
  },
} as const;

export type Tokens = typeof tokens;
