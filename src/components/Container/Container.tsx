import React from "react";
import { cn } from "../../utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
  centered?: boolean;
  as?: "div" | "section" | "article" | "main";
}

const sizeStyles = {
  sm: "max-w-screen-sm", // 640px
  md: "max-w-screen-md", // 768px
  lg: "max-w-screen-lg", // 1024px
  xl: "max-w-screen-xl", // 1280px
  "2xl": "max-w-screen-2xl", // 1536px
  full: "max-w-full",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "lg",
      padding = true,
      centered = true,
      as: Component = "div",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          sizeStyles[size],
          padding && "px-4 sm:px-6 lg:px-8",
          centered && "mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

// Semantic layout containers with predefined sizes
interface PageContainerProps extends Omit<ContainerProps, "as" | "size"> {}
export const PageContainer = React.forwardRef<
  HTMLDivElement,
  PageContainerProps
>((props, ref) => {
  return <Container ref={ref} as="main" size="xl" {...props} />;
});

PageContainer.displayName = "PageContainer";

interface SectionContainerProps extends Omit<ContainerProps, "as" | "size"> {}
export const SectionContainer = React.forwardRef<
  HTMLDivElement,
  SectionContainerProps
>((props, ref) => {
  return <Container ref={ref} as="section" size="lg" {...props} />;
});

SectionContainer.displayName = "SectionContainer";

interface ContentContainerProps extends Omit<ContainerProps, "as" | "size"> {}
export const ContentContainer = React.forwardRef<
  HTMLDivElement,
  ContentContainerProps
>((props, ref) => {
  return <Container ref={ref} as="div" size="md" {...props} />;
});

ContentContainer.displayName = "ContentContainer";

interface NarrowContainerProps extends Omit<ContainerProps, "as" | "size"> {}
export const NarrowContainer = React.forwardRef<
  HTMLDivElement,
  NarrowContainerProps
>((props, ref) => {
  return <Container ref={ref} as="div" size="sm" {...props} />;
});

NarrowContainer.displayName = "NarrowContainer";

interface FullWidthContainerProps extends Omit<ContainerProps, "as" | "size"> {}
export const FullWidthContainer = React.forwardRef<
  HTMLDivElement,
  FullWidthContainerProps
>((props, ref) => {
  return <Container ref={ref} as="div" size="full" {...props} />;
});

FullWidthContainer.displayName = "FullWidthContainer";
