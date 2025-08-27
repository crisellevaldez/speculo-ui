import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative";

    const variants = {
      primary:
        "bg-gradient-to-b from-primary via-[#f0b05e] to-[#e8b05e] text-primary-foreground hover:from-primary hover:to-[#e5ac58]/80",
      secondary: "bg-black text-white hover:bg-black/80",
      outline:
        "border border-gray-400 text-gray-700 bg-transparent hover:bg-gray-100",
    };

    const sizes = {
      sm: "px-8 py-1.5 text-xs",
      md: "px-8 py-2 text-xs",
      lg: "px-8 py-2.5 text-sm",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">{children}</span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
