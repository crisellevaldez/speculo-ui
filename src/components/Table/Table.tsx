import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T> {
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

export function Table<T>({
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
    <div className="overflow-x-auto rounded-lg">
      <table
        className={cn(
          "min-w-full divide-y divide-gray-200 border shadow-md",
          className,
        )}
      >
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left">
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
                key={column.key}
                className={cn(
                  "px-6 py-3 text-left text-sm font-semibold text-gray-900",
                  sortable &&
                    column.sortable &&
                    "cursor-pointer hover:bg-gray-100",
                )}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {sortable &&
                    column.sortable &&
                    sortConfig?.key === column.key && (
                      <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
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
                <td className="px-6 py-4">
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
                  key={column.key}
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                >
                  {column.cell ? column.cell(item) : (item as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
