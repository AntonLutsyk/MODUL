// Focus management for every modal surface in the app (WCAG 2.4.3).
// Any element with aria-modal="true" (wizards, confirms, drawers, search, tour) gets:
//   - initial focus inside it (first field, else first control, else the dialog itself),
//   - Tab / Shift+Tab kept inside the top-most modal,
//   - focus returned to what was focused before it opened, once it closes.
// Works by observing the DOM, so compiled pages need no changes.

const MODAL = '[aria-modal="true"]';
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';
const FIELD = 'input:not([disabled]):not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea:not([disabled]), select:not([disabled])';

const visible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
const focusables = root => [...root.querySelectorAll(FOCUSABLE)].filter(visible);

const open = new Map(); // modal element → element focused before it opened
let lastFocus = null;   // last focus outside any modal (the trigger)

document.addEventListener('focusin', e => {
  if (!e.target.closest || !e.target.closest(MODAL)) lastFocus = e.target;
}, true);

function topModal() {
  const list = [...open.keys()].filter(m => m.isConnected);
  return list[list.length - 1] || null;
}

function onOpen(m) {
  if (open.has(m)) return;
  open.set(m, document.activeElement && document.activeElement !== document.body ? document.activeElement : lastFocus);
  // Let the component finish its own focus handling first (search input, sign-out Cancel…).
  setTimeout(() => {
    if (!m.isConnected || m.contains(document.activeElement)) return;
    const target = m.querySelector('[autofocus]') || m.querySelector(FIELD) || focusables(m)[0];
    if (target) target.focus({ preventScroll: true });
    else { if (!m.hasAttribute('tabindex')) m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); }
  }, 40);
}

function onClose(m) {
  const back = open.get(m);
  open.delete(m);
  setTimeout(() => {
    const t = topModal();
    if (t) { if (!t.contains(document.activeElement)) (focusables(t)[0] || t).focus({ preventScroll: true }); return; }
    if (back && back.isConnected && (document.activeElement === document.body || !document.activeElement)) back.focus({ preventScroll: true });
  }, 0);
}

function scan() {
  document.querySelectorAll(MODAL).forEach(m => { if (visible(m)) onOpen(m); });
  for (const m of [...open.keys()]) if (!m.isConnected || !m.matches(MODAL)) onClose(m);
}

new MutationObserver(scan).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-modal'] });

// Keep Tab inside the top-most modal.
document.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const m = topModal(); if (!m) return;
  const list = focusables(m); if (!list.length) { e.preventDefault(); return; }
  const first = list[0], last = list[list.length - 1];
  const inside = m.contains(document.activeElement);
  if (e.shiftKey && (document.activeElement === first || !inside)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (document.activeElement === last || !inside)) { e.preventDefault(); first.focus(); }
}, true);
