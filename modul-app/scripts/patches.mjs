// Source patches applied by compile-dc.mjs to the Claude Design export before compiling.
// Each entry is [find, replace] (or [find, replace, 'all']). A `find` that is no longer in
// the source stops the build, so a re-exported design never silently loses a fix.
// Audit references (AUDIT-REPORT.md) are noted per group.

export const PATCHES = {
  'Help.dc.html': [
    // P2-11: Help matched an older layout and Reports default.
    ['The header holds search and notifications. Click your name there to open your profile settings.',
      'The header holds search, the theme switch and notifications. Your profile card sits at the bottom of the sidebar; select it to open your profile settings.'],
    ['Reports cover the last 30 days by default. Switch to this quarter to date, last quarter, year to date or the last six months.',
      'Reports cover the last six months by default. Switch to the last 30 days, this quarter to date, last quarter or year to date.'],
    ['Your name and photo show in the header menu.', 'Your name and photo show on the profile card at the bottom of the sidebar.'],
    // P1-6: records now persist in the browser.
    ["['This is a prototype. Changes you make on a page, such as a new task, stay while that page is open. Settings and which notifications you’ve read are saved in this browser.'], null, true)",
      "['Projects, clients, approvals, tasks and documents you add or change are saved in this browser, so they’re still there when you come back. Settings and which notifications you’ve read are saved here too.'], ['Reset sample data', 'index.html?reset-data'], true)"],
    ['Support requests aren’t connected in this prototype, so there’s no form to send one from here.',
      'Support requests can’t be sent from MODUL yet, so there’s no form here.'],
  ],
  'Settings.dc.html': [
    ['Your name and photo appear in the header menu.', 'Your name and photo appear on the profile card in the sidebar.'],
    ['isn’t connected in this prototype', 'isn’t set up for this workspace yet', 'all'],
    // P2-10: the saved/error pill used lime + white text; it now uses the toast tokens.
    ["toastBg: T && T.kind === 'err' ? 'var(--status-negative)' : 'var(--surface-inverse)',",
      "toastBg: T && T.kind === 'err' ? 'var(--danger)' : 'var(--toast-bg)', toastFg: T && T.kind === 'err' ? '#FFFFFF' : 'var(--toast-fg)',"],
    ['background:{{ toastBg }};color:#fff', 'background:{{ toastBg }};color:{{ toastFg }}'],
  ],
  'Approvals.dc.html': [
    ['Files aren’t stored in this prototype', 'File storage isn’t set up yet'],
    ["'In the product this opens '", "'Once file storage is set up, this opens '"],
    ['Attached. In this prototype the file stays in your browser.', 'Attached. The file stays in this browser until file storage is set up.'],
    ['Attached. Stays in your browser in this prototype.', 'Attached. Kept in this browser for now.'],
    // P2-13: columns auto-hide by the table's real width (main), not the window width,
    // so Status never runs past the edge next to the sidebar.
    ['const autoHide = { owner: vw < 1400, submitted: vw < 1310, version: vw < 1220, reviewer: vw < 1080, project: vw < 980 };',
      "const mainEl = typeof document !== 'undefined' && document.querySelector('main[data-screen-label=\"Approvals\"]'); const tw = mainEl ? mainEl.clientWidth : s.vw - 300;\n    const autoHide = { owner: tw < 1300, submitted: tw < 1196, version: tw < 1096, reviewer: tw < 960, project: tw < 824 };"],
  ],
  'Projects.dc.html': [
    // P2-8: photos shown at ≤ 96px load the 160px WebP thumbnail (scripts/make-thumbs.mjs).
    ["return { src: 'assets/projects/' + id + '.jpg',", "return { src: 'assets/projects/' + (w && w <= 96 ? 'thumb/' + id + '.webp' : id + '.jpg'),"],
  ],
  'Documents.dc.html': [
    ['Files stay in this browser tab in the prototype. Nothing is sent to a server.', 'Files stay in this browser. Nothing is sent to a server.'],
  ],
  'Reports.dc.html': [
    ['Sample studio data for this prototype.', 'Sample studio data.'],
    // P2-12: lime is for the primary action only; data fills use ink (≥ 3:1 on cards in both themes).
    ['var(--surface-inverse)', 'var(--text-strong)', 'all'],
  ],
  'Sign In.dc.html': [
    // P2-6: Sign in uses the MODUL palette (lime primary, periwinkle focus) instead of a separate green.
    ['[data-field]:focus-within{border-color:#6DBF78 !important;box-shadow:0 0 0 3px rgba(109,191,120,.22)}',
      '[data-field]:focus-within{border-color:#7E92FC !important;box-shadow:0 0 0 3px rgba(126,146,252,.3)}'],
    ['background:#6DBF78;color:#0F1A11', 'background:#DAFB59;color:#1B1E27'],
    ['style-hover="background:#7FCB89"', 'style-hover="background:#CDF23C"'],
    ['rgba(109,191,120,.4)', 'rgba(218,251,89,.45)'],
    // P3-2: main landmark.
    ['<div style="position:relative;min-height:100vh;', '<div role="main" style="position:relative;min-height:100vh;'],
  ],
};

export function applyPatches(file, src) {
  for (const [find, replace, mode] of PATCHES[file] || []) {
    if (!src.includes(find)) throw new Error(`patch for ${file} no longer applies: ${find.slice(0, 80)}…`);
    src = mode === 'all' ? src.split(find).join(replace) : src.replace(find, () => replace);
  }
  return src;
}
