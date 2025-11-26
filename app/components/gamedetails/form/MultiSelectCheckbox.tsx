"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface MultiSelectCheckboxProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  errorHighlight?: boolean;
  ref: React.Ref<HTMLButtonElement>;
}

export default function MultiSelectCheckbox({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  errorHighlight = false,
  ref,
}: MultiSelectCheckboxProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      // Remove the option from selected Array
      onChange(selected.filter((item) => item !== option));
    } else {
      // Add the option to the selected Array
      onChange([...selected, option]);
    }
  };

  return (
    <>
      <Label className="sr-only" htmlFor="played-platforms">
        Platforms Played On
      </Label>
      <Popover>
        <PopoverTrigger
          asChild
          id="played-platforms"
          aria-labelledby="played-platforms"
          className={
            "dark:border-border-400 ml:w-[250px] h-12 w-full px-4 py-3 md:text-[0.938rem]" +
            (errorHighlight ? " dark:border-danger-300" : "")
          }
          ref={ref}
        >
          <Button
            variant="outline"
            className="ml:w-[250px] w-full justify-between px-4 py-3 md:text-[0.938rem]"
          >
            <span className="text-muted-foreground text-[0.938rem]">{placeholder}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[250px] space-y-1 bg-[#18181c] p-2"
          role="group"
          aria-labelledby="played-platforms"
        >
          {options.map((option) => (
            <label
              key={option}
              htmlFor={option}
              className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-md px-2 py-2"
            >
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => toggleOption(option)}
                id={option}
                className="dark:data-[state=checked]:border-primary-400 dark:data-[state=checked]:bg-primary-400"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}
