import type { ReactNode } from "react";

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
