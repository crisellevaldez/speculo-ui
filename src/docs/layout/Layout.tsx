import { Link, NavLink, Outlet } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useState } from "react";

export function DocsLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Getting Started", href: "/docs" },
    { name: "Installation", href: "/docs/installation" },
    {
      name: "Components",
      href: "/docs/components",
      children: [
        { name: "Button", href: "/docs/components/button" },
        { name: "Input", href: "/docs/components/input" },
        { name: "Select", href: "/docs/components/select" },
        { name: "Checkbox & Radio", href: "/docs/components/checkbox-radio" },
        { name: "Textarea", href: "/docs/components/textarea" },
        { name: "Form", href: "/docs/components/form" },
        { name: "Table", href: "/docs/components/table" },
        { name: "Modal", href: "/docs/components/modal" },
        { name: "Toast", href: "/docs/components/toast" },
        { name: "Tabs", href: "/docs/components/tabs" },
        { name: "Dropdown Menu", href: "/docs/components/dropdown" },
      ],
    },
    { name: "Core Concepts", href: "/docs/core-concepts" },
    { name: "Customization", href: "/docs/customization" },
    { name: "Examples", href: "/docs/examples" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 rounded-md p-2 text-gray-700 lg:hidden hover:bg-gray-100"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Speculo UI
          </Link>
        </div>
        <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-6">
          <ul className="space-y-6">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <div className="space-y-2">
                    <NavLink
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "block text-sm font-medium",
                          isActive
                            ? "text-blue-600"
                            : "text-gray-700 hover:text-blue-600"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                    <ul className="ml-4 space-y-2 border-l border-gray-200 pl-4">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "block text-sm",
                                isActive
                                  ? "text-blue-600"
                                  : "text-gray-600 hover:text-blue-600"
                              )
                            }
                          >
                            {child.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block text-sm font-medium",
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
