// Header bar: global search (Ctrl/⌘ K), theme toggle, notifications popover and drawer.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Button, HeaderGroup, Icon, IconButton, SegmentedControl } from '../ds';
import { Hover } from '../lib/Hover.jsx';
import { useNav } from '../lib/nav.jsx';
import { readSet, relDay, search, writeSet, READ_STORAGE_KEY } from '../lib/search.js';
import { liveIndex, useLiveIndex } from '../lib/live-index.js';
import { setTheme, useTheme } from '../lib/theme.js';

// Records point at the design export's page files; map them to module ids.
const FILE_TO_MODULE = {
  'Overview Dashboard.dc.html': 'overview', 'Projects.dc.html': 'projects', 'Clients.dc.html': 'clients', 'Approvals.dc.html': 'approvals',
  'Tasks.dc.html': 'tasks', 'Documents.dc.html': 'documents', 'Reports.dc.html': 'reports', 'Settings.dc.html': 'settings', 'Help.dc.html': 'help',
};
const toModule = href => { const [f, h] = href.split('#'); return (FILE_TO_MODULE[f] || f) + (h ? '#' + h : ''); };

const TONE = {
  negative: ['var(--status-negative-bg)', 'var(--status-negative)'], warning: ['var(--status-warning-bg)', 'var(--status-warning)'],
  positive: ['var(--status-positive-bg)', 'var(--status-positive)'], neutral: ['var(--surface-muted)', 'var(--text-strong)'],
};
const KIND = { approval: 'Approval', task: 'Task', document: 'Document', project: 'Project' };
const GROUPS = [['project', 'Projects'], ['client', 'Clients'], ['task', 'Tasks'], ['document', 'Documents'], ['approval', 'Approvals'], ['member', 'Team']];
const PAGES = [['Overview', 'overview', 'layout-grid'], ['Projects', 'projects', 'folder-kanban'], ['Clients', 'clients', 'building-2'], ['Approvals', 'approvals', 'stamp'], ['Tasks & Team', 'tasks', 'list-todo'], ['Documents', 'documents', 'files'], ['Reports', 'reports', 'chart-column']];
const SCRIM = { position: 'fixed', inset: 0, background: 'var(--scrim)' };
const eyebrow = { fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--text-subtle)' };

function notifGroup(id) {
  return /^ap-(overdue|due)/.test(id) ? 'deadlines' : /^ap-/.test(id) ? 'approvals' : /^task-/.test(id) ? 'tasks' : /^doc-/.test(id) ? 'documents' : 'projects';
}
function readNotifPrefs() {
  try { return (JSON.parse(localStorage.getItem('modul.settings.v1') || '{}').notifications) || {}; } catch { return {}; }
}

function NotificationRow({ n, read, clamp, onOpen, onMarkRead, onMarkUnread, showUnreadToggle }) {
  const t = TONE[n.tone] || TONE.neutral;
  const dotBtn = { position: 'absolute', top: 10, right: 8, width: 28, height: 28, border: 0, borderRadius: 999, background: 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };
  return (
    <Hover style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', borderRadius: 14, background: 'transparent' }} hover={{ background: 'var(--surface-inset)' }}>
      <button type="button" onClick={onOpen} aria-label={(read ? '' : 'Unread. ') + n.title + '. ' + n.desc} style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 40px 12px 12px', border: 0, background: 'transparent', borderRadius: 14, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
        <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 999, background: read ? 'var(--surface-muted)' : t[0], color: read ? 'var(--text-muted)' : t[1], display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={n.icon} size={17} />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: 'var(--text-table)', lineHeight: 'var(--lh-table)', fontWeight: read ? 500 : 600, color: read ? 'var(--text-body)' : 'var(--text-strong)', textWrap: 'pretty' }}>{n.title}</span>
          <span style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-sm)', color: 'var(--text-muted)', ...(clamp ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : null) }}>{n.desc}</span>
          <span style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--lh-xs)', color: 'var(--text-subtle)', marginTop: 2 }}>{KIND[n.kind] + ' · ' + relDay(n.date)}</span>
        </span>
      </button>
      {!read ? (
        <Hover as="button" type="button" onClick={onMarkRead} aria-label="Mark as read" title="Mark as read" style={dotBtn} hover={{ background: 'var(--surface-muted)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--accent)' }} />
        </Hover>
      ) : showUnreadToggle ? (
        <Hover as="button" type="button" onClick={onMarkUnread} aria-label="Mark as unread" title="Mark as unread" style={dotBtn} hover={{ background: 'var(--surface-muted)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, boxShadow: 'inset 0 0 0 1.5px var(--limestone-400, #c4bfb5)' }} />
        </Hover>
      ) : null}
    </Hover>
  );
}

// rowProps(n) returns the per-row props (read state + handlers) for notification n.
function Sectioned({ list, headPad, rowProps }) {
  const urgent = list.filter(n => n.urgent), rest = list.filter(n => !n.urgent);
  const block = (label, items) => items.length ? (
    <React.Fragment key={label}>
      <div style={{ padding: headPad, ...eyebrow }}>{label}</div>
      {items.map(n => <NotificationRow key={n.id} n={n} {...rowProps(n)} />)}
    </React.Fragment>
  ) : null;
  return <>{block('Needs action', urgent)}{block('Updates', rest)}</>;
}

function SearchDialog({ onClose, onGo, shortcut }) {
  const [q, setQ] = useState('');
  const [dq, setDq] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const deb = useRef();
  useEffect(() => { setTimeout(() => inputRef.current && inputRef.current.focus(), 0); return () => clearTimeout(deb.current); }, []);

  const { rows, flat } = useMemo(() => {
    const rows = [], flat = [];
    const term = dq.trim();
    if (!term) {
      rows.push({ head: 'Go to', count: '' });
      PAGES.forEach(([t, to, icon]) => { rows.push({ ix: flat.length, title: t, parts: [{ t, w: 500 }], sub: 'Open ' + t, icon, to }); flat.push(to); });
    } else {
      const res = search(liveIndex().items, term);
      GROUPS.forEach(([type, label]) => {
        const hits = res.filter(r => r.it.type === type); if (!hits.length) return;
        rows.push({ head: label, count: hits.length > 5 ? '5 of ' + hits.length : String(hits.length) });
        hits.slice(0, 5).forEach(h => {
          const it = h.it, to = toModule(it.href);
          const parts = h.at >= 0 && h.len
            ? [{ t: it.title.slice(0, h.at), w: 500 }, { t: it.title.slice(h.at, h.at + h.len), w: 700, bg: 'var(--sage-50, #eef2ec)' }, { t: it.title.slice(h.at + h.len), w: 500 }].filter(p => p.t)
            : [{ t: it.title, w: 500 }];
          rows.push({ ix: flat.length, title: it.title, parts, sub: it.sub, icon: it.icon, status: it.status, tone: it.tone, to });
          flat.push(to);
        });
      });
    }
    return { rows, flat };
  }, [dq, liveIndex()]);

  const act = Math.min(active, Math.max(0, flat.length - 1));
  useEffect(() => {
    const L = listRef.current; const el = L && L.querySelector('[data-ix="' + act + '"]'); if (!el) return;
    const top = el.offsetTop, bot = top + el.offsetHeight;
    if (top < L.scrollTop + 8) L.scrollTop = top - 36; else if (bot > L.scrollTop + L.clientHeight) L.scrollTop = bot - L.clientHeight + 8;
  }, [act]);

  const onKey = e => {
    const n = flat.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); if (n) setActive((act + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (n) setActive((act - 1 + n) % n); }
    else if (e.key === 'Enter') { e.preventDefault(); if (flat[act]) onGo(flat[act]); }
  };
  const term = dq.trim();

  return (
    <div data-hu-pop="search" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} style={{ ...SCRIM, zIndex: 140, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '12vh 16px 16px', boxSizing: 'border-box' }}>
      <div role="dialog" aria-modal="true" aria-label="Search MODUL" style={{ width: 'min(640px, 100%)', maxHeight: '76vh', background: 'var(--surface-card)', borderRadius: 24, boxShadow: 'var(--shadow-pop)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 64, padding: '0 16px 0 22px', flexShrink: 0 }}>
          <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }}><Icon name="search" size={20} /></span>
          <input
            data-hu-input="1" ref={inputRef} type="text" role="combobox" aria-expanded aria-controls="hu-results"
            aria-activedescendant={flat.length ? 'hu-opt-' + act : undefined}
            aria-label="Search projects, clients, tasks, documents and approvals" placeholder="Search projects, clients, tasks, documents…"
            value={q} onKeyDown={onKey} autoComplete="off" spellCheck={false}
            onChange={e => { const v = e.target.value; setQ(v); setActive(0); clearTimeout(deb.current); deb.current = setTimeout(() => { setDq(v); setActive(0); }, 120); }}
            style={{ flex: 1, minWidth: 0, height: '100%', border: 0, outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 'var(--text-body-lg)', fontWeight: 500, color: 'var(--text-strong)' }}
          />
          {q ? <IconButton icon="x" size="sm" label="Clear search" onClick={() => { clearTimeout(deb.current); setQ(''); setDq(''); setActive(0); inputRef.current && inputRef.current.focus(); }} /> : null}
          <button type="button" onClick={onClose} aria-label="Close search" style={{ height: 26, padding: '0 8px', border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--surface-inset)', fontFamily: 'inherit', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer' }}>Esc</button>
        </div>
        <div id="hu-results" role="listbox" aria-label="Results" data-hu-scroll="1" ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '4px 8px 8px', borderTop: '1px solid var(--border-subtle)', minHeight: 0, position: 'relative' }}>
          {term && rows.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '44px 20px', textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: 'var(--text-strong)' }}>No results for “{term}”</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Try a project code, a client name or part of a file name.</span>
            </div>
          ) : null}
          {rows.map((r, i) => r.head ? (
            <div key={'h' + i} role="presentation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 12px 4px', ...eyebrow }}>
              <span>{r.head}</span>
              <span style={{ letterSpacing: 0, textTransform: 'none', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{r.count}</span>
            </div>
          ) : (
            <div
              key={'o' + r.ix} id={'hu-opt-' + r.ix} role="option" aria-selected={r.ix === act} data-ix={r.ix}
              onClick={() => onGo(r.to)} onMouseMove={() => { if (active !== r.ix) setActive(r.ix); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, padding: '8px 12px', borderRadius: 14, background: r.ix === act ? 'var(--surface-muted)' : 'transparent', cursor: 'pointer' }}
            >
              <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, background: r.ix === act ? 'var(--surface-card)' : 'var(--surface-muted)', color: 'var(--text-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={r.icon} size={17} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: 'var(--text-table)', lineHeight: 'var(--lh-table)', color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {r.parts.map((p, j) => <span key={j} style={{ fontWeight: p.w, background: p.bg || 'transparent', borderRadius: 3 }}>{p.t}</span>)}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--lh-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.sub}</span>
              </span>
              {r.status ? <Badge size="sm" tone={r.tone}>{r.status}</Badge> : null}
              {r.ix === act ? <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }}><Icon name="arrow-right" size={16} /></span> : null}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', padding: '10px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-inset)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', flexShrink: 0 }}>
          <span>Searching {liveIndex().items.length} records in this workspace</span>
          <span style={{ display: 'flex', gap: 14 }}><span>↑ ↓ to move</span><span>Enter to open</span><span>{shortcut} to toggle</span></span>
        </div>
      </div>
    </div>
  );
}

export function HeaderUtilities() {
  const { go } = useNav();
  const theme = useTheme();
  const dark = theme === 'dark';
  const [read, setRead] = useState(() => Array.from(readSet()));
  const [notifOpen, setNotifOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [, rerender] = useState(0);
  const prefs = readNotifPrefs();
  const open = useRef({});
  open.current = { search: searchOpen, drawer: drawerOpen, notif: notifOpen };

  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const shortcut = mac ? '⌘K' : 'Ctrl K';

  useEffect(() => {
    const keys = e => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault(); e.stopPropagation();
        setSearchOpen(o => !o); setNotifOpen(false); setDrawerOpen(false); return;
      }
      if (e.key === 'Escape') {
        // Close the top-most layer only.
        const s = open.current;
        if (s.search) { e.stopPropagation(); setSearchOpen(false); }
        else if (s.drawer) { e.stopPropagation(); setDrawerOpen(false); }
        else if (s.notif) { e.stopPropagation(); setNotifOpen(false); }
      }
    };
    const down = e => { if (!e.target.closest('[data-hu-pop]')) setNotifOpen(false); };
    const storage = e => {
      if (e.key === READ_STORAGE_KEY) setRead(Array.from(readSet()));
      if (e.key === 'modul.settings.v1') rerender(x => x + 1);
    };
    const settings = () => rerender(x => x + 1); // notification preferences changed on the Settings page
    const openSearch = () => setSearchOpen(true);
    window.addEventListener('keydown', keys, true);
    document.addEventListener('mousedown', down);
    window.addEventListener('storage', storage);
    window.addEventListener('modul:search', openSearch);
    window.addEventListener('modul:settings', settings);
    return () => {
      window.removeEventListener('keydown', keys, true); document.removeEventListener('mousedown', down);
      window.removeEventListener('storage', storage); window.removeEventListener('modul:search', openSearch);
      window.removeEventListener('modul:settings', settings);
    };
  }, []);

  const index = useLiveIndex(); // live records: new or changed items show up in search and notifications
  const notes = index.notes.filter(n => prefs[notifGroup(n.id)] !== false);
  const isRead = id => read.includes(id);
  const unread = notes.filter(n => !isRead(n.id)).length;
  const persist = next => { setRead(next); writeSet(new Set(next)); };
  const markRead = id => { if (!isRead(id)) persist(read.concat(id)); };
  const markUnread = id => persist(read.filter(x => x !== id));
  const markAll = () => persist(Array.from(new Set(read.concat(notes.map(n => n.id)))));
  const openTarget = to => { setSearchOpen(false); setNotifOpen(false); setDrawerOpen(false); go(to); };
  const rowProps = clamp => n => ({
    read: isRead(n.id), clamp, showUnreadToggle: !clamp,
    onOpen: () => { markRead(n.id); openTarget(toModule(n.href)); }, onMarkRead: () => markRead(n.id), onMarkUnread: () => markUnread(n.id),
  });
  const popList = notes.filter(n => !isRead(n.id) || n.urgent).slice(0, 8);
  const dList = notes.filter(n => filter === 'all' ? true : filter === 'unread' ? !isRead(n.id) : n.kind === filter);

  return (
    <div data-hu-pop="anchor" className="hu-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0, fontFamily: 'var(--font-sans)' }}>
      <span aria-hidden="true" style={{ marginRight: 'auto' }} />
      <button type="button" className="hu-search" onClick={() => { setSearchOpen(true); setNotifOpen(false); }} aria-label={'Search (' + shortcut + ')'} aria-haspopup="dialog" style={{ flex: '0 1 380px', minWidth: 52, height: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px 0 8px', marginRight: -8, border: 0, borderRadius: 999, background: 'var(--surface-card)', boxShadow: 'var(--shadow-xs)', fontFamily: 'inherit', cursor: 'text', textAlign: 'left', transition: 'background var(--dur-fast)' }}>
        <span style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 999, background: 'var(--surface-inset)', color: 'var(--text-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="search" size={20} /></span>
        <span style={{ flex: 1, minWidth: 0, fontSize: 15, color: 'var(--text-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Search projects, clients, tasks…</span>
        <span className="hu-shortcut" style={{ flexShrink: 0, padding: '3px 8px', borderRadius: 8, background: 'var(--surface-inset)', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{shortcut}</span>
      </button>
      <div className="hu-theme" role="group" aria-label={'Theme: ' + (dark ? 'dark' : 'light')} style={{ display: 'inline-flex', flexShrink: 0 }}>
        <HeaderGroup>
          <IconButton icon="sun" label={dark ? 'Switch to light theme' : 'Light theme (current)'} active={!dark} onClick={() => setTheme('light')} />
          <IconButton icon="moon" label={dark ? 'Dark theme (current)' : 'Switch to dark theme'} active={dark} onClick={() => setTheme('dark')} />
        </HeaderGroup>
      </div>
      <HeaderGroup>
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <IconButton icon="bell" label={unread ? 'Notifications, ' + unread + ' unread' : 'Notifications'} active={notifOpen} onClick={() => setNotifOpen(o => !o)} />
          {unread > 0 && prefs.badge !== false ? (
            <span aria-hidden="true" style={{ position: 'absolute', top: 5, right: 3, minWidth: 17, height: 17, padding: '0 4px', boxSizing: 'border-box', borderRadius: 999, background: 'var(--accent-fill)', color: '#fff', fontSize: 10, lineHeight: '17px', fontWeight: 700, textAlign: 'center', fontVariantNumeric: 'tabular-nums', boxShadow: '0 0 0 2px var(--surface-card)', pointerEvents: 'none' }}>{unread > 9 ? '9+' : unread}</span>
          ) : null}
        </span>
      </HeaderGroup>

      {notifOpen ? (
        <div role="dialog" aria-label="Notifications" data-hu-pop="notif" style={{ position: 'absolute', right: 0, top: 72, zIndex: 80, width: 'min(400px, calc(100vw - 32px))', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg, 18px)', boxShadow: 'var(--shadow-pop)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 16px 12px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 'var(--text-heading)', lineHeight: 'var(--lh-heading)', fontWeight: 'var(--weight-heading)', color: 'var(--text-strong)' }}>Notifications</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{unread ? unread + ' unread' : 'All read'}</span>
            </div>
            <Button size="sm" variant="ghost" icon="check" disabled={unread === 0} onClick={markAll}>Mark all as read</Button>
          </div>
          <div data-hu-scroll="1" style={{ maxHeight: 'min(440px, 60vh)', overflowY: 'auto', padding: '0 8px 8px', borderTop: '1px solid var(--border-subtle)' }}>
            {popList.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '40px 20px', textAlign: 'center' }}>
                <span style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--surface-muted)', color: 'var(--text-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="bell" size={20} /></span>
                <span style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: 'var(--text-strong)' }}>You’re up to date</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Nothing needs your attention right now.</span>
              </div>
            ) : <Sectioned list={popList} headPad="14px 12px 6px" rowProps={rowProps(true)} />}
          </div>
          <div style={{ padding: 8, borderTop: '1px solid var(--border-subtle)' }}>
            <Button size="sm" variant="ghost" fullWidth iconRight="arrow-right" onClick={() => { setDrawerOpen(true); setNotifOpen(false); }}>View all notifications</Button>
          </div>
        </div>
      ) : null}

      {drawerOpen ? (
        <div data-hu-pop="drawer" onMouseDown={e => { if (e.target === e.currentTarget) setDrawerOpen(false); }} style={{ ...SCRIM, zIndex: 120, display: 'flex', justifyContent: 'flex-end' }}>
          <aside role="dialog" aria-modal="true" aria-label="All notifications" style={{ width: 'min(480px, 100vw)', height: '100%', boxSizing: 'border-box', background: 'var(--surface-card)', boxShadow: 'var(--shadow-pop)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '24px 24px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{ fontSize: 'var(--text-title)', lineHeight: 'var(--lh-title)', fontWeight: 'var(--weight-heading)', color: 'var(--text-strong)' }}>Notifications</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{notes.length} in the last two weeks · {unread ? unread + ' unread' : 'all read'}</span>
              </div>
              <IconButton icon="x" variant="soft" label="Close notifications" onClick={() => setDrawerOpen(false)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', padding: '0 24px 12px' }}>
              <div style={{ overflowX: 'auto', scrollbarWidth: 'none', maxWidth: '100%' }}>
                <SegmentedControl size="sm" value={filter} onChange={setFilter} options={[
                  { value: 'all', label: 'All' }, { value: 'unread', label: 'Unread' + (unread ? ' · ' + unread : '') }, { value: 'approval', label: 'Approvals' },
                  { value: 'task', label: 'Tasks' }, { value: 'document', label: 'Documents' }, { value: 'project', label: 'Projects' },
                ]} />
              </div>
              <Button size="sm" variant="ghost" icon="check" disabled={unread === 0} onClick={markAll}>Mark all as read</Button>
            </div>
            <div data-hu-scroll="1" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px', borderTop: '1px solid var(--border-subtle)' }}>
              {dList.length === 0 ? (
                <div style={{ padding: '40px 8px', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{filter === 'unread' ? 'No unread notifications.' : 'No notifications of this type.'}</div>
              ) : <Sectioned list={dList} headPad="16px 12px 6px" rowProps={rowProps(false)} />}
            </div>
          </aside>
        </div>
      ) : null}

      {searchOpen ? <SearchDialog shortcut={shortcut} onClose={() => setSearchOpen(false)} onGo={openTarget} /> : null}
    </div>
  );
}
