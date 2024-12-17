import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { Container } from "../../../components/Container/Container";
import { Accordion } from "../../../components/Accordion/Accordion";
import { Switch } from "../../../components/Switch/Switch";
import { HoverCard } from "../../../components/HoverCard/HoverCard";
import { Badge } from "../../../components/Badge/Badge";
import { Progress } from "../../../components/Progress/Progress";
import { Drawer } from "../../../components/Drawer/Drawer";

export function NewComponentsExamples() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="space-y-12 py-10">
      <Typography variant="h2">New Components</Typography>

      {/* Button Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Button Variants</Typography>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>

        <Typography variant="h3">Button Sizes</Typography>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
        </div>

        <Typography variant="h3">Loading State</Typography>
        <div className="flex flex-wrap gap-4">
          <Button isLoading>Loading Primary</Button>
          <Button variant="secondary" isLoading>
            Loading Secondary
          </Button>
          <Button variant="outline" isLoading>
            Loading Outline
          </Button>
        </div>
      </section>

      {/* Progress Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Progress Indicators</Typography>

        <div className="space-y-8">
          <div className="space-y-4">
            <Typography variant="h3">Progress Bar Sizes</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="muted" className="mb-2">
                  Small
                </Typography>
                <Progress value={60} size="sm" />
              </div>
              <div>
                <Typography variant="muted" className="mb-2">
                  Medium
                </Typography>
                <Progress value={60} size="md" />
              </div>
              <div>
                <Typography variant="muted" className="mb-2">
                  Large
                </Typography>
                <Progress value={60} size="lg" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h3">Circle Progress Sizes</Typography>
            <div className="flex items-center gap-8">
              <div>
                <Typography variant="muted" className="mb-2">
                  Small
                </Typography>
                <Progress variant="circle" value={75} size="sm" showValue />
              </div>
              <div>
                <Typography variant="muted" className="mb-2">
                  Medium
                </Typography>
                <Progress variant="circle" value={75} size="md" showValue />
              </div>
              <div>
                <Typography variant="muted" className="mb-2">
                  Large
                </Typography>
                <Progress variant="circle" value={75} size="lg" showValue />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h3">Loading Progress States</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="muted" className="mb-2">
                  Small Loading Bar
                </Typography>
                <Progress variant="loading" indeterminate size="sm" />
              </div>
              <div>
                <Typography variant="muted" className="mb-2">
                  Medium Loading Bar
                </Typography>
                <Progress variant="loading" indeterminate size="md" />
              </div>
              <div>
                <Typography variant="muted" className="mb-2">
                  Large Loading Bar
                </Typography>
                <Progress variant="loading" indeterminate size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Examples */}
      <section className="space-y-8">
        <div className="space-y-4">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="p">Regular paragraph text</Typography>
          <Typography variant="blockquote">
            "This is a blockquote example with proper styling"
          </Typography>
          <Typography variant="muted">
            Muted text for secondary information
          </Typography>
        </div>
      </section>

      {/* Badge Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Badge Variants</Typography>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </section>

      {/* Switch Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Switch Controls</Typography>

        <div className="space-y-4">
          <div className="flex gap-8">
            <Switch
              label="Airplane Mode"
              checked={switchValue}
              onChange={(e) => setSwitchValue(e.target.checked)}
            />
            <Switch label="Dark Mode" />
            <Switch label="Notifications" defaultChecked />
          </div>
          <div className="flex gap-8">
            <Switch size="sm" label="Small" />
            <Switch size="md" label="Medium" />
            <Switch size="lg" label="Large" />
          </div>
        </div>
      </section>

      {/* HoverCard Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Hover Cards</Typography>

        <div className="flex gap-8">
          <HoverCard trigger={<Button>Hover for Info</Button>}>
            <div className="p-4">
              <Typography variant="h4" className="mb-2">
                User Profile
              </Typography>
              <Typography variant="muted">
                View detailed information about this user.
              </Typography>
            </div>
          </HoverCard>

          <HoverCard
            trigger={<Button variant="outline">Product Details</Button>}
            side="right"
          >
            <div className="p-4">
              <Typography variant="h4" className="mb-2">
                Product Features
              </Typography>
              <ul className="list-inside list-disc">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
            </div>
          </HoverCard>
        </div>
      </section>

      {/* Accordion Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Accordion</Typography>

        <Accordion
          type="single"
          items={[
            {
              title: "What is your refund policy?",
              children:
                "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
            },
            {
              title: "Do you offer technical support?",
              children:
                "Yes, we provide technical support via email. Response time is typically within 24 hours.",
            },
            {
              title: "Can I change my subscription plan?",
              children:
                "You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
            },
          ]}
        />
      </section>

      {/* Drawer Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Drawer</Typography>

        <div className="flex gap-4">
          <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
        </div>

        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <div className="p-6">
            <Typography variant="h3" className="mb-4">
              Drawer Content
            </Typography>
            <Typography variant="p" className="mb-4">
              This is a drawer component with proper animations and focus
              management. Click outside or press ESC to close.
            </Typography>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </Drawer>
      </section>

      {/* Container Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Responsive Container</Typography>

        <div className="space-y-4">
          <Container className="bg-muted p-4">
            <Typography variant="h4">Responsive Container</Typography>
            <Typography variant="muted">
              This container automatically adjusts its width based on screen
              size:
            </Typography>
            <ul className="mt-2 list-inside list-disc">
              <li>Mobile: Full width</li>
              <li>sm (640px+): max-width 540px</li>
              <li>md (768px+): max-width 720px</li>
              <li>lg (1024px+): max-width 960px</li>
              <li>xl (1280px+): max-width 1140px</li>
              <li>2xl (1536px+): max-width 1320px</li>
            </ul>
          </Container>
        </div>
      </section>
    </div>
  );
}
