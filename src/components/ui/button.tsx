import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@lib/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "secondary";

type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-brand text-brand-foreground hover:bg-brand/90",
  outline: "border border-border text-ink hover:bg-bg-soft",
  ghost: "text-ink hover:bg-bg-soft",
  secondary: "bg-muted text-ink hover:bg-muted/80"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 rounded-full px-4 text-sm",
  md: "h-11 rounded-full px-6 text-base",
  lg: "h-12 rounded-full px-8 text-base",
  icon: "h-10 w-10 rounded-full"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
