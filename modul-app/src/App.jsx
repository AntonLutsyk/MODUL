// Single-page app: one persistent shell, module pages swapped by the router.
import React, { Suspense, lazy, useEffect } from 'react';
import { AppFrame } from './components/AppFrame.jsx';
import { NavProvider } from './lib/nav.jsx';
import { MODULE_TITLES, useRoute } from './lib/router.js';

const loaders = {
  overview: () => import('./pages/OverviewPage.jsx'),
  projects: () => import('./pages/generated/Projects.jsx'),
  clients: () => import('./pages/generated/Clients.jsx'),
  approvals: () => import('./pages/generated/Approvals.jsx'),
  tasks: () => import('./pages/generated/Tasks.jsx'),
  documents: () => import('./pages/generated/Documents.jsx'),
  reports: () => import('./pages/generated/Reports.jsx'),
  settings: () => import('./pages/generated/Settings.jsx'),
  help: () => import('./pages/generated/Help.jsx'),
  signin: () => import('./pages/generated/SignIn.jsx'),
};
const pages = Object.fromEntries(Object.entries(loaders).map(([id, load]) => [id, lazy(load)]));

// Empty canvas shown only on the very first load; later switches keep the old page until the new one is ready.
const Placeholder = () => <main className="shell-main" />;

export default function App() {
  const route = useRoute();
  const Page = pages[route];

  useEffect(() => { document.title = 'MODUL · ' + MODULE_TITLES[route]; }, [route]);
  // Fetch the other modules' code while idle so switching is instant.
  useEffect(() => {
    const idle = window.requestIdleCallback || (fn => setTimeout(fn, 1200));
    idle(() => Object.values(loaders).forEach(load => load()));
  }, []);

  if (route === 'signin') {
    return <Suspense fallback={null}><Page /></Suspense>;
  }
  return (
    <NavProvider>
      <AppFrame active={route}>
        <Suspense fallback={<Placeholder />}>
          <Page key={route} />
        </Suspense>
      </AppFrame>
    </NavProvider>
  );
}
