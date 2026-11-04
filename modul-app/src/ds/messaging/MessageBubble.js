// Ported from the Atelier design system bundle (components/messaging/MessageBubble.jsx).
import React from 'react';

function MessageBubble({
  children,
  time,
  author,
  outgoing,
  style
}) {
  return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: outgoing ? 'flex-end' : 'flex-start',
      gap: 4,
      ...style
    }
  }, author ? React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-muted)',
      padding: '0 4px'
    }
  }, author) : null, React.createElement("div", {
    style: {
      maxWidth: 520,
      padding: '14px 18px 10px',
      borderRadius: 'var(--radius-tile)',
      background: outgoing ? 'var(--sage-100)' : 'var(--surface-muted)',
      color: 'var(--text-strong)',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: '24px',
      textWrap: 'pretty'
    }
  }, children), time ? React.createElement("span", {
    style: {
      alignSelf: 'flex-end',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, time) : null));
}
function DateDivider({
  children = 'Today'
}) {
  return React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, React.createElement("span", {
    style: {
      padding: '6px 14px',
      borderRadius: 999,
      background: 'var(--surface-muted)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, children));
}

export { MessageBubble, DateDivider };
