import { HTMLAttributes, ReactNode } from 'react';

export interface SidebarProps {
  children?: ReactNode;
  /** Uncontrolled: initial expanded state (default: true) */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Called when expanded state changes */
  onExpandedChange?: (isExpanded: boolean) => void;
  /** Mobile: sidebar is visible as an overlay */
  isOpenMobile?: boolean;
  /** Mobile: callback to close the sidebar */
  onCloseMobile?: () => void;
  /** Mobile: show a floating hamburger button */
  showMobileTrigger?: boolean;
  /** Mobile: callback to open the sidebar */
  onOpenMobile?: () => void;
  className?: string;
}

export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement>;
export type SidebarBodyProps = HTMLAttributes<HTMLDivElement>;
export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>;
export type SidebarSubMenuProps = HTMLAttributes<HTMLDivElement>;

export interface SidebarItemProps {
  label: string;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  /** Sub-items: wrap in <Sidebar.SubMenu> */
  children?: ReactNode;
}

export interface SidebarToggleProps {
  className?: string;
}
