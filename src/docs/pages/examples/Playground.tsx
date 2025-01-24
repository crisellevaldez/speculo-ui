import { useState, useMemo } from "react";
import { Table } from "../../../components/Table/Table";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Alert } from "../../../components/Alert/Alert";
import {
  DateRangePicker,
  DateRange,
} from "../../../components/DateRangePicker/DateRangePicker";
import { DualDateRangePicker } from "../../../components/DualDateRangePicker/DualDateRangePicker";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import { Home, Users, Settings, FileText, Bell } from "lucide-react";

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
  const sidebarItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: "Dashboard",
      href: "#",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Users",
      href: "#",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Reports",
      items: [
        {
          label: "Daily Report",
          href: "#",
        },
        {
          label: "Weekly Report",
          href: "#",
        },
      ],
    },
    {
      icon: <Bell className="h-4 w-4" />,
      label: "Notifications",
      href: "#",
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      href: "#",
    },
  ];

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
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2024, 11, 22), // December 22, 2024
    to: new Date(2025, 0, 4), // January 4, 2025
  });

  const [dualDateRange, setDualDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSort = (key: string, direction: "asc" | "desc") => {
    console.log("Table Sort:", { key, direction });
    setSortKey(key as SortableKeys);
    setSortDirection(direction);
  };

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    const baseData = Array.from({ length: 10 }, (_, index) => ({
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
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 p-4">
        <div className="space-y-4">
          <div className="space-y-4">
            <h2 className="font-semibold">Alert Examples</h2>
            <Alert variant="info">
              This is an info alert with a link example.{" "}
              <a href="#" className="font-medium underline">
                Learn more
              </a>
            </Alert>
            <Alert variant="warning">
              Your trial period will expire in 3 days. Please upgrade your
              subscription.
            </Alert>
            <Alert variant="success">
              Your changes have been saved successfully.
            </Alert>
            <Alert variant="error">
              There was an error processing your request. Please try again.
            </Alert>
          </div>
          <div className="mb-4 space-y-4">
            <h2 className="font-semibold">Date Range Picker Example</h2>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder={{ from: "Start date", to: "End date" }}
            />
          </div>
          <div className="mb-4 space-y-4">
            <h2 className="font-semibold">Dual Date Range Picker Example</h2>
            <DualDateRangePicker
              value={dualDateRange}
              onChange={setDualDateRange}
              placeholder={{ from: "Start date", to: "End date" }}
            />
          </div>
          <div className="mb-4 space-y-4">
            <h2 className="font-semibold">Date Picker Example</h2>
            <div className="flex items-center gap-4">
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="Select date"
                locale="en-US"
                weekStartsOn={0}
              />
              <div className="text-sm text-gray-600">
                Selected: {selectedDate?.toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-semibold">Table with Right Pinned Columns</h2>
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
          <div className="h-[400px] overflow-auto">
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
              selectable
              onSort={handleSort}
              loading={isLoading}
            />
          </div>

          <div className="h-[400px] overflow-auto">
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
              selectable
              onSort={handleSort}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
