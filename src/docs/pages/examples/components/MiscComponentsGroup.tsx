import { useState } from "react";
import { Calendar } from "../../../../components/Calendar/Calendar";
import { HoverCard } from "../../../../components/HoverCard/HoverCard";
import { Switch } from "../../../../components/Switch/Switch";
import { TimePicker } from "../../../../components/TimePicker/TimePicker";
// import { Toast } from "../../../../components/Toast/Toast";
import { Typography } from "../../../../components/Typography/Typography";
import { Button } from "../../../../components/Button/Button";

export function MiscComponentsGroup() {
  // State for Calendar
  const [date, setDate] = useState<Date>(new Date());

  // State for Switch
  const [switchChecked, setSwitchChecked] = useState(false);

  // State for TimePicker
  const [time, setTime] = useState<string | null>(null);

  // State for Toast
  const [isToastVisible, setIsToastVisible] = useState(false);

  return (
    <div className="space-y-12">
      {/* Calendar */}
      <div className="space-y-6">
        <Typography variant="h2">Calendar</Typography>
        <div className="space-y-4">
          <div className="max-w-sm">
            <Calendar
              value={date}
              onChange={(newDate) => setDate(newDate)}
              className="rounded-md border"
            />
          </div>
          <div className="text-sm text-gray-600">
            Selected: {date?.toLocaleDateString() || "None"}
          </div>
        </div>
      </div>

      {/* HoverCard */}
      <div className="space-y-6">
        <Typography variant="h2">HoverCard</Typography>
        <div className="space-y-4">
          <HoverCard trigger={<Button variant="outline">Hover over me</Button>}>
            <div className="p-4">
              <Typography variant="h3" className="mb-2">
                Hover Card Content
              </Typography>
              <p className="text-sm text-gray-600">
                This is the content of the hover card. It appears when you hover
                over the trigger element.
              </p>
            </div>
          </HoverCard>
        </div>
      </div>

      {/* Switch */}
      <div className="space-y-6">
        <Typography variant="h2">Switch</Typography>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Switch
              checked={switchChecked}
              onChange={(e) => setSwitchChecked(e.target.checked)}
              id="airplane-mode"
            />
            <label
              htmlFor="airplane-mode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Airplane Mode {switchChecked ? "On" : "Off"}
            </label>
          </div>
          <div className="flex items-center gap-4">
            <Switch disabled />
            <label className="text-sm font-medium leading-none text-gray-400">
              Disabled Switch
            </label>
          </div>
        </div>
      </div>

      {/* TimePicker */}
      <div className="space-y-6">
        <Typography variant="h2">TimePicker</Typography>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <TimePicker
              value={time}
              onChange={setTime}
              placeholder="Select time"
            />
            <div className="text-sm text-gray-600">
              Selected: {time || "None"}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="space-y-6">
        <Typography variant="h2">Toast</Typography>
        <div className="space-y-4">
          <Button onClick={() => setIsToastVisible(true)}>Show Toast</Button>
          {isToastVisible && (
            <div className="flex w-96 items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-lg">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Notification</h3>
                <p className="text-sm text-gray-600">
                  This is a toast notification example.
                </p>
              </div>
              <button
                onClick={() => setIsToastVisible(false)}
                className="flex-shrink-0 rounded-md p-1 hover:bg-black/5"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
