"use client";

import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";
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
    const value = searchParams.get(filter.id);
    if (value) selectedFilters[filter.id] = value;
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
      <div className="flex w-full flex-wrap items-center justify-between gap-2 gap-y-4">
        <div className="space-x-1 lg:space-x-2">
          {Object.entries(selectedFilters).map(([id, value]) => (
            <span key={id} className="bg-muted rounded-full px-3 py-1 text-sm">
              {id}: <span className="text-primary-300">{value}</span>
            </span>
          ))}
        </div>

        {Object.entries(selectedFilters).length > 0 && (
          <Button
            variant="outline"
            className="text-accent-400 dark:border-accent-400 hover:text-background dark:hover:bg-accent-400 h-10 cursor-pointer transition duration-300 ease-in-out"
            onClick={handleReset}
          >
            <Funnel />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
