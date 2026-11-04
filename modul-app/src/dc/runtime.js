// Runtime helpers for pages compiled from Claude Design by scripts/compile-dc.mjs.
// Mirrors the parts of the Claude Design runtime (support.js) the compiled code relies on.
import React from 'react';

export { loc } from '../lib/router.js';
export { HeaderSlot, Overlays } from '../lib/slots.js';
import { getPage, setPage } from '../lib/store.js';

/** Base class for a page's `class Component extends DCLogic`: React-like state, no rendering. */
export class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {}; this.__host = null; }
  setState(update, cb) { this.__host && this.__host.__setLogicState(update, cb); }
  forceUpdate() { this.__host && this.__host.forceUpdate(); }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  /** Values the template binds to (merged over props). */
  renderVals() { return {}; }
}

/** Page records kept between visits (see `persist`): JSON-safe values go to the browser store
 *  (survive reloads); anything else is kept in memory for this tab only. */
const KEPT = new Map();
const pick = (state, keys) => Object.fromEntries(keys.filter(k => k in state).map(k => [k, state[k]]));

/**
 * Wraps a logic class + compiled template into a React component.
 * `wrap: false` renders without the host <div>, for pages placed straight into the shell grid.
 */
export function defineDC(name, Logic, render, defaults = {}, { wrap = true, css: pageCss, persist = [] } = {}) {
  class DC extends React.Component {
    constructor(props) {
      super(props);
      this.state = { v: 0, err: null };
      this.logic = new Logic(this.userProps());
      this.logic.__host = this;
      // Records and drafts from the last visit (pages unmount on navigation; reloads read the store).
      if (persist.length) {
        const saved = { ...(getPage(name) || {}), ...(KEPT.get(name) || {}) };
        const restore = pick(saved, persist);
        if (Object.keys(restore).length) this.logic.state = { ...this.logic.state, ...restore };
        this.__saved = pick(this.logic.state, persist);
      }
    }
    __persist() {
      if (!persist.length) return;
      const now = pick(this.logic.state, persist);
      if (persist.every(k => now[k] === this.__saved[k])) return; // records unchanged
      this.__saved = now;
      KEPT.set(name, now);
      setPage(name, now);
    }
    static getDerivedStateFromError(e) { return { err: (e && e.message) || String(e) }; }
    componentDidCatch(e, info) { console.error('[' + name + '] render error:', e, info && info.componentStack); }
    userProps() { return { ...defaults, ...this.props }; }
    __setLogicState(update, cb) {
      const prev = this.logic.state;
      const patch = typeof update === 'function' ? update(prev) : update;
      this.logic.state = { ...prev, ...patch };
      this.__persist();
      this.setState(s => ({ v: s.v + 1 }), cb);
    }
    componentDidMount() {
      if (pageCss) {
        // Mounted in the commit (before paint) and removed on unmount, so pages never see each other's rules.
        this.styleEl = document.createElement('style');
        this.styleEl.setAttribute('data-page', name);
        this.styleEl.textContent = pageCss;
        document.head.appendChild(this.styleEl);
      }
      this.logic.componentDidMount();
    }
    componentDidUpdate(prevProps) { this.logic.props = this.userProps(); this.logic.componentDidUpdate({ ...defaults, ...prevProps }); }
    componentWillUnmount() {
      this.__persist();
      this.logic.componentWillUnmount();
      if (this.styleEl) this.styleEl.remove();
    }
    render() {
      if (this.state.err) return React.createElement(wrap ? 'div' : 'main', { role: 'alert', className: wrap ? undefined : 'shell-main', style: { padding: 24, font: '14px ui-monospace,monospace', color: '#b00020' } }, name + ': ' + this.state.err);
      const props = this.userProps();
      this.logic.props = props;
      const out = render({ ...props, ...(this.logic.renderVals() || {}) });
      return wrap ? React.createElement('div', { className: 'sc-host', 'data-sc-name': name }, out) : out;
    }
  }
  DC.displayName = name;
  return DC;
}

/** Interpolated text value: elements pass through, null/boolean/undefined render nothing. */
export function I(v) {
  if (React.isValidElement(v) || Array.isArray(v)) return v;
  if (v === undefined || v === null || typeof v === 'boolean') return null;
  return React.createElement('span', { className: 'sc-interp' }, String(v));
}
export const list = v => (Array.isArray(v) ? v : []);
export const str = v => (v == null ? '' : v);
export const val = v => (v === undefined ? '' : v);
export const bool = v => (v === undefined ? false : v);
export const cx = (...c) => c.filter(Boolean).join(' ');

/** Destructive or irreversible actions render as `danger`, never as the lime primary. */
const DESTRUCTIVE = /^(reject|archive|discard|withdraw|remove|delete|cancel task)\b/i;
export const actionVariant = (variant, label) => (DESTRUCTIVE.test(String(label || '').trim()) ? 'danger' : variant);

/** Project photos shown small (≤ 96px) use the 160px WebP thumbnail (scripts/make-thumbs.mjs). */
export const thumb = src => (typeof src === 'string' ? src.replace(/(assets\/projects\/)([\w-]+)\.jpg$/, '$1thumb/$2.webp') : src);

/** Minimum time a toast stays visible (it often carries the only Undo). */
export const toastMs = ms => Math.max(Number(ms) || 0, 8000);

export function cssToObj(css) {
  const o = {};
  for (const decl of String(css).split(';')) {
    const i = decl.indexOf(':'); if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    o[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o;
}
export const css = v => (typeof v === 'string' ? cssToObj(v) : v);

// Only box-position properties of a component's `style` reach its host wrapper.
const HOST_PROPS = new Set(['position', 'left', 'right', 'top', 'bottom', 'inset', 'width', 'height', 'zIndex', 'transform']);
export function hostStyle(style) {
  const all = css(style); if (!all || typeof all !== 'object') return undefined;
  const out = {};
  for (const [k, v] of Object.entries(all)) if (HOST_PROPS.has(k)) out[k] = v;
  return Object.keys(out).length ? out : undefined;
}

// style-hover / style-focus / style-active → generated classes with !important rules.
let sheet = null;
const cache = new Map();
function importantify(decls) {
  return decls.split(';').map(d => d.trim()).filter(Boolean).map(d => (/!\s*important$/i.test(d) ? d : d + ' !important')).join(';');
}
export function pseudo(kind, cssText) {
  const k = kind + '|' + cssText;
  const hit = cache.get(k); if (hit) return hit;
  if (!sheet) { const el = document.createElement('style'); el.setAttribute('data-dc-pseudo', ''); document.head.appendChild(el); sheet = el.sheet; }
  const cls = 'dcp' + cache.size.toString(36);
  const el = kind === 'before' || kind === 'after';
  sheet.insertRule('.' + cls + (el ? '::' : ':') + kind + '{' + (el ? cssText : importantify(cssText)) + '}', sheet.cssRules.length);
  cache.set(k, cls);
  return cls;
}
