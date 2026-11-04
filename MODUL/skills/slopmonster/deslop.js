// JS port of SlopMonster's tools/deslop.py (MIT, github.com/ItsssssJack/SlopMonster).
// Same catalogue and scoring: five categories, one point each, 5/5 = no scored matches.
// Usage inside run_script:  const D = new Function(await readFile('skills/slopmonster/deslop.js') + '; return deslop;')();
//                           D.report(D.audit(text))
const deslop = (() => {
  const VOCAB = ['delve', 'leverage', 'seamless', 'elevate', 'robust', 'unlock', 'unleash', 'empower', 'streamline', 'cutting-edge', 'state-of-the-art', 'game-changer',
    'game-changing', 'revolutionize', 'revolutionise', 'transformative', 'transformation', 'innovate', 'holistic', 'synergy', 'synergies', 'paradigm', 'bespoke',
    'meticulous', 'tapestry', 'testament', 'beacon', 'unparalleled', 'supercharge', 'turbocharge', 'effortless', 'next-level',
    'pivotal', 'foster', 'showcase', 'compelling', 'intuitive', 'world-class', 'best-in-class'];
  const VOCAB_EXACT = ['crafted', 'curated', 'harnessing', 'harness the power', 'journey', 'realm', 'landscape', 'navigate the', 'in the world of', "in today's", 'ever-evolving',
    'fast-paced', 'look no further', 'dive in', "let's dive", 'deep dive', 'embark', 'unlock the power', 'buckle up', 'the secret sauce', 'level up'];
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rootPattern = w => { const root = w.replace(/(ed|ing|ly|e)$/, '');
    if (root.length < 4) return new RegExp('(?<!\\w)' + esc(w) + '(?!\\w)', 'g');
    return new RegExp('(?<!\\w)' + esc(root) + '(?:e|es|ed|ing|ion|ions|ional|ive|al|ally|s|ly|ness)?(?!\\w)', 'g'); };
  const NEG_JUST = "(?:\\bnot|n['’]t)\\s+(?:just|only|merely|simply)\\b";
  const XY_TAIL = "[^!?]{0,80}?[,.]\\s*(?:it|this|that|they|we|you|he|she|i)\\b";
  const PHRASES = [
    [NEG_JUST + '[^.!?]{0,80}\\bbut\\b', "the 'not just X, but Y' construction"],
    [NEG_JUST + XY_TAIL, "the 'not just X, it's Y' construction"],
    ["\\bwhether you(?:'?re| are)\\b[^.!?]{0,40}\\bor\\b", "the 'whether you're X or Y' opener"],
    ['\\bmore than just\\b', "'more than just'"],
    ["\\b(that|this)(?:'?s| is) where\\b[^.!?]{0,30}\\bcomes? in\\b", "'that's where X comes in'"],
    ['\\bsay goodbye to\\b', "'say goodbye to'"],
    ['\\bimagine (a|an|the)\\b', "the 'imagine a…' opener"],
    ['\\bin conclusion\\b|\\bto sum up\\b', 'essay-summary phrasing'],
    ['\\bwhen it comes to\\b', "'when it comes to' filler"],
    ['\\bat the end of the day\\b', "'at the end of the day'"],
    ['\\bthe key is\\b|\\bthe truth is\\b', 'throat-clearing opener'],
    ['\\bhelps? you to\\b|\\bcan help you\\b', "hedged benefit ('helps you to…')"],
    ['\\bmay potentially\\b|\\bcould potentially\\b|\\bmight possibly\\b', 'stacked hedging'],
    ['\\bvery unique\\b|\\bquite literally\\b', 'intensifier padding'],
    ["\\bhere'?s the thing\\b|\\blet'?s break (it|this) down\\b|\\bthe best part\\b", 'throat-clearing opener'],
    ["\\bready to get started\\b|\\blet'?s get started\\b", 'boilerplate CTA'],
    ['\\bthe (result|answer|catch|kicker|upshot)\\?\\s', 'self-answering question'],
  ];
  const COMPOUND = /\b[a-z]{2,}-[a-z]{2,}(?:-[a-z]{2,})*\b/gi;
  const PROOF = /([\d][\d,]*(?:\.\d+)?)\s*\+?\s*((?:happy|early|active|satisfied|verified|trusted|delighted)\s+)?(?:\w+\s+){0,1}(users?|customers?|learners?|students?|teams?|members?|companies|businesses|homeowners?|subscribers?|clients?|patients?|readers?|sites?|projects?)(?!\w)/gi;
  const normalise = t => t.replace(/\u2011/g, '-').replace(/\u00a0/g, ' ').replace(/\u2019/g, "'").replace(/\s+/g, ' ').trim();
  const sentences = t => t.split(/(?<=[.!?])\s+/);
  function audit(textIn) {
    const text = normalise(textIn); const low = text.toLowerCase();
    const hits = { vocab: [], phrases: [], punctuation: [], rhythm: [], proof: [] };
    VOCAB.forEach(w => { const n = (low.match(rootPattern(w)) || []).length; if (n) hits.vocab.push([w, n]); });
    VOCAB_EXACT.forEach(w => { const n = (low.match(new RegExp('(?<!\\w)' + esc(w) + '(?!\\w)', 'g')) || []).length; if (n) hits.vocab.push([w, n]); });
    PHRASES.forEach(([p, label]) => { const n = (low.match(new RegExp(p, 'g')) || []).length; if (n) hits.phrases.push([label, n]); });
    sentences(text).forEach(s => { for (let i = 0; i < Math.max(1, s.length); i += 220) { const w = s.slice(i, i + 220); if ((w.match(/—/g) || []).length >= 2) { hits.punctuation.push(['two or more em-dashes in one sentence', w.slice(0, 70)]); break; } } });
    sentences(text).forEach(s => { for (let i = 0; i < Math.max(1, s.length); i += 220) { const w = s.slice(i, i + 220); const f = w.match(COMPOUND) || []; if (f.length >= 4) { hits.punctuation.push([f.length + ' hyphenated compounds stacked in one sentence', f.slice(0, 4).join(', ')]); break; } } });
    const sc = (text.match(/;/g) || []).length; if (sc > Math.max(3, Math.floor(text.length / 1200))) hits.punctuation.push(['semicolon-heavy for web copy', sc + ' found']);
    [/\b(\w{4,}),\s+(\w{4,}),\s+and\s+(\w{4,})\b/g, /\b(\w{4,}),\s+(\w{4,})\s+and\s+((?:\w+\s+){1,2}\w+)\s*[.!?,;:]/g].forEach(re => { let m; while ((m = re.exec(text))) hits.rhythm.push(['rule-of-three list', m[0].slice(0, 60)]); });
    let m; PROOF.lastIndex = 0; while ((m = PROOF.exec(text))) hits.proof.push(m[0].trim());
    return hits;
  }
  function report(hits, allowProof) {
    const failed = Object.keys(hits).filter(k => hits[k].length && !(allowProof && k === 'proof'));
    return { score: Math.max(0, 5 - failed.length), failed, hits };
  }
  // Pulls the copy a visitor can read out of a .dc.html file: template text plus prose-like string literals in the logic.
  function dcCopy(src) {
    const t0 = src.indexOf('<x-dc>'), t1 = src.indexOf('</x-dc>');
    let tpl = t0 >= 0 ? src.slice(t0, t1) : src;
    tpl = tpl.replace(/<helmet>[\s\S]*?<\/helmet>/g, ' ').replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ');
    const attrs = []; tpl.replace(/\s(?:placeholder|label|title|aria-label|alt)="([^"{]+)"/g, (_, v) => attrs.push(v));
    tpl = tpl.replace(/\{\{[^}]*\}\}/g, ' ').replace(/<[^>]+>/g, ' . ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
    const js = t1 >= 0 ? src.slice(src.indexOf('data-dc-script', t1)) : '';
    const lits = []; js.replace(/(['"`])((?:\\.|(?!\1).){8,}?)\1/g, (_, q, s) => { if (/[a-z]{3,}\s+[a-z]{2,}/i.test(s) && !/[{}<>=;]|var\(|\.dc\.html|^[a-z-]+:|https?:/.test(s)) lits.push(s.replace(/\\'/g, "'").replace(/\\u2019|’/g, "'")); });
    return normalise(tpl.split(/\s*\.\s*(?:\.\s*)+/).join(' . ') + ' . ' + attrs.join(' . ') + ' . ' + lits.join(' . '));
  }
  return { audit, report, dcCopy, normalise };
})();
