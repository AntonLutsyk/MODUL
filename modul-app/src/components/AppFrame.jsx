// The persistent MODUL frame: logo, header utilities and sidebar stay mounted across
// module changes; the current page renders its <main> into the grid as `children`.
// Below 720px the sidebar becomes an off-canvas drawer opened from a menu button.
import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '../ds';
import { HeaderUtilities } from './HeaderUtilities.jsx';
import { SideNav } from './SideNav.jsx';
import { slotRef } from '../lib/slots.js';

const MOBILE_QUERY = '(max-width: 719px)';

export function useMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return mobile;
}

export function AppFrame({ active, children }) {
  const mobile = useMobile();
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);
  const drawer = mobile;
  const open = drawer && navOpen;

  // Close the drawer on navigation, on Escape and when leaving the mobile layout.
  useEffect(() => { setNavOpen(false); }, [active, mobile]);
  useEffect(() => {
    if (!open) return;
    const key = e => { if (e.key === 'Escape') { e.stopPropagation(); setNavOpen(false); } };
    window.addEventListener('keydown', key, true);
    return () => window.removeEventListener('keydown', key, true);
  }, [open]);
  // A closed drawer is off-screen: keep it out of the tab order and the accessibility tree.
  useEffect(() => { if (navRef.current) navRef.current.inert = drawer && !navOpen; }, [drawer, navOpen]);

  return (
    <>
      <div data-frame="" data-mobile={mobile ? '' : undefined} className="shell">
        <div className="shell-logo">
          {drawer ? (
            <IconButton icon="menu" label="Open navigation" onClick={() => setNavOpen(true)} />
          ) : null}
          <a href="index.html" aria-label="MODUL overview" className="shell-logo-link">
            <img src="/assets/modul-logo-v4.png" alt="MODUL" data-logo="light" />
            <img src="/assets/modul-logo-v4-dark.png" alt="MODUL" data-logo="dark" />
          </a>
        </div>
        <header className="shell-header">
          <div className="sc-host" style={{ width: '100%' }}>
            <HeaderUtilities />
          </div>
          <div ref={slotRef('header')} style={{ display: 'contents' }} />
        </header>
        <div
          ref={navRef}
          className="shell-nav"
          data-open={open ? 'true' : 'false'}
          {...(open ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Navigation' } : {})}
          onClick={e => { if (drawer && e.target.closest('a[href]')) setNavOpen(false); }}
        >
          {drawer ? (
            <div className="shell-nav-close">
              <IconButton icon="x" label="Close navigation" onClick={() => setNavOpen(false)} />
            </div>
          ) : null}
          <div className="sc-host">
            <SideNav active={active} drawer={drawer} />
          </div>
        </div>
        {open ? <div className="shell-scrim" onClick={() => setNavOpen(false)} /> : null}
        {children}
      </div>
      <div ref={slotRef('overlays')} style={{ display: 'contents' }} />
    </>
  );
}
