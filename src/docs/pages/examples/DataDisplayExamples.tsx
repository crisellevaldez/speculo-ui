import { Table } from "../../../components/Table/Table";
import { cn } from "../../../utils/cn";
import { useState } from "react";

interface Product extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  stock: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
  specifications: string;
}

const longDescription = `
This is a very long description that will demonstrate horizontal scrolling within the cell. 
It contains detailed information that would typically exceed the column width and need to scroll.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`;

// Generate 20 sample products
const sampleData: Product[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Product XYZ-${(123 + index).toString().padStart(3, "0")}`,
  description: longDescription,
  category: [
    "Electronics & Computers",
    "Displays & Accessories",
    "Photography",
    "Smart Home",
    "Gaming",
  ][index % 5],
  price: `$${(899 + index * 100).toLocaleString()}.99`,
  stock: ["In Stock", "Low Stock", "Out of Stock"][index % 3] as
    | "In Stock"
    | "Low Stock"
    | "Out of Stock",
  lastUpdated: new Date(2024, 0, 15 - index).toISOString(),
  specifications: [
    "CPU: Intel i9-13900K, RAM: 64GB DDR5, Storage: 2TB NVMe SSD",
    "32-inch 4K HDR, 144Hz Refresh Rate, 1ms Response Time, G-Sync Compatible",
    "50MP Sensor, 8K Video, 5-Axis Stabilization, Weather Sealed Body",
    "Smart Hub Compatible, Voice Control, Energy Efficient",
    "RTX 4090, 32GB RAM, RGB Lighting, Liquid Cooling",
  ][index % 5],
}));

const columns = [
  {
    key: "id",
    header: "ID",
    minWidth: "80px",
    width: "100px",
    sortable: true,
    isPinned: true,
    pinPosition: "left" as const,
  },
  {
    key: "name",
    header: "Product Name",
    minWidth: "200px",
    width: "250px",
    sortable: true,
    isPinned: true,
    pinPosition: "left" as const,
  },
  {
    key: "description",
    header: "Description",
    minWidth: "300px",
    width: "400px",
  },
  {
    key: "category",
    header: "Category",
    minWidth: "150px",
    width: "200px",
    sortable: true,
  },
  {
    key: "price",
    header: "Price",
    minWidth: "100px",
    width: "150px",
    sortable: true,
  },
  {
    key: "stock",
    header: "Stock Status",
    minWidth: "120px",
    width: "150px",
    cell: (item: Product) => (
      <span
        className={cn(
          "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
          item.stock === "In Stock"
            ? "bg-green-100 text-green-800"
            : item.stock === "Low Stock"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800",
        )}
      >
        {item.stock}
      </span>
    ),
  },
  {
    key: "lastUpdated",
    header: "Last Updated",
    minWidth: "150px",
    width: "200px",
    cell: (item: Product) => new Date(item.lastUpdated).toLocaleString(),
    sortable: true,
  },
  {
    key: "specifications",
    header: "Specifications",
    minWidth: "300px",
    width: "400px",
  },
];

export default function DataDisplayExamples() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="prose max-w-none">
          <h2>Multiple Selection Table</h2>
          <p>
            This table demonstrates multiple row selection capabilities:
            <ul>
              <li>Checkbox in header to select/deselect all rows</li>
              <li>Individual row selection with checkboxes</li>
              <li>Maintains selection while sorting</li>
            </ul>
          </p>
        </div>

        <div className="h-[600px]">
          <Table<Product>
            columns={columns}
            data={sampleData}
            keyExtractor={(item) => item.id}
            sortable
            selectable
            selectedRows={selectedRows}
            onSelectRows={setSelectedRows}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="prose max-w-none">
          <h2>Responsive Table with Sticky Header and Pinned Columns</h2>
          <p>
            This table demonstrates the sticky header behavior with vertical and
            horizontal scrolling:
            <ul>
              <li>Header remains fixed while scrolling vertically</li>
              <li>
                ID and Product Name columns are pinned to the left while
                scrolling horizontally
              </li>
              <li>Content wraps naturally within cells</li>
              <li>Resizable columns</li>
              <li>Sortable columns with Lucide icons</li>
            </ul>
          </p>
        </div>

        <div className="h-[600px]">
          <Table<Product>
            columns={columns}
            data={sampleData}
            keyExtractor={(item) => item.id}
            sortable
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="prose max-w-none">
          <h2>Basic Table with Sticky Header</h2>
          <p>
            This table demonstrates basic functionality with sticky header:
            <ul>
              <li>Header remains fixed while scrolling</li>
              <li>Content wraps naturally within cells</li>
              <li>Resizable columns</li>
              <li>Sortable columns with Lucide icons</li>
            </ul>
          </p>
        </div>

        <div className="h-[600px]">
          <Table<Product>
            columns={columns.map((col) => ({ ...col, isPinned: false }))}
            data={sampleData}
            keyExtractor={(item) => item.id}
            sortable
          />
        </div>
      </section>
    </div>
  );
}
