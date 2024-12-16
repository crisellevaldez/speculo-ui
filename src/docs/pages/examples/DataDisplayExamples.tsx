import { Container } from "../../../components/Container/Container";
import { Table } from "../../../components/Table/Table";
import { cn } from "../../../utils/cn";

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

const sampleData: Product[] = [
  {
    id: 1,
    name: "Product XYZ-123-456",
    description: longDescription,
    category: "Electronics & Computers",
    price: "$1,299.99",
    stock: "In Stock",
    lastUpdated: "2024-01-15T10:30:00",
    specifications:
      "CPU: Intel i9-13900K, RAM: 64GB DDR5, Storage: 2TB NVMe SSD",
  },
  {
    id: 2,
    name: "Super Ultra HD Monitor Pro",
    description: longDescription,
    category: "Displays & Accessories",
    price: "$899.99",
    stock: "Low Stock",
    lastUpdated: "2024-01-14T15:45:00",
    specifications:
      "32-inch 4K HDR, 144Hz Refresh Rate, 1ms Response Time, G-Sync Compatible",
  },
  {
    id: 3,
    name: "Professional Camera Kit",
    description: longDescription,
    category: "Photography",
    price: "$2,499.99",
    stock: "Out of Stock",
    lastUpdated: "2024-01-13T09:15:00",
    specifications:
      "50MP Sensor, 8K Video, 5-Axis Stabilization, Weather Sealed Body",
  },
];

const columns = [
  {
    key: "id",
    header: "ID",
    minWidth: "80px",
    width: "100px",
    sortable: true,
  },
  {
    key: "name",
    header: "Product Name",
    minWidth: "200px",
    width: "250px",
    sortable: true,
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
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2>Responsive Table with Scrollable Cells</h2>
        <p>
          This example demonstrates:
          <ul>
            <li>
              Horizontal scrolling within cells when content exceeds width
            </li>
            <li>Resizable columns (drag the column edges)</li>
            <li>Minimum column widths</li>
            <li>Container responsiveness across different screen sizes</li>
          </ul>
        </p>
      </div>

      <Container>
        <Table<Product>
          columns={columns}
          data={sampleData}
          keyExtractor={(item) => item.id}
          sortable
        />
      </Container>
    </div>
  );
}
