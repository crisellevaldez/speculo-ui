import React from "react";
import { cn } from "../../utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
  centered?: boolean;
  as?: "div" | "section" | "article" | "main";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      padding = true,
      centered = true,
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full",
          "2xl:max-w-[1500px]",
          "3xl:max-w-[2000px]",
          padding && "px-4 sm:px-6 lg:px-8",
          centered && "mx-auto",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";
