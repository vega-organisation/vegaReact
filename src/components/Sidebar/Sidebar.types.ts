import { ReactNode } from "react";

export interface SidebarItemProps {
  label: string;
  icon?: ReactNode;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  /**
   * Optional nested items for accordion support.
   */
  children?: SidebarItemProps[];
}

export interface SidebarProps {
  logo?: ReactNode;
  items?: SidebarItemProps[];
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  /**
   * For mobile: if true, the sidebar is visible as an overlay.
   */
  isOpenMobile?: boolean;
  /**
   * For mobile: callback to close the sidebar.
   */
  onCloseMobile?: () => void;
  /**
   * For mobile: if true, show a floating hamburger button to open the sidebar.
   */
  showMobileTrigger?: boolean;
  /**
   * For mobile: callback to open the sidebar (needed if showMobileTrigger is true).
   */
  onOpenMobile?: () => void;
  className?: string;
  /**
   * Optional footer content.
   */
  footer?: ReactNode;
  /**
   * Callback when collapsed state changes.
   */
  onToggle?: (isCollapsed: boolean) => void;
}
