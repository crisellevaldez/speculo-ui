import React from "react";
import { cn } from "../../utils/cn";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../Calendar/Calendar";
import { Button } from "../Button/Button";

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  isLoading?: boolean;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disabledDates?: Date[];
  placeholder?: string;
  error?: string;
  helperText?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      value,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      isLoading = false,
      locale = "en-US",
      weekStartsOn = 0,
      disabledDates = [],
      placeholder = "Select date",
      error,
      helperText,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [tempDate, setTempDate] = React.useState<Date | null>(value);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      setTempDate(value);
    }, [value]);

    const handleDateSelect = (date: Date) => {
      setTempDate(date);
    };

    const handleClear = () => {
      setTempDate(null);
      onChange(null);
      setIsOpen(false);
    };

    const handleOk = () => {
      onChange(tempDate);
      setIsOpen(false);
    };

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setTempDate(value);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [value]);

    const formatDate = (date: Date | null) => {
      if (!date) return "";
      return new Intl.DateTimeFormat(locale).format(date);
    };

    const buttonStyles = cn(
      "shadow-sm flex h-10 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2",
      "text-sm ring-offset-background placeholder:text-gray-500",
      "focus:outline-none focus:ring-1 focus:ring-gray-400",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
      error &&
        "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1",
    );

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => !disabled && !isLoading && setIsOpen(true)}
          disabled={disabled || isLoading}
          className={cn(buttonStyles, "w-[200px]")}
        >
          <span className="text-gray-900">
            {formatDate(value) || placeholder}
          </span>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          )}
        </button>

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

        {isOpen && !disabled && !isLoading && (
          <div
            ref={containerRef}
            className={cn(
              "absolute left-0 top-full mt-2 flex flex-col rounded-md bg-white p-2 shadow-lg",
              "animate-in fade-in-0 zoom-in-95 z-50 border border-gray-200",
            )}
          >
            <Calendar
              value={tempDate || undefined}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
              locale={locale}
              weekStartsOn={weekStartsOn}
              disabledDates={disabledDates}
            />
            <div className="mt-2 flex justify-end gap-2 px-2">
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button onClick={handleOk}>OK</Button>
            </div>
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
