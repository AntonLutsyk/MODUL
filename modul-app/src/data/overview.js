// Seed data for the Overview dashboard (from Overview Dashboard.dc.html).

export const TEAM = ['Elena Marsh', 'Aiko Tan', 'Jonas Weil', 'Rui Costa', 'Theo Lund'];

export const PROJECTS = [
  { id: 'halden', name: 'Halden Residence', code: 'AT-24-031', client: 'Mira Halden', phase: 'Development', tone: 'warning', team: ['Elena Marsh', 'Aiko Tan', 'Jonas Weil'], next: 'Kitchen elevations v3', due: 'Due 21 Oct', spent: 186400, fee: 300000, risk: false, withClient: true },
  { id: 'kvarn', name: 'Kvarn Offices, Level 3', code: 'AT-24-027', client: 'Kvarn AB', phase: 'Documents', tone: 'neutral', team: ['Jonas Weil', 'Rui Costa', 'Theo Lund', 'Aiko Tan'], next: 'Lighting schedule sign-off', due: 'Overdue 3 days', late: true, spent: 302900, fee: 310500, risk: true, withClient: true },
  { id: 'lumen', name: 'Lumen Gallery Annex', code: 'AT-25-004', client: 'Lumen Foundation', phase: 'Schematic', tone: 'accent', team: ['Elena Marsh', 'Theo Lund'], next: 'Massing review with trustees', due: 'Due 23 Oct', spent: 61800, fee: 218000, risk: false, withClient: true },
  { id: 'brask', name: 'Brask Townhouse', code: 'AT-25-009', client: 'Ida & Karl Brask', phase: 'Development', tone: 'warning', team: ['Aiko Tan', 'Rui Costa'], next: 'FF&E schedule, ground floor', due: 'Due 24 Oct', spent: 79300, fee: 92000, risk: false, withClient: false },
  { id: 'orsa', name: 'Orsa Apartments', code: 'AT-25-011', client: 'Orsa Living', phase: 'Concept', tone: 'info', team: ['Rui Costa', 'Aiko Tan', 'Elena Marsh'], next: 'Planning pre-application', due: 'Due 6 Nov', spent: 38900, fee: 540000, risk: false, withClient: false },
  { id: 'vik', name: 'Vik Café Interior', code: 'AT-25-016', client: 'Vik & Co.', phase: 'Construction', tone: 'negative', team: ['Theo Lund'], next: 'Site visit, joinery install', due: 'Due 22 Oct', spent: 50400, fee: 46000, risk: true, withClient: false },
];

export const APPROVALS = [
  { id: 'a1', item: 'Lighting schedule', meta: 'Kvarn Offices · Kvarn AB', due: 'Overdue', tone: 'negative', icon: 'lamp', proj: 'kvarn' },
  { id: 'a2', item: 'Kitchen elevations v3', meta: 'Halden Residence · Mira Halden', due: '21 Oct', tone: 'warning', icon: 'pencil-ruler', proj: 'halden' },
  { id: 'a3', item: 'Schematic massing', meta: 'Lumen Gallery Annex · Trustees', due: '23 Oct', tone: 'info', icon: 'layers', proj: 'lumen' },
  { id: 'a4', item: 'Dining chair sample', meta: 'Brask Townhouse · FF&E', due: '24 Oct', tone: 'neutral', icon: 'sofa', proj: 'brask' },
];

// Rows with `who` show that person's portrait; the rest show the project photo.
export const ACTIVITY = [
  { icon: 'stamp', title: 'Schematic set signed off', meta: 'Lumen Gallery Annex · 12 Oct, 16:40', value: 'Approved', tone: 'positive', proj: 'lumen' },
  { icon: 'upload', title: 'Aiko issued kitchen elevations', meta: 'Halden Residence · 11 Oct, 10:12', value: '12 sheets', tone: 'muted', who: 'Aiko Tan' },
  { icon: 'message-square-text', title: 'Kvarn AB asked for lux levels', meta: 'Kvarn Offices · 10 Oct, 14:05', value: 'Reply', tone: 'warning', who: 'Lars Kvarn' },
  { icon: 'receipt', title: 'Invoice INV-0412 overdue', meta: 'Kvarn Offices · 08 Oct', value: '€8,400', tone: 'negative', proj: 'kvarn' },
  { icon: 'map-pin', title: 'Theo logged a site visit', meta: 'Vik Café Interior · 06 Oct', value: '3.5 h', tone: 'muted', who: 'Theo Lund' },
];

export const FEE = {
  'This quarter': { value: '€1,248,600', delta: '+4.2%', label: 'contracted this quarter' },
  'This year': { value: '€3,912,400', delta: '+11.8%', label: 'contracted vs 2025' },
};

export const HEALTH = [
  { label: 'On budget', value: '9', note: '+1 this month', color: 'var(--status-positive)', soft: 'var(--status-positive-bg)' },
  { label: 'Watch', value: '3', note: 'over 85% spent', color: 'var(--status-warning)', soft: 'var(--status-warning-bg)' },
  { label: 'Over fee', value: '2', note: '€14,300 above', color: 'var(--status-negative)', soft: 'var(--status-negative-bg)' },
];

export const FILTERS = [{ value: 'all', label: 'All' }, { value: 'risk', label: 'At risk' }, { value: 'client', label: 'With client' }];
