import React from "react";
import { cn } from "../../utils/cn";
import {
  Calendar as CalendarIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DualCalendar } from "./DualCalendar";
import { Button } from "../Button/Button";
import { useFloatingPosition } from "./useFloatingPosition";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DualDateRangePickerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "showPresets"
  > {
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
  showPresets?: boolean;
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
      showPresets = true,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [tempRange, setTempRange] = React.useState<DateRange>(value);
    const [isEditingEndDate, setIsEditingEndDate] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Initialize months based on selected date or current date
    const [leftMonth, setLeftMonth] = React.useState(() => {
      if (value.from) {
        return new Date(value.from.getFullYear(), value.from.getMonth(), 1);
      }
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), 1);
    });

    const [rightMonth, setRightMonth] = React.useState(() => {
      if (value.from) {
        return new Date(value.from.getFullYear(), value.from.getMonth() + 1, 1);
      }
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth() + 1, 1);
    });

    // Configuration for floating position
    const positionConfig = React.useMemo(
      () => ({
        dropdownHeight: 360,
        dropdownWidth: 650,
        mobileBreakpoint: 1024,
        padding: 8,
      }),
      [],
    );

    // Use the floating position hook
    useFloatingPosition(triggerRef, dropdownRef, isOpen, positionConfig);

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

    // Helper function to check if a date is before minDate
    const isBeforeMinDate = (date: Date) => {
      if (!minDate) return false;

      const dateStartOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0,
      );

      const minDateStartOfDay = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
        0,
        0,
        0,
        0,
      );

      return dateStartOfDay < minDateStartOfDay;
    };

    // Calculate preset dates and their validity based on minDate
    const getPresetDates = React.useMemo(() => {
      const today = new Date();

      // Today
      const todayDate = new Date(today);
      const isTodayValid = !isBeforeMinDate(todayDate);

      // Last 7 days
      const last7Start = new Date(today);
      last7Start.setDate(today.getDate() - 6);
      const isLast7Valid = !isBeforeMinDate(last7Start);

      // This month
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const isThisMonthValid = !isBeforeMinDate(thisMonthStart);

      // Last month
      const lastMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      const isLastMonthValid = !isBeforeMinDate(lastMonthStart);

      return {
        today: { from: todayDate, to: todayDate, isValid: isTodayValid },
        last7days: { from: last7Start, to: today, isValid: isLast7Valid },
        thisMonth: {
          from: thisMonthStart,
          to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
          isValid: isThisMonthValid,
        },
        lastMonth: {
          from: lastMonthStart,
          to: lastMonthEnd,
          isValid: isLastMonthValid,
        },
      };
    }, [minDate]);

    const applyPreset = (preset: string) => {
      const presets = getPresetDates;
      let from: Date | null = null;
      let to: Date | null = null;

      switch (preset) {
        case "today":
          if (presets.today.isValid) {
            from = presets.today.from;
            to = presets.today.to;
          }
          break;
        case "last7days":
          if (presets.last7days.isValid) {
            from = presets.last7days.from;
            to = presets.last7days.to;
          }
          break;
        case "thisMonth":
          if (presets.thisMonth.isValid) {
            from = presets.thisMonth.from;
            to = presets.thisMonth.to;
          }
          break;
        case "lastMonth":
          if (presets.lastMonth.isValid) {
            from = presets.lastMonth.from;
            to = presets.lastMonth.to;
          }
          break;
        default:
          break;
      }

      if (from && to) {
        setTempRange({ from, to });

        // Update calendar view to show the selected range
        setLeftMonth(new Date(from.getFullYear(), from.getMonth(), 1));
        setRightMonth(new Date(from.getFullYear(), from.getMonth() + 1, 1));
      }
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

    // Handle click outside
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

    const getHighlightedDates = () => {
      if (!tempRange.from) return [];
      if (!tempRange.to) return [tempRange.from];

      const dates: Date[] = [];
      const current = new Date(tempRange.from);
      while (current <= tempRange.to) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };

    // For date selection, use the actual start date as minDate
    const rightMinDate = tempRange.from || minDate;

    // Filter out showPresets from props to prevent it from being passed to the DOM
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const { showPresets: _, ...domProps } = props as any;

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...domProps}
      >
        <div
          ref={triggerRef}
          className="inline-flex rounded-md border border-gray-300 bg-white shadow-sm"
        >
          <button
            type="button"
            onClick={handleStartClick}
            disabled={disabled || isLoading}
            className={cn(
              "flex h-10 items-center px-3 py-1.5",
              "text-sm ring-offset-background placeholder:text-gray-500",
              "focus:outline-none focus:ring-0",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
              error && "focus:ring-red-500",
              "w-[130px] rounded-l-md",
              isOpen && !isEditingEndDate && "font-semibold",
            )}
          >
            <div className="flex items-center gap-4">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              ) : (
                <CalendarIcon className="h-4 w-4 text-gray-500" />
              )}
              <span className="text-sm text-gray-900">
                {formatDate(value.from) || placeholder.from}
              </span>
            </div>
          </button>
          <div className="flex h-10 items-center">
            <span className="select-none px-1 text-sm text-gray-500">-</span>
          </div>
          <button
            type="button"
            onClick={handleEndClick}
            disabled={disabled || isLoading}
            className={cn(
              "flex h-10 items-center px-3 py-1.5",
              "text-sm ring-offset-background placeholder:text-gray-500",
              "focus:outline-none focus:ring-0",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
              error && "focus:ring-red-500",
              "w-[120px] rounded-r-md",
              isOpen && isEditingEndDate && "font-semibold",
            )}
          >
            <span className="text-sm text-gray-900">
              {formatDate(value.to) || placeholder.to}
            </span>
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
              position: "fixed",
              maxWidth: "calc(100vw - 2rem)",
            }}
            className={cn(
              "flex flex-col rounded-md bg-white shadow-lg",
              "animate-in fade-in-0 zoom-in-95 z-[9999] border border-gray-200",
              "max-h-[80vh] w-auto min-w-[300px] overflow-auto",
              "lg:max-h-none lg:min-w-[720px] lg:overflow-auto",
              "scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400",
            )}
          >
            <div className="flex min-h-fit flex-col gap-4 p-2 pt-5 lg:p-4">
              <div className="flex flex-col lg:flex-row">
                {showPresets && (
                  <div className="flex flex-col border-r border-gray-200 p-4 pr-6">
                    <div className="w-[150px]">
                      <button
                        className={cn(
                          "w-full py-2 text-left text-xs font-medium md:py-3 md:text-sm",
                          getPresetDates.today.isValid
                            ? "text-gray-800 hover:text-primary focus:text-primary active:text-primary"
                            : "cursor-not-allowed text-gray-400",
                        )}
                        onClick={() =>
                          getPresetDates.today.isValid && applyPreset("today")
                        }
                        disabled={!getPresetDates.today.isValid}
                      >
                        Today
                      </button>
                      <div className="h-px w-full bg-gray-200"></div>

                      <button
                        className={cn(
                          "w-full py-2 text-left text-xs font-medium md:py-3 md:text-sm",
                          getPresetDates.last7days.isValid
                            ? "text-gray-800 hover:text-primary focus:text-primary active:text-primary"
                            : "cursor-not-allowed text-gray-400",
                        )}
                        onClick={() =>
                          getPresetDates.last7days.isValid &&
                          applyPreset("last7days")
                        }
                        disabled={!getPresetDates.last7days.isValid}
                      >
                        Last 7 Days
                      </button>
                      <div className="h-px w-full bg-gray-200"></div>

                      <button
                        className={cn(
                          "w-full py-2 text-left text-xs font-medium md:py-3 md:text-sm",
                          getPresetDates.thisMonth.isValid
                            ? "text-gray-800 hover:text-primary focus:text-primary active:text-primary"
                            : "cursor-not-allowed text-gray-400",
                        )}
                        onClick={() =>
                          getPresetDates.thisMonth.isValid &&
                          applyPreset("thisMonth")
                        }
                        disabled={!getPresetDates.thisMonth.isValid}
                      >
                        This Month
                      </button>
                      <div className="h-px w-full bg-gray-200"></div>

                      <button
                        className={cn(
                          "w-full py-2 text-left text-xs font-medium md:py-3 md:text-sm",
                          getPresetDates.lastMonth.isValid
                            ? "text-gray-800 hover:text-primary focus:text-primary active:text-primary"
                            : "cursor-not-allowed text-gray-400",
                        )}
                        onClick={() =>
                          getPresetDates.lastMonth.isValid &&
                          applyPreset("lastMonth")
                        }
                        disabled={!getPresetDates.lastMonth.isValid}
                      >
                        Last Month
                      </button>
                      <div className="h-px w-full bg-gray-200"></div>

                      <button
                        className="w-full py-2 text-left text-xs font-medium text-gray-800 hover:text-primary focus:text-primary active:text-primary md:py-3 md:text-sm"
                        onClick={() => handleClear()}
                      >
                        Custom
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex">
                  <button
                    className={cn(
                      "mt-[18px] h-fit rounded-md p-2 hover:bg-accent",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      disabled && "cursor-not-allowed opacity-50",
                    )}
                    type="button"
                    onClick={() => {
                      const newLeftMonth = new Date(
                        leftMonth.getFullYear(),
                        leftMonth.getMonth() - 1,
                        1,
                      );
                      const newRightMonth = new Date(
                        rightMonth.getFullYear(),
                        rightMonth.getMonth() - 1,
                        1,
                      );
                      setLeftMonth(newLeftMonth);
                      setRightMonth(newRightMonth);
                    }}
                    disabled={
                      disabled ||
                      (minDate &&
                        leftMonth <=
                          new Date(
                            minDate.getFullYear(),
                            minDate.getMonth(),
                            1,
                          ))
                    }
                    aria-label="Previous months"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex flex-1 gap-4">
                    <DualCalendar
                      value={tempRange.from}
                      endValue={tempRange.to}
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
                      value={tempRange.from}
                      endValue={tempRange.to}
                      onChange={handleDateSelect}
                      minDate={rightMinDate}
                      maxDate={maxDate}
                      disabled={disabled}
                      locale={locale}
                      weekStartsOn={weekStartsOn}
                      disabledDates={disabledDates}
                      highlightedDates={getHighlightedDates()}
                      viewDate={rightMonth}
                      className="hidden md:block"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newLeftMonth = new Date(
                        leftMonth.getFullYear(),
                        leftMonth.getMonth() + 1,
                        1,
                      );
                      const newRightMonth = new Date(
                        rightMonth.getFullYear(),
                        rightMonth.getMonth() + 1,
                        1,
                      );
                      setLeftMonth(newLeftMonth);
                      setRightMonth(newRightMonth);
                    }}
                    disabled={
                      disabled ||
                      (maxDate &&
                        rightMonth >=
                          new Date(
                            maxDate.getFullYear(),
                            maxDate.getMonth(),
                            1,
                          ))
                    }
                    className={cn(
                      "mt-[18px] h-fit rounded-md p-2 hover:bg-accent",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      disabled && "cursor-not-allowed opacity-50",
                    )}
                    aria-label="Next months"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="sticky bottom-0 right-0 flex w-full justify-end border-t bg-white p-2">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleClear}>
                    Clear
                  </Button>
                  <Button onClick={handleOk}>OK</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

DualDateRangePicker.displayName = "DualDateRangePicker";
