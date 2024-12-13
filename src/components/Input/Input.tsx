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
    ref
  ) => {
    const baseStyles =
      "block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";

    const errorStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "";

    const iconStyles = {
      base: "absolute top-1/2 -translate-y-1/2",
      start: "left-3",
      end: "right-3",
    };

    const inputStyles = cn(
      baseStyles,
      errorStyles,
      startIcon && "pl-10",
      endIcon && "pr-10",
      className
    );

    return (
      <div className="relative">
        {startIcon && (
          <span className={cn(iconStyles.base, iconStyles.start)}>
            {startIcon}
          </span>
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
          <span className={cn(iconStyles.base, iconStyles.end)}>{endIcon}</span>
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
  }
);

Input.displayName = "Input";
