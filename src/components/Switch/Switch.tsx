import React from "react";
import { cn } from "../../utils/cn";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: {
    switch: "h-[20px] w-[36px]",
    thumb: "h-[14px] w-[14px] translate-x-[3px]",
    thumbChecked: "translate-x-[17px]",
  },
  md: {
    switch: "h-[24px] w-[44px]",
    thumb: "h-[18px] w-[18px] translate-x-[3px]",
    thumbChecked: "translate-x-[21px]",
  },
  lg: {
    switch: "h-[28px] w-[52px]",
    thumb: "h-[22px] w-[22px] translate-x-[3px]",
    thumbChecked: "translate-x-[25px]",
  },
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      size = "md",
      id,
      checked,
      defaultChecked,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);
    const generatedId = React.useId();
    const switchId = id || generatedId;
    const {
      switch: switchSize,
      thumb: thumbSize,
      thumbChecked,
    } = sizeStyles[size];

    // Handle controlled and uncontrolled states
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        if (onChange) {
          onChange(e);
        }
        if (checked === undefined) {
          setIsChecked(e.target.checked);
        }
      }
    };

    // Use either controlled value or internal state
    const isOn = checked !== undefined ? checked : isChecked;

    return (
      <div className="flex items-center gap-2">
        <div className="relative inline-flex">
          <input
            type="checkbox"
            id={switchId}
            className="peer sr-only"
            ref={ref}
            checked={isOn}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
          <label
            htmlFor={switchId}
            className={cn(
              "block cursor-pointer rounded-full transition-colors duration-200",
              "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              isOn ? "bg-primary" : "bg-gray-400 dark:bg-gray-800",
              switchSize,
              "flex items-center",
              className,
            )}
          >
            <div
              className={cn(
                "rounded-full transition-all duration-200",
                "flex items-center justify-center",
                "bg-white shadow-sm",
                thumbSize,
                isOn && thumbChecked,
              )}
            ></div>
          </label>
        </div>
        {label && (
          <label
            htmlFor={switchId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
