// Ported from the Atelier design system bundle (components/core/Card.jsx).
import React from 'react';

const VARIANTS = {
  default: {
    background: 'var(--surface-card)',
    boxShadow: 'var(--shadow-card)',
    color: 'var(--text-body)',
    radius: 'var(--radius-card)'
  },
  inset: {
    background: 'var(--surface-inset)',
    boxShadow: 'none',
    color: 'var(--text-body)',
    radius: 'var(--radius-tile)'
  },
  muted: {
    background: 'var(--surface-muted)',
    boxShadow: 'none',
    color: 'var(--text-body)',
    radius: 'var(--radius-tile)'
  },
  accent: {
    // MODUL: text-safe accent fills and inverse ink (white on lime/light periwinkle was < 3:1).
    background: 'linear-gradient(135deg, var(--accent-fill) 0%, var(--accent-fill-hover) 60%, var(--accent-fill-end) 100%)',
    boxShadow: 'none',
    color: '#FFFFFF',
    radius: 'var(--radius-card)'
  },
  inverse: {
    background: 'var(--surface-inverse)',
    boxShadow: 'none',
    color: 'var(--text-inverse)',
    radius: 'var(--radius-card)'
  }
};
function Card({
  variant = 'default',
  padding,
  title,
  subtitle,
  action,
  selected,
  children,
  style,
  onClick
}) {
  const v = VARIANTS[variant] || VARIANTS.default;
  const pad = padding != null ? padding : variant === 'inset' || variant === 'muted' ? 'var(--tile-padding)' : 'var(--card-padding)';
  const onDark = variant === 'accent' || variant === 'inverse';
  return React.createElement("section", {
    onClick: onClick,
    style: {
      background: v.background,
      boxShadow: v.boxShadow,
      color: v.color,
      borderRadius: v.radius,
      padding: pad,
      border: selected ? '1.5px solid var(--border-accent)' : '1.5px solid transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minWidth: 0,
      cursor: onClick ? 'pointer' : undefined,
      ...style
    }
  }, title || action ? React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0
    }
  }, title ? React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-title)',
      lineHeight: 'var(--lh-title)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-tight)',
      color: variant === 'accent' ? '#fff' : variant === 'inverse' ? 'var(--text-inverse)' : 'var(--text-strong)'
    }
  }, title) : null, subtitle ? React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--lh-body)',
      color: onDark ? 'rgba(255,255,255,.8)' : 'var(--text-muted)'
    }
  }, subtitle) : null), action || null) : null, children);
}

export { Card };
