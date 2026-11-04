// First-run guided tour: welcome dialog, then a spotlight walk over [data-tour] targets.
// Opens on first visit, on `#tour`, or when 'modul:tour' is dispatched.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Icon } from '../ds';
import { Hover } from '../lib/Hover.jsx';

const KEY = 'modul.tour.v3';
const STEPS = [
  { sel: '[data-tour="nav"]', icon: 'layout-grid', title: 'Every module lives here', body: 'The sidebar is your map of MODUL. Let’s go through each item in a few words.' },
  { sel: '[data-tour="nav-overview"]', icon: 'layout-grid', title: 'Overview', body: 'This page. Your studio’s day in one place: fees, decisions waiting on you, recent activity and live projects.' },
  { sel: '[data-tour="nav-projects"]', icon: 'folder-kanban', title: 'Projects', body: 'Every commission with its phase, manager, deadline and fee spent. The number beside it counts your open projects.' },
  { sel: '[data-tour="nav-clients"]', icon: 'users', title: 'Clients', body: 'Clients and their companies, contacts and the projects you run for them.' },
  { sel: '[data-tour="nav-approvals"]', icon: 'stamp', title: 'Approvals', body: 'Drawings and samples sent for client sign-off. The highlighted number shows how many are still waiting for a decision.' },
  { sel: '[data-tour="nav-tasks"]', icon: 'list-todo', title: 'Tasks & Team', body: 'Who is working on what this week, with deliverables and due dates for each person.' },
  { sel: '[data-tour="nav-documents"]', icon: 'file-text', title: 'Documents', body: 'Drawing sets, contracts and finish schedules for every project, with versions kept in order.' },
  { sel: '[data-tour="nav-reports"]', icon: 'chart-column', title: 'Reports', body: 'Projects and budgets, clients, approvals, and tasks and team over a period you choose, with CSV export.' },
  { sel: '[data-tour="nav-settings"]', icon: 'settings', title: 'Settings', body: 'Your profile, studio details, notifications and appearance, including the sidebar layout.' },
  { sel: '[data-tour="nav-help"]', icon: 'circle-help', title: 'Help', body: 'Short answers on how MODUL works, and this tour whenever you want to see it again.' },
  { sel: 'header', icon: 'search', title: 'Find anything in seconds', body: 'Search projects, clients and tasks, or press Ctrl K from any page. On the right: light or dark theme, and your notifications.' },
  { sel: '[data-tour="actions"]', icon: 'plus', title: 'Start new work from here', body: 'Create a project or send drawings to a client for sign-off. Studio team shows who is working on what.' },
  { sel: '[data-tour="fee"]', icon: 'chart-column', title: 'Your fee position', body: 'Contracted fees for the period, and how many projects are on budget, close to the limit or over fee. Each row opens your projects list.' },
  { sel: '[data-tour="stats"]', icon: 'layers', title: 'The week at a glance', body: 'The four numbers that matter most this week. Open any card to see the full list behind it.' },
  { sel: '[data-tour="decisions"]', icon: 'stamp', title: 'Sign-offs holding up work', body: 'Overdue approvals come first. Open one to chase the client or update its status.' },
  { sel: '[data-tour="activity"]', icon: 'upload', title: 'What changed recently', body: 'Drawing uploads, client messages, invoices and site visits, newest first. Faces and project photos tell you who and where at a glance.' },
  { sel: '[data-tour="projects"]', icon: 'folder-kanban', title: 'Active projects', body: 'Phase, team, next milestone and fee spent for every live project. Use At risk to see only the ones that need attention.' },
  { sel: '[data-tour="profile"]', icon: 'settings', title: 'Your profile and settings', body: 'Your name and photo, with a shortcut to profile settings. You can replay this tour any time from Help or the Take the tour button.' },
];
const OUTLINE = [
  { icon: 'layout-grid', label: 'What each sidebar section is for' }, { icon: 'search', label: 'Search, theme and notifications' },
  { icon: 'stamp', label: 'What needs your decision today' }, { icon: 'folder-kanban', label: 'How your projects are doing' },
];
const EASE = '280ms cubic-bezier(.2,0,0,1)';

function measure(step) {
  const st = STEPS[step]; const el = st && document.querySelector(st.sel); if (!el) return null;
  const r = el.getBoundingClientRect(), p = 8, vh = window.innerHeight;
  const y = Math.max(8, r.top - p), b = Math.min(vh - 8, r.bottom + p);
  return { x: Math.round(r.left - p), y: Math.round(y), w: Math.round(r.width + p * 2), h: Math.round(Math.max(40, b - y)) };
}

// Pick a side of the spotlight with room for the card; centre it if there is no target.
function place(rc, vw, vh) {
  const W = Math.min(352, vw - 32), H = 236, g = 16;
  if (!rc) return { x: Math.round((vw - W) / 2), y: Math.round((vh - H) / 2), w: W };
  const cy = y => Math.max(16, Math.min(vh - H - 16, y)), cx = x => Math.max(16, Math.min(vw - W - 16, x));
  if (rc.x + rc.w + g + W <= vw - 16) return { x: rc.x + rc.w + g, y: cy(rc.y), w: W };
  if (rc.y + rc.h + g + H <= vh - 8) return { x: cx(rc.x), y: rc.y + rc.h + g, w: W };
  if (rc.y - g - H >= 8) return { x: cx(rc.x), y: rc.y - g - H, w: W };
  if (rc.x - g - W >= 16) return { x: rc.x - g - W, y: cy(rc.y), w: W };
  return { x: cx(rc.x + rc.w - W - 16), y: cy(rc.y + rc.h - H - 16), w: W };
}

// Scroll the nearest scrolling ancestor so the target sits in view.
function reveal(step) {
  const st = STEPS[step]; const el = st && document.querySelector(st.sel); if (!el) return;
  let box = el.parentElement;
  while (box && box !== document.body) {
    const oy = getComputedStyle(box).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && box.scrollHeight > box.clientHeight + 2) break;
    box = box.parentElement;
  }
  if (!box || box === document.body) return;
  const mr = box.getBoundingClientRect(), r = el.getBoundingClientRect();
  const target = r.height > mr.height - 40 ? r.top - mr.top - 24 : r.top - mr.top - (mr.height - r.height) / 2;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  box.scrollTo({ top: Math.max(0, box.scrollTop + target), behavior: reduce ? 'auto' : 'smooth' });
}

export function Tour({ firstName = 'Elena' }) {
  const [step, setStep] = useState(-2); // -2 closed, -1 welcome, 0.. steps
  const [rect, setRect] = useState(null);
  const [vp, setVp] = useState({ vw: window.innerWidth, vh: window.innerHeight });
  const [done, setDone] = useState(false);
  const stepRef = useRef(step); stepRef.current = step;
  const raf = useRef(); const doneT = useRef();

  const remeasure = useCallback(() => {
    const s = stepRef.current; if (s < 0) return;
    const r = measure(s);
    setRect(o => (o && r && o.x === r.x && o.y === r.y && o.w === r.w && o.h === r.h ? o : r));
  }, []);

  const finish = useCallback(how => {
    try { localStorage.setItem(KEY, how); } catch { /* storage blocked */ }
    setStep(-2); setRect(null); setDone(how === 'done');
    if (how === 'done') { clearTimeout(doneT.current); doneT.current = setTimeout(() => setDone(false), 3200); }
  }, []);

  const go = useCallback(d => {
    const n = stepRef.current + d;
    if (n >= STEPS.length) return finish('done');
    if (n < 0) { setStep(-1); setRect(null); return; }
    setStep(n);
  }, [finish]);

  // After each step change: scroll the target into view and track it while the scroll settles.
  useEffect(() => {
    if (step < 0) return;
    reveal(step);
    const t0 = performance.now();
    const tick = () => { remeasure(); if (performance.now() - t0 < 520) raf.current = requestAnimationFrame(tick); };
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [step, remeasure]);

  useEffect(() => {
    let seen = null; try { seen = localStorage.getItem(KEY); } catch { /* storage blocked */ }
    const forced = /(^|[#&])tour\b/.test(location.hash);
    const fit = () => { setVp({ vw: window.innerWidth, vh: window.innerHeight }); remeasure(); };
    const sc = () => { if (stepRef.current >= 0) { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(remeasure); } };
    const key = e => {
      if (stepRef.current < -1) return;
      if (e.key === 'Escape') { e.preventDefault(); finish('skipped'); }
      else if (e.key === 'ArrowRight' || e.key === 'Enter') { if (e.key === 'ArrowRight') e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft' && stepRef.current > 0) go(-1);
    };
    const start = () => { setStep(-1); setDone(false); };
    window.addEventListener('resize', fit);
    document.addEventListener('scroll', sc, true);
    window.addEventListener('keydown', key, true);
    window.addEventListener('modul:tour', start);
    let t;
    if (forced || !seen) t = setTimeout(() => { if (forced) history.replaceState(null, '', location.pathname + location.search); start(); }, forced ? 300 : 900);
    return () => {
      window.removeEventListener('resize', fit); document.removeEventListener('scroll', sc, true);
      window.removeEventListener('keydown', key, true); window.removeEventListener('modul:tour', start);
      clearTimeout(t); clearTimeout(doneT.current); cancelAnimationFrame(raf.current);
    };
  }, [finish, go, remeasure]);

  if (step === -1) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(27,30,39,.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, boxSizing: 'border-box', fontFamily: 'var(--font-sans)' }}>
        <div role="dialog" aria-modal="true" aria-labelledby="tour-w-title" style={{ width: 'min(460px,100%)', background: 'var(--surface-card)', borderRadius: 28, boxShadow: 'var(--shadow-pop)', padding: 28, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img src="/assets/modul-logo-v4.png" alt="MODUL" data-logo="light" style={{ height: 26, width: 'auto', display: 'block' }} />
            <img src="/assets/modul-logo-v4-dark.png" alt="MODUL" data-logo="dark" style={{ height: 26, width: 'auto', display: 'block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-subtle)' }}>{STEPS.length} short steps · about 3 min</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span id="tour-w-title" style={{ fontSize: 26, lineHeight: '32px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>Welcome to MODUL, {firstName}</span>
            <span style={{ fontSize: 15, lineHeight: '22px', color: 'var(--text-muted)', textWrap: 'pretty' }}>A short walk through your studio workspace: where things live, what needs you today and how to start new work.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {OUTLINE.map(o => (
              <div key={o.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 16, background: 'var(--surface-inset)' }}>
                <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 10, background: 'var(--surface-card)', boxShadow: 'var(--shadow-xs)', color: 'var(--nav-active-icon, var(--accent))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={o.icon} size={16} /></span>
                <span style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--text-strong)' }}>{o.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <Button variant="ghost" onClick={() => finish('skipped')}>Skip for now</Button>
            <Button iconRight="arrow-right" onClick={() => go(1)}>Start the tour</Button>
          </div>
        </div>
      </div>
    );
  }

  if (step >= 0) {
    const cur = STEPS[step];
    const spot = rect || { x: vp.vw / 2, y: vp.vh / 2, w: 0, h: 0 };
    const pop = place(rect, vp.vw, vp.vh);
    return (
      <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', inset: 0, zIndex: 300, fontFamily: 'var(--font-sans)' }}>
        <div aria-hidden="true" style={{ position: 'fixed', left: spot.x, top: spot.y, width: spot.w, height: spot.h, borderRadius: 22, boxShadow: '0 0 0 2px rgba(255,255,255,.9),0 0 0 9999px rgba(27,30,39,.46)', transition: `left ${EASE},top ${EASE},width ${EASE},height ${EASE}`, pointerEvents: 'none' }} />
        <div role="dialog" aria-modal="true" aria-labelledby="tour-s-title" aria-describedby="tour-s-body" style={{ position: 'fixed', left: pop.x, top: pop.y, width: pop.w, boxSizing: 'border-box', background: 'var(--surface-card)', borderRadius: 24, boxShadow: 'var(--shadow-pop)', padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14, transition: `left ${EASE},top ${EASE}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 30, height: 30, borderRadius: 10, background: 'var(--nav-active-bg, var(--accent-soft))', color: 'var(--nav-active-icon, var(--accent))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={cur.icon} size={16} /></span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{step + 1} of {STEPS.length}</span>
            </span>
            <Hover as="button" type="button" onClick={() => finish('skipped')} style={{ border: 0, background: 'transparent', padding: '4px 6px', borderRadius: 8, fontFamily: 'inherit', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', cursor: 'pointer' }} hover={{ background: 'var(--surface-hover)' }}>Skip tour</Hover>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span id="tour-s-title" style={{ fontSize: 18, lineHeight: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>{cur.title}</span>
            <span id="tour-s-body" style={{ fontSize: 14, lineHeight: '21px', color: 'var(--text-muted)', textWrap: 'pretty' }}>{cur.body}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div aria-hidden="true" style={{ display: 'flex', gap: 4 }}>
              {STEPS.map((_, i) => <span key={i} style={{ width: i === step ? 18 : 6, height: 6, borderRadius: 999, background: i <= step ? 'var(--nav-active-icon, var(--accent))' : 'var(--limestone-200)', transition: 'width 180ms cubic-bezier(.2,0,0,1)' }} />)}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {step > 0 ? <Button size="sm" variant="secondary" onClick={() => go(-1)}>Back</Button> : null}
              <Button size="sm" onClick={() => go(1)}>{step === STEPS.length - 1 ? 'Finish' : 'Next'}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return done ? (
    <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 300, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 999, background: 'var(--surface-card)', boxShadow: 'var(--shadow-pop)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>
      <span style={{ display: 'inline-flex', color: 'var(--nav-active-icon, var(--accent))' }}><Icon name="circle-check" size={18} /></span>
      <span>You’re all set. Replay the tour any time from Help.</span>
    </div>
  ) : null;
}
