// Ported from the Atelier design system bundle (components/forms/Input.jsx).
import React from 'react';
import { Icon } from '../core/Icon.js';

function Input({
  value,
  defaultValue,
  onChange,
  placeholder,
  icon,
  iconRight,
  size = 'md',
  shape = 'pill',
  label,
  hint,
  error,
  disabled,
  type = 'text',
  style,
  inputStyle
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  // MODUL: a focused field shows the focus-ring colour (≥ 3:1) plus the halo, not only a pale border.
  const border = error ? 'var(--status-negative)' : focus ? 'var(--focus-ring)' : 'var(--border-subtle)';
  return React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 0,
      ...style
    }
  }, label ? React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, label) : null, React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: h,
      padding: '0 16px',
      borderRadius: shape === 'pill' ? 'var(--radius-full)' : 'var(--radius-md)',
      border: '1px solid ' + border,
      background: disabled ? 'var(--surface-muted)' : 'var(--surface-card)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: 'box-shadow var(--dur-base), border-color var(--dur-base)',
      color: 'var(--text-subtle)'
    }
  }, icon ? React.createElement(Icon, {
    name: icon,
    size: 18
  }) : null, React.createElement("input", {
    type: type,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    // MODUL: fields without a visible label (search boxes) keep a name after you start typing.
    "aria-label": label ? undefined : placeholder,
    "aria-invalid": error ? true : undefined,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 'none',
      background: 'transparent',
      fontSize: 14,
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-sans)',
      ...inputStyle
    }
  }), iconRight ? React.createElement(Icon, {
    name: iconRight,
    size: 18
  }) : null), error || hint ? React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--status-negative)' : 'var(--text-subtle)'
    }
  }, error || hint) : null);
}

export { Input };
