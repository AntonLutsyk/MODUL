// Ported from the Atelier design system bundle (components/forms/Checkbox.jsx).
import React from 'react';
import { Icon } from '../core/Icon.js';

function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  description,
  disabled,
  shape = 'square',
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked != null ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (checked == null) setInner(!on);
    onChange && onChange(!on);
  };
  return React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      toggle();
    },
    style: {
      display: 'inline-flex',
      alignItems: description ? 'flex-start' : 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    style: {
      width: 20,
      height: 20,
      flexShrink: 0,
      borderRadius: shape === 'circle' ? 999 : 6,
      marginTop: description ? 2 : 0,
      border: on ? '1.5px solid var(--surface-inverse)' : '1.5px solid var(--border-strong)',
      background: on ? 'var(--surface-inverse)' : 'var(--surface-card)',
      color: 'var(--text-inverse)', // MODUL: ink tick on the lime fill (white was ~1.1:1)
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast)'
    }
  }, on ? React.createElement(Icon, {
    name: "check",
    size: 13,
    strokeWidth: 2.6
  }) : null), label ? React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)',
      textDecoration: on && shape === 'circle' ? 'line-through' : 'none',
      textDecorationColor: 'var(--gray-400)'
    }
  }, label), description ? React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, description) : null) : null);
}
function CheckItem({
  children,
  tone = 'accent'
}) {
  const bg = tone === 'accent' ? 'var(--accent-soft)' : 'var(--surface-muted)';
  const fg = tone === 'accent' ? 'var(--accent)' : 'var(--text-muted)';
  return React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 999,
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: "check",
    size: 15,
    strokeWidth: 2.2
  })), React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, children));
}

export { Checkbox, CheckItem };
