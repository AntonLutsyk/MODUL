// Client-side routing between MODUL modules. URLs stay the real page files
// (projects.html, approvals.html#approval=…), so reloads and shared links keep working,
// but moving between modules swaps only the page content — the shell stays mounted.
import { startTransition, useEffect, useState } from 'react';
import { resetData } from './store.js';

// Opened directly with ?reset-data (e.g. a bookmarked link): clear before the app reads anything.
if (new URLSearchParams(location.search).has('reset-data')) {
  resetData();
  history.replaceState(null, '', location.pathname + location.hash);
}

export const MODULE_FILES = {
  overview: 'index.html', projects: 'projects.html', clients: 'clients.html', approvals: 'approvals.html', tasks: 'tasks.html',
  documents: 'documents.html', reports: 'reports.html', settings: 'settings.html', help: 'help.html', signin: 'sign-in.html',
};
export const MODULE_TITLES = {
  overview: 'Overview', projects: 'Projects', clients: 'Clients', approvals: 'Approvals', tasks: 'Tasks & Team',
  documents: 'Documents', reports: 'Reports', settings: 'Settings', help: 'Help', signin: 'Sign in',
};
const FILE_TO_ID = Object.fromEntries(Object.entries(MODULE_FILES).map(([id, f]) => [f, id]));

/** Module id for a URL path, or null when it isn't a MODUL page. */
export function routeForPath(pathname) {
  const file = decodeURIComponent(pathname.split('/').pop() || '') || 'index.html';
  return FILE_TO_ID[file] || null;
}

/** 'projects#project=x' (module id) or 'projects.html#…' (file) → href. */
export function hrefFor(to) {
  const s = String(to);
  const [id, ...rest] = s.split('#');
  return MODULE_FILES[id] ? MODULE_FILES[id] + (rest.length ? '#' + rest.join('#') : '') : s;
}

let route = routeForPath(location.pathname) || 'overview';
const subs = new Set();
function setRoute(next) {
  if (next === route) return;
  route = next;
  subs.forEach(fn => fn(next));
}
export const currentRoute = () => route;

/** Current module id. Changes are transitions: the old page stays until the next one has loaded. */
export function useRoute() {
  const [r, setR] = useState(route);
  useEffect(() => {
    const fn = next => startTransition(() => setR(next));
    subs.add(fn);
    if (route !== r) fn(route);
    return () => { subs.delete(fn); };
  }, []);
  return r;
}

/** Go to a module, a deep link inside one, or any URL. */
export function navigate(to, { replace = false } = {}) {
  const url = new URL(hrefFor(to), location.href);
  // Help › "Reset sample data": forget saved records and start the app fresh.
  if (url.origin === location.origin && url.searchParams.has('reset-data')) {
    resetData();
    location.replace(url.pathname);
    return;
  }
  const id = url.origin === location.origin ? routeForPath(url.pathname) : null;
  if (!id) { replace ? location.replace(url.href) : location.assign(url.href); return; }
  const target = url.pathname + url.search + url.hash;
  if (id === route && url.search === location.search) {
    // Same module: only the fragment changes; pages react to 'hashchange'.
    if (url.hash === location.hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
    else if (replace) { history.replaceState(null, '', target); window.dispatchEvent(new HashChangeEvent('hashchange')); }
    else location.hash = url.hash;
    return;
  }
  history[replace ? 'replaceState' : 'pushState'](null, '', target);
  setRoute(id);
}

/** Drop-in for `location` in compiled page code (`location.href = …`, `location.replace(…)`). */
export const loc = {
  get href() { return location.href; },
  set href(v) { navigate(v); },
  replace(v) { navigate(v, { replace: true }); },
  assign(v) { navigate(v); },
};

window.addEventListener('popstate', () => setRoute(routeForPath(location.pathname) || 'overview'));

// Plain <a href="projects.html"> links anywhere in the app use the router.
document.addEventListener('click', e => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest && e.target.closest('a[href]');
  if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
  const url = new URL(a.getAttribute('href'), location.href);
  if (url.origin !== location.origin || !routeForPath(url.pathname)) return;
  e.preventDefault();
  navigate(url.href);
});
