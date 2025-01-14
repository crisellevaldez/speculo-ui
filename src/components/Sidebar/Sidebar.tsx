import React from "react";
import { cn } from "../../utils/cn";

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  href?: string;
  items?: Omit<SidebarItemProps, "items">[];
  disabled?: boolean;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarItemProps[];
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  defaultCollapsed?: boolean;
}

const SidebarItem = React.forwardRef<
  HTMLDivElement,
  SidebarItemProps & {
    collapsed?: boolean;
    depth?: number;
  }
>(({ icon, label, href, items, disabled, collapsed, depth = 0 }, ref) => {
  const [expanded, setExpanded] = React.useState(false);
  const hasItems = items && items.length > 0;
  const isLink = !!href && !hasItems;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (hasItems) {
      e.preventDefault();
      setExpanded((prev) => !prev);
    }
  };

  const content = (
    <div
      ref={ref}
      className={cn(
        "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
        collapsed ? "justify-center" : "gap-2",
        "hover:bg-accent hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        depth > 0 && !collapsed && "ml-4",
        isLink && "cursor-pointer",
      )}
      role={isLink ? "link" : "button"}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {icon && (
        <span className={cn("flex h-4 w-4 items-center justify-center")}>
          {icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="flex-1">{label}</span>
          {hasItems && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "h-4 w-4 transition-transform",
                expanded && "rotate-180",
              )}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </>
      )}
    </div>
  );

  return (
    <div>
      {isLink ? (
        <a href={href} className={disabled ? "pointer-events-none" : ""}>
          {content}
        </a>
      ) : (
        content
      )}
      {hasItems && !collapsed && expanded && (
        <div className="mt-1">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              {...item}
              collapsed={collapsed}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
});

SidebarItem.displayName = "SidebarItem";

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      items,
      collapsed: controlledCollapsed,
      onCollapse,
      defaultCollapsed = false,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] =
      React.useState(defaultCollapsed);
    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled
      ? controlledCollapsed
      : uncontrolledCollapsed;

    const handleCollapse = () => {
      if (!isControlled) {
        setUncontrolledCollapsed((prev) => !prev);
      }
      onCollapse?.(!collapsed);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-col gap-4 border-r bg-background p-4 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className,
        )}
        {...props}
      >
        <button
          onClick={handleCollapse}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180",
            )}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <nav className="space-y-1">
          {items.map((item, index) => (
            <SidebarItem key={index} {...item} collapsed={collapsed} />
          ))}
        </nav>
      </div>
    );
  },
);

Sidebar.displayName = "Sidebar";
