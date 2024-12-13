import { Link } from "react-router-dom";

export function Components() {
  const components = [
    {
      category: "Form Components",
      items: [
        {
          name: "Button",
          path: "/docs/components/button",
          description: "Interactive button component with variants and states",
        },
        {
          name: "Input",
          path: "/docs/components/input",
          description: "Text input with validation and icon support",
        },
        {
          name: "Select",
          path: "/docs/components/select",
          description: "Dropdown select with search and multi-select",
        },
        {
          name: "Checkbox & Radio",
          path: "/docs/components/checkbox-radio",
          description: "Form control components for selections",
        },
        {
          name: "Textarea",
          path: "/docs/components/textarea",
          description: "Multi-line text input with auto-resize",
        },
        {
          name: "Form",
          path: "/docs/components/form",
          description: "Form layout and validation components",
        },
      ],
    },
    {
      category: "Data Display",
      items: [
        {
          name: "Table",
          path: "/docs/components/table",
          description: "Data table with sorting and filtering",
        },
        {
          name: "Modal",
          path: "/docs/components/modal",
          description: "Dialog component for focused interactions",
        },
        {
          name: "Toast",
          path: "/docs/components/toast",
          description: "Notification system for feedback",
        },
      ],
    },
    {
      category: "Navigation",
      items: [
        {
          name: "Tabs",
          path: "/docs/components/tabs",
          description: "Tabbed interface for content organization",
        },
        {
          name: "Dropdown Menu",
          path: "/docs/components/dropdown",
          description: "Menu component for actions and navigation",
        },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <div className="prose max-w-none">
        <h1>Components</h1>
        <p>
          Our component library provides a comprehensive set of UI components
          designed for building modern React applications. Each component is
          built with accessibility, customization, and developer experience in
          mind.
        </p>
      </div>

      {components.map((category) => (
        <div key={category.category} className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {category.category}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((component) => (
              <Link
                key={component.name}
                to={component.path}
                className="group relative rounded-lg border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {component.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {component.description}
                </p>
                <span className="absolute right-4 top-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-500">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="prose max-w-none">
        <h2>Component Design Principles</h2>
        <ul>
          <li>
            <strong>Accessibility First:</strong> All components follow WAI-ARIA
            guidelines and are keyboard navigable
          </li>
          <li>
            <strong>Flexible Styling:</strong> Components use Tailwind CSS for
            easy customization
          </li>
          <li>
            <strong>Form Integration:</strong> Seamless integration with
            react-hook-form and zod validation
          </li>
          <li>
            <strong>TypeScript Support:</strong> Full type safety with
            comprehensive TypeScript definitions
          </li>
          <li>
            <strong>Responsive Design:</strong> Components adapt to different
            screen sizes
          </li>
        </ul>

        <h2>Using Components</h2>
        <p>Each component page includes:</p>
        <ul>
          <li>Interactive examples</li>
          <li>API documentation</li>
          <li>Usage guidelines</li>
          <li>Accessibility considerations</li>
          <li>TypeScript interfaces</li>
        </ul>

        <h2>Customization</h2>
        <p>Components can be customized through:</p>
        <ul>
          <li>Props for behavior and appearance</li>
          <li>Tailwind classes for styling</li>
          <li>Theme configuration</li>
          <li>Component composition</li>
        </ul>
      </div>
    </div>
  );
}
