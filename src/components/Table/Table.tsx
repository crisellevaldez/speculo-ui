import React, { useState, useCallback } from "react";
import { cn } from "../../utils/cn";
import { ArrowUp, ArrowDown, Inbox } from "lucide-react";
import { Loading } from "../Loading/Loading";

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  minWidth?: string;
  width?: string;
  isPinned?: boolean;
  pinPosition?: string;
  resizable?: boolean;
  isCentered?: boolean;
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectRows?: (rows: string[]) => void;
  sortable?: boolean;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  className?: string;
  loading?: boolean;
  // Row selection props
  rowSelectable?: boolean;
  selectedRowId?: string;
  onRowSelect?: (id: string | undefined) => void;
  // Size variant
  size?: "sm" | "md" | "lg" | "xl";
  // Empty state
  emptyStateText?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns: initialColumns,
  data,
  keyExtractor,
  selectable = false,
  selectedRows = [],
  onSelectRows,
  sortable = false,
  onSort,
  className,
  loading = false,
  rowSelectable = false,
  selectedRowId,
  onRowSelect,
  size = "md",
  emptyStateText,
}: TableProps<T>) {
  const [columns, setColumns] = useState(initialColumns);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [resizing, setResizing] = useState<{
    index: number;
    startX: number;
    startWidth: number;
  } | null>(null);

  // Calculate total width of all columns
  const totalWidth =
    columns.reduce((acc, col) => acc + parseInt(col.width || "100"), 0) +
    (selectable ? 48 : 0); // Add width of checkbox column if selectable (3rem = 48px)

  // Get the last left-pinned column index
  const lastLeftPinnedIndex = columns.reduce(
    (acc, col, index) =>
      (col.isPinned && col.pinPosition === "left") || index === 0 ? index : acc,
    -1,
  );

  // Get the first right-pinned column index
  const firstRightPinnedIndex = columns.findIndex(
    (col) => col.isPinned && col.pinPosition === "right",
  );

  // Handle row selection
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      onSelectRows?.([]);
    } else {
      onSelectRows?.(data.map((item) => String(keyExtractor(item))));
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];
    onSelectRows?.(newSelectedRows);
  };

  // Handle sorting
  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    setSortConfig((current) => {
      let newConfig;
      if (!current || current.key !== key) {
        newConfig = { key, direction: "asc" as const };
      } else if (current.direction === "asc") {
        newConfig = { key, direction: "desc" as const };
      } else {
        newConfig = null;
      }

      if (onSort && newConfig) {
        onSort(newConfig.key, newConfig.direction);
      }
      return newConfig;
    });
  };

  // Column resizing
  const handleResizeStart = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const column = columns[index];
    if (!column.resizable) return;

    const currentWidth = column.width ? parseInt(column.width) : 100;

    setResizing({
      index,
      startX: e.pageX,
      startWidth: currentWidth,
    });

    // Ensure width is set before starting resize
    if (!column.width) {
      setColumns((prev) => {
        const newColumns = [...prev];
        newColumns[index] = {
          ...column,
          width: `${currentWidth}px`,
        };
        return newColumns;
      });
    }
  };

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!resizing) return;

      const diff = e.pageX - resizing.startX;
      const newWidth = Math.max(50, resizing.startWidth + diff);

      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        const currentColumn = newColumns[resizing.index];

        // Only update if width actually changed
        if (newWidth !== parseInt(currentColumn.width || "100")) {
          newColumns[resizing.index] = {
            ...currentColumn,
            width: `${newWidth}px`,
          };
          return newColumns;
        }
        return prevColumns;
      });
    },
    [resizing],
  );

  const handleResizeEnd = useCallback(() => {
    setResizing(null);
  }, []);

  // Add/remove event listeners for resizing
  React.useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleResizeMove);
      window.addEventListener("mouseup", handleResizeEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [resizing, handleResizeMove, handleResizeEnd]);

  // Calculate left position for pinned columns
  const getLeftPosition = (index: number) => {
    let position = 0;
    if (selectable) {
      position += 45; // Width of checkbox column (3rem = 48px) + border width (1px)
    }
    if (index > 0) {
      // Include all previous columns up to the current index
      position += columns.slice(0, index).reduce((acc, col, idx) => {
        // Include if it's the first column or explicitly pinned left
        if (idx === 0 || (col.isPinned && col.pinPosition === "left")) {
          return acc + parseInt(col.width || "100");
        }
        return acc;
      }, 0);
    }
    return position;
  };

  // Calculate right position for pinned columns
  const getRightPosition = (index: number) => {
    if (index < firstRightPinnedIndex || firstRightPinnedIndex === -1)
      return undefined;

    let position = 0;
    // Include all following columns up to the last index
    for (let i = columns.length - 1; i > index; i--) {
      if (columns[i].isPinned && columns[i].pinPosition === "right") {
        position += parseInt(columns[i].width || "100");
      }
    }
    return position;
  };

  return (
    <div className="relative h-full w-full overflow-auto rounded-xl border shadow-sm [scrollbar-gutter:stable] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar]:w-1 xl:[&::-webkit-scrollbar]:h-2 xl:[&::-webkit-scrollbar]:w-2">
      {data.length === 0 && !loading && (
        <div className="absolute inset-x-0 bottom-0 top-[57px] flex items-center justify-center bg-white">
          <div className="flex w-[320px] flex-col items-center justify-center gap-2 rounded-lg bg-white p-6">
            <div className="rounded-full bg-gray-100 p-3">
              <Inbox className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900">
              {emptyStateText || "No records found"}
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      )}
      <div
        className="inline-block min-w-full"
        style={{ width: `${totalWidth}px` }}
      >
        <table className={cn("relative w-full border-collapse", className)}>
          {/* Fixed header */}
          <thead className="sticky top-0 z-[3] overflow-hidden rounded-t-xl">
            <tr className="border-b border-gray-200 [&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl">
              {selectable && (
                <th
                  scope="col"
                  style={
                    {
                      "--left-position": "0px",
                    } as React.CSSProperties
                  }
                  className="w-[3rem] overflow-hidden bg-black px-3 py-3 text-center text-white md:sticky md:left-[--left-position] md:z-[20]"
                >
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={
                        data.length > 0 && selectedRows.length === data.length
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </th>
              )}
              {columns.map((column, index) => {
                const isPinnedLeft =
                  (column.isPinned && column.pinPosition === "left") ||
                  index === 0;
                const isPinnedRight =
                  column.isPinned && column.pinPosition === "right";
                const isLastLeftPinned = index === lastLeftPinnedIndex;
                const isFirstRightPinned = index === firstRightPinnedIndex;
                const left = isPinnedLeft ? getLeftPosition(index) : undefined;
                const right = isPinnedRight
                  ? getRightPosition(index)
                  : undefined;

                return (
                  <th
                    key={String(column.key)}
                    scope="col"
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      ...(isPinnedLeft &&
                        ({
                          "--left-position": `${left}px`,
                        } as React.CSSProperties)),
                      ...(isPinnedRight &&
                        ({
                          "--right-position": `${right}px`,
                        } as React.CSSProperties)),
                    }}
                    className={cn(
                      "bg-black px-3 py-3 text-xs font-bold uppercase tracking-wide text-white",
                      column.isCentered ? "text-center" : "text-left",
                      sortable &&
                        column.sortable &&
                        !loading &&
                        "cursor-pointer hover:bg-zinc-800",
                      isPinnedLeft
                        ? "overflow-hidden md:sticky md:left-[--left-position] md:z-[20]"
                        : isPinnedRight
                          ? "overflow-hidden md:sticky md:right-[--right-position] md:z-[20]"
                          : "relative", // Keep relative for non-pinned headers (needed for resize handle)
                      isLastLeftPinned && [
                        "md:after:absolute md:after:right-0 md:after:top-0 md:after:h-full md:after:w-px md:after:bg-gray-300 md:after:content-['']",
                        "md:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                      ],
                      isFirstRightPinned && [
                        "md:before:absolute md:before:left-0 md:before:top-0 md:before:h-full md:before:w-px md:before:bg-gray-300 md:before:content-['']",
                        "md:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                      ],
                    )}
                    onClick={() =>
                      !loading && sortable && handleSort(String(column.key))
                    }
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        column.isCentered && "justify-center",
                      )}
                    >
                      <span className="truncate">{column.header}</span>
                      {sortable &&
                        column.sortable &&
                        sortConfig?.key === column.key && (
                          <span className="shrink-0">
                            {sortConfig.direction === "asc" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                          </span>
                        )}
                    </div>
                    {/* Simple resizer handle */}
                    {column.resizable && !isPinnedLeft && !isPinnedRight && (
                      <div
                        className={cn(
                          "absolute -right-0.5 top-0 z-10 h-full w-px bg-zinc-600 hover:bg-zinc-500",
                          !loading && "cursor-col-resize group-hover:h-full",
                        )}
                        onMouseDown={(e) =>
                          !loading && handleResizeStart(index, e)
                        }
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody
            className={cn(
              "divide-y divide-gray-200",
              (loading || (data.length === 0 && !loading)) &&
                "pointer-events-none opacity-0",
            )}
          >
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() =>
                  rowSelectable &&
                  onRowSelect?.(
                    String(keyExtractor(item)) === selectedRowId
                      ? undefined
                      : String(keyExtractor(item)),
                  )
                }
                className={cn(
                  "group",
                  rowSelectable && "cursor-pointer",
                  String(keyExtractor(item)) === selectedRowId
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "hover:bg-gray-100",
                )}
              >
                {selectable && (
                  <td
                    style={
                      {
                        "--left-position": "0px",
                      } as React.CSSProperties
                    }
                    className={cn(
                      "w-[3rem] overflow-hidden px-3 py-4 md:sticky md:left-[--left-position] md:z-[2]",
                      String(keyExtractor(item)) === selectedRowId
                        ? "bg-gray-100 group-hover:bg-gray-200"
                        : "bg-white group-hover:bg-gray-100",
                    )}
                  >
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(
                          String(keyExtractor(item)),
                        )}
                        onChange={() =>
                          handleSelectRow(String(keyExtractor(item)))
                        }
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                    </div>
                  </td>
                )}
                {columns.map((column, index) => {
                  const isPinnedLeft =
                    (column.isPinned && column.pinPosition === "left") ||
                    index === 0;
                  const isPinnedRight =
                    column.isPinned && column.pinPosition === "right";
                  const isLastLeftPinned = index === lastLeftPinnedIndex;
                  const isFirstRightPinned = index === firstRightPinnedIndex;
                  const left = isPinnedLeft
                    ? getLeftPosition(index)
                    : undefined;
                  const right = isPinnedRight
                    ? getRightPosition(index)
                    : undefined;

                  return (
                    <td
                      key={String(column.key)}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        ...(isPinnedLeft &&
                          ({
                            "--left-position": `${left}px`,
                          } as React.CSSProperties)),
                        ...(isPinnedRight &&
                          ({
                            "--right-position": `${right}px`,
                          } as React.CSSProperties)),
                      }}
                      className={cn(
                        "text-[13px] text-gray-900 3xl:text-[14px]",
                        size === "sm"
                          ? "px-3 py-1.5 3xl:px-3 3xl:py-2"
                          : size === "lg"
                            ? "px-3 py-3 3xl:px-3 3xl:py-5"
                            : size === "xl"
                              ? "px-3 py-4 3xl:px-3 3xl:py-6"
                              : "px-3 py-3 3xl:px-3 3xl:py-4",
                        column.isCentered ? "text-center" : "text-left",
                        column.key === "actions" && "min-w-[120px]",
                        isPinnedLeft
                          ? "sticky overflow-hidden md:left-[--left-position] md:z-[2]"
                          : isPinnedRight
                            ? "sticky overflow-hidden md:right-[--right-position] md:z-[2]"
                            : "",
                        isLastLeftPinned && [
                          "md:after:absolute md:after:right-0 md:after:top-0 md:after:h-full md:after:w-px md:after:bg-gray-300 md:after:content-['']",
                          "md:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                        ],
                        isFirstRightPinned && [
                          "md:before:absolute md:before:left-0 md:before:top-0 md:before:h-full md:before:w-px md:before:bg-gray-300 md:before:content-['']",
                          "md:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                        ],
                        (isPinnedLeft || isPinnedRight) &&
                          String(keyExtractor(item)) === selectedRowId
                          ? "bg-gray-100 group-hover:bg-gray-200"
                          : isPinnedLeft || isPinnedRight
                            ? "bg-white group-hover:bg-gray-100"
                            : "",
                      )}
                    >
                      <div>
                        <div>
                          {column.cell ? (
                            column.cell(item)
                          ) : (
                            <span className="block whitespace-normal break-words">
                              {String(item[column.key as keyof T])}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <Loading />}
    </div>
  );
}
