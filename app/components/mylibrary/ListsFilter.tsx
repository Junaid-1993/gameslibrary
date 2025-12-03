import { SelectedInputProps } from "../SelectInput";
import SelectFilters from "../SelectFilters";

const reviewFilters: SelectedInputProps[] = [
  {
    id: "sort",
    placeholder: "Sort by:",
    options: ["Newest", "Oldest", "Release Date", "Rating", "Alphabetical"],
  },
];

export default function ListsFilter() {
  return <SelectFilters filters={reviewFilters} popLayout crossButton className="sm:gap-3" />;
}
