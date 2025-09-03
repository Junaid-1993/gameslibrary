import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectedInputProps {
  id: string;
  placeholder: string;
  values?: Record<string, string>; // current selected values
  options: string[];
  onSelect?: (id: string, value: string) => void;
}

export default function SelectInput({
  id,
  values,
  placeholder,
  options,
  onSelect,
}: SelectedInputProps) {
  return (
    <>
      {/* Accessible hidden label */}
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>

      <Select value={values?.[id] || ""} onValueChange={(value) => onSelect?.(id, value)}>
        <SelectTrigger
          className="border-border-400 dark:bg-surface-500 w-full px-4 py-3 md:w-[250px] md:text-[0.938rem]"
          id={id}
          name={id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
