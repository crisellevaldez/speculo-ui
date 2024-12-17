import React from "react";
import PhoneInput, { Country } from "react-phone-number-input";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";
import "react-phone-number-input/style.css";

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
            error &&
              "border-red-500 focus-within:border-red-500 focus-within:ring-red-500",
            (disabled || isLoading) && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          <PhoneInput
            // @ts-ignore - PhoneInput's ref type is incompatible with HTMLInputElement
            ref={ref}
            defaultCountry={defaultCountry}
            disabled={disabled || isLoading}
            international
            withCountryCallingCode
            countryCallingCodeEditable={false}
            className={cn(
              "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm",
              "placeholder-gray-500 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500",
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

// Add custom styles to override the default react-phone-number-input styles
const styles = `
.PhoneInput {
  display: flex;
  align-items: center;
}

.PhoneInputCountry {
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}

.PhoneInputCountrySelect {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  border: 0;
  opacity: 0;
  cursor: pointer;
  background: none;
  appearance: none;
  outline: none !important;
}

.PhoneInputCountrySelect:focus {
  outline: none !important;
  box-shadow: none !important;
}

.PhoneInputCountryIcon {
  width: 1.25rem;
  height: 1rem;
  object-fit: cover;
}

.PhoneInputCountryIcon--border {
  box-shadow: none;
  background-color: transparent;
}

.PhoneInputCountrySelectArrow {
  display: none;
}

.PhoneInputInput {
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  padding: 0;
  appearance: none;
  font-size: inherit;
  line-height: inherit;
}

.PhoneInputInput:focus {
  outline: none;
}

.PhoneInputInput:disabled {
  cursor: not-allowed;
}

.PhoneInputInput::placeholder {
  color: #9ca3af;
}
`;

// Create a style element and append it to the document head
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
