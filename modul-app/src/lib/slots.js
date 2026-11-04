// Places in the persistent shell that pages render into through portals:
//   header   — page-specific items next to the header utilities (e.g. the user menu)
//   overlays — dialogs, drawers and toasts that sit outside the frame grid
import { createElement, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

const nodes = { header: null, overlays: null };
const subs = new Set();
const subscribe = fn => { subs.add(fn); return () => subs.delete(fn); };

/** Ref callback factory for the shell: <div ref={slotRef('header')} />. */
export const slotRef = name => el => {
  if (nodes[name] === el) return;
  nodes[name] = el;
  subs.forEach(fn => fn());
};

function useSlot(name) { return useSyncExternalStore(subscribe, () => nodes[name]); }

function Slot({ name, children }) {
  const node = useSlot(name);
  return node ? createPortal(children, node) : null;
}
export const HeaderSlot = ({ children }) => createElement(Slot, { name: 'header' }, children);
export const Overlays = ({ children }) => createElement(Slot, { name: 'overlays' }, children);
