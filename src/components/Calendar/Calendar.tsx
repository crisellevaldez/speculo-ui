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
  }: Pick<CalendarProps, "minDate" | "maxDate" | "disabledDates">
) => {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
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
    ref
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
        const day = new Date(2021, 0, i + 1);
        return formatter.format(day);
      });

      const reorderedDays = [
        ...days.slice(weekStartsOn),
        ...days.slice(0, weekStartsOn),
      ];

      return reorderedDays;
    }, [locale, weekStartsOn]);

    const getDaysToDisplay = React.useCallback(() => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
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
    }, [viewDate, weekStartsOn]);

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
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setFocusedDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
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
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment, 1)
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
          "p-4 w-[calc(100vw-2rem)] sm:w-[320px]",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => handleMonthChange(-1)}
            disabled={disabled}
            className={cn(
              "p-2 hover:bg-accent rounded-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              "p-2 hover:bg-accent rounded-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          className="grid grid-cols-7 gap-1 text-center text-sm mb-2"
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
              isSameDay(date, d)
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
                  "aspect-square p-2 text-sm rounded-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "hover:bg-accent hover:text-accent-foreground",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  isSelected &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                  isHighlighted &&
                    !isSelected &&
                    "bg-accent text-accent-foreground",
                  isFocused && !isSelected && "ring-2 ring-ring"
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
  }
);

Calendar.displayName = "Calendar";
