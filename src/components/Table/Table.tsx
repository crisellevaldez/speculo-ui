import React, { useState, useCallback } from "react";
import { cn } from "../../utils/cn";
import { ArrowUp, ArrowDown } from "lucide-react";
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

  // Get the last pinned column index
  const lastPinnedIndex = columns.reduce(
    (acc, col, index) =>
      col.isPinned && col.pinPosition === "left" ? index : acc,
    -1,
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
      position += columns
        .slice(0, index)
        .filter((col) => col.isPinned && col.pinPosition === "left")
        .reduce((acc, col) => acc + parseInt(col.width || "100"), 0);
    }
    return position;
  };

  return (
    <div className="relative h-full w-full overflow-auto rounded-xl border shadow-sm [scrollbar-gutter:stable] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar]:w-1 xl:[&::-webkit-scrollbar]:h-2 xl:[&::-webkit-scrollbar]:w-2">
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
                  className="sticky left-0 z-[20] w-[3rem] overflow-hidden bg-black px-3 py-3 text-center text-white"
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
                  column.isPinned && column.pinPosition === "left";
                const isLastPinned = index === lastPinnedIndex;
                const left = isPinnedLeft ? getLeftPosition(index) : undefined;
                return (
                  <th
                    key={String(column.key)}
                    scope="col"
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      position: isPinnedLeft ? "sticky" : undefined,
                      left,
                      boxShadow: isLastPinned
                        ? "2px 0 5px -2px rgba(0,0,0,0.1)"
                        : undefined,
                    }}
                    className={cn(
                      "relative bg-black px-3 py-3 text-xs font-bold uppercase tracking-wide text-white",
                      column.isCentered ? "text-center" : "text-left",
                      sortable &&
                        column.sortable &&
                        !loading &&
                        "cursor-pointer hover:bg-zinc-800",
                      isPinnedLeft && isPinnedLeft && column.key === "actions"
                        ? "z-[2] overflow-hidden"
                        : isPinnedLeft
                          ? "z-[20] overflow-hidden"
                          : "",
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
                    {column.resizable && !isPinnedLeft && (
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
              loading && "pointer-events-none opacity-50",
            )}
          >
            {data.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={selectable ? columns.length + 1 : columns.length}
                  className="px-3 py-8 text-center text-sm text-gray-500"
                >
                  {emptyStateText || "No records found"}
                </td>
              </tr>
            )}
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
                    className={cn(
                      "sticky left-0 z-[2] w-[3rem] overflow-hidden px-3 py-4",
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
                    column.isPinned && column.pinPosition === "left";
                  const isLastPinned = index === lastPinnedIndex;
                  const left = isPinnedLeft
                    ? getLeftPosition(index)
                    : undefined;
                  return (
                    <td
                      key={String(column.key)}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        position: isPinnedLeft ? "sticky" : undefined,
                        left,
                        boxShadow: isLastPinned
                          ? "2px 0 5px -2px rgba(0,0,0,0.1)"
                          : undefined,
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
                        isPinnedLeft && "z-[2] overflow-hidden",
                        isPinnedLeft &&
                          String(keyExtractor(item)) === selectedRowId
                          ? "bg-gray-100 group-hover:bg-gray-200"
                          : isPinnedLeft
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
