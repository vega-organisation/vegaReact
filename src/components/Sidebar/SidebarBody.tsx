import type { SidebarBodyProps } from './Sidebar.types';

export const SidebarBody: React.FC<SidebarBodyProps> = ({ children, className, ...rest }) => {
  const classes = ['vega-sidebar__body', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

SidebarBody.displayName = 'Sidebar.Body';
