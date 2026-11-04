// Light / dark theme with a stored preference (falls back to the OS setting).
// Runs on import so the right theme is on <html> before React's first paint.
import { useSyncExternalStore } from 'react';

const KEY = 'modul.theme.v1';
const root = document.documentElement;
const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

function pref() {
  try { const v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : 'system'; } catch { return 'system'; }
}
const resolve = p => (p === 'system' ? (mq && mq.matches ? 'dark' : 'light') : p);

function apply(animate) {
  const p = pref(), t = resolve(p);
  if (root.getAttribute('data-theme') === t && root.getAttribute('data-theme-pref') === p) return;
  if (animate && root.hasAttribute('data-theme')) {
    // Suppress per-element transitions so the whole page flips at once.
    root.setAttribute('data-theme-switching', '');
    setTimeout(() => root.removeAttribute('data-theme-switching'), 60);
  }
  root.setAttribute('data-theme', t);
  root.setAttribute('data-theme-pref', p);
  root.style.colorScheme = t;
  window.dispatchEvent(new CustomEvent('modul:theme', { detail: { theme: t, pref: p } }));
}

export function getTheme() { return root.getAttribute('data-theme') || 'light'; }
export function setTheme(v) {
  try { if (v === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch { /* storage blocked */ }
  apply(true);
}

function subscribe(cb) {
  window.addEventListener('modul:theme', cb);
  return () => window.removeEventListener('modul:theme', cb);
}
export const useTheme = () => useSyncExternalStore(subscribe, getTheme);

// The compiled module pages call the prototype's global API.
window.ModulTheme = {
  get: getTheme,
  pref,
  set: setTheme,
  toggle() { setTheme(getTheme() === 'dark' ? 'light' : 'dark'); },
};

apply(false);
if (mq) mq.addEventListener('change', () => { if (pref() === 'system') apply(true); });
window.addEventListener('storage', e => { if (e.key === KEY || e.key === null) apply(true); });
