import { useState } from "react";
import { Table } from "../../../components/Table/Table";
import { Container } from "../../../components/Container/Container";
import { Input } from "../../../components/Input/Input";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Select } from "../../../components/Select/Select";

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
  [key: string]: unknown;
}

const PlaygroundPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const sidebarItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
      label: "Dashboard",
      href: "#",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
      label: "Users",
      items: [
        {
          label: "All Users",
          href: "#",
        },
        {
          label: "Add User",
          href: "#",
        },
      ],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      label: "Settings",
      href: "#",
    },
  ];

  const resizableColumns = [
    {
      key: "name",
      header: "Full Name",
      sortable: true,
      width: "200px",
      isPinned: true,
      pinPosition: "left",
    },
    {
      key: "email",
      header: "Email Address",
      sortable: true,
      width: "250px",
      resizable: true,
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
      sortable: true,
      width: "200px",
      resizable: true,
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
      width: "200px",
      resizable: true,
    },
    {
      key: "source",
      header: "Source",
      sortable: true,
      width: "150px",
      resizable: true,
    },
  ];

  const data = Array.from({ length: 20 }, (_, index) => ({
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

  return (
    <Container>
      <div className="mb-4 space-y-8 font-sans">
        <div className="space-y-4">
          <h2 className="font-semibold">Navigation Examples</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Collapsible Sidebar</h3>
              <p className="mb-4 text-sm text-gray-600">
                A sidebar with collapsible navigation and nested items.
              </p>
              <div className="h-[400px] w-full rounded-lg border">
                <Sidebar
                  items={sidebarItems}
                  collapsed={sidebarCollapsed}
                  onCollapse={setSidebarCollapsed}
                  defaultCollapsed={true}
                />
              </div>
            </div>
          </div>

          <h2 className="font-semibold">Form Examples</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Searchable Select</h3>
              <p className="mb-4 text-sm text-gray-600">
                A select component with search functionality.
              </p>
              <Select
                options={[
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue" },
                  { value: "angular", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "nextjs", label: "Next.js" },
                  { value: "nuxt", label: "Nuxt" },
                  { value: "remix", label: "Remix" },
                  { value: "astro", label: "Astro" },
                ]}
                placeholder="Select a framework"
                searchable
                className="max-w-sm"
              />

              <h3 className="mb-2 mt-8 text-sm font-medium">Input Examples</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-gray-600">
                    Input with search icon (pl-9 and pr-3 padding)
                  </p>
                  <Input
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    }
                    placeholder="Search with icon..."
                    className="max-w-sm"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm text-gray-600">
                    Input without icon (px-3 padding)
                  </p>
                  <Input placeholder="Regular input..." className="max-w-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Table Examples</h2>
          <div className="space-y-8">
            <div>
              <div className="space-y-8">
                <div>
                  <p className="mb-4 text-sm text-gray-600">
                    Resizable columns with data
                  </p>
                  <div className="h-[400px] overflow-auto">
                    <Table<TableData>
                      columns={resizableColumns}
                      data={data}
                      keyExtractor={(item) => item.email}
                      selectable
                      selectedRows={selectedRows}
                      onSelectRows={setSelectedRows}
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-sm text-gray-600">
                    Empty table with many columns
                  </p>
                  <div className="h-[400px] overflow-auto">
                    <Table<TableData>
                      columns={[
                        {
                          key: "id",
                          header: "ID",
                          width: "100px",
                          isPinned: true,
                          pinPosition: "left",
                        },
                        {
                          key: "name",
                          header: "Full Name",
                          width: "200px",
                          isPinned: true,
                          pinPosition: "left",
                        },
                        {
                          key: "email",
                          header: "Email Address",
                          width: "250px",
                          resizable: true,
                        },
                        {
                          key: "phoneNumber",
                          header: "Phone Number",
                          width: "200px",
                          resizable: true,
                        },
                        {
                          key: "department",
                          header: "Department",
                          width: "200px",
                          resizable: true,
                        },
                        {
                          key: "role",
                          header: "Role",
                          width: "150px",
                          resizable: true,
                        },
                        {
                          key: "status",
                          header: "Status",
                          width: "150px",
                          resizable: true,
                        },
                        {
                          key: "lastCallAnswered",
                          header: "Last Call",
                          width: "200px",
                          resizable: true,
                        },
                        {
                          key: "recentOutcome",
                          header: "Recent Outcome",
                          width: "200px",
                          resizable: true,
                        },
                        {
                          key: "source",
                          header: "Source",
                          width: "150px",
                          resizable: true,
                        },
                        {
                          key: "opt_in",
                          header: "Opt-in Status",
                          width: "150px",
                          resizable: true,
                        },
                        {
                          key: "opt_in_date",
                          header: "Opt-in Date",
                          width: "200px",
                          resizable: true,
                        },
                      ]}
                      data={[]}
                      keyExtractor={(item) => item.email}
                      emptyStateText="No records found in the database"
                      selectable
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlaygroundPage;
