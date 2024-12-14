import React from "react";
import { cn } from "../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, helperText, startIcon, endIcon, disabled, ...props },
    ref,
  ) => {
    const baseStyles =
      "shadow-sm block w-full border rounded-md border-gray-300 px-3 py-2 text-gray-900 text-sm " +
      "placeholder-gray-500 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";

    const errorStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1"
      : "";

    const iconWrapperStyles =
      "absolute inset-y-0 flex items-center pointer-events-none";
    const iconSpacing = "px-3"; // Consistent padding for icon containers

    const inputStyles = cn(
      baseStyles,
      errorStyles,
      startIcon && "pl-9",
      endIcon && "pr-9",
      className,
    );

    return (
      <div className="relative">
        {startIcon && (
          <div className={cn(iconWrapperStyles, "left-0", iconSpacing)}>
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={inputStyles}
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

        {endIcon && (
          <div className={cn(iconWrapperStyles, "right-0", iconSpacing)}>
            {endIcon}
          </div>
        )}

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

Input.displayName = "Input";
