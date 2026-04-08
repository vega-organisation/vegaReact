import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { SidebarItemProps } from './Sidebar.types';

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active = false,
  children,
  className,
  onClick,
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const hasSubMenu = !!children;

  const classes = [
    'vega-sidebar__item',
    active && 'vega-sidebar__item--active',
    hasSubMenu && subMenuOpen && 'vega-sidebar__item--open',
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
        <span className="vega-sidebar__item-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="vega-sidebar__item-label">{label}</span>
      {hasSubMenu && (
        <ChevronRight
          className={[
            'vega-sidebar__item-chevron',
            subMenuOpen && 'vega-sidebar__item-chevron--open',
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
    <div className="vega-sidebar__item-wrapper">
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
