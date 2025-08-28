import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  className?: string;
  renderOption?: (option: SelectOption) => React.ReactNode;
  rows?: number; // Number of rows to display in the select component
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      error,
      helperText,
      disabled,
      isLoading,
      multiple = false,
      searchable = false,
      className,
      renderOption,
      rows = 1, // Default to 1 row
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Update dropdown position on scroll or resize
    useEffect(() => {
      if (!isOpen) return;

      const updatePosition = () => {
        if (dropdownRef.current && buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect();
          const dropdownHeight = 320; // Max height of dropdown (max-h-60 = 15rem = 240px) + padding and borders
          const spaceBelow = window.innerHeight - buttonRect.bottom;
          const spaceAbove = buttonRect.top;
          const openUpward =
            spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

          dropdownRef.current.style.left = `${buttonRect.left}px`;
          dropdownRef.current.style.width = `${buttonRect.width}px`;

          if (openUpward) {
            dropdownRef.current.style.bottom = `${window.innerHeight - buttonRect.top + 8}px`;
            dropdownRef.current.style.top = "auto";
          } else {
            dropdownRef.current.style.top = `${buttonRect.bottom + 8}px`;
            dropdownRef.current.style.bottom = "auto";
          }
        }
      };

      updatePosition(); // Initial position
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [isOpen]);

    const selectedOptions = multiple
      ? options.filter(
          (opt) => Array.isArray(value) && value.includes(opt.value),
        )
      : options.filter((opt) => opt.value === value);

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleOptionClick = (option: SelectOption) => {
      if (multiple) {
        const newValue = Array.isArray(value) ? [...value] : [];
        const index = newValue.indexOf(option.value);
        if (index === -1) {
          newValue.push(option.value);
        } else {
          newValue.splice(index, 1);
        }
        onChange?.(newValue);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
      }
      setSearchQuery("");
    };

    const handleRemoveOption = (
      e: React.MouseEvent,
      optionToRemove: SelectOption,
    ) => {
      e.stopPropagation(); // Prevent dropdown from opening
      if (multiple && Array.isArray(value)) {
        const newValue = value.filter((v) => v !== optionToRemove.value);
        onChange?.(newValue);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(target) &&
          !buttonRef.current?.contains(target)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const baseStyles =
      "relative w-full placeholder-gray-500 placeholder:text-sm";
    const triggerStyles = cn(
      "flex w-full items-center justify-between rounded-md border bg-white px-3 py-1.5 text-sm border-gray-300 shadow-sm overflow-hidden",
      rows === 1 && "max-h-[36px]",
      rows === 2 && "max-h-[60px]",
      rows === 3 && "max-h-[84px]",
      rows > 3 && "max-h-[108px]",
      (disabled || isLoading) && "cursor-not-allowed bg-gray-50",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1"
        : "focus:outline-none focus:ring-1 focus:ring-gray-400",
      className,
    );
    const optionStyles = "px-3 py-1.5 text-sm hover:bg-gray-100 cursor-pointer";
    const selectedOptionStyles = "bg-gray-100";

    return (
      <div ref={ref} className={cn("w-full", baseStyles)}>
        <div
          ref={buttonRef}
          className={triggerStyles}
          onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled || isLoading}
          tabIndex={disabled || isLoading ? -1 : 0}
        >
          <div
            className={cn(
              "relative flex flex-1 flex-wrap gap-1 bg-white",
              multiple &&
                selectedOptions.length > 3 &&
                "speculo-scrollbar z-[1] overflow-y-auto pr-1",
              rows === 1 &&
                multiple &&
                selectedOptions.length > 3 &&
                "max-h-[28px]",
              rows === 2 &&
                multiple &&
                selectedOptions.length > 3 &&
                "max-h-[52px]",
              rows === 3 &&
                multiple &&
                selectedOptions.length > 3 &&
                "max-h-[76px]",
              rows > 3 &&
                multiple &&
                selectedOptions.length > 3 &&
                "max-h-[100px]",
              !multiple &&
                selectedOptions.length > 0 &&
                "speculo-scrollbar z-[1] max-h-7 overflow-x-auto whitespace-nowrap",
            )}
          >
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-200/80 px-2 py-0.5 text-xs"
                >
                  {option.label}
                  {multiple && !isLoading && (
                    <button
                      onClick={(e) => handleRemoveOption(e, option)}
                      className="ml-1 rounded-full p-0.5 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      aria-label={`Remove ${option.label}`}
                    >
                      <svg
                        className="h-3 w-3 text-gray-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>

          <div className="ml-2 flex items-center">
            {isLoading ? (
              <svg
                className="h-4 w-4 animate-spin text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "rotate-180",
                )}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>

        {isOpen && !isLoading && (
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              left: buttonRef.current?.getBoundingClientRect().left + "px",
              ...(() => {
                if (!buttonRef.current) return { top: 0 };
                const buttonRect = buttonRef.current.getBoundingClientRect();
                const dropdownHeight = 320; // Max height of dropdown (max-h-60 = 15rem = 240px) + padding and borders
                const spaceBelow = window.innerHeight - buttonRect.bottom;
                const spaceAbove = buttonRect.top;
                const openUpward =
                  spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

                return openUpward
                  ? { bottom: window.innerHeight - buttonRect.top + 8 + "px" }
                  : { top: buttonRect.bottom + 8 + "px" };
              })(),
              width: buttonRef.current?.getBoundingClientRect().width + "px",
            }}
            className="z-[9999] flex max-h-[320px] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
          >
            {searchable && (
              <div className="p-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <ul
              className="speculo-scrollbar flex-1 overflow-y-auto"
              role="listbox"
              aria-multiselectable={multiple}
            >
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={cn(
                    optionStyles,
                    selectedOptions.includes(option) && selectedOptionStyles,
                  )}
                  role="option"
                  aria-selected={selectedOptions.includes(option)}
                  onClick={() => handleOptionClick(option)}
                >
                  {renderOption ? renderOption(option) : option.label}
                </li>
              ))}
              {filteredOptions.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}

        {(error || helperText) && (
          <div className="mt-1 text-sm">
            {error ? (
              <p className="text-red-500" role="alert">
                {error}
              </p>
            ) : (
              <p className="text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
