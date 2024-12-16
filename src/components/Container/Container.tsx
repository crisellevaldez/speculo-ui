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
          "3xl:w-[2000px] w-full 2xl:w-[1500px]",
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
