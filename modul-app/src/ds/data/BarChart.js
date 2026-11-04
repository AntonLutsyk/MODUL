// Ported from the Atelier design system bundle (components/data/BarChart.jsx).
import React from 'react';

function BarChart({
  data = [],
  series = [{
    key: 'a',
    label: 'Planned'
  }, {
    key: 'b',
    label: 'Actual'
  }],
  height = 220,
  max,
  ticks = 5,
  format = v => v,
  style
}) {
  const keys = series.map(s => s.key);
  const top = max || Math.max(1, ...data.flatMap(d => keys.map(k => d[k] || 0))) * 1.1;
  const colors = ['var(--sage-400)', 'var(--surface-inverse)', 'var(--limestone-400)'];
  const tickVals = Array.from({
    length: ticks
  }, (_, i) => top / (ticks - 1) * (ticks - 1 - i));
  return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 16,
      borderRadius: 'var(--radius-tile)',
      background: 'var(--surface-inset)',
      ...style
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 18
    }
  }, series.map((s, i) => React.createElement("span", {
    key: s.key,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: colors[i]
    }
  }), s.label))), React.createElement("div", {
    style: {
      position: 'relative',
      height,
      display: 'grid',
      gridTemplateColumns: '44px 1fr'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--text-subtle)',
      paddingBottom: 22
    }
  }, tickVals.map((t, i) => React.createElement("span", {
    key: i,
    style: {
      lineHeight: '1px'
    }
  }, format(Math.round(t))))), React.createElement("div", {
    style: {
      position: 'relative',
      paddingBottom: 22
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 0 22px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, tickVals.map((_, i) => React.createElement("span", {
    key: i,
    style: {
      height: 1,
      background: 'var(--border-subtle)'
    }
  }))), React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      gap: 8
    }
  }, data.map((d, i) => React.createElement("div", {
    key: i,
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      gap: 4
    }
  }, keys.map((k, j) => React.createElement("span", {
    key: k,
    title: series[j].label + ': ' + format(d[k] || 0),
    style: {
      width: 14,
      height: (d[k] || 0) / top * 100 + '%',
      minHeight: 4,
      borderRadius: 6,
      background: colors[j],
      transition: 'height var(--dur-slow) var(--ease-out)'
    }
  })), React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -22,
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 12,
      color: 'var(--text-subtle)',
      whiteSpace: 'nowrap'
    }
  }, d.label)))))));
}

export { BarChart };
