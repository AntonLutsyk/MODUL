// Builds src/data/modul-index.json (search records + notification feed) from the seed
// data declared at the top of each module page in the Claude Design export.
// Usage: node scripts/build-index.mjs <path-to-MODUL-export>
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2] || '../MODUL';
const SOURCES = {
  projects: ['Projects.dc.html', ['SEED', 'TONE', 'PHASES']],
  clients: ['Clients.dc.html', ['SEED', 'TONE']],
  approvals: ['Approvals.dc.html', ['SEED', 'ST', 'PROJ']],
  tasks: ['Tasks.dc.html', ['SEED', 'ST', 'PROJ', 'TEAM']],
  documents: ['Documents.dc.html', ['SEED', 'AP', 'PROJ']],
};
function readPrelude(file, names) {
  const t = fs.readFileSync(path.join(root, file), 'utf8');
  const tag = t.indexOf('data-dc-script');
  const start = t.indexOf('\n', tag) + 1;
  const end = t.indexOf('class Component', start);
  const ret = 'return {' + names.map(n => n + ': typeof ' + n + " !== 'undefined' ? " + n + ' : null').join(', ') + '};';
  return new Function(t.slice(start, end) + '\n' + ret)();
}
// Reuse the original build() by loading modul-index.js with browser globals stubbed.
globalThis.location = { href: pathToFileURL(path.resolve(root) + '/').href };
globalThis.sessionStorage = { getItem: () => null, setItem() {} };
globalThis.window = globalThis;
const mod = await import(pathToFileURL(path.resolve(root, 'modul-index.js')).href + '?t=' + Date.now());
const src = Object.fromEntries(Object.entries(SOURCES).map(([k, [f, n]]) => [k, readPrelude(f, n)]));
// build() is module-private, so recreate the loader path: loadModul() fetches; we bypass with a fetch stub.
globalThis.fetch = async u => ({ ok: true, text: async () => fs.readFileSync(new URL(u), 'utf8') });
const data = await mod.loadModul();
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/modul-index.json', JSON.stringify(data));
console.log(data.items.length + ' records, ' + data.notes.length + ' notifications; sources ok:', Object.keys(src).join(', '));
