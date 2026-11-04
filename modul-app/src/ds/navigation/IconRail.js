// Ported from the Atelier design system bundle (components/navigation/IconRail.jsx).
import React from 'react';
import { Icon } from '../core/Icon.js';

function IconRail({
  groups = [],
  value,
  onChange,
  style
}) {
  return React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-10)',
      width: 'var(--shell-sidebar-w)',
      height: '100%',
      ...style
    }
  }, groups.map((g, gi) => React.createElement("div", {
    key: gi,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: 6,
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      marginTop: g.bottom ? 'auto' : undefined
    }
  }, (g.items || g).map(it => React.createElement(RailButton, {
    key: it.value,
    item: it,
    active: it.value === value,
    onClick: () => onChange && onChange(it.value)
  })))));
}
function RailButton({
  item,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement("button", {
    type: "button",
    title: item.label,
    "aria-label": item.label,
    "aria-current": active ? 'page' : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 52,
      height: 52,
      borderRadius: 999,
      border: 0,
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? 'var(--surface-inverse)' : hover ? 'var(--surface-hover)' : 'transparent',
      color: active ? 'var(--text-inverse)' : 'var(--text-strong)',
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, React.createElement(Icon, {
    name: item.icon,
    size: 21
  }));
}

export { IconRail };
