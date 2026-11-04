// Ported from the Atelier design system bundle (components/navigation/BrandChip.jsx).
import React from 'react';

function BrandChip({
  name = 'ATELIER',
  sub,
  style
}) {
  return React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      height: 'var(--shell-header-h)',
      padding: '0 26px',
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: '0.22em',
      color: 'var(--text-strong)'
    }
  }, name), sub ? React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-subtle)',
      paddingLeft: 10,
      borderLeft: '1px solid var(--border-subtle)'
    }
  }, sub) : null);
}
function UserMenu({
  name,
  email,
  src,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const initials = (name || '').split(' ').slice(0, 2).map(w => w[0]).join('');
  return React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      height: 'var(--shell-header-h)',
      padding: '0 18px 0 8px',
      border: 0,
      cursor: 'pointer',
      borderRadius: 999,
      background: hover ? 'var(--ivory-50)' : 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      textAlign: 'left'
    }
  }, React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      overflow: 'hidden',
      // MODUL: --accent-soft keeps the initials at ≥ 4.5:1 (sage-200 gave 4.3:1).
      background: 'var(--accent-soft)',
      color: 'var(--sage-700)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 14
    }
  }, src ? React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: 0,
      maxWidth: 200,
      whiteSpace: 'nowrap'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      lineHeight: '20px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)',
      lineHeight: '16px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, email)), React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-subtle)",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      marginLeft: 14
    }
  }, React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })));
}

export { BrandChip, UserMenu };
