import React from "react";
import { cn } from "../../utils/cn";

export interface DualCalendarProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "onMouseEnter" | "onMouseLeave"
  > {
  value?: Date | null;
  endValue?: Date | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  onMouseEnter?: (date: Date) => void;
  onMouseLeave?: (date: Date) => void;
  viewDate: Date;
}

const DAYS_IN_WEEK = 7;
const WEEKS_TO_DISPLAY = 6;

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isDateDisabled = (
  date: Date,
  {
    minDate,
    maxDate,
    disabledDates,
  }: Pick<DualCalendarProps, "minDate" | "maxDate" | "disabledDates">,
) => {
  if (minDate) {
    const dateStartOfDay = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),
    );
    const minDateStartOfDay = new Date(
      Date.UTC(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
        0,
        0,
        0,
        0,
      ),
    );
    if (dateStartOfDay < minDateStartOfDay) return true;
  }

  if (maxDate) {
    const dateEndOfDay = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      ),
    );
    const maxDateEndOfDay = new Date(
      Date.UTC(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate(),
        23,
        59,
        59,
        999,
      ),
    );
    if (dateEndOfDay > maxDateEndOfDay) return true;
  }

  if (disabledDates?.some((disabled) => isSameDay(date, disabled))) return true;
  return false;
};

export const DualCalendar = React.forwardRef<HTMLDivElement, DualCalendarProps>(
  (
    {
      className,
      value,
      endValue,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      locale = "en-US",
      weekStartsOn = 0,
      disabledDates = [],
      highlightedDates = [],
      onMouseEnter,
      onMouseLeave,
      viewDate,
      ...props
    },
    ref,
  ) => {
    const [focusedDate, setFocusedDate] = React.useState<Date | null>(null);
    const [currentViewDate, setCurrentViewDate] = React.useState(viewDate);

    React.useEffect(() => {
      setCurrentViewDate(viewDate);
    }, [viewDate]);

    const monthYear = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(currentViewDate);

    const weekDays = React.useMemo(() => {
      const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
      const days = Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
        // Start from Monday (January 3, 2022)
        const day = new Date(2022, 0, 3 + i);
        return formatter.format(day);
      });

      // If weekStartsOn is 0 (Sunday), rotate the array to put Sunday first
      if (weekStartsOn === 0) {
        const sunday = days.pop()!;
        days.unshift(sunday);
      }

      return days;
    }, [locale, weekStartsOn]);

    const getDaysToDisplay = React.useCallback(() => {
      const year = currentViewDate.getFullYear();
      const month = currentViewDate.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = (getFirstDayOfMonth(year, month) - weekStartsOn + 7) % 7;

      const days: (Date | null)[] = Array(firstDay).fill(null);

      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      while (days.length < DAYS_IN_WEEK * WEEKS_TO_DISPLAY) {
        days.push(null);
      }

      return days;
    }, [currentViewDate, weekStartsOn]);

    const handleDateSelect = (date: Date) => {
      if (
        !disabled &&
        !isDateDisabled(date, { minDate, maxDate, disabledDates })
      ) {
        onChange?.(date);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setFocusedDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setFocusedDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7),
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7),
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          handleDateSelect(date);
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-[260px] p-2 lg:w-[300px] lg:p-4",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      >
        <div className="mb-2 flex items-center justify-center text-sm font-medium lg:mb-4 lg:text-base">
          {monthYear}
        </div>

        <div
          className="mb-1 grid grid-cols-7 gap-1 text-center text-xs lg:mb-2 lg:text-sm"
          role="row"
        >
          {weekDays.map((day, i) => (
            <div key={i} className="text-muted-foreground" aria-label={day}>
              {day.charAt(0)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1" role="grid">
          {getDaysToDisplay().map((date, i) => {
            if (!date) {
              return <div key={i} role="gridcell" />;
            }

            const isStartDate = value && isSameDay(date, value);
            const isEndDate = endValue && isSameDay(date, endValue);
            const isHighlighted = highlightedDates.some((d) =>
              isSameDay(date, d),
            );
            const isDisabled = isDateDisabled(date, {
              minDate,
              maxDate,
              disabledDates,
            });
            const isFocused = focusedDate && isSameDay(date, focusedDate);

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleDateSelect(date)}
                onKeyDown={(e) => handleKeyDown(e, date)}
                onFocus={() => setFocusedDate(date)}
                onMouseEnter={() => onMouseEnter?.(date)}
                onMouseLeave={() => onMouseLeave?.(date)}
                disabled={disabled || isDisabled}
                className={cn(
                  "aspect-square rounded-md p-0.5 text-xs lg:p-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "hover:bg-[#C68F42]/25 hover:text-black",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  isHighlighted &&
                    !isStartDate &&
                    !isEndDate &&
                    "bg-[#C68F42]/15 text-black",
                  (isStartDate || isEndDate) &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                  isFocused && !isStartDate && !isEndDate && "ring-1 ring-ring",
                )}
                role="gridcell"
                aria-selected={!!(isStartDate || isEndDate)}
                tabIndex={isFocused ? 0 : -1}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

DualCalendar.displayName = "DualCalendar";
