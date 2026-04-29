import type { SidebarSubMenuProps } from './Sidebar.types';

export const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({ children, className, ...rest }) => {
  const classes = ['vega-sidebar__submenu', className].filter(Boolean).join(' ');
  return (
    <div className={classes} role="group" {...rest}>
      {children}
    </div>
  );
};

SidebarSubMenu.displayName = 'Sidebar.SubMenu';
