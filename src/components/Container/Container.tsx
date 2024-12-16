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
          "3xl:max-w-[1920px] 4xl:max-w-[2240px] 5xl:max-w-[2560px] 6xl:max-w-[3000px] w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]",
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
