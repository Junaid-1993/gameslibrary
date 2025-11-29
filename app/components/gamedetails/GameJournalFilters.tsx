import { SelectedInputProps } from "../SelectInput";
import SelectFilters from "../SelectFilters";

const reviewFilters: SelectedInputProps[] = [
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
  {
    id: "date",
    placeholder: "Filter by date:",
    options: ["Last 24 hours", "Last 7 days", "Last 30 days"],
  },
];

export default function BrowseReviewsFilters() {
  return <SelectFilters filters={reviewFilters} popLayout />;
}
