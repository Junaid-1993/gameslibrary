"use client";

import ContentNotFound from "@/app/components/ContentNotFound";
import GameCard from "@/app/components/GameCard";
import GamesGrid from "@/app/components/GamesGrid";
import FullWidthGameCard from "@/app/components/mylibrary/FullWidthGameCard";
import ListsFilter from "@/app/components/mylibrary/ListsFilter";
import ViewSwitchButtons from "@/app/components/mylibrary/ViewSwitchButtons";
import SearchInput from "@/app/components/SearchInput";
import { Game } from "@/app/types/Game";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  containerVariants,
  gridItemVariants,
  listItemVariants,
} from "@/app/mylibrary/lists/ListsSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function FavoritesSection({ favoriteGames }: { favoriteGames: Game[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const hasFavorites = favoriteGames.length >= 1;

  return (
    <section className="grid gap-6 md:gap-8">
      <div className="flex flex-col gap-6 min-[800px]:flex-row min-[800px]:items-start min-[800px]:justify-between min-[800px]:gap-3">
        <div className="w-full md:w-96">
          <SearchInput placeholder="Search Your WishList..." />
        </div>
        <div className="flex items-start gap-2 md:mt-0.5 md:justify-end">
          <div className="grow-1 md:grow-0">
            <ListsFilter />
          </div>
          <div className="mt-[1px] md:mt-0">
            <div className="flex items-center gap-2">
              <ViewSwitchButtons
                viewMode={viewMode}
                onViewModeChange={(mode) => setViewMode(mode)}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div layout="position">
        {hasFavorites && (
          <div className="mb-4">
            <p className="text-secondary">Favorite Titles: {favoriteGames.length}</p>
          </div>
        )}
        {hasFavorites ? (
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.section
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <GamesGrid>
                  {favoriteGames.map((game) => (
                    <motion.div key={game.id} variants={gridItemVariants}>
                      <GameCard game={game} renderedIn="Favorites" hasActionMenu />
                    </motion.div>
                  ))}
                </GamesGrid>
              </motion.section>
            ) : (
              <motion.section
                key="list"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-6"
              >
                {favoriteGames.map((game) => (
                  <motion.div key={game.id} variants={listItemVariants}>
                    <FullWidthGameCard game={game} renderedIn="Favorites" />
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center">
            <ContentNotFound
              title="No Favorites Yet"
              description="You haven't marked any games as favorites. Add your top picks to find them faster."
              className="mt-6"
            />
            <Link href="/browsegames">
              <Button
                variant="outline"
                className="dark:hover:bg-primary-800 dark:bg-border-500 dark:border-border-400 cursor-pointer border text-white duration-250 dark:hover:border-transparent"
              >
                <Globe />
                Browse Games
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}
