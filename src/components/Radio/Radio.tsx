import React from "react";
import { cn } from "../../utils/cn";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, disabled, ...props }, ref) => {
    const baseStyles =
      "h-4 w-4 border focus:outline-none focus:ring-2 focus:ring-offset-2";
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
            type="radio"
            ref={ref}
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

Radio.displayName = "Radio";

export interface RadioGroupProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  className?: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  label,
  error,
  className,
  name,
  value,
  onChange,
}) => {
  // Clone children to inject name and checked state
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<RadioProps>(child)) return child;

    // Only clone if it's a Radio component
    if (child.type === Radio) {
      return React.cloneElement(child, {
        ...child.props,
        name,
        checked: value === child.props.value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e.target.value);
          child.props.onChange?.(e);
        },
      });
    }

    return child;
  });

  return (
    <fieldset className={className}>
      {label && (
        <legend className="text-base font-medium text-gray-900">{label}</legend>
      )}
      <div className="mt-2 space-y-3">{enhancedChildren}</div>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
};
