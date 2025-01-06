import React, { useEffect, useState, useRef } from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

export interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface DrawerBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className,
  onClose,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-gray-200 px-4 py-2.5 md:px-6 md:py-3",
        className,
      )}
    >
      <div className="text-base font-semibold md:text-lg">{children}</div>
      {onClose && (
        <button
          type="button"
          className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800 md:h-5 md:w-5"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

const DrawerBody: React.FC<DrawerBodyProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-y-auto px-4 py-3 md:px-6 md:py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-gray-200 px-4 py-3 md:px-6 md:py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

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
    sm: "w-screen md:w-80",
    md: "w-screen md:w-96",
    lg: "w-screen md:w-[512px]",
    xl: "w-screen md:w-[640px]",
    full: "w-screen h-[100dvh]",
  },
  right: {
    sm: "w-screen md:w-80",
    md: "w-screen md:w-96",
    lg: "w-screen md:w-[512px]",
    xl: "w-screen md:w-[640px]",
    full: "w-screen h-[100dvh]",
  },
  top: {
    sm: "w-screen h-[50dvh] md:h-48 md:w-auto",
    md: "w-screen h-[50dvh] md:h-64 md:w-auto",
    lg: "w-screen h-[50dvh] md:h-96 md:w-auto",
    xl: "w-screen h-[60dvh] md:h-[512px] md:w-auto",
    full: "w-screen h-[100dvh]",
  },
  bottom: {
    sm: "w-screen h-[50dvh] md:h-48 md:w-auto",
    md: "w-screen h-[50dvh] md:h-64 md:w-auto",
    lg: "w-screen h-[50dvh] md:h-96 md:w-auto",
    xl: "w-screen h-[60dvh] md:h-[512px] md:w-auto",
    full: "w-screen h-[100dvh]",
  },
};

const positionStyles = {
  left: "left-0 top-0 h-[100dvh]",
  right: "right-0 top-0 h-[100dvh]",
  top: "top-0 left-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};

const DrawerComponent = React.forwardRef<HTMLDivElement, DrawerProps>(
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
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(open);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (open) {
        setIsVisible(true);
        previousFocusRef.current = document.activeElement as HTMLElement;

        // Calculate scrollbar width and add padding to prevent layout shift
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
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
        document.body.style.paddingRight = "";
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
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
              open ? "opacity-75" : "opacity-0",
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
            "fixed bg-white shadow-lg outline-none transition-transform duration-300 ease-in-out dark:bg-gray-800",
            positionStyles[side],
            sizeStyles[side][size],
            translateValue,
          )}
          onKeyDown={(e) => {
            if (e.key === "Escape" && closeOnEsc) {
              onClose();
            }
          }}
        >
          <div className="flex h-full flex-col">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === DrawerHeader) {
                return React.cloneElement(
                  child as React.ReactElement<DrawerHeaderProps>,
                  {
                    onClose,
                  },
                );
              }
              return child;
            })}
          </div>
        </div>
      </div>
    );
  },
);

DrawerComponent.displayName = "Drawer";

export const Drawer = DrawerComponent as typeof DrawerComponent & {
  Header: typeof DrawerHeader;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
