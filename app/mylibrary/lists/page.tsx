import { ListProps } from "@/app/components/mylibrary/ListItemRow";
import ListsSection from "./ListsSection";
import Lists from "@/app/data/lists.json";

// Later we will fetch the lists from a database
const lists: ListProps[] = Lists;

export default function Page() {
  return <ListsSection lists={lists} />;
}
