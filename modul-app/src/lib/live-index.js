// Live search records, notification feed and counts, built from the module pages' seed
// constants (their compiled `prelude` export) with the user's saved records on top
// (lib/store.js). Until the module code has loaded, the pre-built JSON index is used.
// build() is the prototype's modul-index.js logic, unchanged apart from the file names.
import { useEffect, useState } from 'react';
import staticIndex from '../data/modul-index.json';
import { getPage, subscribe } from './store.js';

export const TODAY_ISO = '2026-10-19';
const ME = 'Elena Marsh';
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const parse = s => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const dayDiff = s => Math.round((parse(s) - parse(TODAY_ISO)) / 864e5);
const fmt = s => { const d = parse(s); return d.getDate() + ' ' + MON[d.getMonth()]; };
const rel = s => { const n = dayDiff(s); if (n === 0) return 'Today'; if (n === -1) return 'Yesterday'; if (n === 1) return 'Tomorrow'; if (n < 0 && n > -7) return -n + ' days ago'; if (n > 0 && n < 7) return 'In ' + n + ' days'; return fmt(s); };
const latest = d => d.versions[d.versions.length - 1];

function build(src) {
  const P = src.projects, C = src.clients, A = src.approvals, T = src.tasks, D = src.documents;
  const projName = id => { const p = P.SEED.find(x => x.id === id); return p ? p.name : null; };
  const items = [];
  P.SEED.forEach(p => items.push({ type: 'project', id: p.id, title: p.name, sub: [p.code, p.client].filter(Boolean).join(' · '), status: p.status, tone: P.TONE[p.status] || 'neutral', icon: 'folder-kanban', href: 'Projects.dc.html#project=' + p.id, kw: [p.code, p.client, p.location, p.pm, p.type].filter(Boolean).join(' ') }));
  C.SEED.forEach(c => { const contacts = (c.contacts || []).map(x => typeof x === 'string' ? x : x.name).filter(Boolean);
    items.push({ type: 'client', id: c.id, title: c.name, sub: [c.email || contacts[0], c.location].filter(Boolean).join(' · '), status: c.archived ? 'Archived' : c.status, tone: c.archived ? 'neutral' : (C.TONE[c.status] || 'neutral'), icon: 'building-2', href: 'Clients.dc.html#client=' + c.id, kw: [c.email, c.location, c.type].concat(contacts).filter(Boolean).join(' ') }); });
  T.SEED.forEach(t => { const st = T.ST[t.status] || [t.status, 'neutral'];
    items.push({ type: 'task', id: t.id, title: t.title, sub: [projName(t.project) || (T.PROJ[t.project] || [])[0] || 'No project', t.assignee || 'Unassigned', t.due ? 'Due ' + fmt(t.due) : ''].filter(Boolean).join(' · '), status: st[0], tone: st[1], icon: 'list-todo', href: 'Tasks.dc.html#task=' + t.id, kw: [t.assignee, t.description].filter(Boolean).join(' ') }); });
  D.SEED.filter(d => !d.archived).forEach(d => { const ap = d.approval && D.AP[d.approval.status];
    items.push({ type: 'document', id: d.id, title: d.name, sub: [d.ext.toUpperCase(), projName(d.project) || 'No project', latest(d).id].join(' · '), status: ap ? ap[0] : '', tone: ap ? ap[1] : 'neutral', icon: 'files', href: 'Documents.dc.html#doc=' + d.id, kw: [d.ext, (d.tags || []).join(' '), latest(d).by].join(' ') }); });
  A.SEED.forEach(a => { const st = A.ST[a.status] || { label: a.status, tone: 'neutral' };
    items.push({ type: 'approval', id: a.id, title: a.title, sub: [projName(a.project) || (A.PROJ[a.project] || {}).name || 'No project', a.reviewer || 'No reviewer'].join(' · '), status: st.label, tone: st.tone, icon: 'stamp', href: 'Approvals.dc.html#approval=' + a.id, kw: [a.reviewer, a.owner].filter(Boolean).join(' ') }); });
  (T.TEAM || []).forEach(m => items.push({ type: 'member', id: m.id, title: m.name, sub: [m.role, m.email].filter(Boolean).join(' · '), status: '', tone: 'neutral', icon: 'users', href: 'Tasks.dc.html#team', kw: [m.role, m.email].join(' ') }));

  const notes = [];
  const add = n => { if (!notes.some(x => x.id === n.id)) notes.push(n); };
  A.SEED.forEach(a => { const pn = projName(a.project) || 'No project'; const href = 'Approvals.dc.html#approval=' + a.id;
    if (a.status === 'review' && a.deadline) { const n = dayDiff(a.deadline);
      if (n < 0) add({ id: 'ap-overdue:' + a.id, kind: 'approval', urgent: true, icon: 'triangle-alert', tone: 'negative', title: a.title + ' is overdue', desc: (a.reviewer || 'The reviewer') + ' hasn’t decided · ' + pn + ' · due ' + fmt(a.deadline), date: a.deadline, href });
      else if (n <= 3) add({ id: 'ap-due:' + a.id, kind: 'approval', urgent: true, icon: 'calendar-check', tone: 'warning', title: a.title + ' due ' + rel(a.deadline).toLowerCase(), desc: 'Waiting on ' + (a.reviewer || 'a reviewer') + ' · ' + pn, date: TODAY_ISO, href }); }
    const lv = a.versions && a.versions[a.versions.length - 1];
    if (a.status === 'changes' && lv && lv.outcome && lv.outcome.kind === 'changes') add({ id: 'ap-changes:' + a.id + ':' + lv.id, kind: 'approval', urgent: true, icon: 'refresh-cw', tone: 'warning', title: (lv.outcome.by || a.reviewer || 'The reviewer') + ' requested changes', desc: a.title + ' ' + lv.id + (lv.outcome.comment ? ' · “' + lv.outcome.comment + '”' : ' · ' + pn), date: lv.outcome.at, href });
    if (a.status === 'approved' && lv && lv.outcome && dayDiff(lv.outcome.at) >= -7) add({ id: 'ap-approved:' + a.id + ':' + lv.id, kind: 'approval', urgent: false, icon: 'circle-check', tone: 'positive', title: a.title + ' approved', desc: (lv.outcome.by || a.reviewer) + ' signed off ' + lv.id + ' · ' + pn, date: lv.outcome.at, href }); });
  T.SEED.filter(t => t.assignee === ME && ['todo', 'progress', 'review'].includes(t.status) && t.due).forEach(t => { const n = dayDiff(t.due); const pn = projName(t.project) || 'No project'; const href = 'Tasks.dc.html#task=' + t.id;
    if (n < 0) add({ id: 'task-overdue:' + t.id, kind: 'task', urgent: true, icon: 'circle-alert', tone: 'negative', title: 'Overdue: ' + t.title, desc: pn + ' · was due ' + fmt(t.due), date: t.due, href });
    else if (n <= 3) add({ id: 'task-due:' + t.id, kind: 'task', urgent: true, icon: 'clock', tone: 'warning', title: t.title, desc: 'Assigned to you · ' + pn + ' · due ' + rel(t.due).toLowerCase(), date: TODAY_ISO, href });
    else if (t.created && dayDiff(t.created) >= -3) add({ id: 'task-new:' + t.id, kind: 'task', urgent: false, icon: 'list-todo', tone: 'neutral', title: 'New task: ' + t.title, desc: 'Assigned to you · ' + pn + ' · due ' + fmt(t.due), date: t.created, href }); });
  D.SEED.filter(d => !d.archived).forEach(d => { const v = latest(d); if (dayDiff(v.at) < -7 || v.by === ME) return; const pn = projName(d.project) || 'No project';
    add({ id: 'doc-ver:' + d.id + ':' + v.id, kind: 'document', urgent: false, icon: d.versions.length > 1 ? 'history' : 'upload', tone: 'neutral', title: d.versions.length > 1 ? v.by + ' uploaded ' + v.id : v.by + ' uploaded a file', desc: d.name + ' · ' + pn + (v.note ? ' · ' + v.note : ''), date: v.at, href: 'Documents.dc.html#doc=' + d.id }); });
  P.SEED.filter(p => p.status === 'Active' && p.deadline).forEach(p => { const n = dayDiff(p.deadline); if (n < -14 || n > 30) return; const phase = P.PHASES ? P.PHASES[p.phase] : '';
    add({ id: 'proj-ms:' + p.id + ':' + p.deadline, kind: 'project', urgent: n < 0, icon: 'flag', tone: n < 0 ? 'negative' : 'neutral', title: n < 0 ? p.name + ' is past its deadline' : p.name + ' deadline in ' + n + ' days', desc: [phase, 'Deadline ' + fmt(p.deadline), p.pm].filter(Boolean).join(' · '), date: n < 0 ? p.deadline : TODAY_ISO, href: 'Projects.dc.html#project=' + p.id }); });
  notes.sort((a, b) => (b.urgent - a.urgent) || (parse(b.date) - parse(a.date)));

  const counts = {
    projectsOpen: P.SEED.filter(p => p.status !== 'Archived').length,
    approvalsPending: A.SEED.filter(a => a.status === 'review').length,
    approvalsOverdue: A.SEED.filter(a => a.status === 'review' && a.deadline && dayDiff(a.deadline) < 0).length,
  };
  return { items, notes, counts };
}

// Module → [compiled page, state key holding its records].
const MODULES = {
  projects: [() => import('../pages/generated/Projects.jsx'), 'Projects', 'projects'],
  clients: [() => import('../pages/generated/Clients.jsx'), 'Clients', 'clients'],
  approvals: [() => import('../pages/generated/Approvals.jsx'), 'Approvals', 'items'],
  tasks: [() => import('../pages/generated/Tasks.jsx'), 'Tasks', 'tasks'],
  documents: [() => import('../pages/generated/Documents.jsx'), 'Documents', 'docs'],
};

let preludes = null;   // { projects: { SEED, TONE, … }, … } once loaded
let loading = null;
let cached = null;
const listeners = new Set();

const FALLBACK = { ...staticIndex, counts: { projectsOpen: 14, approvalsPending: 7, approvalsOverdue: 2 } };

function compute() {
  if (!preludes) return FALLBACK;
  const src = {};
  for (const [key, [, page, field]] of Object.entries(MODULES)) {
    const saved = getPage(page);
    src[key] = { ...preludes[key], SEED: (saved && Array.isArray(saved[field]) ? saved[field] : null) || preludes[key].SEED };
  }
  try { return build(src); } catch (e) { console.error('[live-index] build failed, using the static index', e); return FALLBACK; }
}

function load() {
  if (!loading) loading = Promise.all(Object.entries(MODULES).map(([k, [imp]]) => imp().then(m => [k, m.prelude]))).then(list => {
    preludes = Object.fromEntries(list); cached = null; listeners.forEach(fn => fn());
  });
  return loading;
}

subscribe(() => { cached = null; listeners.forEach(fn => fn()); });

/** Current index: { items, notes, counts }. */
export function liveIndex() { if (!cached) cached = compute(); return cached; }

/** Live index for components; loads the module data on first use. */
export function useLiveIndex() {
  const [, setV] = useState(0);
  useEffect(() => {
    const fn = () => setV(x => x + 1);
    listeners.add(fn);
    const idle = window.requestIdleCallback || (cb => setTimeout(cb, 600));
    idle(() => load());
    return () => listeners.delete(fn);
  }, []);
  return liveIndex();
}
