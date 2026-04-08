import { useState } from 'react';
import { SidebarContext } from './SidebarContext';
import { SidebarHeader } from './SidebarHeader';
import { SidebarBody } from './SidebarBody';
import { SidebarFooter } from './SidebarFooter';
import { SidebarItem } from './SidebarItem';
import { SidebarSubMenu } from './SidebarSubMenu';
import { SidebarToggle } from './SidebarToggle';
import type { SidebarProps } from './Sidebar.types';
import './Sidebar.css';

type SidebarComponent = React.FC<SidebarProps> & {
  Header: typeof SidebarHeader;
  Body: typeof SidebarBody;
  Footer: typeof SidebarFooter;
  Item: typeof SidebarItem;
  SubMenu: typeof SidebarSubMenu;
  Toggle: typeof SidebarToggle;
};

export const Sidebar: SidebarComponent = ({
  defaultExpanded = true,
  expanded: controlledExpanded,
  onExpandedChange,
  children,
  className,
  ...rest
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  const toggle = () => {
    const next = !isExpanded;
    if (!isControlled) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const classes = [
    'vega-sidebar',
    isExpanded ? 'vega-sidebar--expanded' : 'vega-sidebar--collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <SidebarContext.Provider value={{ isExpanded, toggle }}>
      <nav className={classes} aria-label="Sidebar navigation" {...rest}>
        {children}
      </nav>
    </SidebarContext.Provider>
  );
};

Sidebar.displayName = 'Sidebar';
Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;
Sidebar.Item = SidebarItem;
Sidebar.SubMenu = SidebarSubMenu;
Sidebar.Toggle = SidebarToggle;
