// Ported from the Atelier design system bundle (components/data/ProgressBar.jsx).
import React from 'react';

function ProgressBar({
  value = 0,
  max = 100,
  tone = 'graphite',
  height = 8,
  hatched,
  label,
  valueLabel,
  style
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const onAccent = tone === 'onAccent';
  const fill = tone === 'accent' ? 'var(--accent)' : tone === 'warning' ? 'var(--status-warning)' : tone === 'negative' ? 'var(--status-negative)' : onAccent ? '#FFFFFF' : 'var(--text-strong)'; // MODUL: ink fill, lime on a light track was ~1.2:1
  const track = onAccent ? 'rgba(255,255,255,.22)' : 'var(--limestone-200)';
  const hatch = onAccent ? 'rgba(255,255,255,.45)' : 'var(--limestone-300)';
  return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, label || valueLabel ? React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      fontSize: 14,
      color: onAccent ? '#fff' : 'var(--text-strong)'
    }
  }, React.createElement("span", null, label), React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, valueLabel)) : null, React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max,
    style: {
      position: 'relative',
      height,
      borderRadius: 999,
      overflow: 'hidden',
      background: hatched ? 'repeating-linear-gradient(-55deg, ' + hatch + ' 0 1.5px, transparent 1.5px 6px)' : track
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: pct + '%',
      borderRadius: 999,
      background: fill,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}

export { ProgressBar };
