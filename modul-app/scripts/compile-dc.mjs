// Compiles Claude Design `.dc.html` pages into React components (JSX).
//
//   node scripts/compile-dc.mjs <MODUL export dir> <out dir> Page.dc.html [...]
//
// Each page becomes <out>/<Name>.jsx (+ <Name>.css for its <helmet> styles):
//   - the page's seed code and `class Component extends DCLogic` are kept verbatim,
//   - the template is turned into a render function with the same semantics as the
//     Claude Design runtime (support.js): {{ path }} bindings, <sc-for>, <sc-if>,
//     <x-import> (design-system components), <dc-import> (shared shell parts) and
//     style-hover / style-focus / style-active pseudo styles.
import fs from 'node:fs';
import path from 'node:path';
import { parseFragment } from 'parse5';
import { applyPatches } from './patches.mjs';

const [, , srcDir, outDir, ...files] = process.argv;

// Theme-safe colours, applied to the whole page source before compiling:
//   - scrims use the --scrim token instead of literal rgba (was patched in CSS by attribute selectors),
//   - text on the lime inverse surface uses --text-inverse instead of hard-coded white.
function tokenizeColors(src) {
  src = src.replace(/rgba\(\s*(?:28,\s*28,\s*26|23,\s*23,\s*21)\s*,\s*\.28\s*\)/g, 'var(--scrim)');
  // …and page CSS that finds those scrims by their serialized style.
  src = src.replace(/\[style\*="rgba\((?:23, 23, 21|28, 28, 26), 0\.28\)"\]/g, '[style*="var(--scrim)"]');
  // style="…background:var(--surface-inverse);color:#fff…"
  src = src.replace(/(background:\s*var\(--surface-inverse\);\s*color:\s*)#fff\b/gi, '$1var(--text-inverse)');
  // logic: x ? 'var(--surface-inverse)' : …, …Fg/Color: x ? '#fff' : …
  let prev;
  do { prev = src; src = src.replace(/('var\(--surface-inverse\)'[^\n;]{0,140}?(?:Fg|fg|Color|color)\s*:\s*[^'\n]{0,40}?)'#fff'/g, "$1'var(--text-inverse)'"); } while (src !== prev);
  return src;
}

// Rules every page's <helmet> repeats that app.css / modul-theme.css already own (P3-1),
// plus the old per-page focus and reduced-motion rules that app.css now sets once (P2-5, P2-9).
const DUPLICATE_CSS = [
  /^\s*html,body\{margin:0;background:#E7E7EA;font-family:var\(--font-sans\);color:var\(--text-body\)\}\s*$/,
  /^\s*a\{color:var\(--text-accent\);text-decoration:none\}\s*$/,
  /^\s*a:hover\{color:var\(--sage-700\);text-decoration:underline\}\s*$/,
  /^\s*:root\{--sage-700:#3D6047;.*\}\s*$/,                       // dead legacy sage palette (overridden by the theme)
  /^\s*button:focus-visible,\[tabindex\]:focus-visible,a:focus-visible\{[^}]*\}\s*$/,
  /^\s*@media \(prefers-reduced-motion: reduce\)\{.*\}\s*$/,
];
const cleanCss = css => css.split('\n').filter(l => !DUPLICATE_CSS.some(re => re.test(l))).join('\n');

// Seed constants each module page exposes to the live search / notification index.
const PRELUDE = {
  Projects: ['SEED', 'TONE', 'PHASES'], Clients: ['SEED', 'TONE'], Approvals: ['SEED', 'ST', 'PROJ'],
  Tasks: ['SEED', 'ST', 'PROJ', 'TEAM'], Documents: ['SEED', 'AP', 'PROJ'],
};

// Page files are served under clean names in the React app.
export const PAGE_FILES = {
  'Overview Dashboard.dc.html': 'index.html', 'Projects.dc.html': 'projects.html', 'Clients.dc.html': 'clients.html',
  'Approvals.dc.html': 'approvals.html', 'Tasks.dc.html': 'tasks.html', 'Documents.dc.html': 'documents.html',
  'Reports.dc.html': 'reports.html', 'Settings.dc.html': 'settings.html', 'Help.dc.html': 'help.html', 'Sign In.dc.html': 'sign-in.html',
};
const renamePages = s => s.replace(/(Overview Dashboard|Projects|Clients|Approvals|Tasks|Documents|Reports|Settings|Help|Sign In)\.dc\.html/g, m => PAGE_FILES[m]);

// Page logic: clean page names, and the search index comes from the bundled module.
// Navigations (`location.href = …`, `location.replace(…)`) go through the client-side router.
const adaptLogic = js => renamePages(js)
  .replace(/(?<![.\w$])(?:window\.)?location\.href(\s*=(?!=))/g, '__dc.loc.href$1')
  .replace(/(?<![.\w$])(?:window\.)?location\.(replace|assign)\(/g, '__dc.loc.$1(')
  // Toasts (often carrying Undo) stay up long enough to read and act on: at least 8 s.
  .replace(/(toast: null \}\)\s*,\s*)(\d{3,5})\)/g, '$1__dc.toastMs($2))')
  .replace(/import\(\s*(?:\(window\.__resources && window\.__resources\.modul_index_js\) \|\| )?new URL\('modul-index\.js', location\.href\)\.href\s*\)/g, "import('../../lib/modul-index.js')");

// State that must survive moving to another module and back (records, saved drafts,
// unsaved settings edits). Everything else (filters, open panels) starts fresh.
const PERSIST = {
  Projects: ['projects', 'draft'], Clients: ['clients', 'draft'], Approvals: ['items'],
  Tasks: ['tasks'], Documents: ['docs'], Settings: ['draft', 'tried'],
};

const DS_NS = 'ATELIERDesignSystem_b56b60.';
const SHARED = { HeaderUtilities: 'HeaderUtilities', SideNav: 'SideNav', Tour: 'Tour' };
const EVENT_MAP = {
  onclick: 'onClick', onchange: 'onChange', oninput: 'onInput', onsubmit: 'onSubmit', onkeydown: 'onKeyDown', onkeyup: 'onKeyUp',
  onkeypress: 'onKeyPress', onmousedown: 'onMouseDown', onmouseup: 'onMouseUp', onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave',
  onfocus: 'onFocus', onblur: 'onBlur', ondoubleclick: 'onDoubleClick', oncontextmenu: 'onContextMenu', onmousemove: 'onMouseMove',
  onmouseover: 'onMouseOver', onmouseout: 'onMouseOut', onpointerdown: 'onPointerDown', onpointerup: 'onPointerUp', onpointermove: 'onPointerMove',
  ondragstart: 'onDragStart', ondragend: 'onDragEnd', ondragenter: 'onDragEnter', ondragleave: 'onDragLeave', ondragover: 'onDragOver', ondrop: 'onDrop',
  onpaste: 'onPaste', onwheel: 'onWheel', onscroll: 'onScroll', ontransitionend: 'onTransitionEnd', onanimationend: 'onAnimationEnd',
};
// Lower-case HTML attributes React expects camel-cased.
const REACT_ATTR = {
  tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', minlength: 'minLength', colspan: 'colSpan', rowspan: 'rowSpan',
  autocomplete: 'autoComplete', autofocus: 'autoFocus', spellcheck: 'spellCheck', inputmode: 'inputMode', enterkeyhint: 'enterKeyHint',
  contenteditable: 'contentEditable', crossorigin: 'crossOrigin', srcset: 'srcSet', novalidate: 'noValidate', autocapitalize: 'autoCapitalize',
  datetime: 'dateTime', accesskey: 'accessKey', enctype: 'encType', formaction: 'formAction', frameborder: 'frameBorder',
};
const VOID = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
const CAMEL = 'sc-camel-';
const kebabToCamel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

// --- template pre-processing (mirrors the runtime's encodeCase) -------------
function encode(html) {
  const ATTRS = `(?:[^>"']|"[^"]*"|'[^']*')*`;
  html = html.replace(new RegExp('<(x-import|dc-import)(' + ATTRS + ')/>', 'gi'), (_, t, a) => '<' + t + a + '></' + t + '>');
  html = html.replace(/(\s)([a-z]+[A-Z][A-Za-z0-9]*)(\s*=)/g, (_, sp, name, eq) => sp + CAMEL + name.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + eq);
  // Keep table parts intact through fragment parsing (same trick as the runtime).
  for (const t of ['select', 'table', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th', 'caption']) html = html.replace(new RegExp('(</?)' + t + '(?=[\\s>])', 'gi'), '$1sc-raw-' + t);
  return html;
}

// --- {{ expression }} compiler (mirrors runtime resolve()) -------------------
function compileExpr(src, scope) {
  const e = String(src).trim();
  if (!e) return 'undefined';
  if (e[0] === '(' && e.at(-1) === ')' && wrapsWhole(e)) return compileExpr(e.slice(1, -1), scope);
  const eq = topEquality(e);
  if (eq) return '(' + compileExpr(e.slice(0, eq.index), scope) + ' ' + eq.op + ' ' + compileExpr(e.slice(eq.index + eq.op.length), scope) + ')';
  if (e[0] === '!') return '!' + compileExpr(e.slice(1), scope);
  if (['true', 'false', 'null', 'undefined'].includes(e)) return e;
  if (/^-?\d+(\.\d+)?$/.test(e)) return e;
  if (e.length >= 2 && (e[0] === '"' || e[0] === "'") && e.at(-1) === e[0]) return JSON.stringify(e.slice(1, -1));
  return compilePath(e, scope);
}
function wrapsWhole(e) { let d = 0; for (let i = 0; i < e.length - 1; i++) { if (e[i] === '(') d++; else if (e[i] === ')') { d--; if (d === 0) return false; } } return true; }
function topEquality(e) {
  let d = 0;
  for (let i = 0; i < e.length; i++) {
    const c = e[i];
    if (c === '[' || c === '(') d++; else if (c === ']' || c === ')') d--;
    else if (d === 0 && (c === '=' || c === '!') && e[i + 1] === '=') {
      if (i > 0 && (e[i - 1] === '=' || e[i - 1] === '!')) continue;
      if (!e.slice(0, i).trim()) continue;
      return { index: i, op: e[i + 2] === '=' ? c + '==' : c + '=' };
    }
  }
  return null;
}
function compilePath(e, scope) {
  const head = e.match(/^[A-Za-z_$][A-Za-z0-9_$]*/);
  if (!head) return 'undefined';
  let code = scope + '[' + JSON.stringify(head[0]) + ']';
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(head[0])) code = scope + '.' + head[0];
  let i = head[0].length;
  while (i < e.length) {
    if (e[i] === '.') {
      const m = e.slice(i + 1).match(/^[A-Za-z_$][A-Za-z0-9_$]*/) || e.slice(i + 1).match(/^\d+/);
      if (!m) return 'undefined';
      code += /^\d/.test(m[0]) ? '?.[' + m[0] + ']' : '?.' + m[0];
      i += 1 + m[0].length;
    } else if (e[i] === '[') {
      let d = 1, j = i + 1;
      while (j < e.length && d > 0) { if (e[j] === '[') d++; else if (e[j] === ']') { d--; if (d === 0) break; } j++; }
      if (d !== 0) return 'undefined';
      code += '?.[' + compileExpr(e.slice(i + 1, j), scope) + ']';
      i = j + 1;
    } else return 'undefined';
  }
  return code;
}

// An attribute value: whole binding → the raw value; mixed → a string.
function compileValue(raw, scope) {
  const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/);
  if (whole) return { code: compileExpr(whole[1], scope), dynamic: true };
  if (raw.includes('{{')) {
    const parts = raw.split(/\{\{([\s\S]+?)\}\}/g);
    const tpl = parts.map((p, i) => (i & 1 ? '${__dc.str(' + compileExpr(p, scope) + ')}' : p.replace(/[`\\]/g, '\\$&').replace(/\$\{/g, '\\${'))).join('');
    return { code: '`' + tpl + '`', dynamic: true };
  }
  return { code: JSON.stringify(raw), dynamic: false, raw };
}

function cssToObj(css) {
  const o = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':'); if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    o[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim();
  }
  return o;
}
const objLiteral = o => '{ ' + Object.entries(o).map(([k, v]) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) + ': ' + JSON.stringify(v)).join(', ') + ' }';

// --- code generation --------------------------------------------------------
function makeGen() {
  let n = 0;
  const pseudo = []; // module-level pseudo-class constants
  const used = { image: false, shared: new Set(), styles: [] };
  const ind = d => '  '.repeat(d);

  function attrName(name) { return name.startsWith(CAMEL) ? kebabToCamel(name.slice(CAMEL.length)) : name; }

  function props(el, kind, scope) {
    const out = []; const classes = []; let style = null; let hostStyle = null;
    for (const { name: rawName, value } of el.attrs) {
      let key = attrName(rawName);
      if (key === 'hint-size' || key === 'component-from-global-scope' || key === 'from' || key === 'component') continue;
      if (kind === 'dc-import' && key === 'name') continue;
      if (key.startsWith('style-')) {
        const kindP = key.slice(6); const v = compileValue(value, scope);
        if (v.dynamic) classes.push('__dc.pseudo(' + JSON.stringify(kindP) + ', ' + v.code + ')');
        else { const id = '__p' + (pseudo.length); pseudo.push('const ' + id + ' = __dc.pseudo(' + JSON.stringify(kindP) + ', ' + v.code + ');'); classes.push(id); }
        continue;
      }
      if (key === 'style') {
        const v = compileValue(value, scope);
        const code = v.dynamic ? '__dc.css(' + v.code + ')' : objLiteral(cssToObj(value));
        if (kind === 'dom') style = code; else hostStyle = v.dynamic ? '__dc.hostStyle(' + v.code + ')' : '__dc.hostStyle(' + JSON.stringify(value) + ')';
        continue;
      }
      if (kind !== 'dom') {
        if (key.includes('-') && !(kind === 'x-import' && (key.startsWith('aria-') || key.startsWith('data-')))) key = kebabToCamel(key);
      } else {
        if (key === 'class') key = 'className';
        else if (key === 'for') key = 'htmlFor';
        else if (REACT_ATTR[key]) key = REACT_ATTR[key];
        else if (key.startsWith('on')) key = EVENT_MAP[key] || 'on' + key[2].toUpperCase() + key.slice(3);
      }
      let v = compileValue(value, scope);
      let code = v.code;
      if (kind === 'dom' && (key === 'value' || key === 'checked') && v.dynamic) code = '__dc.' + (key === 'checked' ? 'bool' : 'val') + '(' + code + ')';
      if (kind === 'dom' && !v.dynamic) code = renamePages(code);
      out.push([key, code, v.dynamic]);
    }
    if (classes.length) {
      const base = out.find(p => p[0] === 'className');
      const list = [base ? base[1] : null, ...classes].filter(Boolean);
      if (base) out.splice(out.indexOf(base), 1);
      out.push(['className', '__dc.cx(' + list.join(', ') + ')', true]);
    }
    if (style) out.push(['style', style, true]);
    return { out, hostStyle };
  }

  const fmtProps = list => list.map(([k, code, dyn]) => {
    const name = /^[A-Za-z_$][\w$-]*$/.test(k) ? k : null;
    if (!name) return '{...{ ' + JSON.stringify(k) + ': ' + code + ' }}';
    if (!dyn && /^"[^"\\{}<>&]*"$/.test(code)) return name + '=' + code;
    return name + '={' + code + '}';
  }).join(' ');

  function text(node, scope, d) {
    const t = node.value;
    if (!t.includes('{{')) {
      if (!t.trim()) return t.includes(' ') ? ind(d) + '{" "}' : null;
      return ind(d) + '{' + JSON.stringify(renamePages(t)) + '}';
    }
    const parts = t.split(/\{\{([\s\S]+?)\}\}/g);
    return parts.map((p, i) => (i & 1 ? ind(d) + '{__dc.I(' + compileExpr(p, scope) + ')}' : p ? ind(d) + '{' + JSON.stringify(p) + '}' : null)).filter(Boolean).join('\n');
  }

  function children(nodes, scope, d) {
    return nodes.map(c => node(c, scope, d)).filter(Boolean).join('\n');
  }
  function kids(el) { return el.tagName === 'template' ? el.content.childNodes : el.childNodes; }

  function node(c, scope, d) {
    if (c.nodeName === '#text') return text(c, scope, d);
    if (!c.tagName) return null;
    const tag = c.tagName;
    const attr = k => (c.attrs.find(a => a.name === k) || {}).value;

    if (tag === 'helmet') {
      for (const k of kids(c)) {
        if (k.tagName === 'style') used.styles.push(k.childNodes.map(t => t.value).join(''));
        if (k.tagName === 'script' && /image-slot\.js/.test((k.attrs.find(a => a.name === 'src') || {}).value || '')) used.image = true;
      }
      return null;
    }
    if (tag === 'sc-for') {
      const list = compileValue(attr('list') || '', scope).code;
      const as = attr('as') || 'item';
      const s2 = 'v' + (++n);
      return ind(d) + '{__dc.list(' + list + ').map((__it, $index) => { const ' + s2 + ' = { ...' + scope + ', ' + JSON.stringify(as) + ': __it, $index }; return (\n'
        + ind(d + 1) + '<React.Fragment key={$index}>\n' + children(kids(c), s2, d + 2) + '\n' + ind(d + 1) + '</React.Fragment>\n' + ind(d) + '); })}';
    }
    if (tag === 'sc-if') {
      const v = compileValue(attr('value') || '', scope).code;
      const body = children(kids(c), scope, d + 2);
      return ind(d) + '{' + v + ' ? (\n' + ind(d + 1) + '<>\n' + body + '\n' + ind(d + 1) + '</>\n' + ind(d) + ') : null}';
    }
    if (tag === 'x-import') {
      const g = attr('component-from-global-scope') || '';
      if (!g.startsWith(DS_NS)) throw new Error('Unsupported x-import ' + g);
      const C = '__DS.' + g.slice(DS_NS.length);
      const { out, hostStyle } = props(c, 'x-import', scope);
      // Confirm / decision buttons labelled from data (`{{ x.okLabel }}`): destructive labels
      // (Reject, Archive, Discard, Withdraw, …) get the danger variant at runtime.
      if (C === '__DS.Button') {
        const textKids = kids(c).filter(k => k.nodeName !== '#text' || k.value.trim());
        const m = textKids.length === 1 && textKids[0].nodeName === '#text' && textKids[0].value.trim().match(/^\{\{\s*([\w$.]+\.okLabel)\s*\}\}$/);
        if (m) {
          const vi = out.findIndex(p => p[0] === 'variant');
          const base = vi >= 0 ? out[vi][1] : 'undefined';
          const code = '__dc.actionVariant(' + base + ', ' + compileExpr(m[1], scope) + ')';
          if (vi >= 0) out[vi] = ['variant', code, true]; else out.push(['variant', code, true]);
        }
      }
      const inner = children(kids(c), scope, d + (hostStyle ? 2 : 1));
      const el = (dd) => ind(dd) + '<' + C + (out.length ? ' ' + fmtProps(out) : '') + (inner ? '>\n' + inner + '\n' + ind(dd) + '</' + C + '>' : ' />');
      return hostStyle ? ind(d) + '<div className="sc-host-x" style={' + hostStyle + ' || { display: "contents" }}>\n' + el(d + 1) + '\n' + ind(d) + '</div>' : el(d);
    }
    if (tag === 'dc-import') {
      const name = attr('name');
      if (!SHARED[name]) throw new Error('Unknown dc-import ' + name);
      used.shared.add(name);
      const { out, hostStyle } = props(c, 'dc-import', scope);
      return ind(d) + '<div className="sc-host" data-sc-name="' + name + '"' + (hostStyle ? ' style={' + hostStyle + '}' : '') + '>\n'
        + ind(d + 1) + '<' + name + (out.length ? ' ' + fmtProps(out) : '') + ' />\n' + ind(d) + '</div>';
    }
    const real = tag.startsWith('sc-raw-') ? tag.slice(7) : tag;
    if (real === 'script' || real === 'style') return null;
    const { out } = props(c, 'dom', scope);
    if (real === 'image-slot') used.image = true;
    a11yAndMedia(c, real, out, scope);
    if (real === 'label') labelDepth++;
    const inner = VOID.has(real) ? '' : children(kids(c), scope, d + 1);
    if (real === 'label') labelDepth--;
    const open = '<' + real + (out.length ? ' ' + fmtProps(out) : '');
    return ind(d) + open + (inner ? '>\n' + inner + '\n' + ind(d) + '</' + real + '>' : ' />');
  }

  // Accessibility and media fixes that hold for any page (audit P2-1, P2-2, P2-8, P3-2):
  //   - card/section titles styled as headings get role="heading" + aria-level (no visual change),
  //   - fields outside a <label> get their placeholder as aria-label,
  //   - an empty sortable/action column header gets an "Actions" name,
  //   - project photos shown at ≤ 96px use the small thumbnail.
  let labelDepth = 0;
  function firstBinding(n) {
    for (const k of kids(n)) {
      if (k.nodeName === '#text') { const m = k.value.match(/\{\{([\s\S]+?)\}\}/); if (m) return m[1]; }
      else if (k.tagName) { const r = firstBinding(k); if (r) return r; }
    }
    return null;
  }
  function a11yAndMedia(c, real, out, scope) {
    const attr = k => (c.attrs.find(a => a.name === k) || {}).value;
    const has = k => out.some(p => p[0] === k);
    const style = attr('style') || '';
    if (['span', 'div', 'p'].includes(real) && !has('role')) {
      if (/font-size:\s*var\(--text-title\)/.test(style)) out.push(['role', '"heading"', false], ['aria-level', '"2"', false]);
      else if (/font-size:\s*var\(--text-heading\)/.test(style) && /var\(--weight-heading\)/.test(style)) out.push(['role', '"heading"', false], ['aria-level', '"3"', false]);
    }
    if ((real === 'input' || real === 'textarea') && labelDepth === 0 && attr('placeholder') && !has('aria-label') && !has('aria-labelledby')) {
      out.push(['aria-label', compileValue(attr('placeholder'), scope).code, true]);
    }
    if (real === 'button' && attr('role') === 'columnheader' && !has('aria-label')) {
      const b = firstBinding(c);
      if (b) out.push(['aria-label', '__dc.str(' + compileExpr(b, scope) + ') || "Actions"', true]);
    }
    if (real === 'img') {
      const w = style.match(/(?:^|;)\s*width:\s*(\d+)px/);
      const si = out.findIndex(p => p[0] === 'src');
      if (w && Number(w[1]) <= 96 && si >= 0) out[si] = ['src', '__dc.thumb(' + out[si][1] + ')', true];
    }
  }

  return { children, pseudo, used };
}

function compilePage(file) {
  const src = tokenizeColors(applyPatches(file, fs.readFileSync(path.join(srcDir, file), 'utf8')));
  const open = /<x-dc(?:\s[^>]*)?>/.exec(src);
  const tplHtml = src.slice(open.index + open[0].length, src.lastIndexOf('</x-dc>'));
  const scriptM = /<script type="text\/x-dc" data-dc-script(?: data-props="([^"]*)")?>([\s\S]*?)<\/script>/.exec(src);
  const propsMeta = scriptM && scriptM[1] ? JSON.parse(scriptM[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&')) : {};
  const js = scriptM ? scriptM[2] : '';
  const defaults = Object.fromEntries(Object.entries(propsMeta).filter(([k, m]) => k[0] !== '$' && m && m.default !== undefined).map(([k, m]) => [k, m.default]));

  const frag = parseFragment(encode(tplHtml));
  const gen = makeGen();
  const name = file.replace(/\.dc\.html$/, '').replace(/[^A-Za-z0-9]/g, '');

  // Pages inside the MODUL frame (logo · header · sidebar · main) keep only what is theirs:
  // the persistent app shell already renders the logo, HeaderUtilities and SideNav.
  //   header extras → <__dc.HeaderSlot> (portal into the shell header)
  //   <main> and other frame content → rendered in place (direct children of the frame grid)
  //   top-level siblings of the frame (dialogs, drawers, toasts) → <__dc.Overlays> (portal)
  const isEl = n => !!n.tagName;
  const hasAttr = (n, a) => n.attrs && n.attrs.some(x => x.name === a);
  const frame = frag.childNodes.find(n => isEl(n) && hasAttr(n, 'data-frame'));
  let body, active = null;
  if (frame) {
    const fk = frame.childNodes.filter(isEl);
    const header = fk.find(n => n.tagName === 'header');
    const navCell = fk.find(n => n.tagName !== 'main' && n.childNodes.some(c => c.tagName === 'dc-import' && c.attrs.some(a => a.name === 'name' && a.value === 'SideNav')));
    const sideNav = navCell.childNodes.find(c => c.tagName === 'dc-import');
    active = (sideNav.attrs.find(a => a.name === 'active') || {}).value || null;
    const logo = fk[0];
    const extras = header ? header.childNodes.filter(c => !(c.tagName === 'dc-import')) : [];
    const inFrame = frame.childNodes.filter(c => c !== logo && c !== header && c !== navCell);
    const outside = frag.childNodes.filter(c => c !== frame);
    const hasExtras = extras.some(isEl);
    const hasOutside = outside.some(c => isEl(c) && c.tagName !== 'helmet');
    gen.children(outside.filter(c => c.tagName === 'helmet'), 'v0', 3); // collect <helmet> styles
    body = [
      hasExtras ? '      <__dc.HeaderSlot>\n' + gen.children(extras, 'v0', 4) + '\n      </__dc.HeaderSlot>' : '',
      gen.children(inFrame, 'v0', 3),
      hasOutside ? '      <__dc.Overlays>\n' + gen.children(outside.filter(c => c.tagName !== 'helmet'), 'v0', 4) + '\n      </__dc.Overlays>' : '',
    ].filter(Boolean).join('\n');
  } else {
    body = gen.children(frag.childNodes, 'v0', 3);
  }
  const cssFile = gen.used.styles.length ? name + '.css' : null;

  const code = `// GENERATED by scripts/compile-dc.mjs from "${file}" — edit the design or the compiler, not this file.
/* eslint-disable */
import React from 'react';
import * as __DS from '../../ds';
import * as __dc from '../../dc/runtime.js';
import { DCLogic } from '../../dc/runtime.js';
${[...gen.used.shared].map(s => `import { ${s} } from '../../components/${s}.jsx';`).join('\n')}
${gen.used.image ? "import '../../vendor/image-slot.js';\n" : ''}${cssFile ? `// Page styles apply only while this page is mounted (they include global rules).\nimport pageCss from './${cssFile}?inline';\n` : ''}
${gen.pseudo.join('\n')}

${adaptLogic(js).trim()}

function render(v0) {
  return (
    <>
${body}
    </>
  );
}

export const defaults = ${JSON.stringify(defaults)};
/** Rendered inside the persistent app shell (true) or as a full page (false). */
export const inShell = ${frame ? 'true' : 'false'};
export const navActive = ${JSON.stringify(active)};
${PRELUDE[name] ? `/** Seed constants for the live search / notification index (src/lib/live-index.js). */\nexport const prelude = { ${PRELUDE[name].map(n => `${n}: typeof ${n} !== 'undefined' ? ${n} : null`).join(', ')} };\n` : ''}export default __dc.defineDC(${JSON.stringify(name)}, Component, render, defaults, { wrap: !inShell${cssFile ? ', css: pageCss' : ''}${PERSIST[name] ? ', persist: ' + JSON.stringify(PERSIST[name]) : ''} });
`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, name + '.jsx'), code);
  if (cssFile) fs.writeFileSync(path.join(outDir, cssFile), '/* GENERATED from the <helmet> of "' + file + '" (shared rules removed) */\n' + cleanCss(renamePages(gen.used.styles.join('\n'))));
  return name;
}

for (const f of files) console.log('compiled', compilePage(f));
