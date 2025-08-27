import { useState, useMemo } from "react";
import { Table } from "../../../../components/Table/Table";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { Progress } from "../../../../components/Progress/Progress";
import { Typography } from "../../../../components/Typography/Typography";
import { cn } from "../../../../utils/cn";

export function DataComponentsGroup() {
  // State for Table
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  interface TableData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive" | "Pending";
    [key: string]: unknown;
  }

  // Generate sample data for the table
  const sampleData: TableData[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][index % 3],
      status: ["Active", "Inactive", "Pending"][index % 3] as
        | "Active"
        | "Inactive"
        | "Pending",
    }));
  }, []);

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return sampleData;

    return [...sampleData].sort((a, b) => {
      const aValue = String(a[sortKey as keyof TableData]);
      const bValue = String(b[sortKey as keyof TableData]);
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [sampleData, sortKey, sortDirection]);

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortKey(key);
    setSortDirection(direction);
  };

  return (
    <div className="space-y-12">
      {/* Table */}
      <div className="space-y-6">
        <Typography variant="h2">Table</Typography>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h3">Interactive Table</Typography>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLoading(!isLoading)}
                className="rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-200"
              >
                {isLoading ? "Stop Loading" : "Start Loading"}
              </button>
              <button
                onClick={() => {
                  setSortKey(null);
                  setSortDirection(null);
                }}
                className="rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-200"
              >
                Clear Sort
              </button>
            </div>
          </div>
          <div className="h-[300px] overflow-auto">
            <Table<TableData>
              columns={[
                {
                  key: "id",
                  header: "ID",
                  width: "80px",
                  isPinned: true,
                  pinPosition: "left",
                  sortable: true,
                },
                {
                  key: "name",
                  header: "Name",
                  width: "200px",
                  sortable: true,
                },
                {
                  key: "email",
                  header: "Email",
                  width: "250px",
                  sortable: true,
                },
                {
                  key: "role",
                  header: "Role",
                  width: "150px",
                  sortable: true,
                },
                {
                  key: "status",
                  header: "Status",
                  width: "150px",
                  cell: (item: TableData) => (
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                        item.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800",
                      )}
                    >
                      {item.status}
                    </span>
                  ),
                  sortable: true,
                },
              ]}
              data={sortedData}
              keyExtractor={(item) => item.id.toString()}
              sortable
              selectable
              selectedRows={selectedRows}
              onSelectRows={setSelectedRows}
              onSort={handleSort}
              loading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="space-y-6">
        <Typography variant="h2">Pagination</Typography>
        <div className="space-y-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-6">
        <Typography variant="h2">Progress</Typography>
        <div className="space-y-4">
          <div className="space-y-2">
            <Typography variant="h3">Default Progress</Typography>
            <Progress value={30} />
          </div>
          <div className="space-y-2">
            <Typography variant="h3">Progress with Label</Typography>
            <Progress value={60} showValue />
          </div>
          <div className="space-y-2">
            <Typography variant="h3">Indeterminate Progress</Typography>
            <Progress indeterminate />
          </div>
          <div className="space-y-2">
            <Typography variant="h3">Custom Color Progress</Typography>
            <Progress value={80} className="bg-blue-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
