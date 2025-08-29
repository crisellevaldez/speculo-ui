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

export interface DualDateRangePickerSmallProps
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

export const DualDateRangePickerSmall = React.forwardRef<
  HTMLDivElement,
  DualDateRangePickerSmallProps
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
