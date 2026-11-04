// Ported from the Atelier design system bundle (components/forms/SegmentedControl.jsx).
import React from 'react';

function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style
}) {
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const h = size === 'sm' ? 32 : 40;
  return React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      padding: 4,
      borderRadius: 999,
      background: 'var(--surface-muted)',
      ...style
    }
  }, opts.map(o => {
    const on = o.value === value;
    return React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(o.value),
      style: {
        height: h,
        padding: size === 'sm' ? '0 14px' : '0 20px',
        border: 0,
        borderRadius: 999,
        cursor: 'pointer',
        background: on ? 'var(--surface-card)' : 'transparent',
        boxShadow: on ? 'var(--shadow-xs)' : 'none',
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        fontSize: size === 'sm' ? 13 : 14,
        fontWeight: on ? 600 : 500,
        whiteSpace: 'nowrap',
        transition: 'background var(--dur-base), color var(--dur-base)'
      }
    }, o.label);
  }));
}

export { SegmentedControl };
