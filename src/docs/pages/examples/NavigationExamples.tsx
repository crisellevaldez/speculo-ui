import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { Tabs, Tab } from "../../../components/Tabs/Tabs";
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
    <PageContainer className="space-y-12 py-10">
      <div className="prose max-w-none">
        <Typography variant="h2">Navigation</Typography>
        <p>
          Explore examples of navigation components and patterns. These
          components help users move through your application efficiently.
        </p>
      </div>

      {/* Tabs Example */}
      <div className="space-y-8">
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
      </div>

      {/* Sidebar Example */}
      <div className="space-y-8">
        <Typography variant="h2">Sidebar</Typography>

        <div className="h-[400px] overflow-hidden rounded-lg border">
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
      </div>

      {/* Drawer Example */}
      <div className="space-y-8">
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
              <a href="#" className="block rounded-md p-2 hover:bg-accent">
                Home
              </a>
              <a href="#" className="block rounded-md p-2 hover:bg-accent">
                Products
              </a>
              <a href="#" className="block rounded-md p-2 hover:bg-accent">
                Services
              </a>
              <a href="#" className="block rounded-md p-2 hover:bg-accent">
                About
              </a>
              <a href="#" className="block rounded-md p-2 hover:bg-accent">
                Contact
              </a>
            </nav>
          </div>
        </Drawer>
      </div>

      {/* Pagination Example */}
      <div className="space-y-8">
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
      </div>
    </PageContainer>
  );
}
