// Ported from the Atelier design system bundle (components/core/Avatar.jsx).
import React from 'react';
import { photoFor } from '../../lib/people.js';

const SZ = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 56
};
function Avatar({
  name = '',
  src,
  size = 'md',
  status,
  tone = 'limestone',
  style
}) {
  // MODUL: every avatar gets a studio portrait by name; unknown names keep initials.
  src = src || photoFor(name);
  const d = typeof size === 'number' ? size : SZ[size] || 44;
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const bg = tone === 'sage' ? 'var(--sage-200)' : tone === 'graphite' ? 'var(--graphite-800)' : 'var(--limestone-200)';
  const fg = tone === 'graphite' ? '#fff' : 'var(--graphite-800)';
  return React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: d,
      height: d,
      flexShrink: 0,
      ...style
    }
  }, React.createElement("span", {
    style: {
      width: d,
      height: d,
      borderRadius: 999,
      overflow: 'hidden',
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Math.round(d * 0.36),
      fontWeight: 600,
      letterSpacing: '0.01em'
    }
  }, src ? React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), status ? React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: Math.max(8, d * 0.22),
      height: Math.max(8, d * 0.22),
      borderRadius: 99,
      background: status === 'online' ? 'var(--status-positive)' : 'var(--gray-400)',
      boxShadow: '0 0 0 2px var(--surface-card)'
    }
  }) : null);
}
function AvatarGroup({
  names = [],
  size = 'sm',
  max = 4
}) {
  const shown = names.slice(0, max);
  const extra = names.length - shown.length;
  const d = SZ[size] || 32;
  return React.createElement("span", {
    title: names.join(', '),
    style: {
      display: 'inline-flex'
    }
  }, shown.map((n, i) => React.createElement(Avatar, {
    key: i,
    name: n,
    size: size,
    style: {
      marginLeft: i ? -d * 0.28 : 0,
      boxShadow: '0 0 0 2px var(--surface-card)',
      borderRadius: 999
    }
  })), extra > 0 ? React.createElement("span", {
    style: {
      marginLeft: -d * 0.28,
      width: d,
      height: d,
      borderRadius: 999,
      background: 'var(--surface-muted)',
      boxShadow: '0 0 0 2px var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, "+", extra) : null);
}

export { Avatar, AvatarGroup };
