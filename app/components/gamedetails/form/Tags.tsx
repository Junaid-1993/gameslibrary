import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function Tags({
  tags,
  selectedTags,
  onSelect,
}: {
  tags: string[];
  selectedTags: string[];
  onSelect: (selectedTag: string) => void;
}) {
  function handleClick(tag: string) {
    onSelect(tag);
  }

  return (
    <div className="border-border-400 rounded-md border p-4">
      <div className="flex flex-wrap items-center gap-2 gap-y-3">
        {tags.map((tag, id) => {
          const isSelected = selectedTags.includes(tag);

          return (
            <motion.button
              type="button"
              whileTap={{ scale: 1.1 }}
              key={id}
              className={cn(
                "cursor-pointer rounded-md border px-2.5 py-2 text-sm shadow-xs",
                "transition-colors duration-200",
                "focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]",
                isSelected
                  ? "dark:bg-primary-800 dark:hover:bg-primary-800/90"
                  : "dark:bg-surface-400 dark:hover:bg-surface-400/90"
              )}
              onClick={() => handleClick(tag)}
            >
              {tag}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
