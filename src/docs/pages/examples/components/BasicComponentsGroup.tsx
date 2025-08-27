import { useState } from "react";
import { Accordion } from "../../../../components/Accordion/Accordion";
import { Alert } from "../../../../components/Alert/Alert";
import { Badge } from "../../../../components/Badge/Badge";
import { Button } from "../../../../components/Button/Button";
import { Typography } from "../../../../components/Typography/Typography";

export function BasicComponentsGroup() {
  // State for Accordion
  const [accordionValue, setAccordionValue] = useState<string | string[]>([]);

  return (
    <div className="space-y-12">
      {/* Accordion */}
      <div className="space-y-6">
        <Typography variant="h2">Accordion</Typography>
        <div className="space-y-4">
          <Accordion
            type="multiple"
            value={accordionValue}
            onChange={setAccordionValue}
            items={[
              {
                title: "What is Speculo UI?",
                children: (
                  <div>
                    <p>
                      Speculo UI is a React component library designed for
                      building modern web applications with a clean, consistent
                      design system.
                    </p>
                  </div>
                ),
              },
              {
                title: "How do I install Speculo UI?",
                children: (
                  <div>
                    <p>
                      You can install Speculo UI using npm or yarn:
                      <br />
                      <code>npm install speculo-ui</code>
                      <br />
                      or
                      <br />
                      <code>yarn add speculo-ui</code>
                    </p>
                  </div>
                ),
              },
              {
                title: "Is Speculo UI customizable?",
                children: (
                  <div>
                    <p>
                      Yes, Speculo UI is highly customizable. You can override
                      default styles using Tailwind CSS classes or by extending
                      the theme in your tailwind.config.js file.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* Alert */}
      <div className="space-y-6">
        <Typography variant="h2">Alert</Typography>
        <div className="space-y-4">
          <Alert variant="info">
            This is an info alert with a link example.{" "}
            <a href="#" className="font-medium underline">
              Learn more
            </a>
          </Alert>
          <Alert variant="warning">
            Your trial period will expire in 3 days. Please upgrade your
            subscription.
          </Alert>
          <Alert variant="success">
            Your changes have been saved successfully.
          </Alert>
          <Alert variant="error">
            There was an error processing your request. Please try again.
          </Alert>
        </div>
      </div>

      {/* Badge */}
      <div className="space-y-6">
        <Typography variant="h2">Badge</Typography>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="space-y-6">
        <Typography variant="h2">Button</Typography>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
