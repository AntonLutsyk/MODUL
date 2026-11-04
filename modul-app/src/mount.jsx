// Shared entry for every HTML page: global styles, theme, prototype globals, then the app.
// Each page file (index.html, projects.html, …) boots the same app; the router picks the
// module from the URL, and later moves between modules happen without a page load.
import './lib/theme.js'; // sets data-theme on <html> before first render; defines window.ModulTheme
import './styles/ds/tokens/fonts.css';
import './styles/ds/tokens/colors.css';
import './styles/ds/tokens/typography.css';
import './styles/ds/tokens/spacing.css';
import './styles/ds/tokens/base.css';
import './styles/app.css';
import './styles/modul-theme.css';
import './lib/router.js';
import './lib/focus-manager.js'; // focus into / within / back from every aria-modal surface
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as DS from './ds';
import { photoFor } from './lib/people.js';
import App from './App.jsx';

// Globals the compiled pages read, as in the prototype.
window.ATELIERDesignSystem_b56b60 = DS;
window.ModulPeople = { photo: photoFor };

export function mount() {
  // No StrictMode: the compiled page logic was written for single mount/unmount cycles.
  createRoot(document.getElementById('root')).render(<App />);
}
