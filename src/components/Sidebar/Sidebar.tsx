import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, X, Menu } from "lucide-react";
import type { SidebarProps, SidebarItemProps } from "./Sidebar.types";
import "./Sidebar.css";

const SidebarItem: React.FC<{ 
  item: SidebarItemProps; 
  isCollapsed: boolean; 
  level?: number;
  onClickItem?: () => void;
}> = ({ item, isCollapsed, level = 0, onClickItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const toggleOpen = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      onClickItem?.();
    }
    item.onClick?.();
  };

  const classes = [
    "vega-sidebar-item",
    item.isActive ? "vega-sidebar-item--active" : "",
    isOpen ? "vega-sidebar-item--open" : "",
    `vega-sidebar-item--level-${level}`,
    item.className || ""
  ].filter(Boolean).join(" ");

  const content = (
    <>
      {item.icon && <span className="vega-sidebar-item-icon">{item.icon}</span>}
      {!isCollapsed && <span className="vega-sidebar-item-label">{item.label}</span>}
      {!isCollapsed && hasChildren && (
        <ChevronDown size={16} className={`vega-sidebar-item-chevron ${isOpen ? "vega-sidebar-item-chevron--open" : ""}`} />
      )}
    </>
  );

  return (
    <div className="vega-sidebar-item-wrapper">
      {item.href ? (
        <a href={item.href} className={classes} onClick={toggleOpen}>
          {content}
        </a>
      ) : (
        <button className={classes} onClick={toggleOpen}>
          {content}
        </button>
      )}

      {hasChildren && isOpen && !isCollapsed && (
        <div className="vega-sidebar-sub-items">
          {item.children?.map((child, idx) => (
            <SidebarItem key={idx} item={child} isCollapsed={isCollapsed} level={level + 1} onClickItem={onClickItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  logo,
  items = [],
  isCollapsible = true,
  defaultCollapsed = false,
  isOpenMobile = false,
  onCloseMobile,
  showMobileTrigger = false,
  onOpenMobile,
  className = "",
  footer,
  onToggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle?.(newState);
  };

  const sidebarClasses = [
    "vega-sidebar",
    isCollapsed ? "vega-sidebar--collapsed" : "",
    isOpenMobile ? "vega-sidebar--open-mobile" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <>
      {showMobileTrigger && !isOpenMobile && (
        <button 
          className="vega-sidebar-mobile-trigger" 
          onClick={onOpenMobile}
          aria-label="Open Navigation"
        >
          <Menu size={24} />
        </button>
      )}
      <aside className={sidebarClasses}>
        <div className="vega-sidebar-header">
          <div className="vega-sidebar-logo">
            {logo || <div className="vega-sidebar-logo-placeholder">V</div>}
          </div>
          
          {/* Toggle for Desktop */}
          {isCollapsible && (
            <button className="vega-sidebar-toggle" onClick={toggleSidebar}>
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}

          {/* Close for Mobile */}
          <button className="vega-sidebar-close-mobile" onClick={onCloseMobile}>
            <X size={24} />
          </button>
        </div>

        <div className="vega-sidebar-content">
          {items.map((item, idx) => (
            <SidebarItem 
              key={idx} 
              item={item} 
              isCollapsed={isCollapsed} 
              onClickItem={onCloseMobile}
            />
          ))}
        </div>

        {footer && (
          <div className="vega-sidebar-footer">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

Sidebar.displayName = "Sidebar";
