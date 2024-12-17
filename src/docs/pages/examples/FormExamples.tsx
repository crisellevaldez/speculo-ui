import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { Form } from "../../../components/Form/Form";
import {
  DateRangePicker,
  type DateRange,
} from "../../../components/DateRangePicker/DateRangePicker";
import { PhoneNumber } from "../../../components/PhoneNumber/PhoneNumber";

// Icon wrapper for consistent sizing
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-4 w-4">{children}</div>
);

export function FormExamples() {
  // Add state for select fields
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [demoSelect1, setDemoSelect1] = useState("");
  const [demoSelect2, setDemoSelect2] = useState("");
  const [demoSelect3, setDemoSelect3] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const [phone, setPhone] = useState<string>();

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
    <div className="space-y-12">
      {/* Previous content remains the same until Loading and Disabled States section */}

      {/* Loading and Disabled States */}
      <div className="space-y-8">
        <Typography variant="h2">Loading and Disabled States</Typography>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Previous input states remain the same */}

          {/* DateRangePicker and PhoneNumber States */}
          <div className="space-y-4">
            <Typography variant="h3">DateRangePicker States</Typography>
            <Form.Control>
              <Form.Label>Default DateRangePicker</Form.Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder={{ from: "Start date", to: "End date" }}
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Loading DateRangePicker</Form.Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder={{ from: "Start date", to: "End date" }}
                isLoading
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Disabled DateRangePicker</Form.Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder={{ from: "Start date", to: "End date" }}
                disabled
              />
            </Form.Control>
          </div>

          <div className="space-y-4">
            <Typography variant="h3">PhoneNumber States</Typography>
            <Form.Control>
              <Form.Label>Default PhoneNumber</Form.Label>
              <PhoneNumber
                value={phone}
                onChange={setPhone}
                placeholder="Enter phone number"
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Loading PhoneNumber</Form.Label>
              <PhoneNumber
                value={phone}
                onChange={setPhone}
                placeholder="Loading..."
                isLoading
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Disabled PhoneNumber</Form.Label>
              <PhoneNumber
                value={phone}
                onChange={setPhone}
                placeholder="Disabled"
                disabled
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Error PhoneNumber</Form.Label>
              <PhoneNumber
                value={phone}
                onChange={setPhone}
                placeholder="Enter phone number"
                error="Invalid phone number"
              />
            </Form.Control>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="space-y-8">
        <Typography variant="h2">Registration Form</Typography>

        <div className="rounded-lg border border-gray-200 p-6">
          <form className="space-y-6">
            {/* Previous form fields remain the same */}

            {/* Add DateRangePicker and PhoneNumber to the registration form */}
            <Form.Control>
              <Form.Label htmlFor="availability" required>
                Availability
              </Form.Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder={{ from: "Start date", to: "End date" }}
              />
              <Form.HelperText>Select your availability period</Form.HelperText>
            </Form.Control>

            <Form.Control>
              <Form.Label htmlFor="phone" required>
                Phone Number
              </Form.Label>
              <PhoneNumber
                value={phone}
                onChange={setPhone}
                placeholder="Enter phone number"
              />
              <Form.HelperText>Enter your contact number</Form.HelperText>
            </Form.Control>

            {/* Rest of the form remains the same */}
          </form>
        </div>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
}
