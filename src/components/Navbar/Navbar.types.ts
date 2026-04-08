import { ReactNode } from "react";

export interface NavbarItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface UserMenuProps {
  avatar?: string;
  userName?: string;
  menuItems?: {
    label: string;
    onClick?: () => void;
    href?: string;
  }[];
}

export interface NavbarProps {
  logo?: ReactNode;
  items?: NavbarItemProps[];
  userMenu?: UserMenuProps;
  className?: string;
  /**
   * If true, the hamburger menu icon will show an 'X'.
   */
  isMenuOpen?: boolean;
  /**
   * Callback when the hamburger menu is clicked (mobile).
   */
  onMenuClick?: () => void;
  /**
   * Optional custom content to display in the Navbar (e.g., search bar).
   */
  children?: ReactNode;
}
