import React from "react";
import { cn } from "../../utils/cn";

export interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  arrow?: boolean;
}

export const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      className,
      trigger,
      children,
      openDelay = 200,
      closeDelay = 300,
      side = "bottom",
      align = "center",
      arrow = true,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    const handleMouseEnter = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, openDelay);
    };

    const handleMouseLeave = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, closeDelay);
    };

    React.useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, []);

    const getPosition = () => {
      if (!triggerRef.current) return {};

      const contentStyles: React.CSSProperties = {};

      switch (side) {
        case "top":
          contentStyles.bottom = "100%";
          break;
        case "right":
          contentStyles.left = "100%";
          break;
        case "bottom":
          contentStyles.top = "100%";
          break;
        case "left":
          contentStyles.right = "100%";
          break;
      }

      switch (align) {
        case "start":
          contentStyles[side === "left" || side === "right" ? "top" : "left"] =
            0;
          break;
        case "center":
          contentStyles[side === "left" || side === "right" ? "top" : "left"] =
            "50%";
          contentStyles.transform = "translate(-50%, -50%)";
          break;
        case "end":
          contentStyles[
            side === "left" || side === "right" ? "bottom" : "right"
          ] = 0;
          break;
      }

      return contentStyles;
    };

    return (
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        {...props}
      >
        <div ref={triggerRef}>{trigger}</div>
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 min-w-[220px] rounded-md bg-white text-popover-foreground shadow-md outline-none",
              "animate-in fade-in-0 zoom-in-95",
              className,
            )}
            style={getPosition()}
            role="tooltip"
          >
            {arrow && (
              <div
                className={cn(
                  "absolute h-2 w-2 rotate-45 border bg-popover",
                  side === "top" && "bottom-[-5px] border-b border-r",
                  side === "right" && "left-[-5px] border-l border-t",
                  side === "bottom" && "top-[-5px] border-l border-t",
                  side === "left" && "right-[-5px] border-r border-t",
                  align === "start" && "left-4",
                  align === "center" && "left-1/2 -translate-x-1/2",
                  align === "end" && "right-4",
                )}
              />
            )}
            <div className="relative">{children}</div>
          </div>
        )}
      </div>
    );
  },
);

HoverCard.displayName = "HoverCard";
