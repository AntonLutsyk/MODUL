---
name: slopmonster
description: Run every piece of user-facing copy in this project through SlopMonster. Trigger on "Slop Monster", "Slob Monster", "slopmonster", "de-slop", "run the copy through the slop monster".
source: Adapted from github.com/ItsssssJack/SlopMonster (MIT). deslop.js is a JS port of tools/deslop.py with the same catalogue and scoring.
---

# SlopMonster for MODUL

Edit the product copy for the people who use MODUL: studio owners, architects and project managers. The checker finds known AI patterns. It doesn't judge whether the copy is clear or true, so the editorial review below is part of every run.

## Step 1: Score every file

Run this in `run_script`:

```js
const D = new Function(await readFile('skills/slopmonster/deslop.js') + '; return deslop;')();
const files = (await ls('.')).filter(f => f.endsWith('.dc.html'));
for (const f of files) {
  const r = D.report(D.audit(D.dcCopy(await readFile(f))));
  log(f, r.score + '/5', r.failed.map(k => k + ': ' + r.hits[k].slice(0, 8).map(x => Array.isArray(x) ? x.join(' × ') : x).join(' | ')).join(' ; '));
}
```

`dcCopy` pulls template text, `placeholder`/`label`/`title`/`aria-label`/`alt` attributes and prose-like string literals from the logic class. Also check helper `.js` files that hold UI strings, such as `modul-index.js`.

Five categories cost one point each: vocabulary, sentence patterns, punctuation cadence, rule-of-three lists, possible invented proof.

## Step 2: Look at each match in context

Read the surrounding line before editing. Known exceptions in this project:

- **elevate**: matches *elevation(s)*, a drawing type. Keep it.
- **Proof**: counts computed from the product's own data ("14 active projects") are not social proof. Keep them. Never add customer counts, ratings or testimonials.
- **Semicolons in `.js` helpers**: usually code, not copy.
- **Real lists**: a list of actual features or fields can stay. Rewrite only when the three-part rhythm is decoration, or when a different sentence shape reads better.

## Step 3: Rewrite

Follow the order from the source skill:

1. **Purpose and structure.** Answer the reader's question first. Cut duplicate hooks.
2. **Meaning and evidence.** Each sentence adds information. Keep facts, counts, statuses and technical behaviour exactly as they are. Don't describe features the prototype doesn't have.
3. **Wording and rhythm.** Swap vague words for direct ones. Vary sentence shapes. Keep the MODUL voice: calm, short, declarative, sentence case, architecture terms (phase, sign-off, drawing set).

Don't invent personality with fragments or opinions. Don't hide prose in code formatting to raise the score.

Edit with `dc_html_str_replace` / `dc_js_str_replace`, or a single `run_script` find-and-replace batch for many strings. Change copy only. Leave layout and logic alone.

## Step 4: Second pass and re-score

The source workflow asks a rival model family for a second edit. That isn't available here, so say the second pass wasn't run. Re-run Step 1 and confirm that every remaining match is a justified exception.

## Output

Up to five short notes: score per file before and after, what changed, the exceptions kept and why, and that the rival-model pass didn't run. Don't claim the copy proves human authorship.
