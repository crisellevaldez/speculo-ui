import { useState } from "react";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { ComboBox } from "../../../../components/ComboBox/ComboBox";
import { DatePicker } from "../../../../components/DatePicker/DatePicker";
import {
  DateRangePicker,
  DateRange,
} from "../../../../components/DateRangePicker/DateRangePicker";
import { Form } from "../../../../components/Form/Form";
import { Input } from "../../../../components/Input/Input";
import { Select } from "../../../../components/Select/Select";
import { Typography } from "../../../../components/Typography/Typography";

export function FormComponentsGroup() {
  // State for DatePicker
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // State for DateRangePicker
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2024, 11, 22), // December 22, 2024
    to: new Date(2025, 0, 4), // January 4, 2025
  });

  // State for ComboBox
  const [selectedPerson, setSelectedPerson] = useState<string | string[]>("");

  // State for Select
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedLongOption, setSelectedLongOption] = useState<string>("");
  const [selectedMultiRowSkills, setSelectedMultiRowSkills] = useState<
    string[]
  >([
    "html",
    "css",
    "javascript",
    "react",
    "typescript",
    "node",
    "python",
    "java",
  ]);

  const people = [
    { value: "1", label: "John Doe" },
    { value: "2", label: "Jane Smith" },
    { value: "3", label: "Robert Johnson" },
    { value: "4", label: "Emily Davis" },
    { value: "5", label: "Michael Brown" },
  ];

  const skills = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
  ];

  const longOptions = [
    {
      value: "option1",
      label:
        "This is a very long option text that will demonstrate horizontal scrolling",
    },
    {
      value: "option2",
      label:
        "Another extremely long option that should trigger horizontal scrolling in the dropdown",
    },
    { value: "option3", label: "Short option" },
    {
      value: "option4",
      label:
        "This option has a really long name that won't fit in the dropdown without scrolling horizontally",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Input */}
      <div className="space-y-6">
        <Typography variant="h2">Input</Typography>
        <div className="space-y-4">
          <Form.Control>
            <Form.Label>Default Input</Form.Label>
            <Input placeholder="Type something..." />
          </Form.Control>
          <Form.Control>
            <Form.Label>Clearable Input</Form.Label>
            <Input
              placeholder="Type to see clear button..."
              clearable
              defaultValue="This input can be cleared"
            />
          </Form.Control>
          <Form.Control>
            <Form.Label>Disabled Input</Form.Label>
            <Input placeholder="Disabled" disabled />
          </Form.Control>
          <Form.Control>
            <Form.Label>Input with Error</Form.Label>
            <Input placeholder="Error" error="This field is required" />
          </Form.Control>
        </div>
      </div>

      {/* Checkbox */}
      <div className="space-y-6">
        <Typography variant="h2">Checkbox</Typography>
        <div className="space-y-4">
          <div className="space-y-2">
            <Checkbox label="Default Checkbox" />
            <Checkbox label="Checked Checkbox" defaultChecked />
            <Checkbox label="Disabled Checkbox" disabled />
            <Checkbox
              label="Disabled Checked Checkbox"
              disabled
              defaultChecked
            />
          </div>
        </div>
      </div>

      {/* ComboBox */}
      <div className="space-y-6">
        <Typography variant="h2">ComboBox</Typography>
        <div className="space-y-4">
          <Form.Control>
            <Form.Label>Select a Person</Form.Label>
            <ComboBox
              options={people}
              value={selectedPerson}
              onChange={setSelectedPerson}
              placeholder="Select a person..."
            />
          </Form.Control>
        </div>
      </div>

      {/* Select with Multiselect */}
      <div className="space-y-6">
        <Typography variant="h2">Select with Multiselect</Typography>
        <div className="space-y-4">
          <Form.Control>
            <Form.Label>Select Skills (Multiple)</Form.Label>
            <div className="w-96">
              <Select
                options={skills}
                value={selectedSkills}
                onChange={(value) => setSelectedSkills(value as string[])}
                placeholder="Select skills..."
                multiple
                searchable
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Selected:{" "}
              {selectedSkills.length > 0
                ? skills
                    .filter((skill) => selectedSkills.includes(skill.value))
                    .map((skill) => skill.label)
                    .join(", ")
                : "None"}
            </p>
          </Form.Control>
          <Form.Control>
            <Form.Label>Select Skill (Single)</Form.Label>
            <div className="max-w-96">
              <Select
                options={skills}
                value={selectedSkill}
                onChange={(value) => setSelectedSkill(value as string)}
                placeholder="Select a skill..."
                searchable
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Selected:{" "}
              {selectedSkill
                ? skills.find((skill) => skill.value === selectedSkill)?.label
                : "None"}
            </p>
          </Form.Control>
          <Form.Control>
            <Form.Label>Fixed Width with Many Options Selected</Form.Label>
            <div className="w-64">
              <Select
                options={skills}
                value={[
                  "html",
                  "css",
                  "javascript",
                  "react",
                  "typescript",
                  "node",
                  "python",
                  "java",
                  "csharp",
                  "php",
                ]}
                placeholder="Select skills..."
                multiple
                searchable
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This example shows how the component handles many selected options
              in a fixed-width container with vertical scrolling.
            </p>
          </Form.Control>

          <Form.Control>
            <Form.Label>
              Select with Long Options (Horizontal Scroll)
            </Form.Label>
            <div className="w-64">
              <Select
                options={longOptions}
                value={selectedLongOption}
                onChange={(value) => setSelectedLongOption(value as string)}
                placeholder="Select an option..."
                searchable
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Selected:{" "}
              {selectedLongOption
                ? longOptions.find(
                    (option) => option.value === selectedLongOption,
                  )?.label
                : "None"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              This example shows how the component handles options with very
              long text using horizontal scrolling.
            </p>
          </Form.Control>

          <Form.Control>
            <Form.Label>Fixed Width with Multiple Rows</Form.Label>
            <div className="w-64">
              <Select
                options={skills}
                value={selectedMultiRowSkills}
                onChange={(value) =>
                  setSelectedMultiRowSkills(value as string[])
                }
                placeholder="Select skills..."
                multiple
                searchable
                rows={3}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Selected:{" "}
              {selectedMultiRowSkills.length > 0
                ? skills
                    .filter((skill) =>
                      selectedMultiRowSkills.includes(skill.value),
                    )
                    .map((skill) => skill.label)
                    .join(", ")
                : "None"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              This example shows how the component handles many selected options
              with the <code>rows={3}</code> prop, which allows the select to
              display 3 rows of selected options before scrolling.
            </p>
          </Form.Control>
        </div>
      </div>

      {/* DatePicker */}
      <div className="space-y-6">
        <Typography variant="h2">DatePicker</Typography>
        <div className="space-y-4">
          <Form.Control>
            <Form.Label>Select a Date</Form.Label>
            <div className="flex items-center gap-4">
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="Select date"
                locale="en-US"
              />
              <div className="text-sm text-gray-600">
                Selected: {selectedDate?.toLocaleDateString() || "None"}
              </div>
            </div>
          </Form.Control>
        </div>
      </div>

      {/* DateRangePicker */}
      <div className="space-y-6">
        <Typography variant="h2">DateRangePicker</Typography>
        <div className="space-y-4">
          <Form.Control>
            <Form.Label>Select a Date Range</Form.Label>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder={{ from: "Start date", to: "End date" }}
            />
          </Form.Control>
        </div>
      </div>
    </div>
  );
}
