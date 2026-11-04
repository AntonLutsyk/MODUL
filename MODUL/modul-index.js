// Builds the global search index and notification feed from the seed records
// declared in each module page. In this prototype every page keeps its own
// in-memory state, so edits made on a page are not reflected here until those
// pages share a persistence layer.
const TODAY_ISO = '2026-10-19';
const ME = 'Elena Marsh';
const READ_KEY = 'modul.notifications.read.v1';
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SOURCES = {
  projects: ['Projects.dc.html', ['SEED', 'TONE', 'PHASES']],
  clients: ['Clients.dc.html', ['SEED', 'TONE']],
  approvals: ['Approvals.dc.html', ['SEED', 'ST', 'PROJ']],
  tasks: ['Tasks.dc.html', ['SEED', 'ST', 'PROJ', 'TEAM']],
  documents: ['Documents.dc.html', ['SEED', 'AP', 'PROJ']],
};

async function readPrelude(file, names) {
  const res = await fetch(new URL(file, location.href));
  if (!res.ok) throw new Error(file + ' returned ' + res.status);
  const t = await res.text();
  const tag = t.indexOf('data-dc-script');
  if (tag < 0) throw new Error('No logic block in ' + file);
  const start = t.indexOf('\n', tag) + 1;
  const end = t.indexOf('class Component', start);
  const code = t.slice(start, end);
  const ret = 'return {' + names.map(n => n + ': typeof ' + n + " !== 'undefined' ? " + n + ' : null').join(', ') + '};';
  return new Function(code + '\n' + ret)();
}

const parse = s => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const dayDiff = s => Math.round((parse(s) - parse(TODAY_ISO)) / 864e5);
const fmt = s => { const d = parse(s); return d.getDate() + ' ' + MON[d.getMonth()]; };
export const rel = s => { const n = dayDiff(s); if (n === 0) return 'Today'; if (n === -1) return 'Yesterday'; if (n === 1) return 'Tomorrow'; if (n < 0 && n > -7) return -n + ' days ago'; if (n > 0 && n < 7) return 'In ' + n + ' days'; return fmt(s); };
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
  return { items, notes };
}

const CACHE_KEY = 'modul.index.v1';
export function cachedModul() { try { const c = sessionStorage.getItem(CACHE_KEY); return c ? JSON.parse(c) : null; } catch (e) { return null; } }
export function loadModul() {
  const c = cachedModul(); if (c) return Promise.resolve(c);
  if (!window.__modulData) {
    window.__modulData = Promise.all(Object.entries(SOURCES).map(([k, [f, n]]) => readPrelude(f, n).then(v => [k, v])))
      .then(e => { const d = build(Object.fromEntries(e)); try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch (x) {} return d; })
      .catch(err => { window.__modulData = null; throw err; });
  }
  return window.__modulData;
}

export function readSet() { try { return new Set(JSON.parse(localStorage.getItem(READ_KEY) || '[]')); } catch (e) { return new Set(); } }
export function writeSet(set) { try { localStorage.setItem(READ_KEY, JSON.stringify(Array.from(set))); } catch (e) {} }
export const READ_STORAGE_KEY = READ_KEY;

const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g, 'o').replace(/æ/g, 'a').replace(/å/g, 'a');
export function search(items, q) {
  const n = norm(q.trim()); if (!n) return [];
  const words = n.split(/\s+/);
  const out = [];
  items.forEach(it => { const t = norm(it.title), s = norm(it.sub), k = norm(it.kw);
    if (!words.every(w => t.includes(w) || s.includes(w) || k.includes(w))) return;
    let score = 0; if (t.startsWith(n)) score += 100; else if (t.includes(' ' + n) || t.includes(n)) score += 60;
    words.forEach(w => { if (t.includes(w)) score += 10; else if (s.includes(w)) score += 4; else score += 1; });
    out.push({ it, score, at: t.indexOf(n) >= 0 ? t.indexOf(n) : t.indexOf(words[0]), len: t.indexOf(n) >= 0 ? n.length : (t.indexOf(words[0]) >= 0 ? words[0].length : 0) }); });
  return out.sort((a, b) => b.score - a.score);
}
