// Ported from the Atelier design system bundle (components/messaging/Composer.jsx).
import React from 'react';
import { Icon } from '../core/Icon.js';
import { IconButton } from '../core/IconButton.js';

function Composer({
  placeholder = 'Write a message…',
  onSend,
  style
}) {
  const [v, setV] = React.useState('');
  const send = () => {
    if (!v.trim()) return;
    onSend && onSend(v.trim());
    setV('');
  };
  return React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 64,
      padding: '0 8px 0 20px',
      borderRadius: 999,
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      ...style
    }
  }, React.createElement("button", {
    type: "button",
    "aria-label": "Attach file",
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      padding: 4,
      display: 'inline-flex'
    }
  }, React.createElement(Icon, {
    name: "paperclip",
    size: 20
  })), React.createElement("input", {
    value: v,
    onChange: e => setV(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') send();
    },
    placeholder: placeholder,
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 'none',
      background: 'transparent',
      fontSize: 16,
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-sans)'
    }
  }), React.createElement("button", {
    type: "button",
    "aria-label": "Mention",
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      padding: 4,
      display: 'inline-flex'
    }
  }, React.createElement(Icon, {
    name: "smile",
    size: 20
  })), React.createElement(IconButton, {
    icon: "send",
    variant: "accent",
    size: "md",
    label: "Send",
    onClick: send,
    style: {
      width: 48,
      height: 48
    }
  }));
}

export { Composer };
