(function () {
  if (window.ModulTheme) return;
  var KEY = 'modul.theme.v1', root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function pref() { try { var v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : 'system'; } catch (e) { return 'system'; } }
  function resolve(p) { return p === 'system' ? (mq && mq.matches ? 'dark' : 'light') : p; }
  function apply(animate) {
    var p = pref(), t = resolve(p);
    if (root.getAttribute('data-theme') === t && root.getAttribute('data-theme-pref') === p) return;
    if (animate === false || !root.hasAttribute('data-theme')) {} else {
      root.setAttribute('data-theme-switching', '');
      setTimeout(function () { root.removeAttribute('data-theme-switching'); }, 60);
    }
    root.setAttribute('data-theme', t); root.setAttribute('data-theme-pref', p); root.style.colorScheme = t;
    try { window.dispatchEvent(new CustomEvent('modul:theme', { detail: { theme: t, pref: p } })); } catch (e) {}
  }
  window.ModulTheme = {
    get: function () { return root.getAttribute('data-theme') || 'light'; },
    pref: pref,
    set: function (v) { try { if (v === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) {} apply(true); },
    toggle: function () { this.set(this.get() === 'dark' ? 'light' : 'dark'); }
  };
  apply(false);
  // People photos: every DS Avatar / AvatarGroup gets a portrait by name; unknown names keep initials.
  var PEOPLE = { 'Elena Marsh': 12, 'Aiko Tan': 6, 'Theo Lund': 15, 'Rui Costa': 4, 'Jonas Weil': 13, 'Mira Halden': 5, 'Karin Holm': 14, 'Siri Dahl': 2,
    'Mia Sand': 17, 'Lars Kvarn': 11, 'Nora Vik': 10, 'Johan Orsa': 3, 'Ida Brask': 1, 'Henrik Fjell': 7, 'Mads Berg': 9 };
  window.ModulPeople = { photo: function (n) { return PEOPLE[n] ? 'assets/people/p' + PEOPLE[n] + '.jpg' : undefined; } };
  try {
    var NS = 'ATELIERDesignSystem_b56b60', ns = window[NS] = window[NS] || {}, rawA, rawG, wA, wG;
    var SZ = { xs: 24, sm: 32, md: 44, lg: 56 };
    Object.defineProperty(ns, 'Avatar', { configurable: true, enumerable: true, set: function (v) { rawA = v; wA = null; },
      get: function () { if (!rawA) return rawA; if (!wA) wA = function (p) { return React.createElement(rawA, Object.assign({}, p, { src: p.src || window.ModulPeople.photo(p.name) })); }; return wA; } });
    Object.defineProperty(ns, 'AvatarGroup', { configurable: true, enumerable: true, set: function (v) { rawG = v; wG = null; },
      get: function () { if (!rawG) return rawG; if (!wG) wG = function (p) {
        var A = ns.Avatar, names = p.names || [], size = p.size || 'sm', max = p.max || 4, d = SZ[size] || 32, shown = names.slice(0, max), extra = names.length - shown.length, h = React.createElement;
        return h('span', { style: { display: 'inline-flex' }, title: names.join(', ') }, shown.map(function (n, i) {
          return h(A, { key: i, name: n, size: size, style: { marginLeft: i ? -d * 0.28 : 0, boxShadow: '0 0 0 2px var(--surface-card)', borderRadius: 999 } }); }),
          extra > 0 ? h('span', { style: { marginLeft: -d * 0.28, width: d, height: d, borderRadius: 999, background: 'var(--surface-muted)', boxShadow: '0 0 0 2px var(--surface-card)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' } }, '+' + extra) : null);
      }; return wG; } });
  } catch (e) {}
  // Shell geometry before first paint: same rule SideNav uses, so the nav column never resizes after load.
  try {
    var sb = ((JSON.parse(localStorage.getItem('modul.settings.v1') || '{}').appearance) || {}).sidebar || 'auto';
    var vw = window.innerWidth, compact = sb === 'icons' ? true : sb === 'labels' ? vw < 720 : vw < 900;
    root.style.setProperty('--nav-w', (compact ? 72 : 256) + 'px');
  } catch (e) {}
  // Prerender a page when the pointer rests on its link (Chromium); others ignore it.
  try {
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
      var sr = document.createElement('script'); sr.type = 'speculationrules';
      sr.textContent = JSON.stringify({ prerender: [{ where: { and: [{ href_matches: '*.dc.html' }, { not: { href_matches: '*Sign*' } }] }, eagerness: 'moderate' }] });
      document.head.appendChild(sr);
    }
  } catch (e) {}
  if (mq) { var on = function () { if (pref() === 'system') apply(true); }; mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener && mq.addListener(on); }
  window.addEventListener('storage', function (e) { if (e.key === KEY || e.key === null) apply(true); });
})();
