# MODUL (React)

A standalone Vite + React 18 build of the full MODUL studio platform from the Claude Design project. It doesn't need the Claude Design runtime.

```bash
npm install
npm run dev      # http://localhost:5175
npm run build    # static multi-page site in dist/
```

## Pages

| URL | Module | Source |
| --- | --- | --- |
| `index.html` | Overview | `src/pages/OverviewDashboard.jsx` (hand-written) |
| `projects.html` | Projects | `src/pages/generated/Projects.jsx` |
| `clients.html` | Clients | `src/pages/generated/Clients.jsx` |
| `approvals.html` | Approvals | `src/pages/generated/Approvals.jsx` |
| `tasks.html` | Tasks & Team | `src/pages/generated/Tasks.jsx` |
| `documents.html` | Documents | `src/pages/generated/Documents.jsx` |
| `reports.html` | Reports | `src/pages/generated/Reports.jsx` |
| `settings.html` | Settings | `src/pages/generated/Settings.jsx` |
| `help.html` | Help | `src/pages/generated/Help.jsx` |
| `sign-in.html` | Sign in | `src/pages/generated/SignIn.jsx` |

Deep links work as they did in the prototype, for example `projects.html#project=halden`, `projects.html#new`, `approvals.html#approval=…` and `index.html#tour`.

### Navigation

It's a single-page app. Every HTML file boots the same app, so reloads and shared links still work. After that, moving between modules happens on the client side:

- `src/components/AppFrame.jsx` holds the logo, header (search, theme, notifications) and sidebar. They stay mounted, so state is kept and nothing flashes.
- Only the page's `<main>` is swapped, and it eases in over 220 ms (`app.css`). The previous page stays on screen until the next one's code has loaded. All modules are prefetched while the browser is idle.
- `src/lib/router.js` catches `<a href="projects.html">` clicks and the pages' `location.href = …` and `location.replace(…)` calls. The compiler rewrites the latter to `__dc.loc`. Back and Forward work.
- Page-specific header items, such as the user menu on Approvals and Documents, render into a header slot. Dialogs and drawers render into an overlay slot (`src/lib/slots.js`).
- Each page's own CSS is added while it's mounted and removed when you leave it.

## How the module pages are built

`scripts/compile-dc.mjs` compiles each `.dc.html` design page into a React component:

- The page's seed data and its `class Component extends DCLogic` are copied unchanged. That class holds the state, the handlers and `renderVals()`.
- The template becomes JSX with the same rules as the design runtime: `{{ path }}` bindings, `<sc-for>` and `<sc-if>`, `<x-import>` for design-system components, and `style-hover`, `style-focus` and `style-active`.
- The shared shell parts (`dc-import` of SideNav, HeaderUtilities and Tour) map to the hand-written components in `src/components/`.
- `src/dc/runtime.js` is the small runtime behind this: the `DCLogic` base class, the component wrapper and the binding helpers.

Regenerate after the designs change:

```bash
npm run pages    # recompile ../MODUL/*.dc.html into src/pages/generated
npm run data     # rebuild the search and notification index
```

The generated files carry a header saying so. To change a module, edit the design and recompile, or move the page out of `generated/` and edit it by hand from then on.

## Other folders

| Path | What it is |
| --- | --- |
| `src/ds/` | The Atelier design system: 25 modules split from `_ds_bundle.js` by `scripts/split-ds.mjs`. |
| `src/styles/` | The Atelier tokens and the MODUL theme layer (light and dark), plus shell CSS. |
| `src/lib/` | Theme (`window.ModulTheme`), navigation, people photos, search, and a `modul-index.js` adapter. |
| `src/vendor/image-slot.js` | The `<image-slot>` element used on Approvals, Documents and Projects. It's read-only outside Claude Design. |

## Notes

- All data is the prototype's seed data. Changes live in each page's memory, plus `localStorage` for the theme, settings, session, tour progress and notification read state, as in the prototype.
- Sign-in accepts any email and password, as the prototype does.
- Side-by-side check against the original (dev only): serve the export on port 5174, then run `MODUL_ORIGINAL=http://localhost:5174 npm run dev`. The original pages are then at `/__orig/<Page>.dc.html` on the same origin.
