import { useState } from "react";
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
  [key: string]: unknown;
}

const PlaygroundPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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
          <h2 className="font-semibold">Table Examples</h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-sm font-medium">
                Resizable Columns Example
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Try dragging the column dividers to resize. First column is
                pinned and not resizable.
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlaygroundPage;
