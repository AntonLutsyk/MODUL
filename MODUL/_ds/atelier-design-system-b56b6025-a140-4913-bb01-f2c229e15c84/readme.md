# ATELIER Design System

**ATELIER** is a premium B2B SaaS platform for architecture and interior-design studios. One workspace for clients, projects, teams, budgets, documentation and approvals. Users: studio owners, project architects, interior designers, project managers and client-relationship managers. Desktop-first web app with responsive fallbacks.

Core modules: Dashboard · Projects · Clients & Companies · Project Room · Approval Timeline · Tasks & Team · Documents · Financial Overview · Settings.

## Sources
- `uploads/8b207d08-…png`: Vertix "Overview" dashboard (reference 1)
- `uploads/8ef8496c-…png`: Vertix "Rewards Program" (reference 2)
- `uploads/3551da64-…png`: Vertix "Messages" (reference 3)

The three screenshots are a third-party fintech concept ("Vertix") used **only** as the visual reference for shell, type proportions, spacing, surfaces and density. The Vertix brand, orange accent and financial content are not used. There was no codebase, Figma file or logo. All numeric values were measured from the screenshots (≈1.1× scale, normalised to a 1440px design width).

## Index
- `styles.css`: entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `assets/fonts/Manrope-Variable.ttf`: Manrope 200–800 (Google Fonts, OFL)
- `assets/icons/*.svg`: 91 Lucide icons (lucide-static 0.460.0, ISC), also embedded in `Icon.jsx`
- `guidelines/*.html`: foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/`: React primitives (below)
- `ui_kits/atelier-app/`: click-through recreation of the web app
- `thumbnail.html`, `SKILL.md`

## Components
- **core/**: Icon, Button, IconButton, Badge, Avatar, AvatarGroup, Card
- **forms/**: Input, Select, Checkbox, CheckItem, Switch, SegmentedControl
- **navigation/**: AppShell, TopNav, HeaderGroup, IconRail, BrandChip, UserMenu
- **data/**: StatCard, ProgressBar, ListRow, DataTable, BarChart
- **feedback/**: Dialog, Toast, Tooltip
- **messaging/**: MessageBubble, DateDivider, Composer

No source component library existed, so this is an authored standard set derived from what appears in the references. The **intentional additions** that have no direct reference counterpart are Dialog, Toast, Tooltip, Checkbox and Switch (needed for approval and settings flows), Icon (a wrapper for the glyph set) and AppShell (the shell composition, so every screen gets it right).

## UI kits
- `ui_kits/atelier-app/`: Dashboard, Projects, Project Room, Approvals (timeline), Messages, Finance. Not built because there are no references for them: Clients, Tasks & Team, Documents, Settings.

---

## CONTENT FUNDAMENTALS
- **Voice:** a calm, competent studio manager. Short and declarative, with no hype.
- **Person:** the product talks to the user as "you" and greets them by first name ("Good morning, Elena"). It never says "I" or "we".
- **Casing:** sentence case for everything: page titles, card titles, buttons ("New project", "Request approval", "Upload drawings"). Proper nouns keep their capitals (project and client names). Use UPPERCASE only for the wordmark and the optional 12px eyebrow.
- **Page subtitles:** one sentence about the state of things, often with a count: "Four projects need your attention this week." "Every active commission, its phase, budget and next milestone."
- **Metrics:** value, then signed delta, then period: `+4.2%  this quarter`, `-1  vs last week`. Use the € sign with thousands separators. Use tabular numerals.
- **Terminology:** architecture words, not generic SaaS words: phase (Concept, Schematic, Development, Documents, Construction), deliverable, drawing set, sheet, elevation, finish schedule, FF&E, site visit, sign-off, fee, invoiced, utilisation. Use project codes like `AT-24-031`.
- **Dates:** `12 Oct` in lists, `Due 21 Oct` on deliverables, 24-hour times `10:12`.
- **Emoji:** never, in UI or in system copy. Unicode is limited to `›`, `·` and `—` as separators.
- **Empty and error states:** plain and specific: "No projects match that search."

## VISUAL FOUNDATIONS
- **Overall character:** the reference's clean, contemporary SaaS look, moved onto a warm ivory palette. White rounded cards float on an ivory canvas. Graphite gives the strong contrast and sage is the one accent. The interface looks calm, editorial in restraint, and dense where data needs it.
- **Color distribution** (mapped from the reference):
  - App canvas is light gray → `--bg-app` ivory #F5F2EC.
  - Cards are white → `--surface-card` #FFF.
  - Nested tiles (wallet tiles, table header band, chart bed) → `--surface-inset` ivory-50.
  - Secondary buttons and soft icon circles → limestone-100.
  - Black active pills (nav, rail, primary button) → graphite-900.
  - The orange hero card and Activate button → sage-600, with a 135° sage 500→700 gradient on hero cards only.
  - Positive and negative deltas → `--status-positive` (green) and `--status-negative` (terracotta).
  - Sage is limited to **one hero per row** plus the occasional accent button or badge.
- **Type:** Manrope only (no serif, so the reference's sans character is kept).
  - Page title: 44/52, weight 500, tracking -0.025em.
  - Subtitle: 18/28 in muted gray.
  - Card title: 22/28 at 500, or 18/24 for compact cards.
  - Metrics: 32/40 at 700. Hero figures: 64 at 700.
  - Nav, buttons and list titles: 16 at 500–600.
  - Supporting text 15, table text 14, metadata 13.
  - Headings use medium weight, not bold. Bold is for numbers.
- **Spacing:** built on a 4px base.
  - Frame gutter 24, header pills 60 high, rail 64 wide.
  - 28px gap between the rail and the content, 24px between the header and the page title.
  - 16px card grid gap, 24px card padding, 12–14px tile padding inside cards.
  - Density is moderate. Pack data in rows of about 60px. Don't use giant empty cards.
- **Shell:** three white pills along the top: brand, centred module nav, then a utilities group and a user pill. On the left, the rail is stacked white capsules (theme group, primary group, bottom group pinned to the foot). The active item is a solid graphite pill or circle. The page title sits directly on the canvas, not inside a card.
- **Cards:** white, 24px radius, no border, almost no shadow (`--shadow-card`). Separation comes from the white-on-ivory contrast. Nest at most one level (card → tile). Tiles are 16px radius, flat, ivory or limestone. A selected tile gets a 1.5px sage-400 outline on a sage-50 fill.
- **Corner radii:** controls are pills (999). Cards 24, tiles 16, menus 18, inputs pill (rounded 14 in forms), checkboxes 6.
- **Borders:** hairlines only (`--border-subtle` limestone-200), used for list and table dividers and outlined inputs. Never a colored left border.
- **Shadows:** `xs` on header and rail pills, `card` on cards, `pop` on menus, dialogs and toasts. No inner shadows and no glow.
- **Backgrounds:** flat ivory. No gradients, except the sage hero (soft 135° gradient plus one faint radial highlight, as in the reference's orange card). No textures or patterns. The hatched progress remainder is the only "pattern".
- **Imagery:** none in the references. If project photography is added, use warm, natural-light architectural photos with no heavy grading, in 16–24px radius containers.
- **Transparency and blur:** only white-alpha fills on the sage hero (glass badges and icon buttons) and the 28% graphite dialog scrim. No backdrop blur.
- **Hover:** fills shift one step (transparent → limestone-100, graphite-900 → graphite-700, sage-600 → sage-700). Table rows tint ivory-50. No opacity fades on text.
- **Press:** buttons scale to 0.98. There are no color flashes.
- **Focus:** sage-400 border plus a 3px sage ring (`--shadow-focus`).
- **Motion:** 120/180/280ms on `cubic-bezier(.2,0,0,1)`. Hover fills, segmented tabs, switch knob and progress widths animate. No bounce, no page transitions.
- **Charts:** rounded bars on an ivory inset bed with hairline grid lines and a dot legend at the top right. Series colors are sage-400, graphite and limestone-400.

## ICONOGRAPHY
- **Set:** Lucide (outline, 24 grid, round caps and joins). The reference uses a near-identical thin-line style. The icons are **copied** from `lucide-static@0.460.0` into `assets/icons/` and embedded as path data in `components/core/Icon.jsx`, so there is no runtime CDN.
- **Stroke and size:** stroke 1.6 by default (matches the reference's light weight).
  - 20–21px in the rail and header.
  - 18 in buttons and inputs.
  - 16 in badges and meta.
  - Icons inside 44px circles in list rows.
- **Color:** icons inherit currentColor (graphite). They turn white on graphite or sage, and sage inside accent-soft circles.
- **Architecture icons in use:** pencil-ruler, ruler, layers, stamp (approval), sofa (FF&E), lamp, map-pin (site), files, folder-kanban, square-kanban (project room), calendar-check (approvals).
- **Never:** emoji, icon fonts, PNG icons, or hand-drawn SVG. If you need a glyph that isn't in the set, copy it from Lucide.

## BRAND MARK
No logo was provided. The brand is rendered as the **type-only wordmark** "ATELIER" (Manrope 700, 0.22em tracking) in a white pill (`BrandChip`). Do not invent a symbol or monogram.
