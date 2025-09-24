"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Create a proper context for tabs
interface TabsContextValue {
  value: string;
  onSelect: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(value || defaultValue || "");

    React.useEffect(() => {
      if (value !== undefined) {
        setActiveTab(value);
      }
    }, [value]);

    const handleTabChange = React.useCallback((tabValue: string) => {
      if (value === undefined) {
        setActiveTab(tabValue);
      }
      onValueChange?.(tabValue);
    }, [value, onValueChange]);

    return (
      <TabsContext.Provider value={{ value: activeTab, onSelect: handleTabChange }}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          data-value={activeTab}
          suppressHydrationWarning
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 dark:bg-gray-800 w-full",
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { value: activeValue, onSelect } = useTabsContext();
    const isActive = activeValue === value;

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 w-full",
          isActive 
            ? "bg-white text-gray-950 shadow-sm dark:bg-gray-900 dark:text-gray-50" 
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
          className
        )}
        onClick={() => onSelect(value)}
        data-state={isActive ? "active" : "inactive"}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: activeValue } = useTabsContext();
    const isActive = activeValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        className={cn("mt-2", className)}
        data-state={isActive ? "active" : "inactive"}
        suppressHydrationWarning
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
