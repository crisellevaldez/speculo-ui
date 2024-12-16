import { useState } from "react";
import { Container } from "../../../components/Container/Container";
import { Modal } from "../../../components/Modal/Modal";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Textarea } from "../../../components/Textarea/Textarea";
import { Form } from "../../../components/Form/Form";
import { Typography } from "../../../components/Typography/Typography";

type ModalSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "full";

export default function ModalExamples() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<ModalSize>("base");

  const openModal = (size: ModalSize) => {
    setModalSize(size);
    setIsOpen(true);
  };

  const getModalContent = () => {
    switch (modalSize) {
      case "xs":
        return {
          title: "Delete Confirmation",
          body: (
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <Typography>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </Typography>
            </div>
          ),
          footer: (
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Delete
              </Button>
            </>
          ),
        };

      case "sm":
        return {
          title: "Edit Profile",
          body: (
            <div className="space-y-4">
              <Form.Control>
                <Form.Label>Name</Form.Label>
                <Input placeholder="Enter your name" />
              </Form.Control>
              <Form.Control>
                <Form.Label>Email</Form.Label>
                <Input type="email" placeholder="Enter your email" />
              </Form.Control>
              <Form.Control>
                <Form.Label>Bio</Form.Label>
                <Textarea placeholder="Tell us about yourself" rows={3} />
              </Form.Control>
            </div>
          ),
          footer: (
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Save Changes
              </Button>
            </>
          ),
        };

      case "base":
        return {
          title: "Create New Project",
          body: (
            <div className="space-y-6">
              <div className="space-y-4">
                <Form.Control>
                  <Form.Label>Project Name</Form.Label>
                  <Input placeholder="Enter project name" />
                </Form.Control>
                <Form.Control>
                  <Form.Label>Description</Form.Label>
                  <Textarea placeholder="Describe your project" rows={4} />
                </Form.Control>
                <div className="rounded-lg border border-gray-200 p-4">
                  <Typography className="mb-3 font-medium">
                    Team Members
                  </Typography>
                  <div className="space-y-2">
                    {["John Doe", "Jane Smith", "Mike Johnson"].map(
                      (member) => (
                        <div
                          key={member}
                          className="flex items-center justify-between rounded-md border border-gray-100 p-2"
                        >
                          <span>{member}</span>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      ),
                    )}
                    <Button variant="secondary" size="sm" className="w-full">
                      Add Team Member
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ),
          footer: (
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Create Project
              </Button>
            </>
          ),
        };

      case "lg":
        return {
          title: "Analytics Overview",
          body: (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Users", value: "12,345", change: "+12%" },
                  { label: "Active Users", value: "8,901", change: "+8%" },
                  { label: "Revenue", value: "$45,678", change: "+15%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <Typography className="text-sm text-gray-600">
                      {stat.label}
                    </Typography>
                    <div className="mt-1 flex items-baseline">
                      <Typography className="text-2xl font-semibold">
                        {stat.value}
                      </Typography>
                      <Typography className="ml-2 text-sm text-green-600">
                        {stat.change}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <Typography className="mb-4 font-medium">
                  Monthly Growth
                </Typography>
                <div className="h-64 w-full bg-gray-50" />
              </div>
            </div>
          ),
          footer: (
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          ),
        };

      case "xl":
        return {
          title: "Advanced Analytics",
          body: (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Total Users", value: "12,345", change: "+12%" },
                  { label: "Active Users", value: "8,901", change: "+8%" },
                  { label: "Revenue", value: "$45,678", change: "+15%" },
                  { label: "Conversion", value: "2.4%", change: "+0.5%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <Typography className="text-sm text-gray-600">
                      {stat.label}
                    </Typography>
                    <div className="mt-1 flex items-baseline">
                      <Typography className="text-2xl font-semibold">
                        {stat.value}
                      </Typography>
                      <Typography className="ml-2 text-sm text-green-600">
                        {stat.change}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <Typography className="mb-4 font-medium">
                    Revenue Growth
                  </Typography>
                  <div className="h-80 w-full bg-gray-50" />
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <Typography className="mb-4 font-medium">
                    User Acquisition
                  </Typography>
                  <div className="h-80 w-full bg-gray-50" />
                </div>
              </div>
            </div>
          ),
          footer: (
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          ),
        };

      case "2xl":
        return {
          title: "Enterprise Dashboard",
          body: (
            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-4">
                {[
                  { label: "Total Users", value: "12,345", change: "+12%" },
                  { label: "Active Users", value: "8,901", change: "+8%" },
                  { label: "Revenue", value: "$45,678", change: "+15%" },
                  { label: "Conversion", value: "2.4%", change: "+0.5%" },
                  { label: "Churn Rate", value: "0.8%", change: "-0.2%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <Typography className="text-sm text-gray-600">
                      {stat.label}
                    </Typography>
                    <div className="mt-1 flex items-baseline">
                      <Typography className="text-2xl font-semibold">
                        {stat.value}
                      </Typography>
                      <Typography className="ml-2 text-sm text-green-600">
                        {stat.change}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <Typography className="mb-4 font-medium">
                    Revenue Growth
                  </Typography>
                  <div className="h-96 w-full bg-gray-50" />
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <Typography className="mb-4 font-medium">
                    User Acquisition
                  </Typography>
                  <div className="h-96 w-full bg-gray-50" />
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <Typography className="mb-4 font-medium">
                    Customer Segments
                  </Typography>
                  <div className="h-96 w-full bg-gray-50" />
                </div>
              </div>
            </div>
          ),
          footer: (
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          ),
        };

      case "full":
        return {
          title: "Image Gallery",
          body: (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Input placeholder="Search images..." className="w-64" />
                <div className="space-x-2">
                  <Button variant="secondary">Filter</Button>
                  <Button variant="primary">Upload New</Button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-gray-100"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Typography className="text-sm text-gray-600">
                  Showing 1-24 of 240 images
                </Typography>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm">
                    Previous
                  </Button>
                  <Button variant="secondary" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ),
          footer: (
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          ),
        };
    }
  };

  const content = getModalContent();

  return (
    <div className="space-y-12">
      <section className="space-y-8">
        <div className="prose max-w-none">
          <h2>Modal Size Examples</h2>
          <p>
            Modals come in different sizes to accommodate various types of
            content and use cases:
          </p>
          <ul>
            <li>
              <strong>Extra Small (xs)</strong>: Perfect for simple
              confirmations, alerts, or quick actions
            </li>
            <li>
              <strong>Small (sm)</strong>: Suitable for simple forms and basic
              content
            </li>
            <li>
              <strong>Base (base)</strong>: Default size, good for standard
              forms and content
            </li>
            <li>
              <strong>Large (lg)</strong>: For data visualization or complex
              content
            </li>
            <li>
              <strong>Extra Large (xl)</strong>: Larger dashboard layouts and
              data-rich interfaces
            </li>
            <li>
              <strong>2XL (2xl)</strong>: Complex enterprise dashboards and
              analytics
            </li>
            <li>
              <strong>Full Screen (full)</strong>: Immersive experiences with
              maximum screen usage
            </li>
          </ul>
        </div>

        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button onClick={() => openModal("xs")} className="w-full">
              Extra Small Modal
            </Button>
            <Button onClick={() => openModal("sm")} className="w-full">
              Small Modal
            </Button>
            <Button onClick={() => openModal("base")} className="w-full">
              Base Modal
            </Button>
            <Button onClick={() => openModal("lg")} className="w-full">
              Large Modal
            </Button>
            <Button onClick={() => openModal("xl")} className="w-full">
              Extra Large Modal
            </Button>
            <Button onClick={() => openModal("2xl")} className="w-full">
              2XL Modal
            </Button>
            <Button onClick={() => openModal("full")} className="w-full">
              Full Screen Modal
            </Button>
          </div>
        </Container>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size={modalSize}
        >
          <Modal.Header>{content?.title}</Modal.Header>
          <Modal.Body>{content?.body}</Modal.Body>
          <Modal.Footer>{content?.footer}</Modal.Footer>
        </Modal>
      </section>
    </div>
  );
}
