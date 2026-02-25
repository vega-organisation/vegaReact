import type { ContextMenuProps } from "./ContextMenu.types";
import { useState, useRef, useEffect } from "react";
import "./ContextMenu.css";


export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  className = "",
  disabled = false,
  onClick,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    onClick?.(event);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!disabled) {
      setIsOpen(!isOpen);
      handleClick(event);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`${className ? className : "context-menu"} ${disabled ? "disabled" : ""}`}
      onContextMenu={handleContextMenu}
    >
      {children}
      {items && isOpen && (
        <div className="context-menu-items">
          {items.map((item, index) => (
            <div key={index} onClick={item.onClick} className="context-menu-item">
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ContextMenu.displayName = "ContextMenu";
