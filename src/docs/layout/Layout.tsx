import { Link, NavLink, Outlet } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
        className={cn(
          "fixed top-4 z-[70] rounded-md p-2 lg:hidden",
          isMobileMenuOpen
            ? "right-4 text-gray-300 hover:bg-gray-800"
            : "left-4 text-gray-900 hover:bg-gray-100",
        )}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "dark fixed inset-y-0 left-0 z-50 w-full transform transition-transform duration-300 ease-in-out md:w-64",
          "border-r border-gray-800 bg-[hsl(222.2_84%_4.9%)]",
          "lg:relative lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link to="/" className="block">
            <img
              src="/speculo.ai-white.png"
              alt="Speculo UI"
              className="h-6 w-auto"
            />
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
                            ? "text-primary"
                            : "text-gray-300 hover:text-primary",
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                    <ul className="ml-4 space-y-2 border-l border-gray-700 pl-4">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "block text-sm",
                                isActive
                                  ? "text-primary"
                                  : "text-gray-400 hover:text-primary",
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
                          ? "text-primary"
                          : "text-gray-300 hover:text-primary",
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
      </aside>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="relative flex-1 lg:pl-64">
        <main className="min-h-screen bg-white">
          <div className="mx-auto w-full max-w-5xl overflow-x-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
