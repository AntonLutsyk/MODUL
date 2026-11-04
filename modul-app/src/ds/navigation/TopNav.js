// Ported from the Atelier design system bundle (components/navigation/TopNav.jsx).
import React from 'react';

function TopNav({
  items = [],
  value,
  onChange,
  style
}) {
  const opts = items.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return React.createElement("nav", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      height: 'var(--shell-header-h)',
      padding: 6,
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, opts.map(o => React.createElement(TopNavItem, {
    key: o.value,
    active: o.value === value,
    onClick: () => onChange && onChange(o.value)
  }, o.label)));
}
function TopNavItem({
  active,
  onClick,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-current": active ? 'page' : undefined,
    style: {
      height: 48,
      padding: '0 20px',
      border: 0,
      borderRadius: 999,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      background: active ? 'var(--surface-inverse)' : hover ? 'var(--surface-hover)' : 'transparent',
      color: active ? 'var(--text-inverse)' : 'var(--text-strong)',
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: '-0.005em',
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, children);
}
function HeaderGroup({
  children,
  style
}) {
  return React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 'var(--shell-header-h)',
      padding: '0 8px',
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, children);
}

export { TopNav, HeaderGroup };
