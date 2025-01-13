import { useState } from "react";
import { Table } from "../../../components/Table/Table";
import { Container } from "../../../components/Container/Container";
import { Button } from "../../../components/Button/Button";
import { Drawer } from "../../../components/Drawer/Drawer";
import { Modal } from "../../../components/Modal/Modal";
import { DateRangePicker } from "../../../components/DateRangePicker/DateRangePicker";
import { Select } from "../../../components/Select/Select";
import { TimePicker } from "../../../components/TimePicker/TimePicker";
import { DatePicker } from "../../../components/DatePicker/DatePicker";

interface TableData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  [key: string]: unknown;
}

const PlaygroundPage = () => {
  const [isTableLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(
    undefined,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState<
    "left" | "right" | "top" | "bottom"
  >("right");
  const [drawerSize, setDrawerSize] = useState<
    "sm" | "md" | "lg" | "xl" | "full"
  >("xl");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  const columns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      resizable: false,
      width: "200px",
      isPinned: true,
      pinPosition: "left",
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      resizable: true,
      width: "250px",
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      resizable: false,
      width: "150px",
      isCentered: true,
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
      resizable: true,
      width: "200px",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      resizable: false,
      width: "120px",
      isCentered: true,
    },
    {
      key: "actions",
      header: "Actions",
      width: "200px",
      isCentered: true,
      cell: (row: TableData) => (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRowAction("view", row)}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRowAction("edit", row)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRowAction("delete", row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleRowAction = (
    action: "view" | "edit" | "delete",
    row: TableData,
  ) => {
    console.log(`${action} action for:`, row);
  };

  const data = Array.from({ length: 20 }, (_, index) => {
    const baseData = [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        role: "Developer",
        department: "Engineering",
        status: "Active",
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        role: "Designer",
        department: "Product",
        status: "Active",
      },
      {
        name: "Michael Brown",
        email: "michael.b@example.com",
        role: "Manager",
        department: "Sales",
        status: "Away",
      },
      {
        name: "Emily Davis",
        email: "emily.d@example.com",
        role: "Analyst",
        department: "Finance",
        status: "Active",
      },
      {
        name: "David Wilson",
        email: "david.w@example.com",
        role: "Developer",
        department: "Engineering",
        status: "Inactive",
      },
    ];
    const item = { ...baseData[index % 5] };
    item.email = `${item.email.split("@")[0]}_${index + 1}@example.com`;
    return item;
  });

  return (
    <Container>
      <div className="mb-4 space-y-8 divide-y divide-gray-200">
        <div className="space-y-4 pb-4">
          <h2 className="font-semibold">Pinned Columns Example</h2>

          <Table<TableData>
            selectable
            selectedRows={selectedRows}
            onSelectRows={setSelectedRows}
            columns={[
              {
                key: "name",
                header: "Name",
                sortable: true,
                width: "200px",
                isPinned: true,
                pinPosition: "left",
              },
              { key: "email", header: "Email", sortable: true, width: "250px" },
              { key: "role", header: "Role", sortable: true, width: "150px" },
              {
                key: "department",
                header: "Department",
                sortable: true,
                width: "200px",
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                width: "150px",
              },
              {
                key: "location",
                header: "Location",
                sortable: true,
                width: "200px",
              },
              { key: "team", header: "Team", sortable: true, width: "180px" },
              {
                key: "manager",
                header: "Manager",
                sortable: true,
                width: "200px",
              },
            ]}
            data={data.slice(0, 5)}
            keyExtractor={(item) => item.email}
          />
        </div>

        <div className="space-y-4 pb-4">
          <h2 className="font-semibold">Empty State Example</h2>
          <Table<TableData>
            columns={[
              { key: "name", header: "Name", sortable: true, width: "200px" },
              { key: "email", header: "Email", sortable: true, width: "250px" },
              { key: "role", header: "Role", sortable: true, width: "150px" },
              {
                key: "department",
                header: "Department",
                sortable: true,
                width: "200px",
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                width: "150px",
              },
              {
                key: "location",
                header: "Location",
                sortable: true,
                width: "200px",
              },
              { key: "team", header: "Team", sortable: true, width: "180px" },
              {
                key: "manager",
                header: "Manager",
                sortable: true,
                width: "200px",
              },
              {
                key: "startDate",
                header: "Start Date",
                sortable: true,
                width: "150px",
              },
              {
                key: "endDate",
                header: "End Date",
                sortable: true,
                width: "150px",
              },
              {
                key: "salary",
                header: "Salary",
                sortable: true,
                width: "150px",
              },
              {
                key: "performance",
                header: "Performance",
                sortable: true,
                width: "180px",
              },
            ]}
            data={[]}
            keyExtractor={(item) => item.email}
            emptyStateText="No employees found"
          />
        </div>

        <div className="space-y-4 pb-4">
          <h2 className="font-semibold">Table Size Variants</h2>
          <div className="space-y-8 font-inter">
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="space-y-2">
                <h3 className="text-sm font-medium capitalize text-gray-600">
                  {size} Size
                </h3>
                <Table
                  columns={[
                    { key: "name", header: "Name", sortable: true },
                    { key: "role", header: "Role", sortable: true },
                    { key: "department", header: "Department", sortable: true },
                  ]}
                  data={data.slice(0, 3)}
                  keyExtractor={(item) => item.email}
                  size={size}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 pb-4">
          <h2 className="font-semibold">Drawer Example</h2>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
            <select
              className="rounded border px-2 py-1"
              value={drawerPosition}
              onChange={(e) =>
                setDrawerPosition(e.target.value as typeof drawerPosition)
              }
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
            <select
              className="rounded border px-2 py-1"
              value={drawerSize}
              onChange={(e) =>
                setDrawerSize(e.target.value as typeof drawerSize)
              }
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="full">Full</option>
            </select>
          </div>
          <p className="text-sm text-gray-600">
            Try different positions and sizes - the drawer will be full width on
            mobile regardless of settings
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="font-semibold">Modal Example</h2>
          <div>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <p className="mt-2 text-sm text-gray-600">
              The modal uses the same close button style as the drawer.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="font-semibold">Dropdown Positioning Example</h2>
          <p className="mb-4 text-sm text-gray-600">
            Select and TimePicker components will automatically position their
            dropdowns above the trigger when there isn't enough space below.
          </p>
          <div className="flex h-[80vh] items-end">
            <div className="w-full space-y-4 rounded-lg border bg-gray-50 p-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Select (opens upward when near bottom)
                </label>
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                    { value: "4", label: "Option 4" },
                    { value: "5", label: "Option 5" },
                  ]}
                  placeholder="Select an option"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  TimePicker (opens upward when near bottom)
                </label>
                <TimePicker
                  value={null}
                  onChange={() => {}}
                  placeholder="Select time"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  DatePicker (opens upward when near bottom)
                </label>
                <DatePicker
                  value={null}
                  onChange={() => {}}
                  placeholder="Select date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-350px)] min-h-[500px]">
        <Table
          loading={isTableLoading}
          columns={columns}
          data={data}
          keyExtractor={(item) => item.email}
          sortable
          selectable
          rowSelectable
          selectedRowId={selectedRowId}
          onRowSelect={(id) => {
            setSelectedRowId(id || undefined);
            const selectedRow = data.find((row) => row.email === id);
            console.log("Selected ID:", id);
            console.log("Selected Row Data:", selectedRow);
          }}
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="sm"
        closeOnOverlayClick={true}
      >
        <Modal.Header>Sample Modal</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-gray-600">
              This modal demonstrates the new close button style that matches
              the drawer.
            </p>
            <div>
              <h3 className="mb-2 text-sm font-medium">Date Range Example</h3>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder={{ from: "Start date", to: "End date" }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side={drawerPosition}
        size={drawerSize}
        overlay={true}
        closeOnOverlayClick={true}
        closeOnEsc={true}
      >
        <Drawer.Header>Sample Drawer</Drawer.Header>
        <Drawer.Body>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">About the Drawer</h3>
              <p className="mt-2 text-gray-600">
                This is a sample drawer to test the component's functionality
                and scrolling behavior.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Features</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-600">
                <li>Header with title and close button</li>
                <li>Scrollable body content with proper height handling</li>
                <li>Footer with action buttons</li>
                <li>Responsive sizing (full width on mobile)</li>
                <li>Smooth transitions and animations</li>
                <li>Overlay background with click-to-close</li>
                <li>ESC key support for closing</li>
                <li>Focus management for accessibility</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Sample Content</h3>
              <p className="mt-2 text-gray-600">
                Below is some additional content to test scrolling:
              </p>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="mt-4 rounded-lg border p-4">
                  <h4 className="font-medium">Section {i + 1}</h4>
                  <p className="mt-2 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="outline" onClick={() => setDrawerOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setDrawerOpen(false)}>Save Changes</Button>
        </Drawer.Footer>
      </Drawer>
    </Container>
  );
};

export default PlaygroundPage;
