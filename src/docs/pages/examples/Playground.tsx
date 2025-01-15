import { useState, useMemo } from "react";
import { Table } from "../../../components/Table/Table";
import { Container } from "../../../components/Container/Container";

interface TableData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  phoneNumber: string;
  tags: string[];
  flows: string[];
  source: string;
  recentOutcome: string;
  lastCallAnswered: string;
  opt_in: boolean;
  opt_in_date: string;
  [key: string]: string | string[] | boolean | unknown;
}

const PlaygroundPage = () => {
  type SortableKeys =
    | "name"
    | "email"
    | "department"
    | "role"
    | "phoneNumber"
    | "source"
    | "recentOutcome"
    | "opt_in"
    | "opt_in_date"
    | "status"
    | "lastCallAnswered";

  const [sortKey, setSortKey] = useState<SortableKeys | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null,
  );

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortKey(key as SortableKeys);
    setSortDirection(direction);
  };

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    const baseData = Array.from({ length: 50 }, (_, index) => ({
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      phoneNumber: `+1234567890${index}`,
      role: "Developer",
      department: "Engineering",
      status: "Active",
      tags: ["Tag 1", "Tag 2"],
      flows: ["Flow 1", "Flow 2"],
      source: "Website",
      recentOutcome: "Answered",
      lastCallAnswered: "2024-01-14T12:00:00Z",
      opt_in: true,
      opt_in_date: "2024-01-01T00:00:00Z",
    }));

    if (!sortKey || !sortDirection) return baseData;

    return [...baseData].sort((a, b) => {
      const aValue = String(a[sortKey]);
      const bValue = String(b[sortKey]);
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [sortKey, sortDirection]);

  return (
    <Container>
      <div className="mb-4 space-y-8 font-sans">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Table with Right Pinned Columns</h2>
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
          <div className="h-[600px] overflow-auto">
            <Table<TableData>
              columns={[
                {
                  key: "name",
                  header: "Name",
                  width: "250px",
                  isPinned: true,
                  pinPosition: "left",
                  sortable: true,
                },
                {
                  key: "email",
                  header: "Email",
                  width: "400px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "department",
                  header: "Department",
                  width: "300px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "role",
                  header: "Role",
                  width: "250px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "phoneNumber",
                  header: "Phone",
                  width: "250px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "source",
                  header: "Source",
                  width: "250px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "recentOutcome",
                  header: "Outcome",
                  width: "250px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "opt_in",
                  header: "Opt-in",
                  width: "200px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "opt_in_date",
                  header: "Opt-in Date",
                  width: "300px",
                  resizable: true,
                  sortable: true,
                },
                {
                  key: "status",
                  header: "Status",
                  width: "200px",
                  isPinned: true,
                  pinPosition: "right",
                  sortable: true,
                },
                {
                  key: "lastCallAnswered",
                  header: "Last Activity",
                  width: "250px",
                  isPinned: true,
                  pinPosition: "right",
                  sortable: true,
                },
              ]}
              data={sortedData}
              keyExtractor={(item) => item.email}
              sortable
              onSort={handleSort}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlaygroundPage;
