/* @ds-bundle: {"format":4,"namespace":"ATELIERDesignSystem_b56b60","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ListRow","sourcePath":"components/data/ListRow.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"CheckItem","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Composer","sourcePath":"components/messaging/Composer.jsx"},{"name":"MessageBubble","sourcePath":"components/messaging/MessageBubble.jsx"},{"name":"DateDivider","sourcePath":"components/messaging/MessageBubble.jsx"},{"name":"AppShell","sourcePath":"components/navigation/AppShell.jsx"},{"name":"BrandChip","sourcePath":"components/navigation/BrandChip.jsx"},{"name":"UserMenu","sourcePath":"components/navigation/BrandChip.jsx"},{"name":"IconRail","sourcePath":"components/navigation/IconRail.jsx"},{"name":"TopNav","sourcePath":"components/navigation/TopNav.jsx"},{"name":"HeaderGroup","sourcePath":"components/navigation/TopNav.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"39e69f336c7d","components/core/Badge.jsx":"3eeaeea296e8","components/core/Button.jsx":"68b52b0945e1","components/core/Card.jsx":"abae9b1ab0f9","components/core/Icon.jsx":"111ff76be326","components/core/IconButton.jsx":"19ff20bd71c8","components/data/BarChart.jsx":"c18e881eefd5","components/data/DataTable.jsx":"83f9416e6b7f","components/data/ListRow.jsx":"5ea28e62124b","components/data/ProgressBar.jsx":"4175e745f104","components/data/StatCard.jsx":"0583cdf3c444","components/feedback/Dialog.jsx":"70a00df907bd","components/feedback/Toast.jsx":"79780c3c4663","components/feedback/Tooltip.jsx":"181cb913fbc7","components/forms/Checkbox.jsx":"7d59687c4975","components/forms/Input.jsx":"67c856e5d982","components/forms/SegmentedControl.jsx":"9653713b50ff","components/forms/Select.jsx":"03e0353eb9cf","components/forms/Switch.jsx":"710d3692e930","components/messaging/Composer.jsx":"0e1d0aa1f106","components/messaging/MessageBubble.jsx":"47153c5293bc","components/navigation/AppShell.jsx":"a0af4921f879","components/navigation/BrandChip.jsx":"a210941f9772","components/navigation/IconRail.jsx":"c6b47a8109e4","components/navigation/TopNav.jsx":"9059d54d8904","ui_kits/atelier-app/Approvals.jsx":"d327c813af19","ui_kits/atelier-app/Dashboard.jsx":"60651d940bfa","ui_kits/atelier-app/Finance.jsx":"36db569e8e9b","ui_kits/atelier-app/Messages.jsx":"80cfd5d040dc","ui_kits/atelier-app/ProjectRoom.jsx":"efa133f2ca53","ui_kits/atelier-app/Projects.jsx":"3677c86fd4e5","ui_kits/atelier-app/data.js":"f46a6fff595b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ATELIERDesignSystem_b56b60 = window.ATELIERDesignSystem_b56b60 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
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
  const d = typeof size === 'number' ? size : SZ[size] || 44;
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const bg = tone === 'sage' ? 'var(--sage-200)' : tone === 'graphite' ? 'var(--graphite-800)' : 'var(--limestone-200)';
  const fg = tone === 'graphite' ? '#fff' : 'var(--graphite-800)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: d,
      height: d,
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
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
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), status ? /*#__PURE__*/React.createElement("span", {
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
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, shown.map((n, i) => /*#__PURE__*/React.createElement(Avatar, {
    key: i,
    name: n,
    size: size,
    style: {
      marginLeft: i ? -d * 0.28 : 0,
      boxShadow: '0 0 0 2px var(--surface-card)',
      borderRadius: 999
    }
  })), extra > 0 ? /*#__PURE__*/React.createElement("span", {
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
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const VARIANTS = {
  default: {
    background: 'var(--surface-card)',
    boxShadow: 'var(--shadow-card)',
    color: 'var(--text-body)',
    radius: 'var(--radius-card)'
  },
  inset: {
    background: 'var(--surface-inset)',
    boxShadow: 'none',
    color: 'var(--text-body)',
    radius: 'var(--radius-tile)'
  },
  muted: {
    background: 'var(--surface-muted)',
    boxShadow: 'none',
    color: 'var(--text-body)',
    radius: 'var(--radius-tile)'
  },
  accent: {
    background: 'linear-gradient(135deg, var(--sage-500) 0%, var(--sage-600) 60%, var(--sage-700) 100%)',
    boxShadow: 'none',
    color: '#FFFFFF',
    radius: 'var(--radius-card)'
  },
  inverse: {
    background: 'var(--surface-inverse)',
    boxShadow: 'none',
    color: '#FFFFFF',
    radius: 'var(--radius-card)'
  }
};
function Card({
  variant = 'default',
  padding,
  title,
  subtitle,
  action,
  selected,
  children,
  style,
  onClick
}) {
  const v = VARIANTS[variant] || VARIANTS.default;
  const pad = padding != null ? padding : variant === 'inset' || variant === 'muted' ? 'var(--tile-padding)' : 'var(--card-padding)';
  const onDark = variant === 'accent' || variant === 'inverse';
  return /*#__PURE__*/React.createElement("section", {
    onClick: onClick,
    style: {
      background: v.background,
      boxShadow: v.boxShadow,
      color: v.color,
      borderRadius: v.radius,
      padding: pad,
      border: selected ? '1.5px solid var(--border-accent)' : '1.5px solid transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minWidth: 0,
      cursor: onClick ? 'pointer' : undefined,
      ...style
    }
  }, title || action ? /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-title)',
      lineHeight: 'var(--lh-title)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-tight)',
      color: onDark ? '#fff' : 'var(--text-strong)'
    }
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--lh-body)',
      color: onDark ? 'rgba(255,255,255,.8)' : 'var(--text-muted)'
    }
  }, subtitle) : null), action || null) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Icon paths copied verbatim from lucide-static@0.460.0 (ISC). Raw SVGs live in assets/icons/.
const ICONS = {
  "arrow-down": "<path d=\"M12 5v14\" /> <path d=\"m19 12-7 7-7-7\" />",
  "arrow-left": "<path d=\"m12 19-7-7 7-7\" /> <path d=\"M19 12H5\" />",
  "arrow-right": "<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />",
  "arrow-up": "<path d=\"m5 12 7-7 7 7\" /> <path d=\"M12 19V5\" />",
  "arrow-up-right": "<path d=\"M7 7h10v10\" /> <path d=\"M7 17 17 7\" />",
  "banknote": "<rect width=\"20\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\" /> <circle cx=\"12\" cy=\"12\" r=\"2\" /> <path d=\"M6 12h.01M18 12h.01\" />",
  "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\" /> <path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\" />",
  "box": "<path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z\" /> <path d=\"m3.3 7 8.7 5 8.7-5\" /> <path d=\"M12 22V12\" />",
  "building-2": "<path d=\"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z\" /> <path d=\"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\" /> <path d=\"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2\" /> <path d=\"M10 6h4\" /> <path d=\"M10 10h4\" /> <path d=\"M10 14h4\" /> <path d=\"M10 18h4\" />",
  "calendar": "<path d=\"M8 2v4\" /> <path d=\"M16 2v4\" /> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /> <path d=\"M3 10h18\" />",
  "calendar-check": "<path d=\"M8 2v4\" /> <path d=\"M16 2v4\" /> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /> <path d=\"M3 10h18\" /> <path d=\"m9 16 2 2 4-4\" />",
  "chart-column": "<path d=\"M3 3v16a2 2 0 0 0 2 2h16\" /> <path d=\"M18 17V9\" /> <path d=\"M13 17V5\" /> <path d=\"M8 17v-3\" />",
  "chart-pie": "<path d=\"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z\" /> <path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "chevron-up": "<path d=\"m18 15-6-6-6 6\" />",
  "circle-alert": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /> <line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m9 12 2 2 4-4\" />",
  "circle-dot": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <circle cx=\"12\" cy=\"12\" r=\"1\" />",
  "circle-help": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\" /> <path d=\"M12 17h.01\" />",
  "circle-x": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m15 9-6 6\" /> <path d=\"m9 9 6 6\" />",
  "clipboard-check": "<rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\" /> <path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\" /> <path d=\"m9 14 2 2 4-4\" />",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <polyline points=\"12 6 12 12 16 14\" />",
  "compass": "<path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\" /> <circle cx=\"12\" cy=\"12\" r=\"10\" />",
  "copy": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /> <path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" />",
  "download": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <polyline points=\"7 10 12 15 17 10\" /> <line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\" />",
  "ellipsis": "<circle cx=\"12\" cy=\"12\" r=\"1\" /> <circle cx=\"19\" cy=\"12\" r=\"1\" /> <circle cx=\"5\" cy=\"12\" r=\"1\" />",
  "ellipsis-vertical": "<circle cx=\"12\" cy=\"12\" r=\"1\" /> <circle cx=\"12\" cy=\"5\" r=\"1\" /> <circle cx=\"12\" cy=\"19\" r=\"1\" />",
  "external-link": "<path d=\"M15 3h6v6\" /> <path d=\"M10 14 21 3\" /> <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />",
  "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "file-check": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"m9 15 2 2 4-4\" />",
  "file-text": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />",
  "files": "<path d=\"M20 7h-3a2 2 0 0 1-2-2V2\" /> <path d=\"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z\" /> <path d=\"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8\" />",
  "filter": "<polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\" />",
  "flag": "<path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\" /> <line x1=\"4\" x2=\"4\" y1=\"22\" y2=\"15\" />",
  "folder": "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\" />",
  "folder-kanban": "<path d=\"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z\" /> <path d=\"M8 10v4\" /> <path d=\"M12 10v2\" /> <path d=\"M16 10v6\" />",
  "folder-open": "<path d=\"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\" />",
  "grip-vertical": "<circle cx=\"9\" cy=\"12\" r=\"1\" /> <circle cx=\"9\" cy=\"5\" r=\"1\" /> <circle cx=\"9\" cy=\"19\" r=\"1\" /> <circle cx=\"15\" cy=\"12\" r=\"1\" /> <circle cx=\"15\" cy=\"5\" r=\"1\" /> <circle cx=\"15\" cy=\"19\" r=\"1\" />",
  "heart": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" />",
  "history": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\" /> <path d=\"M3 3v5h5\" /> <path d=\"M12 7v5l4 2\" />",
  "house": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
  "image": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <circle cx=\"9\" cy=\"9\" r=\"2\" /> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />",
  "inbox": "<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\" /> <path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\" />",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 16v-4\" /> <path d=\"M12 8h.01\" />",
  "lamp": "<path d=\"M8 2h8l4 10H4L8 2Z\" /> <path d=\"M12 12v6\" /> <path d=\"M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z\" />",
  "layers": "<path d=\"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z\" /> <path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\" /> <path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\" />",
  "layout-dashboard": "<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\" /> <rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\" /> <rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\" /> <rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\" />",
  "layout-grid": "<rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\" /> <rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\" /> <rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\" /> <rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\" />",
  "link": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /> <path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" />",
  "list-filter": "<path d=\"M3 6h18\" /> <path d=\"M7 12h10\" /> <path d=\"M10 18h4\" />",
  "list-todo": "<rect x=\"3\" y=\"5\" width=\"6\" height=\"6\" rx=\"1\" /> <path d=\"m3 17 2 2 4-4\" /> <path d=\"M13 6h8\" /> <path d=\"M13 12h8\" /> <path d=\"M13 18h8\" />",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /> <path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
  "log-out": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" /> <polyline points=\"16 17 21 12 16 7\" /> <line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\" />",
  "mail": "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" /> <path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" />",
  "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /> <circle cx=\"12\" cy=\"10\" r=\"3\" />",
  "message-square-text": "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\" /> <path d=\"M13 8H7\" /> <path d=\"M17 12H7\" />",
  "messages-square": "<path d=\"M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z\" /> <path d=\"M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1\" />",
  "moon": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\" />",
  "paperclip": "<path d=\"m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48\" />",
  "pen-line": "<path d=\"M12 20h9\" /> <path d=\"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z\" />",
  "pencil-ruler": "<path d=\"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13\" /> <path d=\"m8 6 2-2\" /> <path d=\"m18 16 2-2\" /> <path d=\"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17\" /> <path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" /> <path d=\"m15 5 4 4\" />",
  "phone": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\" />",
  "plus": "<path d=\"M5 12h14\" /> <path d=\"M12 5v14\" />",
  "receipt": "<path d=\"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z\" /> <path d=\"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8\" /> <path d=\"M12 17.5v-11\" />",
  "refresh-cw": "<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /> <path d=\"M21 3v5h-5\" /> <path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /> <path d=\"M8 16H3v5\" />",
  "ruler": "<path d=\"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z\" /> <path d=\"m14.5 12.5 2-2\" /> <path d=\"m11.5 9.5 2-2\" /> <path d=\"m8.5 6.5 2-2\" /> <path d=\"m17.5 15.5 2-2\" />",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"8\" /> <path d=\"m21 21-4.3-4.3\" />",
  "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" />",
  "settings": "<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "share-2": "<circle cx=\"18\" cy=\"5\" r=\"3\" /> <circle cx=\"6\" cy=\"12\" r=\"3\" /> <circle cx=\"18\" cy=\"19\" r=\"3\" /> <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\" /> <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\" />",
  "sliders-horizontal": "<line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\" /> <line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\" /> <line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\" /> <line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\" /> <line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\" /> <line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\" /> <line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\" /> <line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\" /> <line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\" />",
  "smartphone": "<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /> <path d=\"M12 18h.01\" />",
  "smile": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M8 14s1.5 2 4 2 4-2 4-2\" /> <line x1=\"9\" x2=\"9.01\" y1=\"9\" y2=\"9\" /> <line x1=\"15\" x2=\"15.01\" y1=\"9\" y2=\"9\" />",
  "sofa": "<path d=\"M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3\" /> <path d=\"M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z\" /> <path d=\"M4 18v2\" /> <path d=\"M20 18v2\" /> <path d=\"M12 4v9\" />",
  "square-kanban": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" /> <path d=\"M8 7v7\" /> <path d=\"M12 7v4\" /> <path d=\"M16 7v9\" />",
  "square-pen": "<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\" /> <path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\" />",
  "stamp": "<path d=\"M5 22h14\" /> <path d=\"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z\" /> <path d=\"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13\" />",
  "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\" /> <path d=\"M12 2v2\" /> <path d=\"M12 20v2\" /> <path d=\"m4.93 4.93 1.41 1.41\" /> <path d=\"m17.66 17.66 1.41 1.41\" /> <path d=\"M2 12h2\" /> <path d=\"M20 12h2\" /> <path d=\"m6.34 17.66-1.41 1.41\" /> <path d=\"m19.07 4.93-1.41 1.41\" />",
  "trash-2": "<path d=\"M3 6h18\" /> <path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\" /> <path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\" /> <line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\" /> <line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\" />",
  "trending-down": "<polyline points=\"22 17 13.5 8.5 8.5 13.5 2 7\" /> <polyline points=\"16 17 22 17 22 11\" />",
  "trending-up": "<polyline points=\"22 7 13.5 15.5 8.5 10.5 2 17\" /> <polyline points=\"16 7 22 7 22 13\" />",
  "triangle-alert": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /> <path d=\"M12 9v4\" /> <path d=\"M12 17h.01\" />",
  "upload": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <polyline points=\"17 8 12 3 7 8\" /> <line x1=\"12\" x2=\"12\" y1=\"3\" y2=\"15\" />",
  "user-plus": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /> <line x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\" /> <line x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\" />",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /> <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" />",
  "wallet": "<path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\" /> <path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\" />",
  "x": "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />"
};
const ICON_NAMES = Object.keys(ICONS);
function Icon({
  name,
  size = 20,
  strokeWidth = 1.6,
  color = 'currentColor',
  style,
  className,
  title
}) {
  const body = ICONS[name];
  if (!body) return null;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": title ? undefined : true,
    role: title ? 'img' : undefined,
    style: {
      flexShrink: 0,
      display: 'block',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: (title ? '<title>' + title + '</title>' : '') + body
    }
  });
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const T = {
  neutral: ['var(--status-neutral-bg)', 'var(--status-neutral)'],
  accent: ['var(--accent-soft)', 'var(--text-accent)'],
  positive: ['var(--status-positive-bg)', 'var(--status-positive)'],
  negative: ['var(--status-negative-bg)', 'var(--status-negative)'],
  warning: ['var(--status-warning-bg)', 'var(--status-warning)'],
  info: ['var(--status-info-bg)', 'var(--status-info)'],
  inverse: ['var(--surface-inverse)', 'var(--text-inverse)'],
  glass: ['rgba(255,255,255,.2)', '#FFFFFF']
};
function Badge({
  tone = 'neutral',
  size = 'md',
  dot,
  icon,
  children,
  style
}) {
  const [bg, fg] = T[tone] || T.neutral;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: sm ? 24 : 30,
      padding: sm ? '0 10px' : '0 14px',
      borderRadius: 'var(--radius-full)',
      background: bg,
      color: fg,
      fontSize: sm ? 12 : 14,
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: 'currentColor'
    }
  }) : null, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sm ? 13 : 15
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    h: 36,
    px: 16,
    fs: 13,
    gap: 6,
    icon: 16
  },
  md: {
    h: 44,
    px: 22,
    fs: 14,
    gap: 8,
    icon: 18
  },
  lg: {
    h: 48,
    px: 28,
    fs: 15,
    gap: 10,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--surface-inverse)',
    fg: 'var(--text-inverse)',
    hover: 'var(--graphite-700)',
    border: 'transparent'
  },
  secondary: {
    bg: 'var(--surface-muted)',
    fg: 'var(--text-strong)',
    hover: 'var(--surface-pressed)',
    border: 'transparent'
  },
  accent: {
    bg: 'var(--accent)',
    fg: 'var(--text-on-accent)',
    hover: 'var(--accent-hover)',
    border: 'transparent'
  },
  outline: {
    bg: 'var(--surface-card)',
    fg: 'var(--text-strong)',
    hover: 'var(--surface-hover)',
    border: 'var(--border-default)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-strong)',
    hover: 'var(--surface-hover)',
    border: 'transparent'
  },
  inverse: {
    bg: '#FFFFFF',
    fg: 'var(--text-strong)',
    hover: 'var(--ivory-100)',
    border: 'transparent'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  disabled,
  children,
  onClick,
  type = 'button',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      padding: '0 ' + s.px + 'px',
      width: fullWidth ? '100%' : undefined,
      borderRadius: 'var(--radius-full)',
      border: '1px solid ' + v.border,
      background: hover && !disabled ? v.hover : v.bg,
      color: v.fg,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 600,
      letterSpacing: '-0.005em',
      lineHeight: 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      whiteSpace: 'nowrap',
      transform: press && !disabled ? 'scale(0.98)' : 'none',
      transition: 'background var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const V = {
  ghost: {
    bg: 'transparent',
    hover: 'var(--surface-hover)',
    fg: 'var(--text-strong)',
    border: 'transparent'
  },
  soft: {
    bg: 'var(--surface-muted)',
    hover: 'var(--surface-pressed)',
    fg: 'var(--text-strong)',
    border: 'transparent'
  },
  outline: {
    bg: 'var(--surface-card)',
    hover: 'var(--surface-hover)',
    fg: 'var(--text-strong)',
    border: 'var(--border-subtle)'
  },
  inverse: {
    bg: 'var(--surface-inverse)',
    hover: 'var(--graphite-700)',
    fg: 'var(--text-inverse)',
    border: 'transparent'
  },
  accent: {
    bg: 'var(--accent)',
    hover: 'var(--accent-hover)',
    fg: 'var(--text-on-accent)',
    border: 'transparent'
  },
  glass: {
    bg: 'rgba(255,255,255,.18)',
    hover: 'rgba(255,255,255,.28)',
    fg: '#FFFFFF',
    border: 'transparent'
  }
};
const S = {
  xs: [28, 14],
  sm: [36, 16],
  md: [44, 20],
  lg: [52, 22]
};
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  shape = 'circle',
  label,
  badge,
  active,
  disabled,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const v = V[active ? 'inverse' : variant] || V.ghost;
  const [d, is] = S[size] || S.md;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: d,
      height: d,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: shape === 'square' ? 'var(--radius-md)' : 'var(--radius-full)',
      border: '1px solid ' + v.border,
      background: hover && !disabled ? v.hover : v.bg,
      color: v.fg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      padding: 0,
      transition: 'background var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: is
  }), badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: d * 0.2,
      right: d * 0.24,
      width: 8,
      height: 8,
      borderRadius: 99,
      background: 'var(--accent)',
      boxShadow: '0 0 0 2px var(--surface-card)'
    }
  }) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function BarChart({
  data = [],
  series = [{
    key: 'a',
    label: 'Planned'
  }, {
    key: 'b',
    label: 'Actual'
  }],
  height = 220,
  max,
  ticks = 5,
  format = v => v,
  style
}) {
  const keys = series.map(s => s.key);
  const top = max || Math.max(1, ...data.flatMap(d => keys.map(k => d[k] || 0))) * 1.1;
  const colors = ['var(--sage-400)', 'var(--surface-inverse)', 'var(--limestone-400)'];
  const tickVals = Array.from({
    length: ticks
  }, (_, i) => top / (ticks - 1) * (ticks - 1 - i));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 16,
      borderRadius: 'var(--radius-tile)',
      background: 'var(--surface-inset)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 18
    }
  }, series.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: s.key,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: colors[i]
    }
  }), s.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      display: 'grid',
      gridTemplateColumns: '44px 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--text-subtle)',
      paddingBottom: 22
    }
  }, tickVals.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      lineHeight: '1px'
    }
  }, format(Math.round(t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 0 22px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, tickVals.map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      height: 1,
      background: 'var(--border-subtle)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      gap: 8
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      gap: 4
    }
  }, keys.map((k, j) => /*#__PURE__*/React.createElement("span", {
    key: k,
    title: series[j].label + ': ' + format(d[k] || 0),
    style: {
      width: 14,
      height: (d[k] || 0) / top * 100 + '%',
      minHeight: 4,
      borderRadius: 6,
      background: colors[j],
      transition: 'height var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -22,
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 12,
      color: 'var(--text-subtle)',
      whiteSpace: 'nowrap'
    }
  }, d.label)))))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  rowKey,
  empty = 'Nothing here yet',
  dense,
  style
}) {
  const tpl = columns.map(c => c.width || 'minmax(0,1fr)').join(' ');
  const pad = dense ? '10px 0' : '14px 0';
  return /*#__PURE__*/React.createElement("div", {
    role: "table",
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "row",
    style: {
      display: 'grid',
      gridTemplateColumns: tpl,
      columnGap: 16,
      alignItems: 'center',
      height: 48,
      padding: '0 20px',
      borderRadius: 'var(--radius-tile)',
      background: 'var(--surface-inset)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("span", {
    role: "columnheader",
    key: c.key,
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-muted)',
      textAlign: c.align || 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, c.label))), rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 20px',
      fontSize: 14,
      color: 'var(--text-subtle)',
      textAlign: 'center'
    }
  }, empty) : null, rows.map((r, i) => /*#__PURE__*/React.createElement(Row, {
    key: rowKey ? r[rowKey] : i,
    row: r,
    columns: columns,
    tpl: tpl,
    pad: pad,
    last: i === rows.length - 1,
    onClick: onRowClick ? () => onRowClick(r) : null
  })));
}
function Row({
  row,
  columns,
  tpl,
  pad,
  last,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    role: "row",
    onClick: onClick || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: tpl,
      columnGap: 16,
      alignItems: 'center',
      padding: '0 20px',
      minHeight: 60,
      borderBottom: last ? 0 : '1px solid var(--border-subtle)',
      cursor: onClick ? 'pointer' : undefined,
      background: hover && onClick ? 'var(--ivory-50)' : 'transparent',
      borderRadius: hover && onClick ? 12 : 0,
      transition: 'background var(--dur-fast)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("div", {
    role: "cell",
    key: c.key,
    style: {
      padding: pad,
      fontSize: 14,
      color: 'var(--text-strong)',
      textAlign: c.align || 'left',
      minWidth: 0,
      fontVariantNumeric: c.numeric ? 'tabular-nums' : undefined,
      display: 'flex',
      justifyContent: c.align === 'right' ? 'flex-end' : c.align === 'center' ? 'center' : 'flex-start'
    }
  }, c.render ? c.render(row) : row[c.key])));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/ListRow.jsx
try { (() => {
const TONE = {
  positive: 'var(--status-positive)',
  negative: 'var(--status-negative)',
  warning: 'var(--status-warning)',
  muted: 'var(--text-muted)',
  default: 'var(--text-strong)'
};
function ListRow({
  icon,
  iconTone = 'neutral',
  leading,
  title,
  meta,
  value,
  valueTone = 'default',
  trailing,
  divider = true,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const ibg = iconTone === 'accent' ? 'var(--accent-soft)' : 'var(--surface-muted)';
  const ifg = iconTone === 'accent' ? 'var(--accent)' : 'var(--text-strong)';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 0',
      borderBottom: divider ? '1px solid var(--border-subtle)' : 0,
      cursor: onClick ? 'pointer' : undefined,
      background: onClick && hover ? 'linear-gradient(90deg, transparent, var(--ivory-50) 10%, var(--ivory-50) 90%, transparent)' : 'transparent',
      ...style
    }
  }, leading || (icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      background: ibg,
      color: ifg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19
  })) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, meta) : null), value != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: TONE[valueTone] || TONE.default,
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, value) : null, trailing || null);
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function ProgressBar({
  value = 0,
  max = 100,
  tone = 'graphite',
  height = 8,
  hatched,
  label,
  valueLabel,
  style
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const onAccent = tone === 'onAccent';
  const fill = tone === 'accent' ? 'var(--accent)' : tone === 'warning' ? 'var(--status-warning)' : tone === 'negative' ? 'var(--status-negative)' : onAccent ? '#FFFFFF' : 'var(--surface-inverse)';
  const track = onAccent ? 'rgba(255,255,255,.22)' : 'var(--limestone-200)';
  const hatch = onAccent ? 'rgba(255,255,255,.45)' : 'var(--limestone-300)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, label || valueLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      fontSize: 14,
      color: onAccent ? '#fff' : 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, valueLabel)) : null, /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max,
    style: {
      position: 'relative',
      height,
      borderRadius: 999,
      overflow: 'hidden',
      background: hatched ? 'repeating-linear-gradient(-55deg, ' + hatch + ' 0 1.5px, transparent 1.5px 6px)' : track
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: pct + '%',
      borderRadius: 999,
      background: fill,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function StatCard({
  label,
  value,
  unit,
  delta,
  deltaLabel = 'this week',
  trend,
  variant = 'default',
  action = 'arrow-up-right',
  onAction,
  bars = true,
  style
}) {
  const accent = variant === 'accent';
  const tile = variant === 'tile';
  const t = trend || (typeof delta === 'string' && delta.trim().startsWith('-') ? 'down' : delta && /^\+?0(\.0)?%?$/.test(String(delta).trim()) ? 'flat' : 'up');
  const deltaColor = accent ? '#FFFFFF' : t === 'down' ? 'var(--status-negative)' : t === 'flat' ? 'var(--text-muted)' : 'var(--status-positive)';
  const fg = accent ? '#FFFFFF' : 'var(--text-strong)';
  const sub = accent ? 'rgba(255,255,255,.85)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 20,
      padding: 'var(--space-5) var(--space-5) var(--space-5) var(--space-5)',
      minHeight: 176,
      borderRadius: 'var(--radius-lg)',
      background: accent ? 'linear-gradient(140deg, var(--sage-500) 0%, var(--sage-600) 70%, var(--sage-700) 100%)' : tile ? 'var(--surface-inset)' : 'var(--surface-card)',
      boxShadow: tile || accent ? 'none' : 'var(--shadow-card)',
      color: fg,
      ...style
    }
  }, bars ? /*#__PURE__*/React.createElement(Bars, {
    light: accent
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: fg,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, label), action ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: action,
    size: "sm",
    variant: accent ? 'glass' : 'soft',
    label: 'Open ' + label,
    onClick: onAction
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-figure-lg)',
      lineHeight: 'var(--lh-figure-lg)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: sub
    }
  }, unit) : null), delta != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      fontSize: 13,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: deltaColor,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, delta), /*#__PURE__*/React.createElement("span", {
    style: {
      color: sub,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, deltaLabel)) : null));
}
function Bars({
  light
}) {
  const hs = [34, 52, 74, 96];
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 14,
      bottom: 0,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 5
    }
  }, hs.map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 9,
      height: h,
      borderRadius: '6px 6px 0 0',
      background: light ? 'rgba(255,255,255,' + (0.1 + i * 0.05) + ')' : 'rgba(31,31,28,' + (0.025 + i * 0.012) + ')'
    }
  })));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
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
  if (!open) return null;
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
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
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-title)',
      lineHeight: '28px',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: 'var(--text-strong)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: '22px',
      color: 'var(--text-muted)'
    }
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    variant: "soft",
    size: "sm",
    label: "Close",
    onClick: onClose
  }) : null), children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      paddingTop: 4
    }
  }, footer) : null);
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(23,23,21,.28)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  title,
  description,
  icon = 'circle-check',
  action,
  onAction,
  onClose,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px 14px 18px',
      minWidth: 320,
      maxWidth: 440,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-inverse)',
      color: '#fff',
      boxShadow: 'var(--shadow-pop)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: "var(--sage-300)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, title), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,.7)'
    }
  }, description) : null), action ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--sage-300)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      padding: '4px 6px'
    }
  }, action) : null, onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      color: 'rgba(255,255,255,.6)',
      cursor: 'pointer',
      padding: 4,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
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
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, children, show ? /*#__PURE__*/React.createElement("span", {
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
      background: 'var(--surface-inverse)',
      color: '#fff',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: '16px',
      boxShadow: 'var(--shadow-pop)',
      pointerEvents: 'none'
    }
  }, content) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
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
  return /*#__PURE__*/React.createElement("label", {
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
  }, /*#__PURE__*/React.createElement("span", {
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
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast)'
    }
  }, on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 2.6
  }) : null), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)',
      textDecoration: on && shape === 'circle' ? 'line-through' : 'none',
      textDecorationColor: 'var(--gray-400)'
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
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
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 15,
    strokeWidth: 2.2
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, children));
}
Object.assign(__ds_scope, { Checkbox, CheckItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
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
  const border = error ? 'var(--status-negative)' : focus ? 'var(--border-accent)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 0,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
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
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  }) : null, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
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
  }), iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: 18
  }) : null), error || hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--status-negative)' : 'var(--text-subtle)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style
}) {
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const h = size === 'sm' ? 32 : 40;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      padding: 4,
      borderRadius: 999,
      background: 'var(--surface-muted)',
      ...style
    }
  }, opts.map(o => {
    const on = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(o.value),
      style: {
        height: h,
        padding: size === 'sm' ? '0 14px' : '0 20px',
        border: 0,
        borderRadius: 999,
        cursor: 'pointer',
        background: on ? 'var(--surface-card)' : 'transparent',
        boxShadow: on ? 'var(--shadow-xs)' : 'none',
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        fontSize: size === 'sm' ? 13 : 14,
        fontWeight: on ? 600 : 500,
        whiteSpace: 'nowrap',
        transition: 'background var(--dur-base), color var(--dur-base)'
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  value,
  options = [],
  onChange,
  placeholder = 'Select',
  variant = 'outline',
  size = 'md',
  icon,
  align = 'left',
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const cur = opts.find(o => o.value === value);
  const h = size === 'sm' ? 32 : 44;
  const ghost = variant === 'ghost';
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(!open),
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
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: cur ? 'var(--text-strong)' : 'var(--text-subtle)'
    }
  }, cur ? cur.label : placeholder), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--text-subtle)",
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-base)'
    }
  })), open ? /*#__PURE__*/React.createElement("div", {
    role: "listbox",
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
  }, opts.map(o => /*#__PURE__*/React.createElement(SelectOption, {
    key: o.value,
    active: o.value === value,
    onClick: () => {
      setOpen(false);
      onChange && onChange(o.value);
    }
  }, o.label))) : null);
}
function SelectOption({
  active,
  onClick,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
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
      background: hover ? 'var(--surface-hover)' : 'transparent',
      fontSize: 14,
      fontWeight: active ? 600 : 500,
      color: 'var(--text-strong)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'left'
    }
  }, children, active ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    color: "var(--accent)"
  }) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
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
  return /*#__PURE__*/React.createElement("label", {
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
  }, /*#__PURE__*/React.createElement("span", {
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
  }, /*#__PURE__*/React.createElement("span", {
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
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/messaging/Composer.jsx
try { (() => {
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
  return /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("button", {
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
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "paperclip",
    size: 20
  })), /*#__PURE__*/React.createElement("input", {
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
  }), /*#__PURE__*/React.createElement("button", {
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
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "smile",
    size: 20
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
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
Object.assign(__ds_scope, { Composer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/Composer.jsx", error: String((e && e.message) || e) }); }

// components/messaging/MessageBubble.jsx
try { (() => {
function MessageBubble({
  children,
  time,
  author,
  outgoing,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: outgoing ? 'flex-end' : 'flex-start',
      gap: 4,
      ...style
    }
  }, author ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-muted)',
      padding: '0 4px'
    }
  }, author) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      padding: '14px 18px 10px',
      borderRadius: 'var(--radius-tile)',
      background: outgoing ? 'var(--sage-100)' : 'var(--surface-muted)',
      color: 'var(--text-strong)',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: '24px',
      textWrap: 'pretty'
    }
  }, children), time ? /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'flex-end',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, time) : null));
}
function DateDivider({
  children = 'Today'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 14px',
      borderRadius: 999,
      background: 'var(--surface-muted)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, children));
}
Object.assign(__ds_scope, { MessageBubble, DateDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/MessageBubble.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BrandChip.jsx
try { (() => {
function BrandChip({
  name = 'ATELIER',
  sub,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: '0.22em',
      color: 'var(--text-strong)'
    }
  }, name), sub ? /*#__PURE__*/React.createElement("span", {
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
  return /*#__PURE__*/React.createElement("button", {
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
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      overflow: 'hidden',
      background: 'var(--sage-200)',
      color: 'var(--sage-700)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 14
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: 0,
      maxWidth: 200,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      lineHeight: '20px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)',
      lineHeight: '16px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, email)), /*#__PURE__*/React.createElement("svg", {
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
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })));
}
Object.assign(__ds_scope, { BrandChip, UserMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BrandChip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/IconRail.jsx
try { (() => {
function IconRail({
  groups = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-10)',
      width: 'var(--shell-sidebar-w)',
      height: '100%',
      ...style
    }
  }, groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: 6,
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      marginTop: g.bottom ? 'auto' : undefined
    }
  }, (g.items || g).map(it => /*#__PURE__*/React.createElement(RailButton, {
    key: it.value,
    item: it,
    active: it.value === value,
    onClick: () => onChange && onChange(it.value)
  })))));
}
function RailButton({
  item,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: item.label,
    "aria-label": item.label,
    "aria-current": active ? 'page' : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 52,
      height: 52,
      borderRadius: 999,
      border: 0,
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? 'var(--surface-inverse)' : hover ? 'var(--surface-hover)' : 'transparent',
      color: active ? 'var(--text-inverse)' : 'var(--text-strong)',
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: item.icon,
    size: 21
  }));
}
Object.assign(__ds_scope, { IconRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/IconRail.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNav.jsx
try { (() => {
function TopNav({
  items = [],
  value,
  onChange,
  style
}) {
  const opts = items.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      height: 'var(--shell-header-h)',
      padding: 6,
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, opts.map(o => /*#__PURE__*/React.createElement(TopNavItem, {
    key: o.value,
    active: o.value === value,
    onClick: () => onChange && onChange(o.value)
  }, o.label)));
}
function TopNavItem({
  active,
  onClick,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-current": active ? 'page' : undefined,
    style: {
      height: 48,
      padding: '0 20px',
      border: 0,
      borderRadius: 999,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      background: active ? 'var(--surface-inverse)' : hover ? 'var(--surface-hover)' : 'transparent',
      color: active ? 'var(--text-inverse)' : 'var(--text-strong)',
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: '-0.005em',
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, children);
}
function HeaderGroup({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 'var(--shell-header-h)',
      padding: '0 8px',
      borderRadius: 999,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TopNav, HeaderGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppShell.jsx
try { (() => {
function AppShell({
  nav = [],
  navValue,
  onNav,
  rail = [],
  railValue,
  onRail,
  user,
  utilities,
  title,
  subtitle,
  actions,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--bg-app)',
      padding: 'var(--shell-gutter)',
      display: 'grid',
      gridTemplateColumns: 'var(--shell-sidebar-w) minmax(0,1fr)',
      gridTemplateRows: 'var(--shell-header-h) 1fr',
      columnGap: 'var(--shell-content-gap)',
      rowGap: 'var(--space-6)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BrandChip, null), /*#__PURE__*/React.createElement(__ds_scope.TopNav, {
    items: nav,
    value: navValue,
    onChange: onNav
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, utilities || /*#__PURE__*/React.createElement(__ds_scope.HeaderGroup, null, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "search",
    label: "Search"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "bell",
    label: "Notifications",
    badge: true
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "circle-help",
    label: "Help"
  })), user ? /*#__PURE__*/React.createElement(__ds_scope.UserMenu, user) : null)), /*#__PURE__*/React.createElement(__ds_scope.IconRail, {
    groups: rail,
    value: railValue,
    onChange: onRail,
    style: {
      position: 'sticky',
      top: 'var(--shell-gutter)',
      height: 'calc(100vh - var(--shell-header-h) - var(--shell-gutter) * 2 - var(--space-6))',
      minHeight: 560
    }
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--text-display)',
      lineHeight: 'var(--lh-display)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-strong)'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-lead)',
      lineHeight: 'var(--lh-lead)',
      color: 'var(--text-muted)'
    }
  }, subtitle) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexShrink: 0
    }
  }, actions) : null) : null, children));
}
Object.assign(__ds_scope, { AppShell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier-app/Approvals.jsx
try { (() => {
var {
  Card,
  Badge,
  Button,
  Icon,
  Avatar,
  SegmentedControl
} = window.ATELIERDesignSystem_b56b60;
const STEPS = [{
  phase: 'Concept',
  date: '14 Mar',
  title: 'Brief & massing options',
  who: 'Mira Halden',
  status: 'Approved',
  tone: 'positive',
  note: 'Option B selected — courtyard plan.'
}, {
  phase: 'Schematic',
  date: '22 May',
  title: 'Schematic design set',
  who: 'Mira Halden',
  status: 'Approved',
  tone: 'positive',
  note: 'Approved with comments on glazing to the north façade.'
}, {
  phase: 'Development',
  date: '11 Oct',
  title: 'Kitchen elevations v3',
  who: 'Mira Halden',
  status: 'Awaiting client',
  tone: 'warning',
  note: 'Sent for review. Reminder scheduled for 21 Oct.',
  current: true
}, {
  phase: 'Development',
  date: '24 Oct',
  title: 'Finish schedule',
  who: 'Mira Halden',
  status: 'Not sent',
  tone: 'neutral'
}, {
  phase: 'Documents',
  date: 'Dec',
  title: 'Construction drawing set',
  who: 'Building authority',
  status: 'Planned',
  tone: 'neutral'
}];
function Approvals({
  toast
}) {
  const D = window.ATL;
  const [view, setView] = React.useState('timeline');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Halden Residence",
    subtitle: "Approval timeline \xB7 5 milestones",
    action: /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      value: view,
      onChange: setView,
      options: [{
        value: 'timeline',
        label: 'Timeline'
      }, {
        value: 'list',
        label: 'List'
      }]
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, STEPS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '72px 28px minmax(0,1fr)',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, s.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, s.phase)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1.5,
      height: 18,
      background: i ? 'var(--border-default)' : 'transparent'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 999,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: s.tone === 'positive' ? 'var(--surface-inverse)' : s.current ? 'var(--accent)' : 'var(--surface-muted)',
      color: s.tone === 'positive' || s.current ? '#fff' : 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.tone === 'positive' ? 'check' : s.current ? 'clock' : 'circle-dot',
    size: 14,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1.5,
      flex: 1,
      background: i < STEPS.length - 1 ? 'var(--border-default)' : 'transparent'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '8px 0',
      padding: '14px 16px',
      borderRadius: 16,
      background: s.current ? 'var(--sage-50)' : 'var(--surface-inset)',
      border: s.current ? '1.5px solid var(--sage-300)' : '1.5px solid transparent',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600
    }
  }, s.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, s.note || 'Reviewer: ' + s.who)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: s.tone,
    dot: true
  }, s.status), s.current ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "bell",
    onClick: () => toast('Reminder sent to Mira Halden')
  }, "Remind") : null)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Across the studio",
    subtitle: "Open approvals by project",
    style: {
      gap: 8
    }
  }, D.approvals.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 0',
      borderBottom: i < D.approvals.length - 1 ? '1px solid var(--border-subtle)' : 0
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.client,
    size: "md",
    tone: i % 2 ? 'limestone' : 'sage'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, a.item), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, a.project, " \xB7 ", a.due)), /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: a.tone
  }, a.status))))));
}
window.Approvals = Approvals;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier-app/Approvals.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier-app/Dashboard.jsx
try { (() => {
var {
  Card,
  Button,
  StatCard,
  BarChart,
  ProgressBar,
  DataTable,
  Badge,
  Input,
  Select,
  Icon
} = window.ATELIERDesignSystem_b56b60;
function PhaseTile({
  label,
  value,
  delta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface-card)',
      borderRadius: 14,
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: delta.startsWith('-') ? 'var(--status-negative)' : 'var(--status-positive)'
    }
  }, delta));
}
function Dashboard({
  go
}) {
  const D = window.ATL;
  const [ccy, setCcy] = React.useState('EUR');
  const [q, setQ] = React.useState('');
  const rows = D.approvals.filter(a => (a.project + a.item).toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr) minmax(0,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, "Contracted fees"), /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    value: ccy,
    onChange: setCcy,
    align: "right",
    options: ['EUR', 'GBP', 'USD']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32,
      lineHeight: '40px',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--text-strong)'
    }
  }, "\u20AC1,248,600.00"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--status-positive)',
      fontWeight: 600
    }
  }, "+4.2%"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      marginLeft: 6
    }
  }, "this quarter"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "plus",
    style: {
      padding: '0 12px'
    },
    onClick: () => go('projects')
  }, "New project"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    icon: "clock",
    style: {
      padding: '0 12px'
    }
  }, "Log time")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-inset)',
      borderRadius: 16,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'baseline',
      padding: '2px 2px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, "By phase"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-subtle)'
    }
  }, "Today\u2019s split")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PhaseTile, {
    label: "Concept",
    value: "\u20AC578k",
    delta: "+1 project"
  }), /*#__PURE__*/React.createElement(PhaseTile, {
    label: "Design",
    value: "\u20AC518k",
    delta: "+2.4%"
  }), /*#__PURE__*/React.createElement(PhaseTile, {
    label: "Site",
    value: "\u20AC152k",
    delta: "-0.8%"
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: 14,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "accent",
    label: "Active projects",
    value: "14",
    delta: "+2",
    deltaLabel: "this quarter",
    onAction: () => go('projects')
  }), /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "Pending approvals",
    value: "6",
    delta: "-1",
    deltaLabel: "vs last week",
    onAction: () => go('approvals')
  }), /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "Billable hours",
    value: "1,284",
    delta: "+3.1%",
    deltaLabel: "this month"
  }), /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "Overdue invoices",
    value: "\u20AC8,400",
    delta: "0%",
    deltaLabel: "this week",
    onAction: () => go('finance')
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Fee vs. invoiced",
    subtitle: "Monthly, in thousands \u2014 last six months"
  }, /*#__PURE__*/React.createElement(BarChart, {
    height: 196,
    series: [{
      key: 'fee',
      label: 'Earned'
    }, {
      key: 'inv',
      label: 'Invoiced'
    }],
    data: D.feeChart,
    max: 125,
    format: v => v + 'k',
    style: {
      flex: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,2.05fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "Budget burn \u2014 Halden"),
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      iconRight: "arrow-up-right",
      onClick: () => go('room')
    }, "Open")
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 62,
    label: /*#__PURE__*/React.createElement("span", null, "\u20AC186,400 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-subtle)'
      }
    }, "/ \u20AC300,000")),
    valueLabel: "62.1%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: "warning",
    dot: true
  }, "Design development"), /*#__PURE__*/React.createElement(Badge, {
    size: "sm"
  }, "14 Nov milestone"))), /*#__PURE__*/React.createElement(Card, {
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "Upcoming approvals"),
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Input, {
      icon: "search",
      size: "sm",
      placeholder: "Search",
      value: q,
      onChange: e => setQ(e.target.value),
      style: {
        width: 240
      }
    }), /*#__PURE__*/React.createElement(Select, {
      variant: "ghost",
      size: "sm",
      placeholder: "Filter",
      align: "right",
      options: ['All', 'Awaiting client', 'Overdue']
    }))
  }, /*#__PURE__*/React.createElement(DataTable, {
    dense: true,
    onRowClick: () => go('approvals'),
    columns: [{
      key: 'item',
      label: 'Deliverable',
      width: '1.4fr'
    }, {
      key: 'project',
      label: 'Project',
      width: '1.4fr',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-muted)'
        }
      }, r.project)
    }, {
      key: 'due',
      label: 'Due',
      width: '80px',
      numeric: true
    }, {
      key: 'status',
      label: 'Status',
      width: '150px',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: r.tone,
        dot: true
      }, r.status)
    }],
    rows: rows.slice(0, 3)
  }))));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier-app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier-app/Finance.jsx
try { (() => {
var {
  Card,
  StatCard,
  BarChart,
  DataTable,
  Badge,
  Button,
  SegmentedControl,
  ProgressBar
} = window.ATELIERDesignSystem_b56b60;
function Finance() {
  const D = window.ATL;
  const [period, setPeriod] = React.useState('q');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "accent",
    label: "Invoiced this quarter",
    value: "\u20AC214,600",
    delta: "+8.4%",
    deltaLabel: "vs Q2"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Outstanding",
    value: "\u20AC32,400",
    delta: "-12%",
    trend: "up",
    deltaLabel: "vs last month"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Overdue",
    value: "\u20AC8,400",
    delta: "+\u20AC8.4k",
    trend: "down",
    deltaLabel: "1 invoice"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Utilisation",
    value: "78",
    unit: "%",
    delta: "+2pt",
    deltaLabel: "team avg."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Invoices",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      icon: "plus"
    }, "New invoice")
  }, /*#__PURE__*/React.createElement(DataTable, {
    dense: true,
    columns: [{
      key: 'no',
      label: 'No.',
      width: '78px',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.no)
    }, {
      key: 'project',
      label: 'Project',
      width: 'minmax(0,2fr)',
      render: r => /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, r.project), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: 'var(--text-subtle)'
        }
      }, r.stage))
    }, {
      key: 'issued',
      label: 'Issued',
      width: '64px'
    }, {
      key: 'amount',
      label: 'Amount',
      width: '90px',
      align: 'right',
      numeric: true,
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.amount)
    }, {
      key: 'status',
      label: 'Status',
      width: '84px',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: r.tone
      }, r.status)
    }],
    rows: D.invoices
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Fee earned vs. invoiced",
    action: /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      value: period,
      onChange: setPeriod,
      options: [{
        value: 'q',
        label: '6 mo'
      }, {
        value: 'y',
        label: '12 mo'
      }]
    })
  }, /*#__PURE__*/React.createElement(BarChart, {
    height: 200,
    series: [{
      key: 'fee',
      label: 'Earned'
    }, {
      key: 'inv',
      label: 'Invoiced'
    }],
    data: D.feeChart,
    max: 125,
    format: v => v + 'k'
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Budget by project",
    style: {
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: '18px 32px'
    }
  }, D.projects.map(p => /*#__PURE__*/React.createElement(ProgressBar, {
    key: p.id,
    value: p.progress,
    tone: p.progress > 90 ? 'warning' : 'graphite',
    label: p.name,
    valueLabel: p.spent + ' / ' + p.fee
  })))));
}
window.Finance = Finance;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier-app/Finance.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier-app/Messages.jsx
try { (() => {
var {
  Card,
  Avatar,
  IconButton,
  MessageBubble,
  DateDivider,
  Composer
} = window.ATELIERDesignSystem_b56b60;
function Messages() {
  const [msgs, setMsgs] = React.useState([{
    author: 'Mira Halden',
    text: 'Thanks for the v3 elevations. Could we see the island with the oiled-oak top rather than the stone?',
    time: '10:12'
  }, {
    author: 'Mira Halden',
    text: 'Also — is the larder door still a pocket door in this set?',
    time: '10:13'
  }, {
    out: true,
    text: 'Yes, still a pocket door. I’ll upload an oak variant to Documents this afternoon.',
    time: '10:20'
  }]);
  const send = t => setMsgs(m => [...m, {
    out: true,
    text: t,
    time: 'now'
  }]);
  return /*#__PURE__*/React.createElement(Card, {
    padding: 24,
    style: {
      minHeight: 600,
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Mira Halden",
    size: "md",
    tone: "sage"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 600
    }
  }, "Halden Residence \u2014 client thread"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--status-positive)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 9,
      background: 'currentColor'
    }
  }), "Mira is online")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "files",
    variant: "soft",
    shape: "square",
    label: "Shared files"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "ellipsis-vertical",
    variant: "soft",
    shape: "square",
    label: "More"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DateDivider, null, "Today"), msgs.map((m, i) => /*#__PURE__*/React.createElement(MessageBubble, {
    key: i,
    outgoing: m.out,
    time: m.time
  }, m.text))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(Composer, {
    placeholder: "Message Mira Halden\u2026",
    onSend: send
  }))));
}
window.Messages = Messages;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier-app/Messages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier-app/ProjectRoom.jsx
try { (() => {
var {
  Card,
  Button,
  Badge,
  SegmentedControl,
  CheckItem,
  ProgressBar,
  ListRow,
  Icon,
  IconButton
} = window.ATELIERDesignSystem_b56b60;
const SCOPE = {
  Concept: ['Site analysis & brief', 'Two massing options', 'Client workshop'],
  Development: ['Coordinated floor plans 1:50', 'Kitchen & bath elevations', 'Material & finish schedule', 'Two rounds of client revisions'],
  Documents: ['Construction drawing set', 'Specifications', 'Tender support']
};
function Deliverable({
  icon,
  title,
  desc,
  due,
  selected,
  approved,
  onApprove
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      borderRadius: 16,
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: selected ? 'var(--sage-50)' : 'var(--surface-inset)',
      border: selected ? '1.5px solid var(--sage-400)' : '1.5px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      background: '#fff',
      color: 'var(--accent)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '21px',
      color: 'var(--text-muted)'
    }
  }, desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, due), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: approved ? 'accent' : 'primary',
    icon: approved ? 'check' : undefined,
    onClick: onApprove
  }, approved ? 'Approved' : 'Approve')));
}
function ProjectRoom({
  projectId,
  go,
  toast
}) {
  const D = window.ATL;
  const p = D.projects.find(x => x.id === projectId) || D.projects[0];
  const [phase, setPhase] = React.useState('Development');
  const [ok, setOk] = React.useState({
    a: true
  });
  const approve = (k, t) => {
    setOk(s => ({
      ...s,
      [k]: !s[k]
    }));
    if (!ok[k]) toast(t + ' approved');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.65fr) minmax(0,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "accent",
    padding: 28,
    style: {
      gap: 24,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -80,
      top: -120,
      width: 420,
      height: 420,
      borderRadius: 999,
      background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 65%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "glass",
    icon: "layers"
  }, "Phase 3 \xB7 Design development"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'rgba(255,255,255,.9)'
    }
  }, p.code, " \xB7 ", p.client)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      position: 'relative',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 64,
      lineHeight: '68px',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, p.progress, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 500
    }
  }, "complete")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    tone: "onAccent",
    hatched: true,
    height: 10,
    value: p.progress
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", null, p.spent, " of ", p.fee), /*#__PURE__*/React.createElement("span", null, "Construction docs in 18 days"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    icon: "stamp",
    onClick: () => toast('Approval requested from ' + p.client)
  }, "Request approval"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'rgba(255,255,255,.9)'
    }
  }, "\u203A  3 deliverables awaiting sign-off"))), /*#__PURE__*/React.createElement(Card, {
    title: "Scope by phase"
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: phase,
    onChange: setPhase,
    options: ['Concept', 'Development', 'Documents'],
    style: {
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      paddingTop: 4
    }
  }, SCOPE[phase].map(s => /*#__PURE__*/React.createElement(CheckItem, {
    key: s
  }, s)))), /*#__PURE__*/React.createElement(Card, {
    title: "Deliverables for review",
    subtitle: "Approving a deliverable notifies the client and logs it in the approval timeline.",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "accent"
    }, "3 open")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Deliverable, {
    icon: "pencil-ruler",
    title: "Kitchen elevations v3",
    desc: "Oiled-oak joinery option with revised island depth.",
    due: "Due 21 Oct",
    selected: true,
    approved: ok.a,
    onApprove: () => approve('a', 'Kitchen elevations')
  }), /*#__PURE__*/React.createElement(Deliverable, {
    icon: "layers",
    title: "Finish schedule",
    desc: "Limestone flooring, lime plaster walls, brass fittings.",
    due: "Due 24 Oct",
    approved: ok.b,
    onApprove: () => approve('b', 'Finish schedule')
  }), /*#__PURE__*/React.createElement(Deliverable, {
    icon: "sofa",
    title: "FF&E selection",
    desc: "Living and dining loose furniture, 18 items.",
    due: "Ongoing",
    approved: ok.c,
    onApprove: () => approve('c', 'FF&E selection')
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Recent activity",
    action: /*#__PURE__*/React.createElement(IconButton, {
      icon: "message-square-text",
      variant: "soft",
      size: "sm",
      label: "Open thread",
      onClick: () => go('messages')
    }),
    style: {
      gap: 4
    }
  }, D.activity.map((a, i) => /*#__PURE__*/React.createElement(ListRow, {
    key: i,
    icon: a.icon,
    title: a.title,
    meta: a.meta,
    value: a.value,
    valueTone: a.tone,
    divider: i < D.activity.length - 1
  }))));
}
window.ProjectRoom = ProjectRoom;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier-app/ProjectRoom.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier-app/Projects.jsx
try { (() => {
var {
  Card,
  Button,
  Badge,
  DataTable,
  Input,
  SegmentedControl,
  AvatarGroup,
  ProgressBar,
  Select
} = window.ATELIERDesignSystem_b56b60;
function Projects({
  go
}) {
  const D = window.ATL;
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');
  const rows = D.projects.filter(p => (tab === 'all' || (tab === 'design' ? ['Concept', 'Schematic', 'Development'].includes(p.phase) : ['Documents', 'Construction'].includes(p.phase))) && (p.name + p.client).toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: tab,
    onChange: setTab,
    options: [{
      value: 'all',
      label: 'All · 5'
    }, {
      value: 'design',
      label: 'In design · 3'
    }, {
      value: 'delivery',
      label: 'Delivery · 2'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Search projects or clients",
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      width: 280
    }
  }), /*#__PURE__*/React.createElement(Select, {
    value: "due",
    options: [{
      value: 'due',
      label: 'Sort: Next milestone'
    }, {
      value: 'fee',
      label: 'Sort: Fee'
    }],
    align: "right"
  }))), /*#__PURE__*/React.createElement(DataTable, {
    onRowClick: r => go('room', r.id),
    rowKey: "id",
    columns: [{
      key: 'name',
      label: 'Project',
      width: 'minmax(0,2fr)',
      render: r => /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, r.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: 'var(--text-subtle)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, r.code, " \xB7 ", r.type))
    }, {
      key: 'client',
      label: 'Client',
      width: 'minmax(0,1fr)',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-muted)'
        }
      }, r.client)
    }, {
      key: 'phase',
      label: 'Phase',
      width: '128px',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: r.tone,
        dot: true
      }, r.phase)
    }, {
      key: 'progress',
      label: 'Progress',
      width: '130px',
      render: r => /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement(ProgressBar, {
        value: r.progress,
        height: 6,
        style: {
          flex: 1
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: 'var(--text-muted)',
          width: 32,
          textAlign: 'right'
        }
      }, r.progress, "%"))
    }, {
      key: 'team',
      label: 'Team',
      width: '76px',
      render: r => /*#__PURE__*/React.createElement(AvatarGroup, {
        names: r.team,
        size: "xs",
        max: 3
      })
    }, {
      key: 'fee',
      label: 'Fee',
      width: '84px',
      align: 'right',
      numeric: true,
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.fee)
    }, {
      key: 'due',
      label: 'Next',
      width: '56px',
      align: 'right',
      numeric: true
    }],
    rows: rows,
    empty: "No projects match that search."
  }));
}
window.Projects = Projects;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier-app/Projects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atelier-app/data.js
try { (() => {
window.ATL = {
  user: {
    name: 'Elena Marsh',
    email: 'elena@marsh-studio.com'
  },
  projects: [{
    id: 'halden',
    name: 'Halden Residence',
    code: 'AT-24-031',
    client: 'Mira Halden',
    type: 'Private house · 420 m²',
    phase: 'Development',
    tone: 'warning',
    progress: 62,
    team: ['Elena Marsh', 'Aiko Tan', 'Jonas Weil'],
    fee: '€300,000',
    spent: '€186,400',
    due: '14 Nov'
  }, {
    id: 'kvarn',
    name: 'Kvarn Offices — Level 3',
    code: 'AT-24-027',
    client: 'Kvarn AB',
    type: 'Workplace fit-out · 1,850 m²',
    phase: 'Documents',
    tone: 'neutral',
    progress: 81,
    team: ['Jonas Weil', 'Rui Costa', 'Theo Lund', 'Aiko Tan'],
    fee: '€310,500',
    spent: '€242,100',
    due: '28 Oct'
  }, {
    id: 'lumen',
    name: 'Lumen Gallery Annex',
    code: 'AT-25-004',
    client: 'Lumen Foundation',
    type: 'Cultural · 960 m²',
    phase: 'Schematic',
    tone: 'accent',
    progress: 34,
    team: ['Elena Marsh', 'Theo Lund'],
    fee: '€218,000',
    spent: '€61,800',
    due: '02 Dec'
  }, {
    id: 'orsa',
    name: 'Orsa Apartments',
    code: 'AT-25-011',
    client: 'Orsa Living',
    type: 'Residential · 24 units',
    phase: 'Concept',
    tone: 'info',
    progress: 12,
    team: ['Rui Costa', 'Aiko Tan'],
    fee: '€540,000',
    spent: '€38,900',
    due: '19 Jan'
  }, {
    id: 'vik',
    name: 'Vik Café Interior',
    code: 'AT-25-016',
    client: 'Vik & Co.',
    type: 'Hospitality · 140 m²',
    phase: 'Construction',
    tone: 'negative',
    progress: 93,
    team: ['Theo Lund'],
    fee: '€46,000',
    spent: '€44,700',
    due: '24 Oct'
  }],
  approvals: [{
    project: 'Halden Residence',
    item: 'Kitchen elevations v3',
    client: 'Mira Halden',
    due: '21 Oct',
    status: 'Awaiting client',
    tone: 'warning'
  }, {
    project: 'Lumen Gallery Annex',
    item: 'Schematic massing',
    client: 'Lumen Foundation',
    due: '23 Oct',
    status: 'In review',
    tone: 'info'
  }, {
    project: 'Kvarn Offices — Level 3',
    item: 'Lighting schedule',
    client: 'Kvarn AB',
    due: '18 Oct',
    status: 'Overdue',
    tone: 'negative'
  }, {
    project: 'Vik Café Interior',
    item: 'Joinery shop drawings',
    client: 'Vik & Co.',
    due: '15 Oct',
    status: 'Approved',
    tone: 'positive'
  }],
  feeChart: [{
    label: 'May',
    fee: 92,
    inv: 84
  }, {
    label: 'Jun',
    fee: 104,
    inv: 96
  }, {
    label: 'Jul',
    fee: 88,
    inv: 90
  }, {
    label: 'Aug',
    fee: 76,
    inv: 61
  }, {
    label: 'Sep',
    fee: 118,
    inv: 102
  }, {
    label: 'Oct',
    fee: 96,
    inv: 54
  }],
  activity: [{
    icon: 'stamp',
    title: 'Schematic set approved',
    meta: 'Lumen Gallery Annex · 12 Oct',
    value: '+€21,800',
    tone: 'positive'
  }, {
    icon: 'upload',
    title: 'Kitchen elevations v3 issued',
    meta: 'Halden Residence · 11 Oct',
    value: '12 sheets',
    tone: 'muted'
  }, {
    icon: 'receipt',
    title: 'Invoice INV-0412 overdue',
    meta: 'Kvarn Offices · 08 Oct',
    value: '€8,400',
    tone: 'negative'
  }, {
    icon: 'map-pin',
    title: 'Site visit logged',
    meta: 'Vik Café Interior · 06 Oct',
    value: '3.5 h',
    tone: 'muted'
  }],
  invoices: [{
    no: 'INV-0418',
    project: 'Halden Residence',
    stage: 'Design development 2/3',
    issued: '10 Oct',
    amount: '€24,000',
    status: 'Sent',
    tone: 'info'
  }, {
    no: 'INV-0415',
    project: 'Lumen Gallery Annex',
    stage: 'Schematic design',
    issued: '03 Oct',
    amount: '€21,800',
    status: 'Paid',
    tone: 'positive'
  }, {
    no: 'INV-0412',
    project: 'Kvarn Offices — Level 3',
    stage: 'Construction docs 1/2',
    issued: '18 Sep',
    amount: '€8,400',
    status: 'Overdue',
    tone: 'negative'
  }, {
    no: 'INV-0409',
    project: 'Vik Café Interior',
    stage: 'Site supervision',
    issued: '12 Sep',
    amount: '€6,200',
    status: 'Paid',
    tone: 'positive'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atelier-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.CheckItem = __ds_scope.CheckItem;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Composer = __ds_scope.Composer;

__ds_ns.MessageBubble = __ds_scope.MessageBubble;

__ds_ns.DateDivider = __ds_scope.DateDivider;

__ds_ns.AppShell = __ds_scope.AppShell;

__ds_ns.BrandChip = __ds_scope.BrandChip;

__ds_ns.UserMenu = __ds_scope.UserMenu;

__ds_ns.IconRail = __ds_scope.IconRail;

__ds_ns.TopNav = __ds_scope.TopNav;

__ds_ns.HeaderGroup = __ds_scope.HeaderGroup;

})();
