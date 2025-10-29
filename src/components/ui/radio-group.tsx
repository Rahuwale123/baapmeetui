import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@lib/utils";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-3", className)} {...props} />;
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, ...props }, ref) => {
  const itemId = React.useId();

  return (
    <div className="inline-flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border border-border text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="h-3.5 w-3.5 rounded-full bg-brand" />
      </RadioGroupPrimitive.Item>
      <label htmlFor={itemId} className="text-sm font-medium text-ink">
        {label}
      </label>
    </div>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
