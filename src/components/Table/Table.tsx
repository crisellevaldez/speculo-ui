import React, { useState, useCallback } from "react";
import { cn } from "../../utils/cn";

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  minWidth?: string;
  width?: string;
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

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table
        className={cn(
          "min-w-full divide-y divide-gray-200 border shadow-md",
          className,
        )}
      >
        <thead className="bg-gray-50">
          <tr>
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
            {columns.map((column, index) => (
              <th
                key={String(column.key)}
                scope="col"
                style={{
                  minWidth: column.minWidth,
                  width: column.width,
                  position: "relative",
                }}
                className={cn(
                  "group px-3 py-3 text-left text-sm font-semibold text-gray-900",
                  sortable &&
                    column.sortable &&
                    "cursor-pointer hover:bg-gray-100",
                )}
                onClick={() => sortable && handleSort(String(column.key))}
              >
                <div className="flex items-center gap-2">
                  <span className="truncate">{column.header}</span>
                  {sortable &&
                    column.sortable &&
                    sortConfig?.key === column.key && (
                      <span className="shrink-0">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                </div>
                {/* Resizer handle */}
                <div
                  className={cn(
                    "absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-gray-300 group-hover:bg-gray-300",
                    resizing?.index === index && "bg-blue-500",
                  )}
                  onMouseDown={(e) => handleResizeStart(index, e)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-gray-50">
              {selectable && (
                <td className="w-14 px-3 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(String(keyExtractor(item)))}
                    onChange={() => handleSelectRow(String(keyExtractor(item)))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  style={{
                    minWidth: column.minWidth,
                    width: column.width,
                    maxWidth: column.width,
                  }}
                  className={cn(
                    "whitespace-normal px-3 py-4 text-sm text-gray-900",
                    "overflow-x-auto",
                    column.key === "actions" && "min-w-[120px]",
                  )}
                >
                  <div className="overflow-x-auto">
                    {column.cell ? (
                      column.cell(item)
                    ) : (
                      <span className="block">
                        {String(item[column.key as keyof T])}
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
