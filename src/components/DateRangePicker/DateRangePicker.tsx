import React from "react";
import { cn } from "../../utils/cn";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../Calendar/Calendar";
import { Button } from "../Button/Button";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DateRangePickerProps
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

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
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
    const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);
    const [tempRange, setTempRange] = React.useState<DateRange>(value);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      setTempRange(value);
    }, [value]);

    const handleStartDateSelect = (date: Date) => {
      if (!tempRange.to) {
        setTempRange({ from: date, to: null });
      } else {
        if (date > tempRange.to) {
          setTempRange({ from: date, to: date });
        } else {
          setTempRange({ ...tempRange, from: date });
        }
      }
    };

    const handleEndDateSelect = (date: Date) => {
      if (!tempRange.from) {
        setTempRange({ from: date, to: date });
      } else {
        if (date < tempRange.from) {
          setTempRange({ from: date, to: date });
        } else {
          setTempRange({ ...tempRange, to: date });
        }
      }
    };

    const handleClear = () => {
      setTempRange({ from: null, to: null });
      onChange({ from: null, to: null });
    };

    const handleOk = () => {
      onChange(tempRange);
      setIsOpen(false);
    };

    const previewRange = React.useMemo(() => {
      if (!tempRange.from || tempRange.to || !hoveredDate) return null;
      const isBeforeStart = hoveredDate < tempRange.from;
      return {
        from: isBeforeStart ? hoveredDate : tempRange.from,
        to: isBeforeStart ? tempRange.from : hoveredDate,
      };
    }, [tempRange.from, tempRange.to, hoveredDate]);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setTempRange(value);
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

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <div ref={triggerRef} className="flex gap-2">
          <button
            type="button"
            onClick={() => !disabled && !isLoading && setIsOpen(true)}
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
            onClick={() => !disabled && !isLoading && setIsOpen(true)}
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
          <>
            <div className="fixed inset-0 bg-black/50" />
            <div
              ref={dropdownRef}
              className={cn(
                "flex flex-col overflow-hidden rounded-md bg-white shadow-lg",
                "animate-in fade-in-0 zoom-in-95 z-[9999] border border-gray-200",
                "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[95%] p-5 md:w-[720px]",
                "max-h-[calc(100vh-4rem)]",
              )}
            >
              <div className="flex min-h-0 flex-col gap-4 overflow-auto p-2 md:flex-row md:gap-2 lg:justify-center [&>*]:shrink-0">
                <Calendar
                  value={tempRange.from || undefined}
                  onChange={handleStartDateSelect}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={disabled}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  disabledDates={disabledDates}
                  highlightedDates={[
                    ...(tempRange.from && tempRange.to
                      ? Array.from(
                          {
                            length:
                              (tempRange.to.getTime() -
                                tempRange.from.getTime()) /
                                (1000 * 60 * 60 * 24) +
                              1,
                          },
                          (_, i) =>
                            new Date(
                              tempRange.from!.getTime() +
                                i * 1000 * 60 * 60 * 24,
                            ),
                        )
                      : []),
                    ...(previewRange
                      ? Array.from(
                          {
                            length:
                              (previewRange.to.getTime() -
                                previewRange.from.getTime()) /
                                (1000 * 60 * 60 * 24) +
                              1,
                          },
                          (_, i) =>
                            new Date(
                              previewRange.from.getTime() +
                                i * 1000 * 60 * 60 * 24,
                            ),
                        )
                      : []),
                  ]}
                  onMouseEnter={(date) => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                />
                <Calendar
                  value={tempRange.to || undefined}
                  onChange={handleEndDateSelect}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={disabled}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  disabledDates={disabledDates}
                  highlightedDates={[
                    ...(tempRange.from && tempRange.to
                      ? Array.from(
                          {
                            length:
                              (tempRange.to.getTime() -
                                tempRange.from.getTime()) /
                                (1000 * 60 * 60 * 24) +
                              1,
                          },
                          (_, i) =>
                            new Date(
                              tempRange.from!.getTime() +
                                i * 1000 * 60 * 60 * 24,
                            ),
                        )
                      : []),
                    ...(previewRange
                      ? Array.from(
                          {
                            length:
                              (previewRange.to.getTime() -
                                previewRange.from.getTime()) /
                                (1000 * 60 * 60 * 24) +
                              1,
                          },
                          (_, i) =>
                            new Date(
                              previewRange.from.getTime() +
                                i * 1000 * 60 * 60 * 24,
                            ),
                        )
                      : []),
                  ]}
                  onMouseEnter={(date) => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                />
              </div>
              <div className="sticky bottom-0 mt-2 flex justify-end gap-2 border-t bg-white p-2">
                <Button variant="outline" onClick={handleClear}>
                  Clear
                </Button>
                <Button onClick={handleOk}>OK</Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";
