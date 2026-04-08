import { ChevronLeft } from 'lucide-react';
import { useSidebarContext } from './SidebarContext';
import type { SidebarToggleProps } from './Sidebar.types';

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ className }) => {
  const { isExpanded, toggle } = useSidebarContext();
  const classes = ['vega-sidebar__toggle', className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={toggle}
      aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      <ChevronLeft className="vega-sidebar__toggle-icon" size={18} aria-hidden="true" />
    </button>
  );
};

SidebarToggle.displayName = 'Sidebar.Toggle';
