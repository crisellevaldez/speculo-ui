import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { Tabs, Tab } from "../../../components/Tabs/Tabs";
import {
  DropdownMenu,
  DropdownMenuItem,
} from "../../../components/DropdownMenu/DropdownMenu";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Drawer } from "../../../components/Drawer/Drawer";
import { Pagination } from "../../../components/Pagination/Pagination";
import {
  PageContainer,
  SectionContainer,
} from "../../../components/Container/Container";

export function NavigationExamples() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <PageContainer className="space-y-12">
      <div className="prose max-w-none">
        <h1>Navigation Examples</h1>
        <p>
          Explore examples of navigation components and patterns. These
          components help users move through your application efficiently.
        </p>
      </div>

      {/* Tabs Example */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Tabs</Typography>

        <div className="rounded-lg border">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tab value="overview" label="Overview">
                Overview
              </Tab>
              <Tab value="features" label="Features">
                Features
              </Tab>
              <Tab value="settings" label="Settings">
                Settings
              </Tab>
              <Tab value="integrations" label="Integrations">
                Integrations
              </Tab>
            </Tabs.List>
            <div className="p-4">
              {activeTab === "overview" && (
                <div>
                  <Typography variant="h4">Overview</Typography>
                  <Typography variant="muted" className="mt-2">
                    This is the overview content.
                  </Typography>
                </div>
              )}
              {activeTab === "features" && (
                <div>
                  <Typography variant="h4">Features</Typography>
                  <Typography variant="muted" className="mt-2">
                    Explore our features.
                  </Typography>
                </div>
              )}
              {activeTab === "settings" && (
                <div>
                  <Typography variant="h4">Settings</Typography>
                  <Typography variant="muted" className="mt-2">
                    Configure your settings.
                  </Typography>
                </div>
              )}
              {activeTab === "integrations" && (
                <div>
                  <Typography variant="h4">Integrations</Typography>
                  <Typography variant="muted" className="mt-2">
                    Manage your integrations.
                  </Typography>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </SectionContainer>

      {/* Dropdown Menu Example */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Dropdown Menu</Typography>

        <div className="flex gap-4">
          <DropdownMenu trigger={<Button variant="outline">Options</Button>}>
            <DropdownMenuItem onClick={() => console.log("Edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Duplicate")}>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenu>

          <DropdownMenu trigger={<Button>User Menu</Button>}>
            <DropdownMenuItem onClick={() => console.log("Profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Logout")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </SectionContainer>

      {/* Sidebar Example */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Sidebar</Typography>

        <div className="h-[400px] border rounded-lg overflow-hidden">
          <Sidebar
            items={[
              {
                icon: <span>🏠</span>,
                label: "Dashboard",
                href: "#",
              },
              {
                icon: <span>👥</span>,
                label: "Users",
                items: [
                  { label: "List All", href: "#" },
                  { label: "Add New", href: "#" },
                  { label: "Groups", href: "#" },
                ],
              },
              {
                icon: <span>⚙️</span>,
                label: "Settings",
                items: [
                  { label: "General", href: "#" },
                  { label: "Security", href: "#" },
                  { label: "Notifications", href: "#" },
                ],
              },
              {
                icon: <span>📊</span>,
                label: "Analytics",
                href: "#",
              },
              {
                icon: <span>❓</span>,
                label: "Help",
                href: "#",
              },
            ]}
          />
        </div>
      </SectionContainer>

      {/* Drawer Example */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Drawer</Typography>

        <div className="flex gap-4">
          <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
        </div>

        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <div className="p-4">
            <Typography variant="h4" className="mb-4">
              Navigation Drawer
            </Typography>
            <nav className="space-y-2">
              <a href="#" className="block p-2 hover:bg-accent rounded-md">
                Home
              </a>
              <a href="#" className="block p-2 hover:bg-accent rounded-md">
                Products
              </a>
              <a href="#" className="block p-2 hover:bg-accent rounded-md">
                Services
              </a>
              <a href="#" className="block p-2 hover:bg-accent rounded-md">
                About
              </a>
              <a href="#" className="block p-2 hover:bg-accent rounded-md">
                Contact
              </a>
            </nav>
          </div>
        </Drawer>
      </SectionContainer>

      {/* Pagination Example */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Pagination</Typography>

        <div className="space-y-4">
          <div className="flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={setPage}
            />
          </div>

          <Typography variant="muted" className="text-center">
            Page {page} of 10
          </Typography>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
