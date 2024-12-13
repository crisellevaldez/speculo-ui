import React from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, error, indeterminate, disabled, ...props },
    forwardedRef
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    // Merge the refs
    React.useEffect(() => {
      if (!forwardedRef) return;

      if (typeof forwardedRef === "function") {
        forwardedRef(internalRef.current);
      } else {
        forwardedRef.current = internalRef.current;
      }
    }, [forwardedRef]);

    const baseStyles =
      "h-4 w-4 rounded border focus:outline-none focus:ring-2 focus:ring-offset-2";
    const stateStyles = cn(
      disabled && "cursor-not-allowed opacity-50",
      error
        ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 text-blue-600 focus:border-blue-500 focus:ring-blue-500"
    );

    return (
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            ref={internalRef}
            disabled={disabled}
            className={cn(baseStyles, stateStyles, className)}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-2">
            <label
              htmlFor={props.id}
              className={cn(
                "text-sm font-medium text-gray-700",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label}
            </label>
            {error && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface CheckboxGroupProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  label,
  error,
  className,
}) => {
  return (
    <fieldset className={className}>
      {label && (
        <legend className="text-base font-medium text-gray-900">{label}</legend>
      )}
      <div className="mt-2 space-y-3">{children}</div>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
};
