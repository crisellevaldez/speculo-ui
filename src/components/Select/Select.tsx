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
  multiple?: boolean;
  searchable?: boolean;
  className?: string;
  renderOption?: (option: SelectOption) => React.ReactNode;
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
      multiple = false,
      searchable = false,
      className,
      renderOption,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
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
      "flex min-h-[40px] w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm border-gray-300 shadow-sm",
      disabled && "cursor-not-allowed bg-gray-50",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1"
        : "focus:outline-none focus:ring-1 focus:ring-gray-400",
      className,
    );
    const optionStyles = "px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer";
    const selectedOptionStyles = "bg-gray-100";

    return (
      <div ref={containerRef} className={baseStyles}>
        <div
          ref={ref}
          className={triggerStyles}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-sm"
                >
                  {option.label}
                  {multiple && (
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
          <span className="ml-2">
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
          </span>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {searchable && (
              <div className="p-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <ul
              className="max-h-60 overflow-auto"
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
