import React, { useState, useCallback } from "react";
import { cn } from "../../utils/cn";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  minWidth?: string;
  width?: string;
  isPinned?: boolean;
  pinPosition?: "left" | "right";
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
  scrollable?: boolean;
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
  scrollable = false,
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
  const totalWidth = columns.reduce(
    (acc, col) => acc + parseInt(col.width || "100"),
    0,
  );

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

  // Column resizing handlers
  const handleResizeStart = (index: number, e: React.MouseEvent) => {
    const startWidth = columns[index].width
      ? parseInt(columns[index].width!)
      : 100;
    setResizing({
      index,
      startX: e.pageX,
      startWidth,
    });
  };

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!resizing) return;

      const diff = e.pageX - resizing.startX;
      const newWidth = Math.max(100, resizing.startWidth + diff);

      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        newColumns[resizing.index] = {
          ...newColumns[resizing.index],
          width: `${newWidth}px`,
        };
        return newColumns;
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
    return columns
      .slice(0, index)
      .filter((col) => col.isPinned && col.pinPosition === "left")
      .reduce((acc, col) => acc + parseInt(col.width || "100"), 0);
  };

  return (
    <div className="relative h-full w-full overflow-auto rounded-xl border shadow-sm [scrollbar-gutter:stable] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar]:w-2.5">
      <div
        className="inline-block min-w-full align-middle"
        style={{ width: `${totalWidth}px` }}
      >
        <table className={cn("relative w-full border-collapse", className)}>
          {/* Fixed header */}
          <thead className="sticky top-0 z-[3]">
            <tr className="border-b border-gray-200">
              {selectable && (
                <th scope="col" className="w-14 px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 && selectedRows.length === data.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column, index) => {
                const isPinnedLeft =
                  column.isPinned && column.pinPosition === "left";
                const isLastPinned = index === lastPinnedIndex;
                return (
                  <th
                    key={String(column.key)}
                    scope="col"
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      position: isPinnedLeft ? "sticky" : undefined,
                      left: isPinnedLeft
                        ? `${getLeftPosition(index)}px`
                        : undefined,
                      boxShadow: isLastPinned
                        ? "2px 0 5px -2px rgba(0,0,0,0.1)"
                        : undefined,
                    }}
                    className={cn(
                      "relative bg-gray-200 px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-900",
                      sortable &&
                        column.sortable &&
                        "cursor-pointer hover:bg-gray-300",
                      isPinnedLeft && "z-[3]",
                    )}
                    onClick={() => sortable && handleSort(String(column.key))}
                  >
                    <div className="flex items-center gap-2">
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
                    {/* Resizer handle */}
                    <div
                      className={cn(
                        "absolute -right-1 top-0 z-10 h-full w-2 cursor-col-resize bg-transparent hover:bg-gray-400 group-hover:bg-gray-400",
                        resizing?.index === index && "bg-blue-500",
                      )}
                      onMouseDown={(e) => handleResizeStart(index, e)}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="group hover:bg-gray-100">
                {selectable && (
                  <td className="w-14 px-3 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(
                        String(keyExtractor(item)),
                      )}
                      onChange={() =>
                        handleSelectRow(String(keyExtractor(item)))
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map((column, index) => {
                  const isPinnedLeft =
                    column.isPinned && column.pinPosition === "left";
                  const isLastPinned = index === lastPinnedIndex;
                  return (
                    <td
                      key={String(column.key)}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        maxWidth: scrollable ? column.width : undefined,
                        position: isPinnedLeft ? "sticky" : undefined,
                        left: isPinnedLeft
                          ? `${getLeftPosition(index)}px`
                          : undefined,
                        boxShadow: isLastPinned
                          ? "2px 0 5px -2px rgba(0,0,0,0.1)"
                          : undefined,
                      }}
                      className={cn(
                        "px-3 py-4 text-sm text-gray-900",
                        scrollable && "max-w-0",
                        column.key === "actions" && "min-w-[120px]",
                        isPinnedLeft &&
                          "z-[1] bg-white group-hover:bg-gray-100",
                      )}
                    >
                      <div
                        className={cn(
                          scrollable ? "overflow-hidden" : undefined,
                        )}
                      >
                        <div
                          className={cn(
                            scrollable ? "overflow-x-auto" : undefined,
                          )}
                        >
                          {column.cell ? (
                            column.cell(item)
                          ) : (
                            <span
                              className={cn(
                                "block",
                                scrollable
                                  ? "whitespace-nowrap"
                                  : "whitespace-normal break-words",
                              )}
                            >
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
    </div>
  );
}
