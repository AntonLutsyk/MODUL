// Ported from the Atelier design system bundle (components/data/DataTable.jsx).
import React from 'react';
import { pressable } from '../a11y.js';

function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  rowKey,
  empty = 'Nothing here yet',
  dense,
  style
}) {
  const tpl = columns.map(c => c.width || 'minmax(0,1fr)').join(' ');
  const pad = dense ? '10px 0' : '14px 0';
  return React.createElement("div", {
    role: "table",
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...style
    }
  }, React.createElement("div", {
    role: "row",
    style: {
      display: 'grid',
      gridTemplateColumns: tpl,
      columnGap: 16,
      alignItems: 'center',
      height: 48,
      padding: '0 20px',
      borderRadius: 'var(--radius-tile)',
      background: 'var(--surface-inset)'
    }
  }, columns.map(c => React.createElement("span", {
    role: "columnheader",
    key: c.key,
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-muted)',
      textAlign: c.align || 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, c.label))), rows.length === 0 ? React.createElement("div", {
    style: {
      padding: '28px 20px',
      fontSize: 14,
      color: 'var(--text-subtle)',
      textAlign: 'center'
    }
  }, empty) : null, rows.map((r, i) => React.createElement(Row, {
    key: rowKey ? r[rowKey] : i,
    row: r,
    columns: columns,
    tpl: tpl,
    pad: pad,
    last: i === rows.length - 1,
    onClick: onRowClick ? () => onRowClick(r) : null
  })));
}
function Row({
  row,
  columns,
  tpl,
  pad,
  last,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement("div", {
    role: "row",
    // MODUL: clickable rows are reachable with Tab and open with Enter / Space.
    ...pressable(onClick, 'row'),
    onClick: onClick || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: tpl,
      columnGap: 16,
      alignItems: 'center',
      padding: '0 20px',
      minHeight: 60,
      borderBottom: last ? 0 : '1px solid var(--border-subtle)',
      cursor: onClick ? 'pointer' : undefined,
      background: hover && onClick ? 'var(--ivory-50)' : 'transparent',
      borderRadius: hover && onClick ? 12 : 0,
      transition: 'background var(--dur-fast)'
    }
  }, columns.map(c => React.createElement("div", {
    role: "cell",
    key: c.key,
    style: {
      padding: pad,
      fontSize: 14,
      color: 'var(--text-strong)',
      textAlign: c.align || 'left',
      minWidth: 0,
      fontVariantNumeric: c.numeric ? 'tabular-nums' : undefined,
      display: 'flex',
      justifyContent: c.align === 'right' ? 'flex-end' : c.align === 'center' ? 'center' : 'flex-start'
    }
  }, c.render ? c.render(row) : row[c.key])));
}

export { DataTable };
