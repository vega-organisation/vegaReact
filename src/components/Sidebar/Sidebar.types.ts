import { HTMLAttributes, ReactNode } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  children: ReactNode;
  className?: string;
}

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface SidebarBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface SidebarItemProps {
  icon?: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface SidebarSubMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface SidebarToggleProps {
  className?: string;
}
