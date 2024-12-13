import React from "react";
import { cn } from "../../utils/cn";
import { Calendar } from "../Calendar/Calendar";

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
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disabledDates?: Date[];
  placeholder?: {
    from: string;
    to: string;
  };
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
      locale = "en-US",
      weekStartsOn = 0,
      disabledDates = [],
      placeholder = { from: "Start date", to: "End date" },
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleDateSelect = (date: Date) => {
      if (!value.from || (value.from && value.to)) {
        onChange({ from: date, to: null });
      } else {
        const isBeforeStart = date < value.from;
        onChange({
          from: isBeforeStart ? date : value.from,
          to: isBeforeStart ? value.from : date,
        });
      }
    };

    const previewRange = React.useMemo(() => {
      if (!value.from || value.to || !hoveredDate) return null;
      const isBeforeStart = hoveredDate < value.from;
      return {
        from: isBeforeStart ? hoveredDate : value.from,
        to: isBeforeStart ? value.from : hoveredDate,
      };
    }, [value.from, value.to, hoveredDate]);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatDate = (date: Date | null) => {
      if (!date) return "";
      return new Intl.DateTimeFormat(locale).format(date);
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={disabled}
            className={cn(
              "flex h-10 items-center justify-between rounded-md border bg-background px-3",
              "text-sm ring-offset-background placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {formatDate(value.from) || placeholder.from}
          </button>
          <span className="text-muted-foreground">to</span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={disabled}
            className={cn(
              "flex h-10 items-center justify-between rounded-md border bg-background px-3",
              "text-sm ring-offset-background placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {formatDate(value.to) || placeholder.to}
          </button>
        </div>

        {isOpen && (
          <div
            className={cn(
              "absolute top-full left-0 mt-2 flex bg-background p-2 rounded-md shadow-md",
              "border animate-in fade-in-0 zoom-in-95"
            )}
          >
            <Calendar
              value={value.from || undefined}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
              locale={locale}
              weekStartsOn={weekStartsOn}
              disabledDates={disabledDates}
              highlightedDates={[
                ...(value.from && value.to
                  ? Array.from(
                      {
                        length:
                          (value.to.getTime() - value.from.getTime()) /
                            (1000 * 60 * 60 * 24) +
                          1,
                      },
                      (_, i) =>
                        new Date(
                          value.from!.getTime() + i * 1000 * 60 * 60 * 24
                        )
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
                          previewRange.from.getTime() + i * 1000 * 60 * 60 * 24
                        )
                    )
                  : []),
              ]}
              onMouseEnter={(date) => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
            />
            <Calendar
              value={value.to || undefined}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
              locale={locale}
              weekStartsOn={weekStartsOn}
              disabledDates={disabledDates}
              highlightedDates={[
                ...(value.from && value.to
                  ? Array.from(
                      {
                        length:
                          (value.to.getTime() - value.from.getTime()) /
                            (1000 * 60 * 60 * 24) +
                          1,
                      },
                      (_, i) =>
                        new Date(
                          value.from!.getTime() + i * 1000 * 60 * 60 * 24
                        )
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
                          previewRange.from.getTime() + i * 1000 * 60 * 60 * 24
                        )
                    )
                  : []),
              ]}
              onMouseEnter={(date) => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
            />
          </div>
        )}
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
