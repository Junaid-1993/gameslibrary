import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectedInputProps {
  id: string;
  placeholder: string;
  values?: Record<string, string> | string; // current selected values
  options: string[];
  onSelect?: (id: string, value: string) => void;
  className?: string;
  classes?: {
    contentClass?: string;
    groupClass?: string;
    itemClass?: string;
  };
  reviewForm?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export default function SelectInput({
  id,
  values,
  placeholder,
  options,
  onSelect,
  className,
  classes,
  reviewForm,
  ref,
}: SelectedInputProps) {
  // Extract the value
  const value =
    typeof values === "string"
      ? values
      : typeof values === "object" && values !== null
        ? values[id] || ""
        : "";

  return (
    <>
      {/* Accessible hidden label */}
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>

      <Select value={value} onValueChange={(value) => onSelect?.(id, value)}>
        <SelectTrigger
          className={cn(
            "border-border-400 w-full px-4 py-3 data-[size=default]:h-11 md:w-[250px] md:text-[0.938rem]",
            className
          )}
          id={id}
          name={id}
          ref={ref}
        >
          {reviewForm ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent className={cn("bg-[#18181c]", classes?.contentClass)}>
          <SelectGroup className={classes?.groupClass}>
            {options.map((option) => (
              <SelectItem key={option} value={option} className={classes?.itemClass}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
