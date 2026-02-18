import Lists from "@/app/data/lists.json";
import { Game } from "@/app/types/Game";
import WishListSection from "./WishlistSection";

// Later we will fetch the wishlistGames from a database
const wishlistGames: Game[] = Array.from(
  new Map(
    Lists.flatMap((list) => list.games.filter((game) => game.bookmarked)).map((game) => [
      game.title,
      game,
    ])
  ).values()
);

export default function Page() {
  return <WishListSection wishlistGames={wishlistGames} />;
}
