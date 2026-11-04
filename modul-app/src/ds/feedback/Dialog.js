// Ported from the Atelier design system bundle (components/feedback/Dialog.jsx).
import React from 'react';
import { IconButton } from '../core/IconButton.js';

let dialogUid = 0;

function Dialog({
  open = true,
  title,
  description,
  children,
  footer,
  onClose,
  width = 520,
  inline
}) {
  // MODUL: title/description are linked for screen readers; focus is handled by lib/focus-manager.js.
  const ids = React.useMemo(() => { const n = ++dialogUid; return { t: 'ds-dlg-t' + n, d: 'ds-dlg-d' + n }; }, []);
  if (!open) return null;
  const panel = React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": title ? ids.t : undefined,
    "aria-describedby": description ? ids.d : undefined,
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-pop)',
      padding: 'var(--card-padding)',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, React.createElement("h2", {
    id: ids.t,
    style: {
      margin: 0,
      fontSize: 'var(--text-title)',
      lineHeight: '28px',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: 'var(--text-strong)'
    }
  }, title), description ? React.createElement("p", {
    id: ids.d,
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: '22px',
      color: 'var(--text-muted)'
    }
  }, description) : null), onClose ? React.createElement(IconButton, {
    icon: "x",
    variant: "soft",
    size: "sm",
    label: "Close",
    onClick: onClose
  }) : null), children, footer ? React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      paddingTop: 4
    }
  }, footer) : null);
  if (inline) return panel;
  return React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, panel);
}

export { Dialog };
