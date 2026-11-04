// Ported from the Atelier design system bundle (components/data/StatCard.jsx).
import React from 'react';
import { IconButton } from '../core/IconButton.js';

function StatCard({
  label,
  value,
  unit,
  delta,
  deltaLabel = 'this week',
  trend,
  variant = 'default',
  action = 'arrow-up-right',
  onAction,
  bars = true,
  style
}) {
  const accent = variant === 'accent';
  const tile = variant === 'tile';
  const t = trend || (typeof delta === 'string' && delta.trim().startsWith('-') ? 'down' : delta && /^\+?0(\.0)?%?$/.test(String(delta).trim()) ? 'flat' : 'up');
  const deltaColor = accent ? '#FFFFFF' : t === 'down' ? 'var(--status-negative)' : t === 'flat' ? 'var(--text-muted)' : 'var(--status-positive)';
  const fg = accent ? '#FFFFFF' : 'var(--text-strong)';
  // MODUL: full-opacity white on the accent tile; translucent white fell below 4.5:1.
  const sub = accent ? '#FFFFFF' : 'var(--text-muted)';
  return React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 20,
      padding: 'var(--space-5) var(--space-5) var(--space-5) var(--space-5)',
      minHeight: 176,
      borderRadius: 'var(--radius-lg)',
      // MODUL: the accent tile uses the text-safe accent fills (≥ 5:1 with white) in both themes.
      background: accent ? 'linear-gradient(140deg, var(--accent-fill) 0%, var(--accent-fill-hover) 70%, var(--accent-fill-end) 100%)' : tile ? 'var(--surface-inset)' : 'var(--surface-card)',
      boxShadow: tile || accent ? 'none' : 'var(--shadow-card)',
      color: fg,
      ...style
    }
  }, bars ? React.createElement(Bars, {
    light: accent
  }) : null, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      position: 'relative'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: fg,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, label), action ? React.createElement(IconButton, {
    icon: action,
    size: "sm",
    variant: accent ? 'glass' : 'soft',
    label: 'Open ' + label,
    onClick: onAction
  }) : null), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      position: 'relative'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, React.createElement("span", {
    style: {
      fontSize: 'var(--text-figure-lg)',
      lineHeight: 'var(--lh-figure-lg)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), unit ? React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: sub
    }
  }, unit) : null), delta != null ? React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      fontSize: 13,
      minWidth: 0
    }
  }, React.createElement("span", {
    style: {
      color: deltaColor,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, delta), React.createElement("span", {
    style: {
      color: sub,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, deltaLabel)) : null));
}
function Bars({
  light
}) {
  const hs = [34, 52, 74, 96];
  return React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 14,
      bottom: 0,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 5
    }
  }, hs.map((h, i) => React.createElement("span", {
    key: i,
    style: {
      width: 9,
      height: h,
      borderRadius: '6px 6px 0 0',
      background: light ? 'rgba(255,255,255,' + (0.1 + i * 0.05) + ')' : 'rgba(31,31,28,' + (0.025 + i * 0.012) + ')'
    }
  })));
}

export { StatCard };
