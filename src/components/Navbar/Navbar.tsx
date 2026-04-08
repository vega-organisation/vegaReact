import React, { useState } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import type { NavbarProps, NavbarItemProps } from "./Navbar.types";
import "./Navbar.css";

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  items = [],
  userMenu,
  className = "",
  isMenuOpen = false,
  onMenuClick,
  children,
}) => {
  const [isInternalMobileMenuOpen, setIsInternalMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      setIsInternalMobileMenuOpen(!isInternalMobileMenuOpen);
    }
  };

  const activeMobileMenu = onMenuClick ? isMenuOpen : isInternalMobileMenuOpen;
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const renderItem = (item: NavbarItemProps, index: number) => {
    const classes = `vega-navbar-item ${item.isActive ? "vega-navbar-item--active" : ""} ${item.className || ""}`;
    
    if (item.href) {
      return (
        <a key={index} href={item.href} className={classes} onClick={item.onClick}>
          {item.label}
        </a>
      );
    }
    
    return (
      <button key={index} className={classes} onClick={item.onClick}>
        {item.label}
      </button>
    );
  };

  return (
    <nav className={`vega-navbar ${className}`}>
      <div className="vega-navbar-container">
        <div className="vega-navbar-logo">
          {logo || <div className="vega-navbar-logo-placeholder">Logo</div>}
        </div>

        <div className="vega-navbar-links">
          {items.map(renderItem)}
          {children}
        </div>

        <div className="vega-navbar-actions">
          {userMenu && (
            <div className="vega-navbar-user">
              <button 
                className="vega-navbar-user-trigger" 
                onClick={toggleUserMenu}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                {userMenu.avatar ? (
                  <img src={userMenu.avatar} alt={userMenu.userName || "User"} className="vega-navbar-avatar" />
                ) : (
                  <div className="vega-navbar-avatar-placeholder"><User size={20} /></div>
                )}
                {userMenu.userName && <span className="vega-navbar-user-name">{userMenu.userName}</span>}
              </button>
              
              {isUserMenuOpen && (
                <div className="vega-navbar-user-dropdown">
                   {userMenu.menuItems ? (
                      userMenu.menuItems.map((menuItem, idx) => (
                        <a 
                          key={idx} 
                          href={menuItem.href || "#"} 
                          className="vega-navbar-dropdown-item"
                          onClick={(e) => {
                            if (!menuItem.href) e.preventDefault();
                            menuItem.onClick?.();
                            setIsUserMenuOpen(false);
                          }}
                        >
                          {menuItem.label}
                        </a>
                      ))
                   ) : (
                    <>
                      <a href="#settings" className="vega-navbar-dropdown-item"><Settings size={16} /> Settings</a>
                      <button className="vega-navbar-dropdown-item vega-navbar-dropdown-item--danger"><LogOut size={16} /> Logout</button>
                    </>
                   )}
                </div>
              )}
            </div>
          )}

          <button 
            className="vega-navbar-hamburger" 
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation"
            aria-expanded={activeMobileMenu}
          >
            {activeMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {!onMenuClick && (
        <div className={`vega-navbar-mobile-overlay ${activeMobileMenu ? "vega-navbar-mobile-overlay--open" : ""}`}>
          <div className="vega-navbar-mobile-content">
            <div className="vega-navbar-mobile-header">
              <div className="vega-navbar-logo">{logo || <div className="vega-navbar-logo-placeholder">Logo</div>}</div>
              <button className="vega-navbar-close" onClick={toggleMobileMenu}><X size={24} /></button>
            </div>
            <div className="vega-navbar-mobile-links">
              {items.map((item, idx) => (
                <div key={idx} onClick={() => setIsInternalMobileMenuOpen(false)}>
                  {renderItem(item, idx)}
                </div>
              ))}
              {children}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
