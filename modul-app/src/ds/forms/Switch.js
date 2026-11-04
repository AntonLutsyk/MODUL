// Ported from the Atelier design system bundle (components/forms/Switch.jsx).
import React from 'react';

function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled,
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
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    style: {
      position: 'relative',
      width: 40,
      height: 24,
      borderRadius: 999,
      background: on ? 'var(--accent)' : 'var(--limestone-300)',
      transition: 'background var(--dur-base) var(--ease-standard)',
      flexShrink: 0
    }
  }, React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: on ? 19 : 3,
      width: 18,
      height: 18,
      borderRadius: 999,
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,.15)',
      transition: 'left var(--dur-base) var(--ease-standard)'
    }
  })), label ? React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, label) : null);
}

export { Switch };
