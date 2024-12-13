import React, { useState, useMemo } from "react";
import { cn } from "../../utils/cn";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectRows?: (rows: string[]) => void;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
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
  filterable = false,
  pagination = false,
  pageSize = 10,
  className,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Handle sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a: T, b: T) => {
      const column = columns.find((col) => col.key === sortConfig.key);
      if (!column || !column.sortable) return 0;

      const sortFn =
        column.sortFn ||
        ((a: T, b: T) => {
          const aValue = (a as any)[column.key];
          const bValue = (b as any)[column.key];
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
          return 0;
        });

      return sortConfig.direction === "asc" ? sortFn(a, b) : sortFn(b, a);
    });
  }, [data, sortConfig, columns]);

  // Handle filtering
  const filteredData = useMemo(() => {
    if (!filterText) return sortedData;

    return sortedData.filter((item) =>
      Object.entries(item as any).some(([key, value]) => {
        const column = columns.find((col) => col.key === key);
        if (!column) return false;
        return String(value).toLowerCase().includes(filterText.toLowerCase());
      })
    );
  }, [sortedData, filterText, columns]);

  // Handle pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pagination, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handle row selection
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      onSelectRows?.([]);
    } else {
      onSelectRows?.(paginatedData.map((item) => String(keyExtractor(item))));
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
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter input */}
      {filterable && (
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Filter table..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className={cn("min-w-full divide-y divide-gray-200", className)}>
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      selectedRows.length === paginatedData.length
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
                      "cursor-pointer hover:bg-gray-100"
                  )}
                  onClick={() => sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {sortable &&
                      column.sortable &&
                      sortConfig?.key === column.key && (
                        <span>
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedData.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-gray-50">
                {selectable && (
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(
                        String(keyExtractor(item))
                      )}
                      onChange={() =>
                        handleSelectRow(String(keyExtractor(item)))
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                  >
                    {column.cell
                      ? column.cell(item)
                      : (item as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
