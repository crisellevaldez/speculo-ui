import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import {
  PageContainer,
  SectionContainer,
  ContentContainer,
  NarrowContainer,
  FullWidthContainer,
} from "../../../components/Container/Container";
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
    <PageContainer className="space-y-12">
      {/* Typography Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Typography</Typography>
        <div className="space-y-4">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="p">Regular paragraph text</Typography>
          <Typography variant="lead">Lead paragraph text</Typography>
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

      {/* Progress Examples */}
      <section className="space-y-8">
        <Typography variant="h2">Progress Indicators</Typography>

        <div className="space-y-8">
          <div className="space-y-4">
            <Typography variant="h3">Default Progress Bar</Typography>
            <Progress value={60} />
          </div>

          <div className="space-y-4">
            <Typography variant="h3">Loading Progress Bar</Typography>
            <Progress variant="loading" indeterminate />
          </div>

          <div className="space-y-4">
            <Typography variant="h3">Circle Progress</Typography>
            <div className="flex gap-8">
              <Progress variant="circle" value={75} showValue />
              <Progress variant="circle" value={30} showValue />
              <Progress variant="circle" value={100} showValue />
            </div>
          </div>
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
              <ul className="list-disc list-inside">
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
        <Typography variant="h2">Container System</Typography>

        <div className="space-y-4">
          <NarrowContainer className="bg-muted p-4">
            <Typography variant="h4">Narrow Container (sm: 640px)</Typography>
            <Typography variant="muted">
              Perfect for forms and focused content
            </Typography>
          </NarrowContainer>

          <ContentContainer className="bg-muted p-4">
            <Typography variant="h4">Content Container (md: 768px)</Typography>
            <Typography variant="muted">
              Ideal for article content and text-heavy sections
            </Typography>
          </ContentContainer>

          <SectionContainer className="bg-muted p-4">
            <Typography variant="h4">Section Container (lg: 1024px)</Typography>
            <Typography variant="muted">
              Great for page sections and feature areas
            </Typography>
          </SectionContainer>

          <PageContainer className="bg-muted p-4">
            <Typography variant="h4">Page Container (xl: 1280px)</Typography>
            <Typography variant="muted">
              Main container for page layouts
            </Typography>
          </PageContainer>

          <FullWidthContainer className="bg-muted p-4">
            <Typography variant="h4">Full Width Container</Typography>
            <Typography variant="muted">
              Edge-to-edge container with padding
            </Typography>
          </FullWidthContainer>
        </div>
      </section>
    </PageContainer>
  );
}
