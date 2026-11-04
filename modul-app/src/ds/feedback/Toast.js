// Ported from the Atelier design system bundle (components/feedback/Toast.jsx).
// MODUL: uses the --toast-* tokens (an inverse surface with ≥ 7:1 text in both themes)
// instead of --surface-inverse (lime), on which the description and the Undo action
// were unreadable. Pages pass their own timeout; see dc/runtime.js toastMs().
import React from 'react';
import { Icon } from '../core/Icon.js';

function Toast({
  title,
  description,
  icon = 'circle-check',
  action,
  onAction,
  onClose,
  style
}) {
  return React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px 14px 18px',
      minWidth: 320,
      maxWidth: 440,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--toast-bg)',
      color: 'var(--toast-fg)',
      boxShadow: 'var(--shadow-pop)',
      ...style
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 20,
    color: "var(--toast-action)"
  }), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, title), description ? React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--toast-muted)'
    }
  }, description) : null), action ? React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--toast-action)',
      fontSize: 14,
      fontWeight: 700,
      cursor: 'pointer',
      padding: '8px 10px',
      minHeight: 36,
      borderRadius: 'var(--radius-sm)',
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, action) : null, onClose ? React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--toast-muted)',
      cursor: 'pointer',
      padding: 6,
      minWidth: 28,
      minHeight: 28,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)'
    }
  }, React.createElement(Icon, {
    name: "x",
    size: 16
  })) : null);
}

export { Toast };
