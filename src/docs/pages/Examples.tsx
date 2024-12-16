import { useState } from "react";
import { Container } from "../../components/Container/Container";
import { Tabs, Tab } from "../../components/Tabs/Tabs";
import { FormExamples } from "./examples/FormExamples";
import DataDisplayExamples from "./examples/DataDisplayExamples";
import { NavigationExamples } from "./examples/NavigationExamples";
import { NewComponentsExamples } from "./examples/NewComponents";

export function Examples() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <Container className="py-12">
      <div className="space-y-12">
        <div className="prose max-w-none">
          <h1>Examples</h1>
          <p>
            Explore practical examples of our components in action. These
            examples demonstrate common use cases and patterns for building
            interfaces.
          </p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tab value="form" label="Form Examples">
              Form Examples
            </Tab>
            <Tab value="data" label="Data Display">
              Data Display
            </Tab>
            <Tab value="navigation" label="Navigation">
              Navigation
            </Tab>
            <Tab value="new" label="New Components">
              New Components
            </Tab>
          </Tabs.List>

          <div className="relative mt-6 w-full">
            {activeTab === "form" && <FormExamples />}
            {activeTab === "data" && <DataDisplayExamples />}
            {activeTab === "navigation" && <NavigationExamples />}
            {activeTab === "new" && <NewComponentsExamples />}
          </div>
        </Tabs>

        <section className="prose max-w-none">
          <h2>Implementation Notes</h2>
          <ul>
            <li>
              All form components are integrated with react-hook-form for
              validation
            </li>
            <li>Components support keyboard navigation and focus management</li>
            <li>Proper ARIA attributes are used for accessibility</li>
            <li>Responsive design patterns are implemented</li>
            <li>Error states and loading states are handled consistently</li>
          </ul>

          <h2>Best Practices</h2>
          <ul>
            <li>Group related form fields logically</li>
            <li>Provide clear feedback for user actions</li>
            <li>Use appropriate variants for different contexts</li>
            <li>Consider mobile viewports in layout design</li>
            <li>Implement proper error handling</li>
          </ul>

          <h2>Component Organization</h2>
          <ul>
            <li>Form components are designed to work together seamlessly</li>
            <li>Navigation components support nested structures</li>
            <li>Data display components handle complex data patterns</li>
            <li>Layout components provide consistent spacing and alignment</li>
            <li>All components follow a consistent API design</li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
