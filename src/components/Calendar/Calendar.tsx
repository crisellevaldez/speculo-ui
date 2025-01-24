import React from "react";
import { cn } from "../../utils/cn";

export interface CalendarProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "onMouseEnter" | "onMouseLeave"
  > {
  value?: Date;
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
  }: Pick<CalendarProps, "minDate" | "maxDate" | "disabledDates">,
) => {
  if (minDate) {
    // Compare dates at start of day in UTC to handle timezone differences
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
    // Compare dates at end of day in UTC to handle timezone differences
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

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      value = new Date(),
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
      ...props
    },
    ref,
  ) => {
    const [viewDate, setViewDate] = React.useState(value);
    const [focusedDate, setFocusedDate] = React.useState<Date | null>(null);

    const monthYear = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(viewDate);

    const weekDays = React.useMemo(() => {
      const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
      const days = Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
        // Start from Sunday (January 2, 2022)
        const day = new Date(2022, 0, 2 + i);
        return formatter.format(day);
      });

      return days;
    }, [locale]);

    const getDaysToDisplay = React.useCallback(() => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);

      const days: (Date | null)[] = Array(firstDay).fill(null);

      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      while (days.length < DAYS_IN_WEEK * WEEKS_TO_DISPLAY) {
        days.push(null);
      }

      return days;
    }, [viewDate]);

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

    const handleMonthChange = (increment: number) => {
      setViewDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment, 1),
      );
    };

    React.useEffect(() => {
      if (focusedDate) {
        const newMonth = focusedDate.getMonth();
        const currentMonth = viewDate.getMonth();

        if (newMonth !== currentMonth) {
          setViewDate(focusedDate);
        }
      }
    }, [focusedDate, viewDate]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-[230px] p-4 lg:w-[300px]",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      >
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleMonthChange(-1)}
            disabled={disabled}
            className={cn(
              "rounded-md p-2 hover:bg-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="font-medium">{monthYear}</div>

          <button
            type="button"
            onClick={() => handleMonthChange(1)}
            disabled={disabled}
            className={cn(
              "rounded-md p-2 hover:bg-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div
          className="mb-2 grid grid-cols-7 gap-1 text-center text-sm"
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

            const isSelected = value && isSameDay(date, value);
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
                  "aspect-square rounded-md p-1 text-xs",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "hover:bg-[#C68F42]/25 hover:text-black",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  isSelected &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                  isHighlighted && !isSelected && "bg-accent text-black",
                  isFocused && !isSelected && "ring-1 ring-ring",
                )}
                role="gridcell"
                aria-selected={isSelected}
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

Calendar.displayName = "Calendar";
