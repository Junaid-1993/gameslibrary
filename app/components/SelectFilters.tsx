"use client";

import { Button } from "@/components/ui/button";
import { Funnel, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import SelectInput from "@/app/components/SelectInput";
import { SelectedInputProps } from "@/app/components/SelectInput";
import { useSelectedFilters } from "../hooks/useSelectedFilters";
import { cn } from "@/lib/utils";

interface ReviewFiltersProps {
  filters: SelectedInputProps[];
  popLayout?: boolean;
  className?: string;
  crossButton?: boolean;
  selectButtonContainerClass?: string;
  selectButtonClass?: string;
}

export default function SelectFilters({
  filters,
  className,
  selectButtonContainerClass,
  selectButtonClass,
  popLayout = false,
  crossButton = false,
}: ReviewFiltersProps) {
  const { selectedFilters, handleChange, handleReset } = useSelectedFilters(filters);

  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      <div
        className={cn(
          "flex w-full flex-col items-center gap-3 md:flex-row",
          selectButtonContainerClass
        )}
      >
        {filters.map((filter) => (
          <SelectInput
            className={selectButtonClass}
            key={filter.id}
            id={filter.id}
            placeholder={filter.placeholder}
            values={selectedFilters}
            options={filter.options}
            onSelect={handleChange}
          />
        ))}
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 gap-y-5">
        <div className="flex flex-wrap space-x-1 gap-y-2 lg:space-x-2">
          <AnimatePresence mode={popLayout ? "popLayout" : "sync"}>
            {Object.entries(selectedFilters).map(([id, value]) => (
              <motion.span
                key={id}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-muted !w-auto rounded-full px-3 py-1 text-sm"
              >
                {id}: <span className="text-primary-300">{value}</span>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode={popLayout ? "popLayout" : "sync"}>
          {Object.entries(selectedFilters).length > 0 && (
            <motion.div
              key="reset-button"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {crossButton ? (
                <Button
                  type="button"
                  title="Reset Sort"
                  aria-label="Reset Sort"
                  variant="ghost"
                  className="mt-0.5 h-auto cursor-pointer p-0 text-white hover:text-red-400 dark:hover:bg-transparent"
                  onClick={handleReset}
                >
                  <X className="size-4.5" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="text-accent-400 dark:border-accent-400 hover:text-background dark:hover:bg-accent-400 h-10 cursor-pointer transition duration-300 ease-in-out"
                  onClick={handleReset}
                >
                  <Funnel />
                  Reset Filters
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
