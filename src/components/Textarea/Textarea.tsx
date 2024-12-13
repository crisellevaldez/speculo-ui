import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
  autoResize?: boolean;
  maxLength?: number;
  showCount?: boolean;
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
      ...props
    },
    forwardedRef
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
      "block w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1";
    const stateStyles = cn(
      disabled && "cursor-not-allowed bg-gray-50 text-gray-500",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    );

    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="relative">
        <textarea
          ref={internalRef}
          value={value}
          onChange={handleChange}
          disabled={disabled}
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

        {/* Character count */}
        {showCount && (
          <div className="mt-1 text-sm text-gray-500 text-right">
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
  }
);

Textarea.displayName = "Textarea";
