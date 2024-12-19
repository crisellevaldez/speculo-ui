import React, { useState } from "react";
import { Container } from "../../../components/Container/Container";
import { Table } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";
import { Button } from "../../../components/Button/Button";

const PlaygroundPage = () => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  // Sample data for regular table
  const regularColumns = Array.from({ length: 30 }, (_, i) => ({
    key: `col${i + 1}`,
    header: `Column ${i + 1}`,
    sortable: true,
  }));

  const regularData = Array.from({ length: 50 }, (_, index) => {
    const rowData: Record<string, string | number> = {};
    regularColumns.forEach((col) => {
      rowData[col.key] = `Value ${index + 1}-${col.key.replace("col", "")}`;
    });
    return rowData;
  });

  // Sample data for modal table with more columns
  const modalColumns = Array.from({ length: 100 }, (_, i) => ({
    key: `col${i + 1}`,
    header: `Column ${i + 1}`,
    sortable: true,
  }));

  const modalData = Array.from({ length: 50 }, (_, index) => {
    const rowData: Record<string, string | number> = {};
    modalColumns.forEach((col) => {
      rowData[col.key] = `Value ${index + 1}-${col.key.replace("col", "")}`;
    });
    return rowData;
  });

  return (
    <Container>
      <div className="space-y-8 py-8">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Component Playground</h2>
          <p className="mb-8 text-gray-600">
            Explore our component library with different variations and sizes.
          </p>
        </div>

        {/* Table Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Table Component</h3>
          <Table
            columns={regularColumns}
            data={regularData}
            keyExtractor={(item) => item.col1}
            sortable
            selectable
          />
        </div>

        {/* Modal Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Modal Components</h3>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsSmallModalOpen(true)}>
              Open Small Modal
            </Button>
            <Button onClick={() => setIsBaseModalOpen(true)}>
              Open Base Modal
            </Button>
            <Button onClick={() => setIsLargeModalOpen(true)}>
              Open Large Modal
            </Button>
            <Button onClick={() => setIsTableModalOpen(true)}>
              Open Table Modal
            </Button>
          </div>
        </div>

        {/* Table Modal */}
        <Modal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          className="w-full max-w-[95vw]"
        >
          <Modal.Header>Table Modal</Modal.Header>
          <Modal.Body>
            <Table
              columns={modalColumns}
              data={modalData}
              keyExtractor={(item) => item.col1}
              sortable
              selectable
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsTableModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Small Modal */}
        <Modal
          isOpen={isSmallModalOpen}
          onClose={() => setIsSmallModalOpen(false)}
          size="sm"
        >
          <Modal.Header>Small Modal</Modal.Header>
          <Modal.Body>
            <p>This is a small modal with max-width-xl.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsSmallModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Base Modal */}
        <Modal
          isOpen={isBaseModalOpen}
          onClose={() => setIsBaseModalOpen(false)}
          size="base"
        >
          <Modal.Header>Base Modal</Modal.Header>
          <Modal.Body>
            <p>This is a base modal with max-width-2xl.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsBaseModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Large Modal */}
        <Modal
          isOpen={isLargeModalOpen}
          onClose={() => setIsLargeModalOpen(false)}
          size="lg"
        >
          <Modal.Header>Large Modal</Modal.Header>
          <Modal.Body>
            <p>This is a large modal with max-width-3xl.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsLargeModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default PlaygroundPage;
