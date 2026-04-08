import type { SidebarFooterProps } from './Sidebar.types';

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, className, ...rest }) => {
  const classes = ['vega-sidebar__footer', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

SidebarFooter.displayName = 'Sidebar.Footer';
