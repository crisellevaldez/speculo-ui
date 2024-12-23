import { useState } from "react";
import { Container } from "../../../components/Container/Container";
import { Table } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";
import { Button } from "../../../components/Button/Button";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import { TimePicker } from "../../../components/TimePicker/TimePicker";
import { Select } from "../../../components/Select/Select";

const PlaygroundPage = () => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isModalTableLoading, setIsModalTableLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(
    undefined,
  );

  // Sample data for regular table with meaningful columns
  const regularColumns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      resizable: true,
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
      isPinned: true,
      pinPosition: "left",
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      resizable: false,
      width: "150px",
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
    },
  ];

  const regularData = [
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

  // Sample data for modal table with more columns
  const modalColumns = Array.from({ length: 100 }, (_, i) => ({
    key: `col${i + 1}`,
    header: `Column ${i + 1}`,
    sortable: true,
  }));

  const modalData = Array.from({ length: 50 }, (_, index) => {
    const rowData: Record<string, string | number> = {};
    modalColumns.forEach((col) => {
      rowData[col.key] = `Value ${index + 1}-${col.key.replace("col", "")}`;
    });
    return rowData;
  });

  return (
    <Container>
      <div className="space-y-8 py-8">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Component Playground</h2>
          <p className="mb-8 text-gray-600">
            Explore our component library with different variations and sizes.
          </p>
        </div>

        {/* Table Section */}
        <div className="h-[calc(100vh-350px)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Table Component</h3>
            <Button onClick={() => setIsTableLoading(!isTableLoading)}>
              Toggle Loading
            </Button>
          </div>
          <Table
            loading={isTableLoading}
            columns={regularColumns}
            data={regularData}
            keyExtractor={(item) => item.email}
            sortable
            selectable
            rowSelectable
            selectedRowId={selectedRowId}
            onRowSelect={(id) => {
              setSelectedRowId(id || undefined);
              const selectedRow = regularData.find((row) => row.email === id);
              console.log("Selected ID:", id);
              console.log("Selected Row Data:", selectedRow);
            }}
          />
        </div>

        {/* Date and Time Picker Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Date & Time Components</h3>
          <div className="flex flex-wrap items-start gap-8">
            <div className="space-y-4">
              <h4 className="font-medium">DatePicker</h4>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
                placeholder="Select date"
              />
              <div className="text-sm text-gray-500">
                Selected: {selectedDate?.toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">TimePicker</h4>
              <TimePicker
                value={selectedTime}
                onChange={setSelectedTime}
                minTime="09:00"
                maxTime="17:00"
                step={30}
                placeholder="Select time"
              />
              <div className="text-sm text-gray-500">
                Selected: {selectedTime}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Modal Components</h3>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsSmallModalOpen(true)}>
              Open Small Modal
            </Button>
            <Button onClick={() => setIsBaseModalOpen(true)}>
              Open Base Modal
            </Button>
            <Button onClick={() => setIsLargeModalOpen(true)}>
              Open Large Modal
            </Button>
            <Button onClick={() => setIsTableModalOpen(true)}>
              Open Table Modal
            </Button>
          </div>
        </div>

        {/* Table Modal */}
        <Modal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          className="w-full max-w-[95vw]"
          loading={isModalLoading}
        >
          <Modal.Header className="flex items-center justify-between">
            <span>Table Modal</span>
            <div className="flex gap-2">
              <Button onClick={() => setIsModalLoading(!isModalLoading)}>
                Toggle Modal Loading
              </Button>
              <Button
                onClick={() => setIsModalTableLoading(!isModalTableLoading)}
              >
                Toggle Table Loading
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Table
              columns={modalColumns}
              data={modalData}
              keyExtractor={(item) => item.col1}
              sortable
              selectable
              loading={isModalTableLoading}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsTableModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Small Modal */}
        <Modal
          isOpen={isSmallModalOpen}
          onClose={() => setIsSmallModalOpen(false)}
          size="sm"
        >
          <Modal.Header>Small Modal</Modal.Header>
          <Modal.Body>
            <p>This is a small modal with max-width-xl.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsSmallModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Base Modal */}
        <Modal
          isOpen={isBaseModalOpen}
          onClose={() => setIsBaseModalOpen(false)}
          size="base"
        >
          <Modal.Header>Base Modal with Form Components</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Select Option
                </label>
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                    { value: "4", label: "Option 4" },
                    { value: "5", label: "Option 5" },
                  ]}
                  placeholder="Choose an option"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Select Date
                </label>
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Select date"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Select Time
                </label>
                <TimePicker
                  value={selectedTime}
                  onChange={setSelectedTime}
                  placeholder="Select time"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsBaseModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Large Modal */}
        <Modal
          isOpen={isLargeModalOpen}
          onClose={() => setIsLargeModalOpen(false)}
          size="lg"
        >
          <Modal.Header>Large Modal</Modal.Header>
          <Modal.Body>
            <p>This is a large modal with max-width-3xl.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsLargeModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default PlaygroundPage;
