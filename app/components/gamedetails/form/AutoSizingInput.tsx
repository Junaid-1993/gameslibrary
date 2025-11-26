"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface AutoSizingInputProps {
  className?: string;
}

export const AutoSizingInput = ({
  className,
  ...props
}: AutoSizingInputProps & React.ComponentProps<"input">) => {
  const [width, setWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Updates the input's width whenever the value changes
  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.offsetWidth);
    }
  }, [props.value]);

  return (
    <div className="relative inline-flex">
      {/* Hidden element to measure the text width */}
      <span
        ref={spanRef}
        className={cn(
          "font-inter invisible whitespace-pre", // Match font size and family
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
      >
        {props.value || props.placeholder}
      </span>
      {/* The visible shadcn Input component */}
      <Input
        style={{ width: `${width}px` }}
        type="number"
        className={cn(
          "absolute inset-0 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
          className
        )}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          if (input.value.length > 3) {
            input.value = input.value.slice(0, 3);
          }
        }}
        {...props}
      />
    </div>
  );
};
