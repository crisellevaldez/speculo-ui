import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { Table } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";
import { useToast } from "../../../components/Toast/Toast";
import { Input } from "../../../components/Input/Input";
import { PageContainer } from "../../../components/Container/Container";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  role: string;
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "Admin",
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive",
    role: "User",
    lastLogin: "2024-01-10",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "active",
    role: "Editor",
    lastLogin: "2024-01-14",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "active",
    role: "User",
    lastLogin: "2024-01-13",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "inactive",
    role: "User",
    lastLogin: "2024-01-08",
  },
];

export function DataDisplayExamples() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { showToast } = useToast();

  const tableColumns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (row: User) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
    },
    {
      key: "lastLogin",
      header: "Last Login",
      sortable: true,
    },
    {
      key: "actions",
      header: "",
      cell: (row: User) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedUser(row);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              showToast({
                message: `Deleted user ${row.name}`,
                variant: "success",
              });
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer className="space-y-12 py-10">
      <div className="prose max-w-none">
        <Typography variant="h2">Data Display</Typography>
        <p>
          Explore examples of components used for displaying and managing data.
          These components work together to create interactive data-driven
          interfaces.
        </p>
      </div>

      {/* Table Example */}
      <div className="space-y-8">
        <Typography variant="h2">User Management Table</Typography>

        <div className="rounded-lg border">
          <Table
            columns={tableColumns}
            data={mockUsers}
            keyExtractor={(row) => row.id}
            sortable
          />
        </div>
      </div>

      {/* Modal Examples */}
      <div className="space-y-8">
        <Typography variant="h2">Modal Examples</Typography>

        <div className="flex gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Button
            variant="outline"
            onClick={() => {
              showToast({
                message: "This is a success message",
                variant: "success",
              });
            }}
          >
            Show Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              showToast({
                message: "This is an error message",
                variant: "error",
              });
            }}
          >
            Show Error Toast
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
        >
          <Modal.Header>
            {selectedUser ? "Edit User" : "Create User"}
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input
                  defaultValue={selectedUser?.name}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  defaultValue={selectedUser?.email}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Role</label>
                <Input
                  defaultValue={selectedUser?.role}
                  placeholder="Enter role"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                showToast({
                  message: selectedUser
                    ? `Updated user ${selectedUser.name}`
                    : "Created new user",
                  variant: "success",
                });
                setIsModalOpen(false);
                setSelectedUser(null);
              }}
            >
              {selectedUser ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Toast Variants */}
      <div className="space-y-8">
        <Typography variant="h2">Toast Variants</Typography>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button
            variant="outline"
            onClick={() => {
              showToast({
                message: "Success message",
                variant: "success",
              });
            }}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              showToast({
                message: "Error message",
                variant: "error",
              });
            }}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              showToast({
                message: "Warning message",
                variant: "warning",
              });
            }}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              showToast({
                message: "Info message",
                variant: "info",
              });
            }}
          >
            Info
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
