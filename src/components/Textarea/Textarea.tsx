import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
  autoResize?: boolean;
  maxLength?: number;
  showCount?: boolean;
  isLoading?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      helperText,
      autoResize,
      maxLength,
      showCount,
      value,
      onChange,
      disabled,
      isLoading,
      ...props
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize functionality
    const adjustHeight = () => {
      const textarea = internalRef.current;
      if (textarea && autoResize) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    // Sync refs
    useEffect(() => {
      if (!forwardedRef) return;

      if (typeof forwardedRef === "function") {
        forwardedRef(internalRef.current);
      } else {
        forwardedRef.current = internalRef.current;
      }
    }, [forwardedRef]);

    useEffect(() => {
      if (autoResize) {
        adjustHeight();
      }
    }, [value, autoResize]);

    // Handle changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
      onChange?.(e);
      if (autoResize) {
        adjustHeight();
      }
    };

    const baseStyles =
      "block w-full rounded-md border px-4 py-1.5 text-gray-900 border-gray-300 text-sm shadow-sm placeholder-gray-500 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400";
    const stateStyles = cn(
      (disabled || isLoading) && "cursor-not-allowed bg-gray-50 text-gray-500",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1"
        : "border-gray-300",
    );

    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="relative">
        <div className="relative">
          <textarea
            ref={internalRef}
            value={value}
            onChange={handleChange}
            disabled={disabled || isLoading}
            maxLength={maxLength}
            className={cn(baseStyles, stateStyles, className)}
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

          {isLoading && (
            <div className="absolute right-3 top-3">
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
          )}
        </div>

        {/* Character count */}
        {showCount && (
          <div className="mt-1 text-right text-sm text-gray-500">
            {currentLength}
            {maxLength && ` / ${maxLength}`}
          </div>
        )}

        {/* Error or helper text */}
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
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
