import React from "react";
import { cn } from "../../utils/cn";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert
   * @default 'info'
   */
  variant?: "info" | "warning" | "success" | "error";
  /**
   * The content of the alert
   */
  children: React.ReactNode;
}

const variantStyles = {
  info: {
    container: "bg-blue-50 border-blue-200",
    text: "text-blue-800",
    icon: Info,
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200",
    text: "text-yellow-800",
    icon: AlertCircle,
  },
  success: {
    container: "bg-green-50 border-green-200",
    text: "text-green-800",
    icon: CheckCircle2,
  },
  error: {
    container: "bg-red-50 border-red-200",
    text: "text-red-800",
    icon: XCircle,
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", children, ...props }, ref) => {
    const styles = variantStyles[variant];
    const Icon = styles.icon;

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border p-4", styles.container, className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", styles.text)} />
          <div className={cn("text-sm", styles.text)}>{children}</div>
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";
