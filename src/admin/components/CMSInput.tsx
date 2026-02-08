import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CMSInputProps = ComponentProps<typeof Input> & {
  label?: string;
};

const CMSInput = ({ label, className, id, ...props }: CMSInputProps) => {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}
      <Input id={inputId} className={cn(className)} {...props} />
    </div>
  );
};

export default CMSInput;
