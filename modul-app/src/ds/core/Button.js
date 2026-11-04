// Ported from the Atelier design system bundle (components/core/Button.jsx).
import React from 'react';
import { Icon } from './Icon.js';

const SIZES = {
  sm: {
    h: 36,
    px: 16,
    fs: 13,
    gap: 6,
    icon: 16
  },
  md: {
    h: 44,
    px: 22,
    fs: 14,
    gap: 8,
    icon: 18
  },
  lg: {
    h: 48,
    px: 28,
    fs: 15,
    gap: 10,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--surface-inverse)',
    fg: 'var(--text-inverse)',
    hover: 'var(--lime-hover)',
    border: 'transparent'
  },
  secondary: {
    bg: 'var(--surface-muted)',
    fg: 'var(--text-strong)',
    hover: 'var(--surface-pressed)',
    border: 'transparent'
  },
  accent: {
    bg: 'var(--accent-fill)',
    fg: 'var(--text-on-accent)',
    hover: 'var(--accent-fill-hover)',
    border: 'transparent'
  },
  // MODUL: destructive or irreversible actions (reject, archive, discard, withdraw).
  danger: {
    bg: 'var(--danger)',
    fg: '#FFFFFF',
    hover: 'var(--danger-hover)',
    border: 'transparent'
  },
  outline: {
    bg: 'var(--surface-card)',
    fg: 'var(--text-strong)',
    hover: 'var(--surface-hover)',
    border: 'var(--border-default)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-strong)',
    hover: 'var(--surface-hover)',
    border: 'transparent'
  },
  inverse: {
    bg: '#FFFFFF',
    fg: 'var(--text-strong)',
    hover: 'var(--ivory-100)',
    border: 'transparent'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  disabled,
  children,
  onClick,
  type = 'button',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      padding: '0 ' + s.px + 'px',
      width: fullWidth ? '100%' : undefined,
      borderRadius: 'var(--radius-full)',
      border: '1px solid ' + v.border,
      background: hover && !disabled ? v.hover : v.bg,
      color: v.fg,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 600,
      letterSpacing: '-0.005em',
      lineHeight: 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      whiteSpace: 'nowrap',
      transform: press && !disabled ? 'scale(0.98)' : 'none',
      transition: 'background var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, icon ? React.createElement(Icon, {
    name: icon,
    size: s.icon
  }) : null, children, iconRight ? React.createElement(Icon, {
    name: iconRight,
    size: s.icon
  }) : null);
}

export { Button };
