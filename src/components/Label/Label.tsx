import React from "react";
import { cn } from "../../utils/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, optional, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-destructive ml-0.5" aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="text-muted-foreground ml-1 text-xs">(optional)</span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

// FormLabel is a compound component that includes proper spacing for form layouts
export const FormLabel = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Label ref={ref} className={cn("block mb-2", className)} {...props} />
    );
  }
);

FormLabel.displayName = "FormLabel";
