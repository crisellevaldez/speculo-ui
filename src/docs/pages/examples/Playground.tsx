import { useState } from "react";
import { Typography } from "../../../components/Typography/Typography";
import { BasicComponentsGroup } from "./components/BasicComponentsGroup";
import { FormComponentsGroup } from "./components/FormComponentsGroup";
import { LayoutComponentsGroup } from "./components/LayoutComponentsGroup";
import { DataComponentsGroup } from "./components/DataComponentsGroup";
import { MiscComponentsGroup } from "./components/MiscComponentsGroup";

const PlaygroundPage = () => {
  const [activeGroup, setActiveGroup] = useState<string>("basic");

  return (
    <div className="container mx-auto p-6">
      <Typography variant="h1" className="mb-8">
        Component Playground
      </Typography>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeGroup === "basic"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveGroup("basic")}
          >
            Basic Components
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeGroup === "form"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveGroup("form")}
          >
            Form Components
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeGroup === "layout"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveGroup("layout")}
          >
            Layout Components
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeGroup === "data"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveGroup("data")}
          >
            Data Components
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeGroup === "misc"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveGroup("misc")}
          >
            Miscellaneous Components
          </button>
        </div>
      </div>

      <div className="component-container">
        {activeGroup === "basic" && <BasicComponentsGroup />}
        {activeGroup === "form" && <FormComponentsGroup />}
        {activeGroup === "layout" && <LayoutComponentsGroup />}
        {activeGroup === "data" && <DataComponentsGroup />}
        {activeGroup === "misc" && <MiscComponentsGroup />}
      </div>
    </div>
  );
};

export default PlaygroundPage;
