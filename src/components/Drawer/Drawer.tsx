import React, { useEffect, useState, useRef } from "react";
import { cn } from "../../utils/cn";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  overlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const sizeStyles = {
  left: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[448px]",
    full: "w-screen",
  },
  right: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[448px]",
    full: "w-screen",
  },
  top: {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
    xl: "h-96",
    full: "h-screen",
  },
  bottom: {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
    xl: "h-96",
    full: "h-screen",
  },
};

const positionStyles = {
  left: "left-0 top-0 h-full",
  right: "right-0 top-0 h-full",
  top: "top-0 left-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      children,
      side = "right",
      size = "md",
      overlay = true,
      closeOnOverlayClick = true,
      closeOnEsc = true,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(open);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (open) {
        setIsVisible(true);
        previousFocusRef.current = document.activeElement as HTMLElement;
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
          if (ref && typeof ref === "function") {
            ref(document.activeElement as HTMLDivElement);
          } else if (ref?.current) {
            ref.current.focus();
          }
        });
      } else {
        document.body.style.overflow = "";
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }

      return () => {
        document.body.style.overflow = "";
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }, [open, ref]);

    useEffect(() => {
      if (closeOnEsc) {
        const handleEsc = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            onClose();
          }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
      }
    }, [closeOnEsc, onClose]);

    if (!isVisible && !open) return null;

    const translateValue = {
      left: open ? "translate-x-0" : "-translate-x-full",
      right: open ? "translate-x-0" : "translate-x-full",
      top: open ? "translate-y-0" : "-translate-y-full",
      bottom: open ? "translate-y-0" : "translate-y-full",
    }[side];

    return (
      <div className="fixed inset-0 z-50" ref={ref}>
        {/* Overlay */}
        {overlay && (
          <div
            className={cn(
              "fixed inset-0 bg-black transition-opacity duration-[2000ms] ease-in-out",
              open ? "opacity-75" : "opacity-0"
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cn(
            "fixed bg-white dark:bg-gray-800 shadow-lg outline-none transition-transform duration-300 ease-in-out",
            positionStyles[side],
            sizeStyles[side][size],
            translateValue
          )}
          onKeyDown={(e) => {
            if (e.key === "Escape" && closeOnEsc) {
              onClose();
            }
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = "Drawer";
