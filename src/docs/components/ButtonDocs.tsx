import { Button } from "../../components/Button/Button";

export function ButtonDocs() {
  return (
    <div className="prose max-w-none">
      <h1>Button</h1>
      <p>
        Buttons are interactive elements that allow users to trigger actions.
        They come in different variants and sizes to accommodate various use
        cases.
      </p>

      <h2>Basic Usage</h2>
      <div className="not-prose">
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </div>
      <pre>
        <code>
          {`import { Button } from "@speculo/ui";

// Basic button with default variant (primary)
<Button>Default Button</Button>

// Secondary variant
<Button variant="secondary">Secondary Button</Button>

// Outline variant
<Button variant="outline">Outline Button</Button>`}
        </code>
      </pre>

      <h2>Button Sizes</h2>
      <div className="not-prose">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <pre>
        <code>
          {`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        </code>
      </pre>

      <h2>States</h2>

      <h3>Loading State</h3>
      <div className="not-prose">
        <div className="flex flex-wrap gap-4">
          <Button isLoading>Loading</Button>
          <Button variant="secondary" isLoading>
            Loading
          </Button>
          <Button variant="outline" isLoading>
            Loading
          </Button>
        </div>
      </div>
      <pre>
        <code>
          {`<Button isLoading>Loading</Button>
<Button variant="secondary" isLoading>Loading</Button>
<Button variant="outline" isLoading>Loading</Button>`}
        </code>
      </pre>

      <h3>Disabled State</h3>
      <div className="not-prose">
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <pre>
        <code>
          {`<Button disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled</Button>`}
        </code>
      </pre>

      <h2>Form Integration</h2>
      <p>
        The Button component works seamlessly with form libraries like
        react-hook-form:
      </p>
      <pre>
        <code>
          {`import { Button } from "@speculo/ui";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}`}
        </code>
      </pre>

      <h2>Component API</h2>

      <h3>Props</h3>
      <div className="overflow-auto">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>variant</td>
              <td>
                <code>"primary" | "secondary" | "outline"</code>
              </td>
              <td>
                <code>"primary"</code>
              </td>
              <td>The visual style variant of the button</td>
            </tr>
            <tr>
              <td>size</td>
              <td>
                <code>"sm" | "md" | "lg"</code>
              </td>
              <td>
                <code>"md"</code>
              </td>
              <td>The size of the button</td>
            </tr>
            <tr>
              <td>isLoading</td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Whether the button is in a loading state</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Whether the button is disabled</td>
            </tr>
            <tr>
              <td>className</td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Additional CSS classes to apply</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility</h2>
      <p>The Button component follows accessibility best practices:</p>
      <ul>
        <li>
          Uses native <code>button</code> element for proper semantics
        </li>
        <li>Supports keyboard navigation and focus management</li>
        <li>Visible focus indicator for keyboard users</li>
        <li>
          Disabled state prevents interaction and is properly conveyed to
          assistive technology
        </li>
        <li>
          Loading state prevents interaction and maintains button dimensions to
          prevent layout shifts
        </li>
      </ul>

      <h2>Best Practices</h2>
      <ul>
        <li>Use clear, action-oriented button text</li>
        <li>Choose appropriate variants for different actions</li>
        <li>Show loading states during async operations</li>
        <li>Maintain consistent button sizing</li>
        <li>Consider mobile touch targets</li>
      </ul>
    </div>
  );
}
