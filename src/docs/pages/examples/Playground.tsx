import { useState, useEffect } from "react";
import { Container } from "../../../components/Container/Container";
import moment from "moment-timezone";
import { ToastProvider, useToast } from "../../../components/Toast/Toast";
import { PhoneNumber } from "../../../components/PhoneNumber/PhoneNumber";
import { Table } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";
import { Button } from "../../../components/Button/Button";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import { TimePicker } from "../../../components/TimePicker/TimePicker";
import { Select } from "../../../components/Select/Select";
import { Input } from "../../../components/Input/Input";
import { Textarea } from "../../../components/Textarea/Textarea";
import { Search, Mail, User } from "lucide-react";

const ToastModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleShowToast = () => {
    showToast({
      message: "This toast appears above the modal!",
      variant: "success",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Toast & Modal Z-Index Demo</h3>
      <Button onClick={() => setIsModalOpen(true)}>
        Open Modal with Toast
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Modal with Toast Demo</Modal.Header>
        <Modal.Body>
          <p className="mb-4">
            Click the button below to show a toast that will appear above this
            modal.
          </p>
          <Button onClick={handleShowToast}>Show Toast</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const PlaygroundPage = () => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isModalTableLoading, setIsModalTableLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tokyoTimezone] = useState("Asia/Tokyo");
  const [manilaTimezone] = useState("Asia/Manila");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(
    undefined,
  );
  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [textareaValue, setTextareaValue] = useState("");
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value);
  };

  // Sample data for regular table with meaningful columns
  const regularColumns = [
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
      key: "location",
      header: "Location",
      sortable: true,
      width: "200px",
    },
    {
      key: "team",
      header: "Team",
      sortable: true,
      width: "200px",
    },
    {
      key: "project",
      header: "Project",
      sortable: true,
      width: "200px",
    },
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
      width: "200px",
    },
  ];

  const regularData = Array.from({ length: 20 }, (_, index) => {
    const baseData = [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        role: "Developer",
        department: "Engineering",
        status: "Active",
        location: "New York",
        team: "Frontend",
        project: "Dashboard",
        manager: "Alice Cooper",
        startDate: "2023-01-15",
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        role: "Designer",
        department: "Product",
        status: "Active",
        location: "San Francisco",
        team: "Design",
        project: "Mobile App",
        manager: "Bob Wilson",
        startDate: "2023-02-20",
      },
      {
        name: "Michael Brown",
        email: "michael.b@example.com",
        role: "Manager",
        department: "Sales",
        status: "Away",
        location: "Chicago",
        team: "Sales",
        project: "CRM",
        manager: "Carol Davis",
        startDate: "2022-11-10",
      },
      {
        name: "Emily Davis",
        email: "emily.d@example.com",
        role: "Analyst",
        department: "Finance",
        status: "Active",
        location: "Boston",
        team: "Analytics",
        project: "Reporting",
        manager: "David Lee",
        startDate: "2023-03-05",
      },
      {
        name: "David Wilson",
        email: "david.w@example.com",
        role: "Developer",
        department: "Engineering",
        status: "Inactive",
        location: "Seattle",
        team: "Backend",
        project: "API",
        manager: "Eve Martin",
        startDate: "2023-04-12",
      },
    ];
    const item = { ...baseData[index % 5] };
    item.email = `${item.email.split("@")[0]}_${index + 1}@example.com`;
    return item;
  });

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
    <ToastProvider>
      <Container>
        <div className="space-y-8 py-8">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Component Playground</h2>
            <p className="mb-8 text-gray-600">
              Explore our component library with different variations and sizes.
            </p>
          </div>

          {/* Timezone-aware DatePicker Demo */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Timezone-aware DatePicker (Tokyo & Manila)
            </h3>
            <div className="flex flex-wrap items-start gap-8">
              <div className="space-y-4">
                <h4 className="font-medium">Tokyo Timezone</h4>
                <div className="space-y-2">
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minDate={moment.tz(tokyoTimezone).startOf("day").toDate()}
                    placeholder={`Select date (${tokyoTimezone})`}
                  />
                  <div className="text-sm text-gray-500">
                    Selected:{" "}
                    {selectedDate
                      ? moment(selectedDate)
                          .tz(tokyoTimezone)
                          .format("YYYY-MM-DD HH:mm:ss z")
                      : "None"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Min Date:{" "}
                    {moment
                      .tz(tokyoTimezone)
                      .startOf("day")
                      .format("YYYY-MM-DD HH:mm:ss z")}
                  </div>
                  <div className="text-sm text-gray-500">
                    Current Time (Tokyo):{" "}
                    {moment().tz(tokyoTimezone).format("YYYY-MM-DD HH:mm:ss z")}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Manila Timezone</h4>
                <div className="space-y-2">
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minDate={moment.tz(manilaTimezone).startOf("day").toDate()}
                    placeholder={`Select date (${manilaTimezone})`}
                  />
                  <div className="text-sm text-gray-500">
                    Selected:{" "}
                    {selectedDate
                      ? moment(selectedDate)
                          .tz(manilaTimezone)
                          .format("YYYY-MM-DD HH:mm:ss z")
                      : "None"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Min Date:{" "}
                    {moment
                      .tz(manilaTimezone)
                      .startOf("day")
                      .format("YYYY-MM-DD HH:mm:ss z")}
                  </div>
                  <div className="text-sm text-gray-500">
                    Current Time (Manila):{" "}
                    {moment()
                      .tz(manilaTimezone)
                      .format("YYYY-MM-DD HH:mm:ss z")}
                  </div>
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

          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Input Component</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <Input placeholder="Basic input" />
                <Input
                  placeholder="With helper text"
                  helperText="This is a helper text"
                />
                <Input
                  placeholder="With error"
                  error="This field is required"
                />
                <Input placeholder="Disabled input" disabled />
                <Input placeholder="Loading state" isLoading />
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="With start icon"
                  startIcon={<Search className="h-4 w-4" />}
                />
                <Input
                  placeholder="With end icon"
                  endIcon={<Mail className="h-4 w-4" />}
                />
                <Input
                  placeholder="With both icons"
                  startIcon={<User className="h-4 w-4" />}
                  endIcon={<Mail className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>

          {/* Select Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Select Component</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                  ]}
                  value={singleSelectValue}
                  onChange={(value) => setSingleSelectValue(value as string)}
                  placeholder="Single select"
                />
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                  ]}
                  value={singleSelectValue}
                  onChange={(value) => setSingleSelectValue(value as string)}
                  placeholder="With error"
                  error="Please select an option"
                />
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                  ]}
                  placeholder="Loading state"
                  isLoading
                />
              </div>
              <div className="space-y-4">
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                  ]}
                  value={multiSelectValue}
                  onChange={(value) => setMultiSelectValue(value as string[])}
                  placeholder="Multi select"
                  multiple
                />
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                  ]}
                  value={multiSelectValue}
                  onChange={(value) => setMultiSelectValue(value as string[])}
                  placeholder="Searchable multi select"
                  multiple
                  searchable
                />
              </div>
            </div>
          </div>

          {/* Textarea Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Textarea Component</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <Textarea placeholder="Basic textarea" />
                <Textarea
                  placeholder="Auto-resize textarea"
                  autoResize
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
                <Textarea
                  placeholder="With error"
                  error="This field is required"
                />
              </div>
              <div className="space-y-4">
                <Textarea
                  placeholder="With character count"
                  maxLength={100}
                  showCount
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
                <Textarea placeholder="Loading state" isLoading />
                <Textarea placeholder="Disabled textarea" disabled />
              </div>
            </div>
          </div>

          {/* Phone Number Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Phone Number Component</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <PhoneNumber
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                />
                <PhoneNumber
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="With helper text"
                  helperText="Enter your contact number"
                />
                <PhoneNumber
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="With error"
                  error="Invalid phone number"
                />
              </div>
              <div className="space-y-4">
                <PhoneNumber
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="Loading state"
                  isLoading
                />
                <PhoneNumber
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="Disabled state"
                  disabled
                />
                <PhoneNumber
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="Different country"
                  defaultCountry="GB"
                />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Selected phone: {phoneValue || "None"}
            </div>
          </div>

          {/* Button Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Button Component</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">
                  Small Primary
                </Button>
                <Button variant="primary" size="md">
                  Medium Primary
                </Button>
                <Button variant="primary" size="lg">
                  Large Primary
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="sm">
                  Small Secondary
                </Button>
                <Button variant="secondary" size="md">
                  Medium Secondary
                </Button>
                <Button variant="secondary" size="lg">
                  Large Secondary
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">
                  Small Outline
                </Button>
                <Button variant="outline" size="md">
                  Medium Outline
                </Button>
                <Button variant="outline" size="lg">
                  Large Outline
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" isLoading>
                  Loading
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="h-[calc(100vh-350px)] min-h-[500px]">
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
            <Modal.Body className="min-h-[200px]">
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

        {/* Toast Modal Demo */}
        <ToastModalDemo />
      </Container>
    </ToastProvider>
  );
};

export default PlaygroundPage;
