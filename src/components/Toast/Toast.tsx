import React, { createContext, useContext, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "bottom-right",
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);

      setToasts((prev) => {
        const newToasts = [{ ...toast, id }, ...prev];
        // Remove excess toasts if over maxToasts
        return newToasts.slice(0, maxToasts);
      });

      // Auto remove toast after duration
      if (toast.duration !== Infinity) {
        const duration = toast.duration || 5000;
        setTimeout(() => {
          removeToast(id);
          toast.onClose?.();
        }, duration);
      }
    },
    [maxToasts, removeToast],
  );

  const contextValue = {
    showToast,
    removeToast,
  };

  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div
          className={cn(
            "fixed z-[9999] m-4 flex flex-col gap-2",
            positionClasses[position],
          )}
          role="log"
          aria-live="polite"
        >
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              {...toast}
              onClose={() => {
                removeToast(toast.id);
                toast.onClose?.();
              }}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

interface ToastItemProps extends Toast {
  onClose: () => void;
}

const variants = {
  success: {
    icon: (
      <svg
        className="h-5 w-5 text-green-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    className: "bg-green-50 border-green-200",
  },
  error: {
    icon: (
      <svg
        className="h-5 w-5 text-red-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    className: "bg-red-50 border-red-200",
  },
  warning: {
    icon: (
      <svg
        className="h-5 w-5 text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    className: "bg-yellow-50 border-yellow-200",
  },
  info: {
    icon: (
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
    ),
    className: "bg-blue-50 border-blue-200",
  },
};

const ToastItem: React.FC<ToastItemProps> = ({
  message,
  variant = "info",
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 200); // Match animation duration
  };

  return (
    <div
      className={cn(
        "flex w-96 items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-200",
        variants[variant].className,
        isExiting && "translate-x-full opacity-0",
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{variants[variant].icon}</div>
      <div className="flex-1">{message}</div>
      <button
        onClick={handleClose}
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
  );
};
