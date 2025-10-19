import { SelectedInputProps } from "../SelectInput";
import SelectFilters from "../SelectFilters";

const reviewFilters: SelectedInputProps[] = [
  {
    id: "sort",
    placeholder: "Sort by:",
    options: ["Popularity", "Release Date", "Rating", "Alphabetical", "Newest"],
  },
  {
    id: "stars",
    placeholder: "Filter by stars:",
    options: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
  },
  {
    id: "tags",
    placeholder: "Filter by tags:",
    options: [
      "Immersive",
      "Great Soundtrack",
      "Story Rich",
      "Open World",
      "Atmospheric",
      "Emotional",
      "Buggy",
    ],
  },
];

export default function BrowseReviewsFilters() {
  return <SelectFilters filters={reviewFilters} />;
}
