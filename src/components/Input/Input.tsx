import React, { useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      helperText,
      startIcon,
      endIcon,
      disabled,
      isLoading,
      clearable = false,
      onClear,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "shadow-sm block w-full border rounded-md border-gray-300 py-1.5 text-gray-900 text-sm " +
      "placeholder-gray-500 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";

    const [inputValue, setInputValue] = useState(props.value || "");
    const [showClearButton, setShowClearButton] = useState(false);

    useEffect(() => {
      setInputValue(props.value || "");
      setShowClearButton(Boolean(props.value) && clearable);
    }, [props.value, clearable]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setShowClearButton(Boolean(e.target.value) && clearable);
      props.onChange?.(e);
    };

    const handleClear = () => {
      setInputValue("");
      setShowClearButton(false);

      // Create a synthetic event to trigger onChange
      const syntheticEvent = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      props.onChange?.(syntheticEvent);
      onClear?.();
    };

    const errorStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1"
      : "";

    const iconWrapperStyles = "absolute inset-y-0 flex items-center";

    const clearButtonStyles =
      "absolute right-0 inset-y-0 flex items-center pr-3 cursor-pointer";
    const iconSpacing = "px-2 md:px-3 lg:px-4"; // Responsive padding for icon containers

    const inputStyles = cn(
      baseStyles,
      errorStyles,
      className,
      startIcon ? "pl-9" : "pl-3",
      endIcon || isLoading || (clearable && showClearButton) ? "pr-9" : "pr-3",
    );

    return (
      <>
        <div className="relative text-sm">
          {startIcon && (
            <div
              className={cn(
                iconWrapperStyles,
                "left-0",
                iconSpacing,
                error && "text-red-500",
              )}
            >
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled || isLoading}
            className={inputStyles}
            value={inputValue}
            onChange={handleChange}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.id}-error`
                : helperText
                  ? `${props.id}-helper`
                  : undefined
            }
            {...props}
          />

          {isLoading ? (
            <div
              className={cn(
                iconWrapperStyles,
                "right-0",
                iconSpacing,
                "pointer-events-none",
              )}
            >
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
            </div>
          ) : clearable && showClearButton ? (
            <div
              className={clearButtonStyles}
              onClick={handleClear}
              role="button"
              aria-label="Clear input"
            >
              <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300">
                <X className="h-2 w-2" />
              </div>
            </div>
          ) : (
            endIcon && (
              <div
                className={cn(
                  iconWrapperStyles,
                  "right-0",
                  iconSpacing,
                  "pointer-events-none",
                  error && "text-red-500",
                )}
              >
                {endIcon}
              </div>
            )
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-1 text-sm">
            {error ? (
              <p className="text-red-500" id={`${props.id}-error`} role="alert">
                {error}
              </p>
            ) : helperText ? (
              <p className="text-gray-500" id={`${props.id}-helper`}>
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      </>
    );
  },
);

Input.displayName = "Input";
