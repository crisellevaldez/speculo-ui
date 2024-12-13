import React from "react";
import { cn } from "../../utils/cn";

export interface ComboBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboBoxProps {
  options: ComboBoxOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  maxItems?: number;
  className?: string;
  onInputChange?: (value: string) => void;
  renderOption?: (option: ComboBoxOption) => React.ReactNode;
}

export const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      disabled = false,
      loading = false,
      multiple = false,
      maxItems,
      className,
      onInputChange,
      renderOption,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const selectedValues = React.useMemo(() => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    }, [value]);

    const filteredOptions = React.useMemo(() => {
      return options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }, [options, inputValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(true);
      onInputChange?.(newValue);
      setHighlightedIndex(0);
    };

    const handleOptionClick = (option: ComboBoxOption) => {
      if (option.disabled) return;

      if (multiple) {
        const newValues = selectedValues.includes(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];

        if (maxItems && newValues.length > maxItems) return;

        onChange?.(newValues);
        setInputValue("");
      } else {
        onChange?.(option.value);
        setInputValue("");
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setIsOpen(true);
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setIsOpen(true);
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;

        case "Enter":
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;

        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "ring-offset-background placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={() => setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="combobox-options"
            aria-activedescendant={
              highlightedIndex >= 0
                ? `option-${filteredOptions[highlightedIndex].value}`
                : undefined
            }
          />
          {loading && (
            <div className="absolute right-3 top-3 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          )}
        </div>

        {multiple && selectedValues.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedValues.map((val) => {
              const option = options.find((opt) => opt.value === val);
              if (!option) return null;

              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs"
                >
                  {option.label}
                  <button
                    onClick={() => handleOptionClick(option)}
                    className="hover:text-destructive focus:outline-none"
                    aria-label={`Remove ${option.label}`}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {isOpen && filteredOptions.length > 0 && (
          <div
            className={cn(
              "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md",
              "animate-in fade-in-0 zoom-in-95"
            )}
            id="combobox-options"
            role="listbox"
          >
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  highlightedIndex === index &&
                    "bg-accent text-accent-foreground",
                  selectedValues.includes(option.value) && "font-medium"
                )}
                role="option"
                aria-selected={selectedValues.includes(option.value)}
                id={`option-${option.value}`}
                onClick={() => handleOptionClick(option)}
              >
                {renderOption ? renderOption(option) : option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ComboBox.displayName = "ComboBox";
