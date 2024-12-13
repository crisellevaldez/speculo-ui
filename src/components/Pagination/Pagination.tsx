import React from "react";
import { cn } from "../../utils/cn";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const sizeStyles = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10",
  lg: "h-12 w-12 text-lg",
};

const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number
) => {
  const totalNumbers = siblingCount * 2 + 3;

  if (totalNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, DOTS, ...middleRange, DOTS, totalPages];
  }

  return [];
};

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      size = "md",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const paginationRange = getPaginationRange(
      currentPage,
      totalPages,
      siblingCount
    );

    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }

    const onNext = () => {
      if (!disabled && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const onPrevious = () => {
      if (!disabled && currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const onFirst = () => {
      if (!disabled && currentPage !== 1) {
        onPageChange(1);
      }
    };

    const onLast = () => {
      if (!disabled && currentPage !== totalPages) {
        onPageChange(totalPages);
      }
    };

    return (
      <nav
        ref={ref}
        className={cn("flex items-center space-x-2", className)}
        aria-label="Pagination"
        {...props}
      >
        {showFirstLast && (
          <button
            className={cn(
              "inline-flex items-center justify-center rounded-md border",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-50",
              sizeStyles[size]
            )}
            onClick={onFirst}
            disabled={disabled || currentPage === 1}
            aria-label="Go to first page"
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
              <path d="m11 17-5-5 5-5" />
              <path d="m18 17-5-5 5-5" />
            </svg>
          </button>
        )}

        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md border",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:pointer-events-none disabled:opacity-50",
            sizeStyles[size]
          )}
          onClick={onPrevious}
          disabled={disabled || currentPage === 1}
          aria-label="Go to previous page"
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

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <span
                key={index}
                className="flex items-center justify-center"
                aria-hidden="true"
              >
                &#8230;
              </span>
            );
          }

          return (
            <button
              key={index}
              className={cn(
                "inline-flex items-center justify-center rounded-md border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                pageNumber === currentPage
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-accent hover:text-accent-foreground",
                sizeStyles[size]
              )}
              onClick={() => !disabled && onPageChange(pageNumber as number)}
              disabled={disabled}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              aria-label={`Go to page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md border",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:pointer-events-none disabled:opacity-50",
            sizeStyles[size]
          )}
          onClick={onNext}
          disabled={disabled || currentPage === totalPages}
          aria-label="Go to next page"
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

        {showFirstLast && (
          <button
            className={cn(
              "inline-flex items-center justify-center rounded-md border",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-50",
              sizeStyles[size]
            )}
            onClick={onLast}
            disabled={disabled || currentPage === totalPages}
            aria-label="Go to last page"
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
              <path d="m13 17 5-5-5-5" />
              <path d="m6 17 5-5-5-5" />
            </svg>
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
