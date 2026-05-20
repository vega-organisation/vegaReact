import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import type {
  SidebarBodyProps,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarItemProps,
  SidebarProps,
  SidebarSubMenuProps,
  SidebarToggleProps,
} from './Sidebar.types';
import { SidebarContext, useSidebarContext } from './SidebarContext';
import './Sidebar.css';

type SidebarComponent = React.FC<SidebarProps> & {
  Header: React.FC<SidebarHeaderProps>;
  Body: React.FC<SidebarBodyProps>;
  Footer: React.FC<SidebarFooterProps>;
  Item: React.FC<SidebarItemProps>;
  SubMenu: React.FC<SidebarSubMenuProps>;
  Toggle: React.FC<SidebarToggleProps>;
};

export const Sidebar: SidebarComponent = ({
  children,
  defaultExpanded = true,
  expanded,
  onExpandedChange,
  isOpenMobile = false,
  showMobileTrigger = false,
  onOpenMobile,
  className = '',
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded! : internalExpanded;

  const toggle = () => {
    const next = !isExpanded;
    if (!isControlled) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const sidebarClasses = [
    'vega-sidebar',
    isExpanded ? 'vega-sidebar--expanded' : 'vega-sidebar--collapsed',
    isOpenMobile ? 'vega-sidebar--open-mobile' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <SidebarContext.Provider value={{ isExpanded, toggle }}>
      {showMobileTrigger && !isOpenMobile && (
        <button
          className="vega-sidebar-mobile-trigger"
          onClick={onOpenMobile}
          aria-label="Open Navigation"
        >
          <Menu size={24} />
        </button>
      )}
      <nav className={sidebarClasses} aria-label="Sidebar navigation">
        {children}
      </nav>
    </SidebarContext.Provider>
  );
};

Sidebar.displayName = 'Sidebar';

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, className = '', ...props }) => (
  <div className={['vega-sidebar-header', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
SidebarHeader.displayName = 'Sidebar.Header';

const SidebarBody: React.FC<SidebarBodyProps> = ({ children, className = '', ...props }) => (
  <div className={['vega-sidebar-content', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
SidebarBody.displayName = 'Sidebar.Body';

const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, className = '', ...props }) => (
  <div className={['vega-sidebar-footer', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
SidebarFooter.displayName = 'Sidebar.Footer';

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({ children, className = '', ...props }) => (
  <div className={['vega-sidebar-sub-items', className].filter(Boolean).join(' ')} role="group" {...props}>
    {children}
  </div>
);
SidebarSubMenu.displayName = 'Sidebar.SubMenu';

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active = false,
  children,
  className = '',
  onClick,
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const hasSubMenu = !!children;

  const classes = [
    'vega-sidebar-item',
    active && 'vega-sidebar-item--active',
    hasSubMenu && subMenuOpen && 'vega-sidebar-item--open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (hasSubMenu) setSubMenuOpen((prev) => !prev);
    onClick?.();
  };

  const content = (
    <>
      {icon && (
        <span className="vega-sidebar-item-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="vega-sidebar-item-label">{label}</span>
      {hasSubMenu && (
        <ChevronRight
          className={[
            'vega-sidebar-item-chevron',
            subMenuOpen && 'vega-sidebar-item-chevron--open',
          ]
            .filter(Boolean)
            .join(' ')}
          size={16}
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <div className="vega-sidebar-item-wrapper">
      {href && !hasSubMenu ? (
        <a
          href={href}
          className={classes}
          aria-current={active ? 'page' : undefined}
          onClick={onClick}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          className={classes}
          aria-expanded={hasSubMenu ? subMenuOpen : undefined}
          onClick={handleClick}
        >
          {content}
        </button>
      )}
      {hasSubMenu && subMenuOpen && children}
    </div>
  );
};
SidebarItem.displayName = 'Sidebar.Item';

const SidebarToggle: React.FC<SidebarToggleProps> = ({ className = '' }) => {
  const { isExpanded, toggle } = useSidebarContext();
  const classes = ['vega-sidebar-toggle', className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={toggle}
      aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      {isExpanded ? (
        <ChevronLeft size={18} aria-hidden="true" />
      ) : (
        <ChevronRight size={18} aria-hidden="true" />
      )}
    </button>
  );
};
SidebarToggle.displayName = 'Sidebar.Toggle';

Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;
Sidebar.Item = SidebarItem;
Sidebar.SubMenu = SidebarSubMenu;
Sidebar.Toggle = SidebarToggle;
