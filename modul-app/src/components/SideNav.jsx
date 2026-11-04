// Module sidebar: nav links with counters, settings/help, profile card and sign-out confirm.
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Avatar, Button, HeaderGroup, Icon, IconButton } from '../ds';
import { Hover } from '../lib/Hover.jsx';
import { Link, hrefFor, navigate } from '../lib/nav.jsx';
import { photoFor } from '../lib/people.js';
import { setTheme, useTheme } from '../lib/theme.js';
import { useLiveIndex } from '../lib/live-index.js';

const NAV = [
  ['overview', 'Overview', 'layout-grid'], ['projects', 'Projects', 'folder-kanban'], ['clients', 'Clients', 'users'],
  ['approvals', 'Approvals', 'stamp'], ['tasks', 'Tasks & Team', 'list-todo'], ['documents', 'Documents', 'file-text'],
  ['reports', 'Reports', 'chart-column'],
];
const UTILS = [['settings', 'Settings', 'settings'], ['help', 'Help', 'circle-help']];

function readSettings() {
  try { return JSON.parse(localStorage.getItem('modul.settings.v1') || '{}'); } catch { return {}; }
}

// Re-reads stored settings when they change here ('modul:settings') or in another tab.
function useSettings() {
  const [settings, setSettings] = useState(readSettings);
  useEffect(() => {
    const reread = () => setSettings(readSettings());
    const st = e => { if (e.key === 'modul.settings.v1') reread(); };
    window.addEventListener('storage', st); window.addEventListener('modul:settings', reread);
    return () => { window.removeEventListener('storage', st); window.removeEventListener('modul:settings', reread); };
  }, []);
  return settings;
}

export function useCompactNav(settings) {
  const [vw, setVw] = useState(window.innerWidth);
  const pref = ((settings || readSettings()).appearance || {}).sidebar || 'auto';
  useEffect(() => {
    const rs = () => setVw(window.innerWidth);
    window.addEventListener('resize', rs);
    return () => window.removeEventListener('resize', rs);
  }, []);
  return pref === 'icons' ? true : pref === 'labels' ? vw < 720 : vw < 900;
}

function NavItem({ id, label, icon, active, compact, counts = {} }) {
  const on = id === active;
  const c = counts[id];
  const alert = c && c[1] === 'alert';
  return (
    <Hover
      as={Link}
      to={id}
      data-tour={'nav-' + id}
      aria-current={on ? 'page' : undefined}
      title={compact ? label : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 14, height: 48, flexShrink: 0, padding: compact ? 0 : '0 16px',
        justifyContent: compact ? 'center' : 'flex-start', borderRadius: 16,
        background: on ? 'var(--nav-active-bg)' : 'transparent', color: on ? 'var(--nav-active-fg)' : 'var(--text-body)',
        textDecoration: 'none', fontSize: 16, lineHeight: '20px', fontWeight: on ? 600 : 500, transition: 'background var(--dur-fast)',
      }}
      hover={{ background: on ? 'var(--nav-active-bg)' : 'var(--nav-hover-bg)', textDecoration: 'none', color: 'var(--text-strong)' }}
    >
      <span style={{ display: 'inline-flex', color: on ? 'var(--nav-active-icon)' : 'var(--text-strong)' }}>
        <Icon name={icon} size={20} />
      </span>
      {!compact ? (
        <>
          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
          {c && !on ? (
            <span style={{
              minWidth: 28, height: 24, padding: '0 8px', boxSizing: 'border-box', borderRadius: 999,
              background: alert ? 'var(--nav-alert-bg)' : 'var(--nav-badge-bg)', color: alert ? 'var(--nav-alert-fg)' : 'var(--nav-badge-fg)',
              fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontVariantNumeric: 'tabular-nums',
            }}>{c[0]}</span>
          ) : null}
          {on ? <span style={{ display: 'inline-flex', color: 'var(--text-strong)' }}><Icon name="chevron-right" size={18} /></span> : null}
        </>
      ) : null}
    </Hover>
  );
}

function SignOutDialog({ onClose }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const cancelRef = useRef(null);
  useEffect(() => {
    const b = cancelRef.current && cancelRef.current.querySelector('button'); b && b.focus();
    const key = e => { if (e.key === 'Escape' && !busy) { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', key, true);
    return () => window.removeEventListener('keydown', key, true);
  }, [busy, onClose]);
  const confirm = () => {
    setBusy(true); setErr('');
    try {
      Object.keys(sessionStorage).filter(k => k.indexOf('modul.') === 0).forEach(k => sessionStorage.removeItem(k));
      localStorage.setItem('modul.session.v1', JSON.stringify({ signedIn: false, at: new Date().toISOString() }));
      navigate('signin', { replace: true });
    } catch {
      setBusy(false);
      setErr('Your session couldn’t be cleared in this browser. Close other MODUL tabs and try again.');
    }
  };
  return (
    <div
      onMouseDown={e => { if (e.target === e.currentTarget && !busy) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 160, background: 'var(--scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, boxSizing: 'border-box' }}
    >
      <div role="alertdialog" aria-modal="true" aria-labelledby="so-title" aria-describedby="so-desc" style={{ width: 'min(420px, 100%)', background: 'var(--surface-card)', borderRadius: 24, boxShadow: 'var(--shadow-pop)', padding: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span id="so-title" style={{ fontSize: 'var(--text-title)', lineHeight: 'var(--lh-title)', fontWeight: 'var(--weight-heading)', color: 'var(--text-strong)' }}>Sign out?</span>
          <span id="so-desc" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)', color: 'var(--text-muted)' }}>Are you sure you want to sign out of MODUL?</span>
        </div>
        {err ? (
          <div role="alert" style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '12px 14px', borderRadius: 14, background: 'var(--status-negative-bg)', color: 'var(--status-negative)', fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-sm)' }}>
            <Icon name="circle-alert" size={16} /><span>{err}</span>
          </div>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <span ref={cancelRef} style={{ display: 'inline-flex' }}>
            <Button variant="outline" disabled={busy} onClick={onClose}>Cancel</Button>
          </span>
          <Button icon="log-out" disabled={busy} onClick={confirm}>{busy ? 'Signing out…' : 'Sign out'}</Button>
        </div>
      </div>
    </div>
  );
}

export function SideNav({ active = 'overview', drawer = false }) {
  const settings = useSettings();
  // In the mobile drawer the nav always shows labels; the theme switch lives here too.
  const compact = useCompactNav(settings) && !drawer;
  const theme = useTheme();
  // Live counts from the studio records (open projects; approvals waiting for a decision).
  const live = useLiveIndex().counts;
  const counts = { projects: [live.projectsOpen, 'ok'], approvals: [live.approvalsPending, 'alert'] };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const W = compact ? 72 : 256;
  useEffect(() => { if (!drawer) document.documentElement.style.setProperty('--nav-w', W + 'px'); }, [W, drawer]);
  useEffect(() => {
    // Signed out → go to sign-in, then come back here.
    try {
      const s = JSON.parse(localStorage.getItem('modul.session.v1') || 'null');
      if (s && s.signedIn === false) navigate(hrefFor('signin') + '?next=' + encodeURIComponent((location.pathname.split('/').pop() || 'index.html') + location.hash), { replace: true });
    } catch { /* storage blocked */ }
    const so = () => setConfirmOpen(true);
    window.addEventListener('modul:signout', so);
    return () => window.removeEventListener('modul:signout', so);
  }, []);
  const profile = settings.profile || {};
  const name = profile.name || 'Elena Marsh';
  const padX = compact ? 0 : 16;
  const justify = compact ? 'center' : 'flex-start';

  return (
    <nav data-tour="nav" aria-label="Modules" style={{ boxSizing: 'border-box', width: drawer ? '100%' : W, minHeight: drawer ? 'calc(100dvh - 72px)' : 'calc(100vh - 108px)', display: 'flex', flexDirection: 'column', gap: 4, padding: `4px ${compact ? 12 : 20}px 16px`, background: 'transparent', fontFamily: 'var(--font-sans)', transition: 'width var(--dur-base) var(--ease-standard)' }}>
      {NAV.map(([id, label, icon]) => <NavItem key={id} id={id} label={label} icon={icon} active={active} compact={compact} counts={counts} />)}
      <div style={{ height: 1, background: 'var(--border-subtle)', margin: `10px ${padX}px`, flexShrink: 0 }} />
      {UTILS.map(([id, label, icon]) => <NavItem key={id} id={id} label={label} icon={icon} active={active} compact={compact} />)}

      <div style={{ flex: 1, minHeight: 24 }} />

      {drawer ? (
        <div role="group" aria-label={'Theme: ' + theme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '6px 6px 6px 16px', marginBottom: 8, borderRadius: 18, background: 'var(--surface-inset)' }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-strong)' }}>Theme</span>
          <HeaderGroup>
            <IconButton icon="sun" label={theme === 'dark' ? 'Switch to light theme' : 'Light theme (current)'} active={theme !== 'dark'} onClick={() => setTheme('light')} />
            <IconButton icon="moon" label={theme === 'dark' ? 'Dark theme (current)' : 'Switch to dark theme'} active={theme === 'dark'} onClick={() => setTheme('dark')} />
          </HeaderGroup>
        </div>
      ) : null}

      <Hover
        as={Link}
        to="settings#profile"
        data-tour="profile"
        title={compact ? name : undefined}
        style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, padding: compact ? 4 : '10px 14px 10px 10px', justifyContent: justify, borderRadius: 20, background: 'var(--surface-inset)', color: 'var(--text-strong)', textDecoration: 'none', transition: 'background var(--dur-fast)' }}
        hover={{ background: 'var(--surface-hover)', textDecoration: 'none', color: 'var(--text-strong)' }}
      >
        <Avatar name={name} src={profile.avatar || photoFor(name)} size={44} />
        {!compact ? (
          <>
            <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: 'var(--text-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.role || 'Studio owner'}</span>
            </span>
            <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Icon name="chevron-right" size={18} /></span>
          </>
        ) : null}
      </Hover>
      <Hover
        as="button"
        type="button"
        onClick={() => setConfirmOpen(true)}
        title={compact ? 'Sign out' : undefined}
        aria-haspopup="dialog"
        style={{ display: 'flex', alignItems: 'center', gap: 14, height: 52, flexShrink: 0, marginTop: 8, padding: `0 ${padX}px`, justifyContent: justify, border: 0, borderRadius: 18, background: 'var(--surface-inset)', color: 'var(--text-strong)', fontFamily: 'inherit', fontSize: 16, lineHeight: '20px', fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'background var(--dur-fast)' }}
        hover={{ background: 'var(--surface-hover)' }}
      >
        <Icon name="log-out" size={20} />
        {!compact ? <span style={{ flex: 1, whiteSpace: 'nowrap' }}>Sign out</span> : null}
      </Hover>

      {/* Portalled: on mobile the nav sits in an off-canvas (transformed, inert) drawer. */}
      {confirmOpen ? createPortal(<SignOutDialog onClose={() => setConfirmOpen(false)} />, document.body) : null}
    </nav>
  );
}
