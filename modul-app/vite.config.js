import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// One HTML page per MODUL module (multi-page app).
const PAGES = ['index', 'projects', 'clients', 'approvals', 'tasks', 'documents', 'reports', 'settings', 'help', 'sign-in'];

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: !process.env.MODUL_ORIGINAL,
    // Dev-only: set MODUL_ORIGINAL=http://localhost:5174 to serve the design export under /__orig for side-by-side checks.
    proxy: process.env.MODUL_ORIGINAL ? { '/__orig': { target: process.env.MODUL_ORIGINAL, rewrite: p => p.replace(/^\/__orig/, '') } } : undefined,
  },
  build: {
    rollupOptions: { input: Object.fromEntries(PAGES.map(p => [p, resolve(__dirname, p + '.html')])) },
  },
});
