import type { SidebarHeaderProps } from './Sidebar.types';

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, className, ...rest }) => {
  const classes = ['vega-sidebar__header', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

SidebarHeader.displayName = 'Sidebar.Header';
