import { cn } from "@/lib/utils";
import SelectFilters from "../SelectFilters";
import { SelectedInputProps } from "../SelectInput";

export default function ListsFilter({
  filter,
  classes,
}: {
  filter?: { id: string; placeholder: string; options: string[] };
  classes?: { container?: string; selectButtonContainerClass?: string; selectButtonClass?: string };
}) {
  const reviewFilters: SelectedInputProps[] = [
    {
      id: "sort",
      placeholder: "Sort by:",
      options: ["Newest", "Oldest", "Release Date", "Rating", "Alphabetical", "Recently Added"],
    },
    ...(filter ? [filter] : []),
  ];
  return (
    <SelectFilters
      filters={reviewFilters}
      popLayout
      crossButton
      className={cn("sm:gap-3", classes?.container)}
      selectButtonContainerClass={classes?.selectButtonContainerClass}
      selectButtonClass={classes?.selectButtonClass}
    />
  );
}
