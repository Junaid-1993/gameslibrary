import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import DefaultBrowseGames from "../components/browsegames/DefaultBrowseGames";
import NotFoundGames from "../components/browsegames/NotFoundGames";
import GameCard from "../components/GameCard";
import GamesGrid from "../components/GamesGrid";
import { fetchGames } from "../services/gameService";
import { Game } from "../types/Game";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolvedSearchParams = await searchParams;
  const hasFilters = Object.keys(resolvedSearchParams).length > 0;
  const filteredGames: Game[] = hasFilters ? await fetchGames(resolvedSearchParams) : [];

  return (
    <AnimatePresence mode="wait">
      {!hasFilters && (
        <motion.div
          layout
          key="default"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <DefaultBrowseGames />
        </motion.div>
      )}

      {hasFilters && filteredGames.length > 0 && (
        <motion.div
          key="filtered"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <GamesGrid>
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </GamesGrid>
        </motion.div>
      )}

      {hasFilters && filteredGames.length === 0 && <NotFoundGames />}
    </AnimatePresence>
  );
}
