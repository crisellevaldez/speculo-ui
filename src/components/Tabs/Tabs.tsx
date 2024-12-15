import React, { useState, useEffect } from "react";
import { cn } from "../../utils/cn";

export interface TabProps {
  value: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "line" | "enclosed" | "soft";
  orientation?: "horizontal" | "vertical";
  children: React.ReactElement<TabProps>[];
  className?: string;
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabsPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  variant: "line" | "enclosed" | "soft";
  orientation: "horizontal" | "vertical";
} | null>(null);

export const Tabs: React.FC<TabsProps> & {
  List: React.FC<TabsListProps>;
  Panel: React.FC<TabsPanelProps>;
} = ({
  defaultValue,
  value,
  onChange,
  variant = "line",
  orientation = "horizontal",
  children,
  className,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    value || defaultValue || (children[0]?.props.value ?? ""),
  );

  // Handle controlled mode
  useEffect(() => {
    if (value !== undefined) {
      setSelectedTab(value);
    }
  }, [value]);

  const handleTabChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedTab(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        setSelectedTab: handleTabChange,
        variant,
        orientation,
      }}
    >
      <div
        className={cn(
          "w-full",
          orientation === "horizontal" ? "space-y-2" : "flex gap-4",
          className,
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsList must be used within Tabs");

  const { variant, orientation } = context;

  const variants = {
    line: "border-b border-gray-200",
    enclosed: "space-x-1",
    soft: "p-1 bg-gray-100 rounded-lg space-x-1",
  };

  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? variants[variant] : "flex-col space-y-1",
        className,
      )}
      role="tablist"
    >
      {children}
    </div>
  );
};

const Tab: React.FC<TabProps> = ({ value, label, disabled }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const { selectedTab, setSelectedTab, variant, orientation } = context;
  const isSelected = selectedTab === value;

  const variants = {
    line: cn(
      "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
      isSelected
        ? "border-primary text-primary"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
    ),
    enclosed: cn(
      "px-4 py-2 text-sm font-medium rounded-t-lg border-t border-l border-r",
      isSelected
        ? "bg-white border-gray-200 text-blue-600"
        : "bg-transparent border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50",
    ),
    soft: cn(
      "px-4 py-2 text-sm font-medium rounded-md",
      isSelected
        ? "bg-white text-blue-600 shadow"
        : "text-gray-500 hover:text-gray-700",
    ),
  };

  const orientationStyles = {
    horizontal: "",
    vertical: cn(
      "border-l-2 -ml-px",
      isSelected
        ? "border-blue-500"
        : "border-transparent hover:border-gray-300",
    ),
  };

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={cn(
        "focus:outline-none focus:ring-0 focus:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        variants[variant],
        orientation === "vertical" && orientationStyles.vertical,
      )}
      onClick={() => !disabled && setSelectedTab(value)}
    >
      {label}
    </button>
  );
};

const TabPanel: React.FC<TabsPanelProps> = ({ value, children, className }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabPanel must be used within Tabs");

  const { selectedTab } = context;
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={className}
    >
      {children}
    </div>
  );
};

Tabs.List = TabsList;
Tabs.Panel = TabPanel;

// Export the Tab component separately since it's used differently
export { Tab };
