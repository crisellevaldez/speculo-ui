import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  className?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

export const Modal: React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
} = ({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocus,
  className,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Handle initial focus
  useEffect(() => {
    if (!isOpen) return;

    const elementToFocus = initialFocus?.current || modalRef.current;
    elementToFocus?.focus();

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialFocus]);

  // Handle click outside
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full rounded-lg bg-white shadow-xl outline-none",
          sizes[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.Header = function ModalHeader({ children, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-gray-200 px-6 py-4",
        className
      )}
    >
      <div className="text-lg font-semibold">{children}</div>
      <button
        type="button"
        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        onClick={() => {
          // Find the closest Modal and call its onClose
          const modalElement = document.querySelector('[role="dialog"]');
          const closeEvent = new CustomEvent("modal-close");
          modalElement?.dispatchEvent(closeEvent);
        }}
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

Modal.Body = function ModalBody({ children, className }) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
};

Modal.Footer = function ModalFooter({ children, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4",
        className
      )}
    >
      {children}
    </div>
  );
};

// For nested modals, we need a provider to manage the stack
export interface ModalProviderProps {
  children: React.ReactNode;
}

export interface ModalContextType {
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalStack, setModalStack] = React.useState<React.ReactNode[]>([]);

  const openModal = (modal: React.ReactNode) => {
    setModalStack((stack) => [...stack, modal]);
  };

  const closeModal = () => {
    setModalStack((stack) => stack.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalStack.map((modal, index) => (
        <React.Fragment key={index}>{modal}</React.Fragment>
      ))}
    </ModalContext.Provider>
  );
};

// Hook for using modals
export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
