import React from "react";
import { cn } from "../../utils/cn";

// FormControl Component
export interface FormControlProps {
  children: React.ReactNode;
  className?: string;
  error?: string;
  required?: boolean;
}

export const FormControl: React.FC<FormControlProps> = ({
  children,
  className,
  error,
  required,
}) => {
  return (
    <div className={cn("relative space-y-1", className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        // Pass error and required props to children
        return React.cloneElement(child, {
          ...child.props,
          error: error || child.props.error,
          required: required || child.props.required,
          "aria-required": required || child.props.required,
          "aria-invalid": error ? "true" : undefined,
        });
      })}
    </div>
  );
};

FormControl.displayName = "FormControl";

// FormLabel Component
export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("block text-sm font-medium text-gray-700", className)}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

// FormErrorMessage Component
export interface FormErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  children,
  className,
}) => {
  if (!children) return null;

  return (
    <p className={cn("mt-1 text-sm text-red-500", className)} role="alert">
      {children}
    </p>
  );
};

FormErrorMessage.displayName = "FormErrorMessage";

// FormHelperText Component
export interface FormHelperTextProps {
  children: React.ReactNode;
  className?: string;
}

export const FormHelperText: React.FC<FormHelperTextProps> = ({
  children,
  className,
}) => {
  if (!children) return null;

  return (
    <p className={cn("mt-1 text-sm text-gray-500", className)}>{children}</p>
  );
};

FormHelperText.displayName = "FormHelperText";

// Export all components
export const Form = {
  Control: FormControl,
  Label: FormLabel,
  ErrorMessage: FormErrorMessage,
  HelperText: FormHelperText,
};
