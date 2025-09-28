"use client";

import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectInput, { SelectedInputProps } from "../SelectInput";

const browseFilters: SelectedInputProps[] = [
  {
    id: "platform",
    placeholder: "Platforms",
    options: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
  },
  {
    id: "genre",
    placeholder: "Genre",
    options: ["Action", "Adventure", "RPG", "Shooter", "Strategy"],
  },
  {
    id: "sort",
    placeholder: "Sort by:",
    options: ["Popularity", "Release Date", "Rating", "Alphabetical"],
  },
];

export default function BrowseGamesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Create object from URL params
  const selectedFilters: Record<string, string> = {};
  browseFilters.forEach((filter) => {
    const rawValue = searchParams.get(filter.id);
    if (!rawValue) return;

    // Find matching option regardless of casing
    const matchedOption = filter.options.find(
      (opt) => opt.toLowerCase() === rawValue.toLowerCase()
    );

    if (matchedOption) {
      selectedFilters[filter.id] = matchedOption; // Use correct casing
    }
  });

  // Handle selection
  const handleChange = (id: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(id, value);
    } else {
      params.delete(id);
    }
    router.push(`?${params.toString()}`);
  };

  // Reset all filters
  const handleReset = () => {
    router.push(window.location.pathname);
  };

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        {browseFilters.map((filter) => (
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

      {/* Display selected filters */}
      <AnimatePresence mode="wait">
        {Object.entries(selectedFilters).length > 0 && (
          <motion.div
            layout
            key="filters"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex w-full flex-wrap items-center justify-between gap-2 gap-y-4"
          >
            <div className="space-x-1 lg:space-x-2">
              {Object.entries(selectedFilters).map(([id, value]) => (
                <motion.span
                  key={id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-muted rounded-full px-3 py-1 text-sm"
                >
                  {id}: <span className="text-primary-300">{value}</span>
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
