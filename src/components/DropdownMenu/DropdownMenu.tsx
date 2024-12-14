import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  submenu?: React.ReactNode;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

export interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownContext = React.createContext<{
  closeMenu: () => void;
  closeAll: () => void;
} | null>(null);

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  onClick,
  disabled,
  className,
  icon,
  shortcut,
  submenu,
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const itemRef = useRef<HTMLButtonElement>(null);
  const context = React.useContext(DropdownContext);

  const handleClick = () => {
    if (disabled) return;
    if (submenu) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else {
      onClick?.();
      context?.closeAll();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleClick();
        break;
      case "ArrowRight":
        if (submenu) {
          e.preventDefault();
          setIsSubmenuOpen(true);
        }
        break;
      case "ArrowLeft":
        if (isSubmenuOpen) {
          e.preventDefault();
          setIsSubmenuOpen(false);
        }
        break;
    }
  };

  return (
    <div className="relative">
      <button
        ref={itemRef}
        className={cn(
          "flex w-full items-center px-3 py-2 text-sm",
          "focus:bg-gray-100 focus:outline-none",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "hover:bg-gray-100",
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        role="menuitem"
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span className="ml-4 text-xs text-gray-500">{shortcut}</span>
        )}
        {submenu && (
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>

      {submenu && isSubmenuOpen && (
        <div
          className="absolute left-full top-0 ml-1"
          onMouseLeave={() => setIsSubmenuOpen(false)}
        >
          {submenu}
        </div>
      )}
    </div>
  );
};

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  className,
}) => (
  <div className={cn("my-1 h-px bg-gray-200", className)} role="separator" />
);

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  align = "start",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);
  const closeAll = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
    if (!menuItems?.length) return;

    const currentIndex = Array.from(menuItems).findIndex(
      (item) => item === document.activeElement,
    );

    let nextIndex: number;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= menuItems.length) nextIndex = 0;
        (menuItems[nextIndex] as HTMLElement).focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = menuItems.length - 1;
        (menuItems[nextIndex] as HTMLElement).focus();
        break;
      case "Home":
        e.preventDefault();
        (menuItems[0] as HTMLElement).focus();
        break;
      case "End":
        e.preventDefault();
        (menuItems[menuItems.length - 1] as HTMLElement).focus();
        break;
    }
  };

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <DropdownContext.Provider value={{ closeMenu, closeAll }}>
      <div className="relative inline-block text-left">
        <div
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          {trigger}
        </div>

        {isOpen &&
          createPortal(
            <div
              ref={menuRef}
              className={cn(
                "absolute z-50 mt-2 min-w-[12rem] rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                alignClasses[align],
                className,
              )}
              style={{
                top: `${
                  triggerRef.current?.getBoundingClientRect().bottom ?? 0
                }px`,
                left: `${
                  triggerRef.current?.getBoundingClientRect().left ?? 0
                }px`,
              }}
              role="menu"
              onKeyDown={handleKeyDown}
            >
              {children}
            </div>,
            document.body,
          )}
      </div>
    </DropdownContext.Provider>
  );
};
