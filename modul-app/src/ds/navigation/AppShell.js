// Ported from the Atelier design system bundle (components/navigation/AppShell.jsx).
import React from 'react';
import { BrandChip, UserMenu } from './BrandChip.js';
import { TopNav, HeaderGroup } from './TopNav.js';
import { IconButton } from '../core/IconButton.js';
import { IconRail } from './IconRail.js';

function AppShell({
  nav = [],
  navValue,
  onNav,
  rail = [],
  railValue,
  onRail,
  user,
  utilities,
  title,
  subtitle,
  actions,
  children,
  style
}) {
  return React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--bg-app)',
      padding: 'var(--shell-gutter)',
      display: 'grid',
      gridTemplateColumns: 'var(--shell-sidebar-w) minmax(0,1fr)',
      gridTemplateRows: 'var(--shell-header-h) 1fr',
      columnGap: 'var(--shell-content-gap)',
      rowGap: 'var(--space-6)',
      ...style
    }
  }, React.createElement("header", {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      minWidth: 0
    }
  }, React.createElement(BrandChip, null), React.createElement(TopNav, {
    items: nav,
    value: navValue,
    onChange: onNav
  }), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, utilities || React.createElement(HeaderGroup, null, React.createElement(IconButton, {
    icon: "search",
    label: "Search"
  }), React.createElement(IconButton, {
    icon: "bell",
    label: "Notifications",
    badge: true
  }), React.createElement(IconButton, {
    icon: "circle-help",
    label: "Help"
  })), user ? React.createElement(UserMenu, user) : null)), React.createElement(IconRail, {
    groups: rail,
    value: railValue,
    onChange: onRail,
    style: {
      position: 'sticky',
      top: 'var(--shell-gutter)',
      height: 'calc(100vh - var(--shell-header-h) - var(--shell-gutter) * 2 - var(--space-6))',
      minHeight: 560
    }
  }), React.createElement("main", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, title ? React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      paddingTop: 4
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--text-display)',
      lineHeight: 'var(--lh-display)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-strong)'
    }
  }, title), subtitle ? React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-lead)',
      lineHeight: 'var(--lh-lead)',
      color: 'var(--text-muted)'
    }
  }, subtitle) : null), actions ? React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexShrink: 0
    }
  }, actions) : null) : null, children));
}

export { AppShell };
