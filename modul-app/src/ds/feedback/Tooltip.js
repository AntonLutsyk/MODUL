// Ported from the Atelier design system bundle (components/feedback/Tooltip.jsx).
import React from 'react';

function Tooltip({
  content,
  children,
  placement = 'top',
  open: forced
}) {
  const [open, setOpen] = React.useState(false);
  const show = forced != null ? forced : open;
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return React.createElement("span", {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, children, show ? React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      zIndex: 60,
      whiteSpace: 'nowrap',
      padding: '6px 10px',
      borderRadius: 8,
      background: 'var(--toast-bg)', // MODUL: same high-contrast inverse surface as toasts
      color: 'var(--toast-fg)',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: '16px',
      boxShadow: 'var(--shadow-pop)',
      pointerEvents: 'none'
    }
  }, content) : null);
}

export { Tooltip };
