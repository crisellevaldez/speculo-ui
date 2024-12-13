import React from "react";
import { cn } from "../../utils/cn";

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  items: AccordionItemProps[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps & {
    isOpen: boolean;
    onToggle: () => void;
    itemId: string;
  }
>(({ title, children, disabled, isOpen, onToggle, itemId }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setHeight(contentRef.current?.scrollHeight);
      });
      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "border-b last:border-0",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between py-4 px-6 text-sm font-medium transition-all hover:underline",
          disabled && "cursor-not-allowed",
          isOpen && "text-primary"
        )}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${itemId}`}
        id={`accordion-trigger-${itemId}`}
      >
        <span className="text-base">{title}</span>
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
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        ref={contentRef}
        id={`accordion-content-${itemId}`}
        role="region"
        aria-labelledby={`accordion-trigger-${itemId}`}
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          !isOpen && "h-0"
        )}
        style={{ height: isOpen ? height : 0 }}
      >
        <div className="px-6 pb-4 pt-0">{children}</div>
      </div>
    </div>
  );
});

AccordionItem.displayName = "AccordionItem";

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      items,
      type = "single",
      defaultValue,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [state, setState] = React.useState<string[]>(() => {
      if (value !== undefined) return Array.isArray(value) ? value : [value];
      if (defaultValue !== undefined)
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      return [];
    });

    const isControlled = value !== undefined;
    const currentValue = isControlled
      ? Array.isArray(value)
        ? value
        : [value]
      : state;

    const handleToggle = React.useCallback(
      (itemId: string) => {
        const newValue = currentValue.includes(itemId)
          ? currentValue.filter((id) => id !== itemId)
          : type === "single"
            ? [itemId]
            : [...currentValue, itemId];

        if (!isControlled) {
          setState(newValue);
        }

        onChange?.(type === "single" ? newValue[0] || "" : newValue);
      },
      [currentValue, isControlled, onChange, type]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            {...item}
            itemId={`item-${index}`}
            isOpen={currentValue.includes(`item-${index}`)}
            onToggle={() => handleToggle(`item-${index}`)}
          />
        ))}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";
