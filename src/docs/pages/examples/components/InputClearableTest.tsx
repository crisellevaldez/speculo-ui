import React, { useState } from "react";
import { Input, Button, Form, Typography } from "@crisellevaldez/speculo-ui";

export const InputClearableTest: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", inputValue);
    alert(`Submitted value: ${inputValue}`);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <Typography variant="h2" className="mb-4">
        Clearable Input Test
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Form.Control>
          <Form.Label>Test Input with Clearable</Form.Label>
          <Input
            value={inputValue}
            onChange={handleChange}
            clearable={true}
            placeholder="Type something and clear it"
          />
        </Form.Control>

        <Button type="submit">Submit Form</Button>
      </form>
    </div>
  );
};
