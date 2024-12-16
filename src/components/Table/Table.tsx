import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  minWidth?: string;
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
  columns,
  data,
  keyExtractor,
  selectable = false,
  selectedRows = [],
  onSelectRows,
  sortable = false,
  onSort,
  className,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
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
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                style={{ minWidth: column.minWidth }}
                className={cn(
                  "px-3 py-3 text-left text-sm font-semibold text-gray-900",
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
                  style={{ minWidth: column.minWidth }}
                  className={cn(
                    "whitespace-normal px-3 py-4 text-sm text-gray-900",
                    column.key === "actions" && "min-w-[120px]",
                  )}
                >
                  {column.cell ? (
                    column.cell(item)
                  ) : (
                    <span className="line-clamp-2">
                      {String(item[column.key as keyof T])}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
