// Overview module: the dashboard in the shell's <main>, plus the first-run tour.
import React from 'react';
import { Tour } from '../components/Tour.jsx';
import { OverviewDashboard } from './OverviewDashboard.jsx';

// Demo switches for the projects table: ?state=loading|empty|error and ?thumbs=0
const STATES = ['live', 'loading', 'empty', 'error'];

export default function OverviewPage() {
  const params = new URLSearchParams(location.search);
  const dataState = STATES.includes(params.get('state')) ? params.get('state') : 'live';
  return (
    <>
      <main className="shell-main">
        <OverviewDashboard dataState={dataState} showThumbnails={params.get('thumbs') !== '0'} />
      </main>
      <Tour />
    </>
  );
}
