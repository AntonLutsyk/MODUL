// Ported from the Atelier design system bundle (components/forms/Select.jsx).
// MODUL: keyboard + ARIA (collapsible listbox pattern). The trigger exposes
// aria-haspopup/aria-expanded; ArrowDown/Up/Enter/Space open the list; inside it
// arrows, Home/End move, Enter/Space pick, Escape/Tab close and return focus.
import React from 'react';
import { Icon } from '../core/Icon.js';

let uid = 0;

function Select({
  value,
  options = [],
  onChange,
  placeholder = 'Select',
  variant = 'outline',
  size = 'md',
  icon,
  align = 'left',
  style,
  'aria-label': ariaLabel
}) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const ref = React.useRef(null);
  const trigger = React.useRef(null);
  const optRefs = React.useRef([]);
  const id = React.useMemo(() => 'ds-select-' + ++uid, []);
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const curIx = opts.findIndex(o => o.value === value);
  const cur = opts[curIx];

  React.useEffect(() => {
    if (!open) return;
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  React.useEffect(() => {
    if (open && active >= 0 && optRefs.current[active]) optRefs.current[active].focus();
  }, [open, active]);

  const openAt = ix => { setActive(ix < 0 ? 0 : ix); setOpen(true); };
  const close = refocus => { setOpen(false); setActive(-1); if (refocus && trigger.current) trigger.current.focus(); };
  const pick = o => { close(true); onChange && onChange(o.value); };

  const onTriggerKey = e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAt(e.key === 'ArrowUp' ? (curIx >= 0 ? curIx : opts.length - 1) : (curIx >= 0 ? curIx : 0));
    }
  };
  const onListKey = e => {
    const n = opts.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => (a + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => (a - 1 + n) % n); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(n - 1); }
    else if ((e.key === 'Enter' || e.key === ' ') && opts[active]) { e.preventDefault(); pick(opts[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); }
    else if (e.key === 'Tab') { close(false); }
  };

  const h = size === 'sm' ? 32 : 44;
  const ghost = variant === 'ghost';
  return React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, React.createElement("button", {
    ref: trigger,
    type: "button",
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    "aria-controls": open ? id : undefined,
    "aria-label": ariaLabel,
    onClick: () => open ? close(false) : openAt(curIx),
    onKeyDown: onTriggerKey,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: h,
      padding: size === 'sm' ? '0 10px 0 12px' : '0 14px 0 18px',
      borderRadius: 'var(--radius-full)',
      border: ghost ? '1px solid transparent' : '1px solid var(--border-subtle)',
      background: hover ? 'var(--surface-hover)' : ghost ? 'transparent' : 'var(--surface-card)',
      color: 'var(--text-strong)',
      fontSize: size === 'sm' ? 13 : 14,
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-base)'
    }
  }, icon ? React.createElement(Icon, {
    name: icon,
    size: 16
  }) : null, React.createElement("span", {
    style: {
      color: cur ? 'var(--text-strong)' : 'var(--text-subtle)'
    }
  }, cur ? cur.label : placeholder), React.createElement(Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--text-subtle)",
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-base)'
    }
  })), open ? React.createElement("div", {
    id: id,
    role: "listbox",
    "aria-label": ariaLabel,
    onKeyDown: onListKey,
    style: {
      position: 'absolute',
      top: h + 6,
      [align === 'right' ? 'right' : 'left']: 0,
      minWidth: '100%',
      zIndex: 50,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-pop)',
      padding: 6,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, opts.map((o, i) => React.createElement(SelectOption, {
    key: o.value,
    optRef: el => { optRefs.current[i] = el; },
    selected: o.value === value,
    focused: i === active,
    onFocus: () => setActive(i),
    onClick: () => pick(o)
  }, o.label))) : null);
}
function SelectOption({
  selected,
  focused,
  optRef,
  onFocus,
  onClick,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement("button", {
    ref: optRef,
    type: "button",
    role: "option",
    "aria-selected": selected,
    tabIndex: focused ? 0 : -1,
    onClick: onClick,
    onFocus: onFocus,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      height: 36,
      padding: '0 12px',
      border: 0,
      borderRadius: 'var(--radius-sm)',
      background: hover || focused ? 'var(--surface-hover)' : 'transparent',
      fontSize: 14,
      fontWeight: selected ? 600 : 500,
      color: 'var(--text-strong)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'left'
    }
  }, children, selected ? React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "var(--accent)"
  }) : null);
}

export { Select };
