import { SelectedInputProps } from "../SelectInput";
import SelectFilters from "../SelectFilters";

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
  return <SelectFilters filters={browseFilters} />;
}
