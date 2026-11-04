// Studio records shared by every module and kept in this browser (localStorage).
// Pages declare which parts of their state are records (compile-dc PERSIST, e.g.
// Projects → projects + draft); the runtime reads them back on mount and writes them
// on change, so work survives switching modules and reloading. `?reset-data` clears it.
import { useEffect, useState } from 'react';

const KEY = 'modul.data.v1';
const subs = new Set();
let data = load();
let timer = null;

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
}
function flush() {
  clearTimeout(timer); timer = null;
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage full or blocked: stays in memory */ }
}
window.addEventListener('pagehide', () => { if (timer) flush(); });

// Only JSON-safe values are written (plain objects, arrays, strings, numbers, booleans, null).
function plain(v, depth = 0) {
  if (v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return true;
  if (depth > 12 || typeof v !== 'object') return false;
  if (Array.isArray(v)) return v.every(x => plain(x, depth + 1));
  if (Object.getPrototypeOf(v) !== Object.prototype) return false;
  return Object.values(v).every(x => x === undefined || plain(x, depth + 1));
}

/** Saved records for a page, or undefined. */
export const getPage = name => data[name];

/** Save a page's records (debounced write) and notify listeners (counts, search). */
export function setPage(name, values) {
  const safe = Object.fromEntries(Object.entries(values).filter(([, v]) => v === undefined || plain(v)));
  data = { ...data, [name]: { ...(data[name] || {}), ...safe } };
  clearTimeout(timer); timer = setTimeout(flush, 250);
  subs.forEach(fn => fn());
}

/** Forget every saved record (back to the sample data). */
export function resetData() {
  data = {};
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  subs.forEach(fn => fn());
}

export function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }

/** Re-renders when any page's records change. */
export function useStoreVersion() {
  const [v, setV] = useState(0);
  useEffect(() => subscribe(() => setV(x => x + 1)), []);
  return v;
}

// Another tab saved records: pick them up.
window.addEventListener('storage', e => { if (e.key === KEY) { data = load(); subs.forEach(fn => fn()); } });
