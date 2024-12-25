import React from "react";
import { cn } from "../../utils/cn";
import { Clock, Loader2 } from "lucide-react";
import { Button } from "../Button/Button";

export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string | null; // In 24-hour format "HH:mm"
  onChange: (time: string | null) => void;
  minTime?: string; // "HH:mm"
  maxTime?: string; // "HH:mm"
  disabled?: boolean;
  isLoading?: boolean;
  use24Hour?: boolean;
  placeholder?: string;
  error?: string;
  helperText?: string;
  step?: number; // Minutes step (default: 15)
}

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      value,
      onChange,
      minTime,
      maxTime,
      disabled = false,
      isLoading = false,
      use24Hour = false,
      placeholder = "Select time",
      error,
      helperText,
      step = 15,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [tempTime, setTempTime] = React.useState<string | null>(value);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Update dropdown position on scroll
    React.useEffect(() => {
      if (!isOpen) return;

      const updatePosition = () => {
        if (dropdownRef.current && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          dropdownRef.current.style.left = `${rect.left}px`;
          dropdownRef.current.style.top = `${rect.bottom + 8}px`;
          dropdownRef.current.style.width = `${rect.width}px`;
        }
      };

      window.addEventListener("scroll", updatePosition, true);
      return () => window.removeEventListener("scroll", updatePosition, true);
    }, [isOpen]);

    React.useEffect(() => {
      setTempTime(value);
    }, [value]);

    // Convert "HH:mm" to minutes since midnight
    const timeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    // Convert minutes since midnight to "HH:mm"
    const minutesToTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
    };

    // Generate time options based on step
    const timeOptions = React.useMemo(() => {
      const options: string[] = [];
      const minMinutes = minTime ? timeToMinutes(minTime) : 0;
      const maxMinutes = maxTime ? timeToMinutes(maxTime) : 24 * 60 - 1;

      for (let i = minMinutes; i <= maxMinutes; i += step) {
        options.push(minutesToTime(i));
      }
      return options;
    }, [minTime, maxTime, step]);

    const formatTime = (time: string | null) => {
      if (!time) return "";
      if (use24Hour) return time;

      const [hours, minutes] = time.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    const handleTimeSelect = (time: string) => {
      setTempTime(time);
      onChange(time);
      setIsOpen(false);
    };

    const handleClear = () => {
      setTempTime(null);
      onChange(null);
      setIsOpen(false);
    };

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(target) &&
          !buttonRef.current?.contains(target)
        ) {
          setIsOpen(false);
          setTempTime(value);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [value]);

    const buttonStyles = cn(
      "shadow-sm flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-1.5",
      "text-sm ring-offset-background placeholder:text-gray-500",
      "focus:outline-none focus:ring-1 focus:ring-gray-400",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
      error &&
        "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-1",
    );

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && !isLoading && setIsOpen(true)}
          disabled={disabled || isLoading}
          className={cn(buttonStyles, "w-full")}
        >
          <span className="flex-1 text-left text-gray-900">
            {value ? formatTime(value) : placeholder}
          </span>
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin text-gray-500" />
          ) : (
            <Clock className="ml-2 h-4 w-4 shrink-0 text-gray-500" />
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
            ref={dropdownRef}
            style={{
              position: "fixed",
              left: buttonRef.current?.getBoundingClientRect().left + "px",
              top:
                (buttonRef.current?.getBoundingClientRect().bottom || 0) +
                8 +
                "px",
              width: buttonRef.current?.getBoundingClientRect().width + "px",
            }}
            className={cn(
              "flex flex-col rounded-md bg-white p-2 shadow-lg",
              "animate-in fade-in-0 zoom-in-95 z-[9999] overflow-auto border border-gray-200",
            )}
          >
            <div className="flex flex-col">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={cn(
                    "rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100",
                    time === tempTime && "bg-gray-100 font-medium",
                  )}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-end gap-2 border-t pt-2">
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";
