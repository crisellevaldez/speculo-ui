import React from "react";
import { cn } from "../../utils/cn";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "circle" | "loading";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  indeterminate?: boolean;
}

const sizeStyles = {
  sm: {
    bar: "h-1",
    circle: "h-8 w-8",
    text: "text-xs",
  },
  md: {
    bar: "h-2",
    circle: "h-12 w-12",
    text: "text-sm",
  },
  lg: {
    bar: "h-3",
    circle: "h-16 w-16",
    text: "text-base",
  },
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      showValue = false,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    if (variant === "circle") {
      const radius = 40;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percentage / 100) * circumference;

      return (
        <div
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center",
            sizeStyles[size].circle,
            className
          )}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          {...props}
        >
          <svg className="transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-muted-foreground/20"
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              fill="none"
              stroke="currentColor"
            />
            {/* Progress circle */}
            <circle
              className={cn(
                "transition-all duration-300 ease-in-out",
                indeterminate
                  ? "animate-progress-spin text-primary"
                  : "text-primary"
              )}
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              fill="none"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={indeterminate ? 0 : offset}
              strokeLinecap="round"
            />
          </svg>
          {showValue && !indeterminate && (
            <div className={cn("absolute", sizeStyles[size].text)}>
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        {...props}
      >
        <div
          className={cn(
            "w-full overflow-hidden rounded-full bg-primary/20",
            sizeStyles[size].bar
          )}
        >
          {variant === "loading" || indeterminate ? (
            <div
              className={cn("h-full w-full flex", "animate-progress-loading")}
            >
              <div className="w-1/3 h-full bg-primary rounded-full" />
            </div>
          ) : (
            <div
              className={cn(
                "h-full bg-primary transition-all duration-300 ease-in-out rounded-full"
              )}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
        {showValue && !indeterminate && (
          <div className={cn("mt-1 text-right", sizeStyles[size].text)}>
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";
