import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Loading } from "../Loading/Loading";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  className?: string;
  loading?: boolean;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
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
  xs: "max-w-sm",
  sm: "max-w-xl",
  base: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  full: "max-w-full mx-4",
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  onClose,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-gray-200 px-6 py-4",
        className,
      )}
    >
      <div className="text-lg font-semibold">{children}</div>
      {onClose && (
        <button
          type="button"
          className="h-4.5 flex items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800 md:h-5 md:w-5"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <div>
            {" "}
            <X className="h-5 w-5 p-[3px]" />{" "}
          </div>
        </button>
      )}
    </div>
  );
};

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return (
    <div className={cn("overflow-y-auto px-6 py-4", className)}>{children}</div>
  );
};

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const Modal: React.FC<ModalProps> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({
  isOpen,
  onClose,
  children,
  size = "base",
  closeOnOverlayClick = false,
  closeOnEsc = true,
  initialFocus,
  className,
  loading = false,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (!loading && event.key === "Escape") {
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

    // Prevent body scroll while maintaining layout
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen, initialFocus]);

  // Handle click outside
  const handleOverlayClick = (event: React.MouseEvent) => {
    // Only close if:
    // 1. Modal is not in loading state
    // 2. closeOnOverlayClick is explicitly set to true
    // 3. Click target is the overlay itself (not modal content)
    if (
      !loading &&
      closeOnOverlayClick &&
      event.target === overlayRef.current
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Modal.Header) {
      return React.cloneElement(child as React.ReactElement<ModalHeaderProps>, {
        onClose: loading ? undefined : onClose,
      });
    }
    return child;
  });

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative flex max-h-[calc(100vh-2rem)] w-full flex-col rounded-2xl bg-white shadow-xl outline-none",
          sizes[size],
          loading && "pointer-events-none",
          className,
        )}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {childrenWithProps}
        {loading && <Loading />}
      </div>
    </div>,
    document.body,
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

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
