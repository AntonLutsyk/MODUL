// Ported from the Atelier design system bundle (components/data/ListRow.jsx).
import React from 'react';
import { Icon } from '../core/Icon.js';
import { pressable } from '../a11y.js';

const TONE = {
  positive: 'var(--status-positive)',
  negative: 'var(--status-negative)',
  warning: 'var(--status-warning)',
  muted: 'var(--text-muted)',
  default: 'var(--text-strong)'
};
function ListRow({
  icon,
  iconTone = 'neutral',
  leading,
  title,
  meta,
  value,
  valueTone = 'default',
  trailing,
  divider = true,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const ibg = iconTone === 'accent' ? 'var(--accent-soft)' : 'var(--surface-muted)';
  const ifg = iconTone === 'accent' ? 'var(--accent)' : 'var(--text-strong)';
  return React.createElement("div", {
    onClick: onClick,
    ...pressable(onClick),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 0',
      borderBottom: divider ? '1px solid var(--border-subtle)' : 0,
      cursor: onClick ? 'pointer' : undefined,
      background: onClick && hover ? 'linear-gradient(90deg, transparent, var(--ivory-50) 10%, var(--ivory-50) 90%, transparent)' : 'transparent',
      ...style
    }
  }, leading || (icon ? React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      background: ibg,
      color: ifg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 19
  })) : null), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), meta ? React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, meta) : null), value != null ? React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: TONE[valueTone] || TONE.default,
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, value) : null, trailing || null);
}

export { ListRow };
