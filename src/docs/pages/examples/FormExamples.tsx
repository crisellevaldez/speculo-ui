import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Radio } from "../../../components/Radio/Radio";
import { Textarea } from "../../../components/Textarea/Textarea";
import { Form } from "../../../components/Form/Form";
import {
  PageContainer,
  SectionContainer,
  ContentContainer,
} from "../../../components/Container/Container";

export function FormExamples() {
  return (
    <PageContainer className="space-y-12">
      <div className="prose max-w-none">
        <h1>Form Examples</h1>
        <p>
          Explore examples of form layouts and patterns using our form
          components. All components are designed to work seamlessly with
          react-hook-form and include built-in validation support.
        </p>
      </div>

      {/* Registration Form */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Registration Form</Typography>

        <div className="rounded-lg border border-gray-200 p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Form.Control>
                <Form.Label htmlFor="firstName" required>
                  First Name
                </Form.Label>
                <Input placeholder="John" />
              </Form.Control>

              <Form.Control>
                <Form.Label htmlFor="lastName" required>
                  Last Name
                </Form.Label>
                <Input placeholder="Doe" />
              </Form.Control>
            </div>

            <Form.Control>
              <Form.Label htmlFor="email" required>
                Email
              </Form.Label>
              <Input
                type="email"
                placeholder="john@example.com"
                helperText="We'll never share your email."
              />
            </Form.Control>

            <Form.Control>
              <Form.Label htmlFor="role" required>
                Role
              </Form.Label>
              <Select
                options={[
                  { value: "developer", label: "Developer" },
                  { value: "designer", label: "Designer" },
                  { value: "manager", label: "Manager" },
                ]}
              />
            </Form.Control>

            <Form.Control>
              <Form.Label htmlFor="bio">Bio</Form.Label>
              <Textarea
                placeholder="Tell us about yourself..."
                autoResize
                maxLength={500}
                showCount
              />
            </Form.Control>

            <Form.Control>
              <Form.Label>Experience Level</Form.Label>
              <div className="space-y-2">
                <Radio
                  name="experience"
                  value="junior"
                  label="Junior (1-3 years)"
                />
                <Radio
                  name="experience"
                  value="mid"
                  label="Mid-Level (3-5 years)"
                />
                <Radio
                  name="experience"
                  value="senior"
                  label="Senior (5+ years)"
                />
              </div>
            </Form.Control>

            <Form.Control>
              <Form.Label>Interests</Form.Label>
              <div className="space-y-2">
                <Checkbox label="Frontend Development" />
                <Checkbox label="Backend Development" />
                <Checkbox label="UI/UX Design" />
                <Checkbox label="DevOps" />
              </div>
            </Form.Control>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </SectionContainer>

      {/* Contact Form */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Contact Form</Typography>

        <ContentContainer>
          <div className="rounded-lg border border-gray-200 p-6">
            <form className="space-y-6">
              <Form.Control>
                <Form.Label htmlFor="name" required>
                  Name
                </Form.Label>
                <Input placeholder="Your name" />
              </Form.Control>

              <Form.Control>
                <Form.Label htmlFor="email" required>
                  Email
                </Form.Label>
                <Input type="email" placeholder="your@email.com" />
              </Form.Control>

              <Form.Control>
                <Form.Label htmlFor="subject" required>
                  Subject
                </Form.Label>
                <Select
                  options={[
                    { value: "support", label: "Technical Support" },
                    { value: "sales", label: "Sales Inquiry" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </Form.Control>

              <Form.Control>
                <Form.Label htmlFor="message" required>
                  Message
                </Form.Label>
                <Textarea placeholder="Your message..." autoResize rows={4} />
              </Form.Control>

              <Form.Control>
                <Checkbox label="Send me a copy of this message" />
              </Form.Control>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </ContentContainer>
      </SectionContainer>

      {/* Form Components */}
      <SectionContainer className="space-y-8">
        <Typography variant="h2">Individual Components</Typography>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Typography variant="h3">Input Variants</Typography>
            <div className="space-y-4">
              <Input placeholder="Default input" />
              <Input
                placeholder="With helper text"
                helperText="This is helper text"
              />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="With error" error="This field is required" />
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h3">Select Variants</Typography>
            <div className="space-y-4">
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                  { value: "3", label: "Option 3" },
                ]}
                placeholder="Default select"
              />
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]}
                placeholder="Disabled"
                disabled
              />
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]}
                placeholder="With error"
                error="Please select an option"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h3">Checkbox & Radio</Typography>
            <div className="space-y-4">
              <div className="space-y-2">
                <Checkbox label="Default checkbox" />
                <Checkbox label="Checked checkbox" defaultChecked />
                <Checkbox label="Disabled checkbox" disabled />
              </div>
              <div className="space-y-2">
                <Radio name="demo" value="1" label="Default radio" />
                <Radio
                  name="demo"
                  value="2"
                  label="Checked radio"
                  defaultChecked
                />
                <Radio name="demo" value="3" label="Disabled radio" disabled />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h3">Textarea Variants</Typography>
            <div className="space-y-4">
              <Textarea placeholder="Default textarea" />
              <Textarea
                placeholder="With character count"
                maxLength={100}
                showCount
              />
              <Textarea placeholder="Auto resize" autoResize />
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
