"use client";

import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import SelectInput from "@/app/components/SelectInput";
import { SelectedInputProps } from "@/app/components/SelectInput";
import { useSelectedFilters } from "../hooks/useSelectedFilters";

interface ReviewFiltersProps {
  filters: SelectedInputProps[];
  popLayout?: boolean;
}

export default function SelectFilters({ filters, popLayout = false }: ReviewFiltersProps) {
  const { selectedFilters, handleChange, handleReset } = useSelectedFilters(filters);

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        {filters.map((filter) => (
          <SelectInput
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
              <Button
                variant="outline"
                className="text-accent-400 dark:border-accent-400 hover:text-background dark:hover:bg-accent-400 h-10 cursor-pointer transition duration-300 ease-in-out"
                onClick={handleReset}
              >
                <Funnel />
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
