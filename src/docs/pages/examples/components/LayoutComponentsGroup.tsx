import { useState } from "react";
import { Container } from "../../../../components/Container/Container";
import { Drawer } from "../../../../components/Drawer/Drawer";
import { Modal } from "../../../../components/Modal/Modal";
import { Sidebar } from "../../../../components/Sidebar/Sidebar";
import { Tabs } from "../../../../components/Tabs/Tabs";
import { Typography } from "../../../../components/Typography/Typography";
import { Button } from "../../../../components/Button/Button";
import { Home, Users, Settings, FileText, Bell } from "lucide-react";

export function LayoutComponentsGroup() {
  // States for different Modal sizes
  const [isXsModalOpen, setIsXsModalOpen] = useState(false);
  const [isSmModalOpen, setIsSmModalOpen] = useState(false);
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
  const [isLgModalOpen, setIsLgModalOpen] = useState(false);
  const [isXlModalOpen, setIsXlModalOpen] = useState(false);
  const [is2xlModalOpen, setIs2xlModalOpen] = useState(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);

  // State for Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // State for Tabs
  const [activeTab, setActiveTab] = useState("tab1");

  // Sidebar items
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

  return (
    <div className="space-y-12">
      {/* Container */}
      <div className="space-y-6">
        <Typography variant="h2">Container</Typography>
        <div className="space-y-4">
          <Container className="rounded-md bg-gray-100 p-4">
            <Typography>
              This is a container component that provides consistent width and
              padding for your content.
            </Typography>
          </Container>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <Typography variant="h2">Tabs</Typography>
        <div className="space-y-4">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <button
                role="tab"
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
                  activeTab === "tab1"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tab1")}
              >
                Account
              </button>
              <button
                role="tab"
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
                  activeTab === "tab2"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tab2")}
              >
                Password
              </button>
              <button
                role="tab"
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
                  activeTab === "tab3"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tab3")}
              >
                Settings
              </button>
            </Tabs.List>
            <Tabs.Panel value="tab1">
              <div className="p-4">
                <Typography>Account settings content goes here.</Typography>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="tab2">
              <div className="p-4">
                <Typography>Password settings content goes here.</Typography>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="tab3">
              <div className="p-4">
                <Typography>General settings content goes here.</Typography>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>

      {/* Modal */}
      <div className="space-y-6">
        <Typography variant="h2">Modal</Typography>
        <Typography>
          Different sizes of modals to fit various content needs.
        </Typography>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Extra Small Modal (xs) */}
          <div className="rounded-lg border p-4">
            <Typography variant="h3" className="mb-2">
              Extra Small Modal
            </Typography>
            <Typography className="mb-4 text-sm text-gray-600">
              Compact modal for simple messages or quick actions (size="xs").
            </Typography>
            <Button onClick={() => setIsXsModalOpen(true)}>
              Open XS Modal
            </Button>
            <Modal
              isOpen={isXsModalOpen}
              onClose={() => setIsXsModalOpen(false)}
              size="xs"
            >
              <Modal.Header>Extra Small Modal</Modal.Header>
              <Modal.Body>
                <Typography>
                  This is a very compact modal for simple messages or quick
                  actions.
                </Typography>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsXsModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Small Modal (sm) */}
          <div className="rounded-lg border p-4">
            <Typography variant="h3" className="mb-2">
              Small Modal
            </Typography>
            <Typography className="mb-4 text-sm text-gray-600">
              Small modal for brief content (size="sm").
            </Typography>
            <Button onClick={() => setIsSmModalOpen(true)}>
              Open SM Modal
            </Button>
            <Modal
              isOpen={isSmModalOpen}
              onClose={() => setIsSmModalOpen(false)}
              size="sm"
            >
              <Modal.Header>Small Modal</Modal.Header>
              <Modal.Body>
                <Typography>
                  This is a small modal suitable for brief content or simple
                  forms.
                </Typography>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsSmModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Base Modal (default) */}
          <div className="rounded-lg border p-4">
            <Typography variant="h3" className="mb-2">
              Base Modal
            </Typography>
            <Typography className="mb-4 text-sm text-gray-600">
              Standard modal size (default, size="base").
            </Typography>
            <Button onClick={() => setIsBaseModalOpen(true)}>
              Open Base Modal
            </Button>
            <Modal
              isOpen={isBaseModalOpen}
              onClose={() => setIsBaseModalOpen(false)}
              size="base"
            >
              <Modal.Header>Base Modal</Modal.Header>
              <Modal.Body>
                <Typography>
                  This is the standard modal size, suitable for most content.
                </Typography>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsBaseModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Large Modal (lg) */}
          <div className="rounded-lg border p-4">
            <Typography variant="h3" className="mb-2">
              Large Modal
            </Typography>
            <Typography className="mb-4 text-sm text-gray-600">
              Large modal for more content (size="lg").
            </Typography>
            <Button onClick={() => setIsLgModalOpen(true)}>
              Open LG Modal
            </Button>
            <Modal
              isOpen={isLgModalOpen}
              onClose={() => setIsLgModalOpen(false)}
              size="lg"
            >
              <Modal.Header>Large Modal</Modal.Header>
              <Modal.Body>
                <Typography className="mb-4">
                  This is a large modal that provides more space for content.
                </Typography>
                <Typography>
                  It's suitable for forms, tables, or other content that
                  requires more room.
                </Typography>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsLgModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Extra Large Modal (xl) */}
          <div className="rounded-lg border p-4">
            <Typography variant="h3" className="mb-2">
              Extra Large Modal
            </Typography>
            <Typography className="mb-4 text-sm text-gray-600">
              Extra large modal for complex content (size="xl").
            </Typography>
            <Button onClick={() => setIsXlModalOpen(true)}>
              Open XL Modal
            </Button>
            <Modal
              isOpen={isXlModalOpen}
              onClose={() => setIsXlModalOpen(false)}
              size="xl"
            >
              <Modal.Header>Extra Large Modal</Modal.Header>
              <Modal.Body>
                <Typography className="mb-4">
                  This is an extra large modal that provides ample space for
                  complex content.
                </Typography>
                <Typography className="mb-4">
                  You can include multiple paragraphs, images, tables, or any
                  other content that requires more space.
                </Typography>
                <div className="rounded-md bg-gray-100 p-4">
                  <Typography variant="h4" className="mb-2">
                    Example Content
                  </Typography>
                  <Typography>
                    This could be a code block, a form, or any other complex
                    content that benefits from the additional space.
                  </Typography>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsXlModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* 2XL Modal (2xl) */}
          <div className="rounded-lg border p-4">
            <Typography variant="h3" className="mb-2">
              2XL Modal
            </Typography>
            <Typography className="mb-4 text-sm text-gray-600">
              Very large modal for extensive content (size="2xl").
            </Typography>
            <Button onClick={() => setIs2xlModalOpen(true)}>
              Open 2XL Modal
            </Button>
            <Modal
              isOpen={is2xlModalOpen}
              onClose={() => setIs2xlModalOpen(false)}
              size="2xl"
            >
              <Modal.Header>2XL Modal</Modal.Header>
              <Modal.Body>
                <Typography className="mb-4">
                  This is a very large modal that provides extensive space for
                  complex content.
                </Typography>
                <Typography className="mb-4">
                  Ideal for dashboards, complex forms, or data visualization
                  that requires significant screen real estate.
                </Typography>
                <div className="mb-4 rounded-md bg-gray-100 p-4">
                  <Typography variant="h4" className="mb-2">
                    Primary Content
                  </Typography>
                  <Typography>
                    This section could contain the main content of your modal,
                    such as a complex form or data table.
                  </Typography>
                </div>
                <div className="rounded-md bg-gray-100 p-4">
                  <Typography variant="h4" className="mb-2">
                    Secondary Content
                  </Typography>
                  <Typography>
                    This section could contain additional information or
                    controls related to the primary content.
                  </Typography>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIs2xlModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Full Modal (full) */}
          <div className="rounded-lg border p-4">
            <Typography variant="h3" className="mb-2">
              Full Width Modal
            </Typography>
            <Typography className="mb-4 text-sm text-gray-600">
              Full width modal for maximum content (size="full").
            </Typography>
            <Button onClick={() => setIsFullModalOpen(true)}>
              Open Full Modal
            </Button>
            <Modal
              isOpen={isFullModalOpen}
              onClose={() => setIsFullModalOpen(false)}
              size="full"
            >
              <Modal.Header>Full Width Modal</Modal.Header>
              <Modal.Body>
                <Typography className="mb-4">
                  This is a full width modal that takes up almost the entire
                  screen width.
                </Typography>
                <Typography className="mb-4">
                  It's ideal for complex applications, detailed forms, or any
                  content that benefits from maximum screen real estate.
                </Typography>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-md bg-gray-100 p-4">
                    <Typography variant="h4" className="mb-2">
                      Left Column
                    </Typography>
                    <Typography>
                      This could be one section of your content, taking
                      advantage of the full width layout.
                    </Typography>
                  </div>
                  <div className="rounded-md bg-gray-100 p-4">
                    <Typography variant="h4" className="mb-2">
                      Right Column
                    </Typography>
                    <Typography>
                      This could be another section of your content, displayed
                      side by side on larger screens.
                    </Typography>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsFullModalOpen(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div className="space-y-6">
        <Typography variant="h2">Drawer</Typography>
        <div className="space-y-4">
          <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <Drawer.Header>Example Drawer</Drawer.Header>
            <Drawer.Body>
              <Typography>
                This is an example drawer. You can put any content here.
              </Typography>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                Close
              </Button>
            </Drawer.Footer>
          </Drawer>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Typography variant="h2">Sidebar</Typography>
        <div className="space-y-4">
          <div className="h-[300px] overflow-hidden rounded-md border">
            <div className="flex h-full">
              <Sidebar items={sidebarItems} />
              <div className="flex-1 bg-gray-50 p-4">
                <Typography>Main content area</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
