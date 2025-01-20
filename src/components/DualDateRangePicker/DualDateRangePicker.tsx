import React from "react";
import { cn } from "../../utils/cn";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { DualCalendar } from "./DualCalendar";
import { Button } from "../Button/Button";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DualDateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: DateRange;
  onChange: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  isLoading?: boolean;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disabledDates?: Date[];
  placeholder?: {
    from: string;
    to: string;
  };
  error?: string;
  helperText?: string;
}

export const DualDateRangePicker = React.forwardRef<
  HTMLDivElement,
  DualDateRangePickerProps
>(
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
      placeholder = { from: "Start date", to: "End date" },
      error,
      helperText,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [tempRange, setTempRange] = React.useState<DateRange>(value);
    const [isEditingEndDate, setIsEditingEndDate] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Get current month and next month dates
    const today = new Date();
    const [leftMonth, setLeftMonth] = React.useState(
      new Date(today.getFullYear(), today.getMonth(), 1),
    );
    const [rightMonth, setRightMonth] = React.useState(
      new Date(today.getFullYear(), today.getMonth() + 1, 1),
    );

    React.useEffect(() => {
      setTempRange(value);
    }, [value]);

    const handleDateSelect = (date: Date) => {
      if (isEditingEndDate) {
        // When editing end date, only update the end date
        if (date < tempRange.from!) {
          setTempRange({ ...tempRange, to: tempRange.from, from: date });
        } else {
          setTempRange({ ...tempRange, to: date });
        }
      } else {
        // Normal date selection flow
        if (!tempRange.from) {
          // When selecting start date
          const selectedMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            1,
          );
          const nextMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1,
          );

          setLeftMonth(selectedMonth);
          setRightMonth(nextMonth);
          setTempRange({ from: date, to: null });
        } else if (!tempRange.to) {
          // When selecting end date
          if (date < tempRange.from) {
            setTempRange({ from: date, to: tempRange.from });
          } else {
            setTempRange({ ...tempRange, to: date });
          }
        } else {
          // Starting new selection
          const selectedMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            1,
          );
          const nextMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1,
          );

          setLeftMonth(selectedMonth);
          setRightMonth(nextMonth);
          setTempRange({ from: date, to: null });
        }
      }
    };

    const handleStartClick = () => {
      if (!disabled && !isLoading) {
        setIsEditingEndDate(false);
        setIsOpen(true);
      }
    };

    const handleEndClick = () => {
      if (!disabled && !isLoading && value.from) {
        setIsEditingEndDate(true);
        setTempRange(value);
        // Set calendar months based on start date
        const startMonth = new Date(
          value.from.getFullYear(),
          value.from.getMonth(),
          1,
        );
        const nextMonth = new Date(
          value.from.getFullYear(),
          value.from.getMonth() + 1,
          1,
        );
        setLeftMonth(startMonth);
        setRightMonth(nextMonth);
        setIsOpen(true);
      } else if (!disabled && !isLoading) {
        // If no start date, behave like normal
        setIsEditingEndDate(false);
        setIsOpen(true);
      }
    };

    const handleClear = () => {
      setTempRange({ from: null, to: null });
      onChange({ from: null, to: null });
      setIsEditingEndDate(false);
    };

    const handleOk = () => {
      if (tempRange.from && !tempRange.to) {
        // If only start date is selected, use it as both start and end
        const finalRange = { from: tempRange.from, to: tempRange.from };
        onChange(finalRange);
      } else {
        onChange(tempRange);
      }
      setIsOpen(false);
      setIsEditingEndDate(false);
    };

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setTempRange(value);
          setIsEditingEndDate(false);
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
      "shadow-sm flex h-10 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-1.5",
      "text-sm ring-offset-background placeholder:text-gray-500",
      "focus:outline-none focus:ring-1 focus:ring-gray-400",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
      error &&
        "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1",
    );

    const getHighlightedDates = () => {
      if (!tempRange.from) return [];
      if (!tempRange.to) return [tempRange.from];

      const dates: Date[] = [];
      let current = new Date(tempRange.from);
      while (current <= tempRange.to) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };

    // Get the next month after the selected start date for right calendar navigation
    const rightMinMonth = tempRange.from
      ? new Date(tempRange.from.getFullYear(), tempRange.from.getMonth() + 1, 1)
      : minDate;

    // For date selection, use the actual start date as minDate
    const rightMinDate = tempRange.from || minDate;

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <div ref={triggerRef} className="flex gap-2">
          <button
            type="button"
            onClick={handleStartClick}
            disabled={disabled || isLoading}
            className={cn(buttonStyles, "w-[120px] md:w-[150px]")}
          >
            <span className="text-gray-900">
              {formatDate(value.from) || placeholder.from}
            </span>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            ) : (
              <CalendarIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <span className="flex items-center text-sm text-gray-500">to</span>
          <button
            type="button"
            onClick={handleEndClick}
            disabled={disabled || isLoading}
            className={cn(buttonStyles, "w-[120px] md:w-[150px]")}
          >
            <span className="text-gray-900">
              {formatDate(value.to) || placeholder.to}
            </span>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            ) : (
              <CalendarIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
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

        {isOpen && !disabled && !isLoading && (
          <div
            ref={dropdownRef}
            style={{
              ...(() => {
                if (!triggerRef.current) return {};
                const buttonRect = triggerRef.current.getBoundingClientRect();
                const isLargeScreen = window.innerWidth >= 1024;

                if (isLargeScreen) {
                  const dropdownHeight = 360;
                  const spaceBelow = window.innerHeight - buttonRect.bottom;
                  const spaceAbove = buttonRect.top;
                  const openUpward =
                    spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

                  return {
                    position: "fixed",
                    left: buttonRect.left + "px",
                    ...(openUpward
                      ? {
                          bottom:
                            window.innerHeight - buttonRect.top + 8 + "px",
                        }
                      : { top: buttonRect.bottom + 8 + "px" }),
                  };
                }

                return {
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                };
              })(),
            }}
            className={cn(
              "flex flex-col rounded-md bg-white shadow-lg",
              "animate-in fade-in-0 zoom-in-95 z-[9999] border border-gray-200",
              "max-h-[80vh] overflow-auto",
            )}
          >
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <DualCalendar
                  value={tempRange.from || undefined}
                  onChange={handleDateSelect}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={disabled}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  disabledDates={disabledDates}
                  highlightedDates={getHighlightedDates()}
                  viewDate={leftMonth}
                />
                <DualCalendar
                  value={tempRange.to || undefined}
                  onChange={handleDateSelect}
                  minDate={rightMinDate}
                  maxDate={maxDate}
                  disabled={disabled}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  disabledDates={disabledDates}
                  highlightedDates={getHighlightedDates()}
                  viewDate={rightMonth}
                  minViewDate={rightMinMonth}
                />
              </div>
            </div>
            <div className="sticky bottom-0 right-0 flex w-full justify-end gap-2 border-t bg-white p-2">
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

DualDateRangePicker.displayName = "DualDateRangePicker";
