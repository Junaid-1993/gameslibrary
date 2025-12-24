import Lists from "@/app/data/lists.json";
import { Game } from "@/app/types/Game";
import FavoritesSection from "./FavoritesSection";

// Later we will fetch the favoriteGames from a database
const favoriteGames: Game[] = Array.from(
  new Map(
    Lists.flatMap((list) => list.games.filter((game) => game.favorite)).map((game) => [
      game.title,
      game,
    ])
  ).values()
);

export default function Page() {
  return <FavoritesSection favoriteGames={favoriteGames} />;
}
