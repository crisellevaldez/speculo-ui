import React from "react";
import PhoneInput, { Country } from "react-phone-number-input";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

// Import styles directly into the CSS module
import "./phone-number.css";

export interface PhoneNumberProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  error?: string;
  isLoading?: boolean;
  defaultCountry?: Country;
  helperText?: string;
}

export const PhoneNumber = React.forwardRef<HTMLInputElement, PhoneNumberProps>(
  (
    {
      className,
      error,
      isLoading = false,
      disabled = false,
      defaultCountry = "US",
      helperText,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <div
          className={cn(
            "relative flex items-center rounded-md",
            (disabled || isLoading) && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          <PhoneInput
            // @ts-expect-error - PhoneInput's ref type is incompatible with HTMLInputElement but works at runtime
            ref={ref}
            defaultCountry={defaultCountry}
            disabled={disabled || isLoading}
            international
            withCountryCallingCode
            countryCallingCodeEditable={false}
            className={cn(
              "block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 shadow-sm",
              "placeholder-gray-500 placeholder:text-sm",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
              error ? "phone-input-error" : "phone-input-default",
            )}
            {...props}
          />
          {isLoading && (
            <div className="pointer-events-none absolute right-3 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className="mt-1 text-sm">
            {error ? (
              <p className="text-red-500" role="alert">
                {error}
              </p>
            ) : (
              <p className="text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

PhoneNumber.displayName = "PhoneNumber";
