// Ported from the Atelier design system bundle (components/core/Badge.jsx).
import React from 'react';
import { Icon } from './Icon.js';

const T = {
  neutral: ['var(--status-neutral-bg)', 'var(--status-neutral)'],
  accent: ['var(--accent-soft)', 'var(--text-accent)'],
  positive: ['var(--status-positive-bg)', 'var(--status-positive)'],
  negative: ['var(--status-negative-bg)', 'var(--status-negative)'],
  warning: ['var(--status-warning-bg)', 'var(--status-warning)'],
  info: ['var(--status-info-bg)', 'var(--status-info)'],
  inverse: ['var(--surface-inverse)', 'var(--text-inverse)'],
  glass: ['rgba(255,255,255,.2)', '#FFFFFF']
};
function Badge({
  tone = 'neutral',
  size = 'md',
  dot,
  icon,
  children,
  style
}) {
  const [bg, fg] = T[tone] || T.neutral;
  const sm = size === 'sm';
  return React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: sm ? 24 : 30,
      padding: sm ? '0 10px' : '0 14px',
      borderRadius: 'var(--radius-full)',
      background: bg,
      color: fg,
      fontSize: sm ? 12 : 14,
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot ? React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: 'currentColor'
    }
  }) : null, icon ? React.createElement(Icon, {
    name: icon,
    size: sm ? 13 : 15
  }) : null, children);
}

export { Badge };
