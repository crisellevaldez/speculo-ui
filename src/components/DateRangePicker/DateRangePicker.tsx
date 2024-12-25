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
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      setTempRange(value);
    }, [value]);

    const handleStartDateSelect = (date: Date) => {
      if (!tempRange.to) {
        setTempRange({ from: date, to: null });
      } else {
        // If selected start date is after end date, make end date same as start date
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
        // If selected end date is before start date, make start date same as end date
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
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => !disabled && !isLoading && setIsOpen(true)}
            disabled={disabled || isLoading}
            className={cn(buttonStyles, "w-[150px]")}
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
            className={cn(buttonStyles, "w-[150px]")}
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
            ref={containerRef}
            className={cn(
              "absolute left-0 top-full mt-2 flex flex-col rounded-md bg-white p-2 shadow-lg",
              "animate-in fade-in-0 zoom-in-95 z-50 border border-gray-200",
            )}
          >
            <div className="flex">
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
                            tempRange.from!.getTime() + i * 1000 * 60 * 60 * 24,
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
                            tempRange.from!.getTime() + i * 1000 * 60 * 60 * 24,
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

DateRangePicker.displayName = "DateRangePicker";
