import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-white/50",
        className,
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
