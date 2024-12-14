import React from "react";
import { cn } from "../../utils/cn";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "blockquote"
  | "lead"
  | "large"
  | "small"
  | "muted";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl",
  h2: "scroll-m-20 text-2xl font-bold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-lg font-semibold tracking-tight",
  h5: "scroll-m-20 text-base font-semibold tracking-tight",
  h6: "scroll-m-20 text-sm font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote:
    "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200",
  lead: "text-xl text-slate-700 dark:text-slate-300",
  large: "text-lg font-semibold text-slate-900 dark:text-slate-50",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-slate-500 dark:text-slate-500",
};

const defaultElementMap: Record<
  TypographyVariant,
  keyof JSX.IntrinsicElements
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "p", as, className, children, ...props }, ref) => {
    const Component = as || defaultElementMap[variant];
    return React.createElement(
      Component,
      {
        ref,
        className: cn(variantStyles[variant], className),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = "Typography";
