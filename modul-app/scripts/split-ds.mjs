// One-off: split the Atelier DS bundle (compiled JSX in IIFEs) into ES modules under src/ds.
import fs from 'node:fs';
import path from 'node:path';
const [, , bundlePath, outDir] = process.argv;
const src = fs.readFileSync(bundlePath, 'utf8');
const re = /^\/\/ (components\/[^\n]+\.jsx)\ntry \{ \(\(\) => \{\n([\s\S]*?)\nObject\.assign\(__ds_scope, \{ ([^}]+) \}\);\n\}\)\(\); \} catch/gm;
const mods = []; let m;
while ((m = re.exec(src))) mods.push({ file: m[1].replace(/^components\//, '').replace(/\.jsx$/, '.js'), body: m[2], names: m[3].split(',').map(s => s.trim()) });
const owner = {}; mods.forEach(x => x.names.forEach(n => { owner[n] = x.file; }));
const index = [];
for (const x of mods) {
  const used = [...new Set([...x.body.matchAll(/__ds_scope\.([A-Za-z_]+)/g)].map(a => a[1]))].filter(n => !x.names.includes(n));
  const byFile = {}; used.forEach(n => { (byFile[owner[n]] ||= []).push(n); });
  const imports = Object.entries(byFile).map(([f, ns]) => {
    let rel = path.posix.relative(path.posix.dirname(x.file), f); if (!rel.startsWith('.')) rel = './' + rel;
    return `import { ${ns.join(', ')} } from '${rel}';`;
  });
  const body = x.body.replace(/__ds_scope\.([A-Za-z_]+)/g, '$1').replace(/\/\*#__PURE__\*\//g, '');
  const out = `// Ported from the Atelier design system bundle (${'components/' + x.file.replace(/\.js$/, '.jsx')}).\nimport React from 'react';\n${imports.join('\n')}${imports.length ? '\n' : ''}\n${body}\n\nexport { ${x.names.join(', ')} };\n`;
  const dest = path.join(outDir, x.file); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, out);
  index.push(`export { ${x.names.join(', ')} } from './${x.file}';`);
}
fs.writeFileSync(path.join(outDir, 'index.js'), index.join('\n') + '\n');
console.log(mods.length + ' modules:', mods.map(x => x.file).join(', '));
