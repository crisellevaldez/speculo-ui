import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Radio } from "../../../components/Radio/Radio";
import { Textarea } from "../../../components/Textarea/Textarea";
import { Form } from "../../../components/Form/Form";
import { PhoneNumber } from "../../../components/PhoneNumber/PhoneNumber";
import { Mail } from "lucide-react";
import { useState } from "react";

export function FormExamples() {
  const [phoneValue, setPhoneValue] = useState<string>();

  return (
    <div className="space-y-12">
      <div className="prose max-w-none">
        <Typography variant="h2">Form Examples</Typography>
        <p>
          Explore examples of form layouts and patterns using our form
          components. All components are designed to work seamlessly with
          react-hook-form and include built-in validation support.
        </p>
      </div>

      {/* Loading and Disabled States */}
      <div className="space-y-8">
        <Typography variant="h2">Loading and Disabled States</Typography>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Input States */}
          <div className="space-y-4">
            <Typography variant="h3">Input States</Typography>
            <Form.Control>
              <Form.Label>Default Input</Form.Label>
              <Input placeholder="Type something..." />
            </Form.Control>
            <Form.Control>
              <Form.Label>Loading Input</Form.Label>
              <Input placeholder="Loading..." isLoading />
            </Form.Control>
            <Form.Control>
              <Form.Label>Disabled Input</Form.Label>
              <Input placeholder="Disabled" disabled />
            </Form.Control>
            <Form.Control>
              <Form.Label>Loading Input with Icon</Form.Label>
              <Input
                placeholder="Loading..."
                isLoading
                startIcon={
                  <div className="h-4 w-4">
                    <Mail size={16} />
                  </div>
                }
              />
            </Form.Control>
          </div>

          {/* Phone Number States */}
          <div className="space-y-4">
            <Typography variant="h3">Phone Number States</Typography>
            <Form.Control>
              <Form.Label>Default Phone Number</Form.Label>
              <PhoneNumber
                value={phoneValue}
                onChange={setPhoneValue}
                placeholder="Enter phone number"
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Loading Phone Number</Form.Label>
              <PhoneNumber
                value={phoneValue}
                onChange={setPhoneValue}
                placeholder="Loading..."
                isLoading
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Disabled Phone Number</Form.Label>
              <PhoneNumber
                value={phoneValue}
                onChange={setPhoneValue}
                placeholder="Disabled"
                disabled
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Error Phone Number</Form.Label>
              <PhoneNumber
                value={phoneValue}
                onChange={setPhoneValue}
                placeholder="Enter phone number"
                error="Invalid phone number"
              />
            </Form.Control>
          </div>

          {/* Textarea States */}
          <div className="space-y-4">
            <Typography variant="h3">Textarea States</Typography>
            <Form.Control>
              <Form.Label>Default Textarea</Form.Label>
              <Textarea placeholder="Type something..." />
            </Form.Control>
            <Form.Control>
              <Form.Label>Loading Textarea</Form.Label>
              <Textarea placeholder="Loading..." isLoading />
            </Form.Control>
            <Form.Control>
              <Form.Label>Disabled Textarea</Form.Label>
              <Textarea placeholder="Disabled" disabled />
            </Form.Control>
          </div>

          {/* Select States */}
          <div className="space-y-4">
            <Typography variant="h3">Select States</Typography>
            <Form.Control>
              <Form.Label>Default Select</Form.Label>
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]}
                placeholder="Select an option"
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Loading Select</Form.Label>
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]}
                placeholder="Loading..."
                isLoading
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Disabled Select</Form.Label>
              <Select
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                ]}
                placeholder="Disabled"
                disabled
              />
            </Form.Control>
          </div>

          {/* Button States */}
          <div className="space-y-4">
            <Typography variant="h3">Button States</Typography>
            <div className="grid gap-4">
              <Button>Default Button</Button>
              <Button isLoading>Loading Button</Button>
              <Button disabled>Disabled Button</Button>
              <Button variant="outline" isLoading>
                Loading Outline
              </Button>
              <Button variant="secondary" isLoading>
                Loading Secondary
              </Button>
            </div>
          </div>
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
              <Form.Label htmlFor="phone" required>
                Phone Number
              </Form.Label>
              <PhoneNumber
                value={phoneValue}
                onChange={setPhoneValue}
                placeholder="Enter phone number"
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
    </div>
  );
}
