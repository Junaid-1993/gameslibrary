import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, MouseEvent, Ref } from "react";

// Extend InputHTMLAttributes to allow all input props
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  inputRef?: Ref<HTMLInputElement>;
  isMobile?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  onKeyDown,
  onClick,
  onClear,
  inputRef,
  isMobile,
  ...props
}: SearchInputProps) {
  return (
    <div className="dark:bg-surface-500 relative flex w-full items-center rounded-md border">
      <Search className="absolute left-3.5" />
      <Input
        type="text"
        placeholder="Search Games Library..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
        ref={inputRef}
        autoFocus={isMobile}
        className="border-border-300 focus-visible:ring-ring/35 h-12 px-12 text-sm lg:text-base"
        // Add Appropriate Value for the 'name' Attribute.
        name="gameQuery"
        {...props}
      />

      <AnimatePresence>
        {value && (
          <motion.button
            type="button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-2.5 cursor-pointer"
            onClick={onClear}
          >
            <X size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
