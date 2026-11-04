// Overview: greeting + actions, fee position, weekly stats, pending decisions,
// recent activity and the active projects table.
import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar, AvatarGroup, Badge, Button, DataTable, Icon, IconButton, Input, ListRow, ProgressBar, SegmentedControl, Select, StatCard,
} from '../ds';
import { Hover } from '../lib/Hover.jsx';
import { Link, useNav } from '../lib/nav.jsx';
import { PROJECTS, APPROVALS, ACTIVITY, TEAM, HEALTH, FEE, FILTERS } from '../data/overview.js';
import { useLiveIndex } from '../lib/live-index.js';

const card = { background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', minWidth: 0 };
const sectionTitle = { fontSize: 'var(--text-title)', lineHeight: 'var(--lh-title)', fontWeight: 'var(--weight-heading)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)' };
const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const eur = n => '€' + n.toLocaleString('en-GB');

// Small action glyph pinned to the corner of a row's photo.
function CornerGlyph({ icon, lime }) {
  return (
    <span style={{ position: 'absolute', right: -3, bottom: -3, width: 20, height: 20, borderRadius: 999, background: lime ? 'var(--lime)' : 'var(--surface-card)', color: lime ? '#1B1E27' : 'var(--text-strong)', boxShadow: '0 0 0 2px var(--surface-card)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={icon} size={12} />
    </span>
  );
}
const ProjectPhoto = ({ id, icon }) => (
  <span style={{ position: 'relative', width: 44, height: 44, flexShrink: 0, display: 'inline-flex' }}>
    <img src={'/assets/projects/thumb/' + id + '.webp'} alt="" loading="lazy" style={{ width: 44, height: 44, borderRadius: 14, objectFit: 'cover', display: 'block', background: 'var(--limestone-100)' }} />
    <CornerGlyph icon={icon} />
  </span>
);
const PersonPhoto = ({ name, icon }) => (
  <span style={{ position: 'relative', width: 44, height: 44, flexShrink: 0, display: 'inline-flex' }}>
    <Avatar name={name} size="md" />
    <CornerGlyph icon={icon} lime />
  </span>
);

function projectColumns(showThumbs) {
  return [
    { key: 'name', label: 'Project', width: 'minmax(0,1.9fr)', render: p => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
        {showThumbs ? <img src={'/assets/projects/thumb/' + p.id + '.webp'} alt="" loading="lazy" style={{ width: 52, height: 52, flexShrink: 0, display: 'block', objectFit: 'cover', background: 'var(--limestone-100)', borderRadius: 14 }} /> : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', ...ellipsis }}>{p.name}</span>
          <span style={{ fontSize: 13, color: 'var(--text-subtle)', ...ellipsis }}>{p.code} · {p.client}</span>
        </div>
      </div>
    ) },
    { key: 'phase', label: 'Phase', width: '124px', render: p => <Badge size="sm" tone={p.tone} dot>{p.phase}</Badge> },
    { key: 'team', label: 'Team', width: '88px', render: p => <AvatarGroup names={p.team} size="sm" max={3} /> },
    { key: 'next', label: 'Next milestone', width: 'minmax(0,1.3fr)', render: p => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: 14, color: 'var(--text-strong)', ...ellipsis }}>{p.next}</span>
        <span style={{ fontSize: 13, color: p.late ? 'var(--status-negative)' : 'var(--text-subtle)', fontWeight: p.late ? 600 : 400 }}>{p.due}</span>
      </div>
    ) },
    { key: 'budget', label: 'Fee spent', width: '128px', render: p => {
      const pct = Math.round(p.spent / p.fee * 100);
      const tone = pct > 100 ? 'negative' : pct >= 85 ? 'warning' : 'graphite';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{eur(Math.round(p.spent / 1000))}k</span>
            <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: pct > 100 ? 'var(--status-negative)' : 'var(--text-strong)' }}>{pct}%</span>
          </div>
          <ProgressBar value={Math.min(pct, 100)} tone={tone} height={6} />
        </div>
      );
    } },
  ];
}

function FeePosition() {
  const [period, setPeriod] = useState('This quarter');
  const projectsOpen = useLiveIndex().counts.projectsOpen;
  const fee = FEE[period];
  return (
    <section data-tour="fee" style={{ ...card, padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span role="heading" aria-level={2} style={{ fontSize: 'var(--text-heading)', lineHeight: 'var(--lh-heading)', fontWeight: 'var(--weight-heading)', color: 'var(--text-strong)' }}>Fee position</span>
        <Select size="sm" align="right" value={period} onChange={setPeriod} options={Object.keys(FEE)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 'var(--text-figure-lg)', lineHeight: 'var(--lh-figure-lg)', fontWeight: 'var(--weight-figure)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', color: 'var(--text-strong)' }}>{fee.value}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 15 }}>
          <span style={{ color: 'var(--status-positive)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fee.delta}</span>
          <span style={{ color: 'var(--text-muted)' }}>{fee.label}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 14, background: 'var(--status-positive-bg)', color: 'var(--status-positive)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chart-column" size={22} />
          </span>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 18, lineHeight: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>Budget health</span>
            <span style={{ fontSize: 14, lineHeight: '20px', color: 'var(--text-subtle)' }}>{projectsOpen} active projects</span>
          </div>
          <Hover as={Link} to="reports" aria-label="Open budget report" style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 999, background: 'var(--surface-muted)', color: 'var(--text-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background var(--dur-fast)' }} hover={{ background: 'var(--surface-pressed)', color: 'var(--text-strong)' }}>
            <Icon name="chevron-right" size={18} />
          </Hover>
        </div>
        <div style={{ display: 'flex', gap: 4, height: 10 }}>
          {HEALTH.map(h => <span key={h.label} style={{ flex: `${h.value} 1 0`, borderRadius: 999, background: h.color }} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {HEALTH.map(h => (
            <Hover key={h.label} as={Link} to="projects" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderRadius: 16, background: 'var(--surface-inset)', textDecoration: 'none', color: 'inherit', transition: 'background var(--dur-fast)' }} hover={{ background: 'var(--surface-hover)', textDecoration: 'none', color: 'inherit' }}>
              <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 999, background: h.soft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: h.color }} />
              </span>
              <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 600, color: 'var(--text-strong)' }}>{h.label}</span>
                <span style={{ fontSize: 13, lineHeight: '18px', color: 'var(--text-subtle)', ...ellipsis }}>{h.note}</span>
              </span>
              <span style={{ fontSize: 20, lineHeight: '24px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text-strong)' }}>{h.value}</span>
              <span aria-hidden="true" style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 999, background: 'var(--surface-muted)', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="chevron-right" size={16} />
              </span>
            </Hover>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActiveProjects({ dataState, showThumbnails }) {
  const { go } = useNav();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [retried, setRetried] = useState(false);
  useEffect(() => { setRetried(false); }, [dataState]);
  const ds = retried ? 'live' : dataState;
  const all = ds === 'empty' ? [] : PROJECTS;
  const term = q.trim().toLowerCase();
  const rows = all.filter(p =>
    (!term || (p.name + p.client + p.code).toLowerCase().includes(term)) &&
    (filter === 'all' || (filter === 'risk' && p.risk) || (filter === 'client' && p.withClient)));
  const columns = useMemo(() => projectColumns(showThumbnails), [showThumbnails]);
  const isLive = ds === 'live' || ds === 'empty';

  return (
    <section data-tour="projects" style={{ ...card, padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span role="heading" aria-level={2} style={sectionTitle}>Active projects</span>
          <span style={{ fontSize: 14, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{isLive ? rows.length + ' of ' + all.length : ''}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', minWidth: 0, maxWidth: '100%' }}>
          <div style={{ width: 260, maxWidth: '100%' }}>
            <Input icon="search" size="sm" placeholder="Search projects or clients" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <div style={{ maxWidth: '100%', overflowX: 'auto', scrollbarWidth: 'none' }}>
            <SegmentedControl size="sm" options={FILTERS} value={filter} onChange={setFilter} />
          </div>
        </div>
      </div>

      {isLive ? (
        <div style={{ overflowX: 'auto', minWidth: 0 }}>
          <div style={{ minWidth: 720 }}>
            <DataTable
              columns={columns} rows={rows} rowKey="id"
              empty={all.length === 0 ? 'No active projects yet. Start one with New project.' : 'No projects match that search.'}
              onRowClick={p => go('projects#project=' + p.id)}
            />
          </div>
        </div>
      ) : null}

      {ds === 'loading' ? (
        <div aria-busy="true" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 48, borderRadius: 'var(--radius-tile)', background: 'var(--surface-inset)' }} />
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1.6fr 1fr 0.8fr 1.2fr 1fr', gap: 16, alignItems: 'center', padding: '0 20px', minHeight: 68, borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--limestone-100)', animation: 'atl-pulse 1.4s ease-in-out infinite' }} />
              <div style={{ height: 10, width: '70%', borderRadius: 99, background: 'var(--limestone-200)' }} />
              <div style={{ height: 10, width: '60%', borderRadius: 99, background: 'var(--limestone-100)' }} />
              <div style={{ height: 10, width: '50%', borderRadius: 99, background: 'var(--limestone-100)' }} />
              <div style={{ height: 10, width: '65%', borderRadius: 99, background: 'var(--limestone-100)' }} />
              <div style={{ height: 8, width: '100%', borderRadius: 99, background: 'var(--limestone-100)' }} />
            </div>
          ))}
        </div>
      ) : null}

      {ds === 'error' ? (
        <div role="alert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: 20, borderRadius: 'var(--radius-tile)', background: 'var(--status-negative-bg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 'var(--text-body-lg)', fontWeight: 'var(--weight-strong)', color: 'var(--status-negative)' }}>Projects couldn’t load</span>
            <span style={{ fontSize: 14, color: 'var(--text-body)' }}>The connection to the studio server dropped. Your data is safe.</span>
          </div>
          <Button size="sm" variant="outline" icon="refresh-cw" onClick={() => setRetried(true)}>Retry</Button>
        </div>
      ) : null}
    </section>
  );
}

/**
 * @param {{ dataState?: 'live'|'loading'|'empty'|'error', showThumbnails?: boolean, firstName?: string }} props
 * dataState / showThumbnails drive the projects table states (the design's "Projects table" props).
 */
export function OverviewDashboard({ dataState = 'live', showThumbnails = true, firstName = 'Elena' }) {
  const { go } = useNav();
  // Live counts from the studio records (same numbers as the sidebar).
  const counts = useLiveIndex().counts;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 24px', flexWrap: 'wrap', paddingTop: 4 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 'var(--text-display)', lineHeight: 'var(--lh-display)', fontWeight: 'var(--weight-heading)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-strong)' }}>Good morning, {firstName}</h1>
        </div>
        <div data-tour="actions" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="ghost" icon="map-pin" onClick={() => window.dispatchEvent(new CustomEvent('modul:tour'))}>Take the tour</Button>
          <Hover as={Link} to="tasks" title="Tasks & Team" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 44, padding: '0 16px 0 6px', borderRadius: 999, background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)', color: 'var(--text-strong)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }} hover={{ textDecoration: 'none', color: 'var(--text-strong)' }}>
            <AvatarGroup names={TEAM} size="sm" max={5} />
            <span>Studio team</span>
          </Hover>
          <Button variant="outline" icon="stamp" onClick={() => go('approvals#new')}>Request approval</Button>
          <Button icon="plus" onClick={() => go('projects#new')}>New project</Button>
        </div>
      </div>

      <div data-screen-label="Overview" style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 8 }}>
        <div data-row="top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr) minmax(0,1fr)', gap: 16, alignItems: 'stretch' }}>
          <FeePosition />

          <section data-tour="stats" style={{ ...card, padding: 14, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gridAutoRows: 'minmax(0,1fr)', gap: 12 }}>
            <StatCard variant="accent" label="Active projects" value={String(counts.projectsOpen)} delta="+2" deltaLabel="this quarter" onAction={() => go('projects')} />
            <StatCard variant="tile" label="Sign-offs" value={String(counts.approvalsPending)} delta={String(counts.approvalsOverdue)} trend={counts.approvalsOverdue ? 'down' : 'flat'} deltaLabel="overdue" onAction={() => go('approvals')} />
            <StatCard variant="tile" label="Due this week" value="4" delta="+1" trend="flat" deltaLabel="vs last week" onAction={() => go('tasks')} />
            <StatCard variant="tile" label="Over budget" value="2" delta="€14,300" trend="down" deltaLabel="above fee" onAction={() => go('reports')} />
          </section>

          <section data-tour="decisions" style={{ ...card, padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <span role="heading" aria-level={2} style={sectionTitle}>Pending decisions</span>
                <span style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)', color: 'var(--text-muted)' }}>Sign-offs holding up the next phase</span>
              </div>
              <Button size="sm" variant="ghost" iconRight="arrow-up-right" onClick={() => go('approvals')}>View all</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {APPROVALS.map((a, i) => (
                <ListRow
                  key={a.id}
                  leading={<ProjectPhoto id={a.proj} icon={a.icon} />}
                  icon={a.icon} iconTone={i === 0 ? 'accent' : 'neutral'}
                  title={a.item} meta={a.meta}
                  trailing={<Badge size="sm" tone={a.tone} dot={a.tone === 'negative'}>{a.due}</Badge>}
                  divider={i < APPROVALS.length - 1}
                  onClick={() => go('approvals#approval=' + a.id)}
                />
              ))}
            </div>
          </section>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2.05fr)', gap: 16, alignItems: 'stretch' }}>
          <section data-tour="activity" style={{ ...card, padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, minHeight: 44 }}>
              <span role="heading" aria-level={2} style={sectionTitle}>Recent activity</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ACTIVITY.map((r, i) => (
                <ListRow
                  key={r.title}
                  leading={r.who ? <PersonPhoto name={r.who} icon={r.icon} /> : <ProjectPhoto id={r.proj} icon={r.icon} />}
                  icon={r.icon} title={r.title} meta={r.meta} value={r.value} valueTone={r.tone}
                  divider={i < ACTIVITY.length - 1}
                />
              ))}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
              <Button variant="secondary" fullWidth iconRight="arrow-right" onClick={() => go('reports')}>Open reports</Button>
            </div>
          </section>

          <ActiveProjects dataState={dataState} showThumbnails={showThumbnails} />
        </div>
      </div>
    </>
  );
}
