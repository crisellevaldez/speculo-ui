import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Radio } from "../../../components/Radio/Radio";
import { Textarea } from "../../../components/Textarea/Textarea";
import { Form } from "../../../components/Form/Form";
import { PageContainer } from "../../../components/Container/Container";
import { Search, Mail, Lock, Check } from "lucide-react";

// Icon wrapper for consistent sizing
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-4 w-4 text-gray-400">{children}</div>
);

export function FormExamples() {
  // Add state for select fields
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [demoSelect1, setDemoSelect1] = useState("");
  const [demoSelect2, setDemoSelect2] = useState("");
  const [demoSelect3, setDemoSelect3] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  // Create onChange handlers that handle both string and string[] types
  const handleRoleChange = (value: string | string[]) => {
    setRole(value as string);
  };

  const handleSubjectChange = (value: string | string[]) => {
    setSubject(value as string);
  };

  const handleDemoSelect1Change = (value: string | string[]) => {
    setDemoSelect1(value as string);
  };

  const handleDemoSelect2Change = (value: string | string[]) => {
    setDemoSelect2(value as string);
  };

  const handleDemoSelect3Change = (value: string | string[]) => {
    setDemoSelect3(value as string);
  };

  const handleSkillsChange = (value: string | string[]) => {
    setSkills(value as string[]);
  };

  return (
    <PageContainer className="space-y-12 py-10">
      <div className="prose max-w-none">
        <Typography variant="h2">Form Examples</Typography>
        <p>
          Explore examples of form layouts and patterns using our form
          components. All components are designed to work seamlessly with
          react-hook-form and include built-in validation support.
        </p>
      </div>

      {/* Input Examples with Icons */}
      <div className="space-y-8">
        <Typography variant="h2">Input with Icons</Typography>
        <div className="grid gap-6 md:grid-cols-2">
          <Form.Control>
            <Form.Label>Search Input</Form.Label>
            <Input
              placeholder="Search..."
              startIcon={
                <IconWrapper>
                  <Search size={16} />
                </IconWrapper>
              }
            />
            <Form.HelperText>With start icon only</Form.HelperText>
          </Form.Control>

          <Form.Control>
            <Form.Label>Email Input</Form.Label>
            <Input
              type="email"
              placeholder="Enter your email"
              startIcon={
                <IconWrapper>
                  <Mail size={16} />
                </IconWrapper>
              }
              endIcon={
                <IconWrapper>
                  <Check size={16} className="text-green-500" />
                </IconWrapper>
              }
            />
            <Form.HelperText>With both start and end icons</Form.HelperText>
          </Form.Control>

          <Form.Control>
            <Form.Label>Password Input</Form.Label>
            <Input
              type="password"
              placeholder="Enter password"
              startIcon={
                <IconWrapper>
                  <Lock size={16} />
                </IconWrapper>
              }
            />
            <Form.HelperText>Password field with lock icon</Form.HelperText>
          </Form.Control>

          <Form.Control>
            <Form.Label>Validated Input</Form.Label>
            <Input
              placeholder="Validated field"
              endIcon={
                <IconWrapper>
                  <Check size={16} className="text-green-500" />
                </IconWrapper>
              }
            />
            <Form.HelperText>With success indicator</Form.HelperText>
          </Form.Control>
        </div>
      </div>

      {/* Registration Form */}
      <div className="space-y-8">
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
              <Form.Label htmlFor="role" required>
                Role
              </Form.Label>
              <Select
                options={[
                  { value: "developer", label: "Developer" },
                  { value: "designer", label: "Designer" },
                  { value: "manager", label: "Manager" },
                ]}
                value={role}
                onChange={handleRoleChange}
              />
            </Form.Control>

            <Form.Control>
              <Form.Label htmlFor="skills" required>
                Skills
              </Form.Label>
              <Select
                options={[
                  { value: "react", label: "React" },
                  { value: "typescript", label: "TypeScript" },
                  { value: "nodejs", label: "Node.js" },
                  { value: "python", label: "Python" },
                  { value: "java", label: "Java" },
                  { value: "csharp", label: "C#" },
                ]}
                value={skills}
                onChange={handleSkillsChange}
                multiple
                placeholder="Select multiple skills"
              />
              <Form.HelperText>You can select multiple skills</Form.HelperText>
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
      </div>

      {/* Contact Form */}
      <div className="space-y-8">
        <Typography variant="h2">Contact Form</Typography>

        <div>
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
                <Input
                  type="email"
                  placeholder="your@email.com"
                  startIcon={
                    <IconWrapper>
                      <Mail size={16} />
                    </IconWrapper>
                  }
                />
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
                  value={subject}
                  onChange={handleSubjectChange}
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
        </div>
      </div>

      {/* Form Components */}
      <div className="space-y-8">
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
                value={demoSelect1}
                onChange={handleDemoSelect1Change}
              />
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]}
                placeholder="Disabled"
                disabled
                value={demoSelect2}
                onChange={handleDemoSelect2Change}
              />
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]}
                placeholder="With error"
                error="Please select an option"
                value={demoSelect3}
                onChange={handleDemoSelect3Change}
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
      </div>
    </PageContainer>
  );
}
