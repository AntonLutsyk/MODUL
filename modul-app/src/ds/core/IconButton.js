// Ported from the Atelier design system bundle (components/core/IconButton.jsx).
import React from 'react';
import { Icon } from './Icon.js';

const V = {
  ghost: {
    bg: 'transparent',
    hover: 'var(--surface-hover)',
    fg: 'var(--text-strong)',
    border: 'transparent'
  },
  soft: {
    bg: 'var(--surface-muted)',
    hover: 'var(--surface-pressed)',
    fg: 'var(--text-strong)',
    border: 'transparent'
  },
  outline: {
    bg: 'var(--surface-card)',
    hover: 'var(--surface-hover)',
    fg: 'var(--text-strong)',
    border: 'var(--border-subtle)'
  },
  inverse: {
    bg: 'var(--surface-inverse)',
    hover: 'var(--lime-hover)',
    fg: 'var(--text-inverse)',
    border: 'transparent'
  },
  accent: {
    bg: 'var(--accent-fill)',
    hover: 'var(--accent-fill-hover)',
    fg: 'var(--text-on-accent)',
    border: 'transparent'
  },
  glass: {
    bg: 'rgba(255,255,255,.18)',
    hover: 'rgba(255,255,255,.28)',
    fg: '#FFFFFF',
    border: 'transparent'
  }
};
const S = {
  xs: [28, 14],
  sm: [36, 16],
  md: [44, 20],
  lg: [52, 22]
};
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  shape = 'circle',
  label,
  badge,
  active,
  disabled,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const v = V[active ? 'inverse' : variant] || V.ghost;
  const [d, is] = S[size] || S.md;
  return React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: d,
      height: d,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: shape === 'square' ? 'var(--radius-md)' : 'var(--radius-full)',
      border: '1px solid ' + v.border,
      background: hover && !disabled ? v.hover : v.bg,
      color: v.fg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      padding: 0,
      transition: 'background var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, React.createElement(Icon, {
    name: icon,
    size: is
  }), badge ? React.createElement("span", {
    style: {
      position: 'absolute',
      top: d * 0.2,
      right: d * 0.24,
      width: 8,
      height: 8,
      borderRadius: 99,
      background: 'var(--accent)',
      boxShadow: '0 0 0 2px var(--surface-card)'
    }
  }) : null);
}

export { IconButton };
