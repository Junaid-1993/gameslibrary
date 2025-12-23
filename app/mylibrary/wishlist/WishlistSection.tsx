"use client";

import ContentNotFound from "@/app/components/ContentNotFound";
import GameCard from "@/app/components/GameCard";
import GamesGrid from "@/app/components/GamesGrid";
import FullWidthGameCard from "@/app/components/mylibrary/FullWidthGameCard";
import ListsFilter from "@/app/components/mylibrary/ListsFilter";
import ViewSwitchButtons from "@/app/components/mylibrary/ViewSwitchButtons";
import SearchInput from "@/app/components/SearchInput";
import { Game } from "@/app/types/Game";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useState } from "react";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
  exit: { opacity: 0 },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
};

export const gridItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function WishListSection({ wishlistGames }: { wishlistGames: Game[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const hasLists = wishlistGames.length >= 1;

  return (
    <section className="grid gap-6 md:gap-8">
      <div className="flex flex-col gap-6 min-[1074px]:flex-row min-[1074px]:items-start min-[1074px]:justify-between min-[1074px]:gap-3">
        <div className="w-full md:w-96">
          <SearchInput placeholder="Search Your WishList..." />
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-4 sm:grid-cols-[auto_1fr_auto] md:flex md:justify-end">
          <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 md:content-end">
            <ListsFilter />
          </div>
          <div className="col-start-2 row-start-1 content-center sm:col-start-3 sm:content-start">
            <div className="flex items-center gap-2">
              <ViewSwitchButtons
                viewMode={viewMode}
                onViewModeChange={(mode) => setViewMode(mode)}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div layout>
        {hasLists && (
          <div className="mb-4">
            <p className="text-secondary">Wishlisted Titles: {wishlistGames.length}</p>
          </div>
        )}
        {hasLists ? (
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
                  {wishlistGames.map((game) => (
                    <motion.div key={game.id} variants={gridItemVariants}>
                      <GameCard
                        game={game}
                        renderedIn="Wishlist"
                        hasActionMenu
                        shouldRenderWishlistComponent={false}
                        upcoming
                        // fullListAction={action ? action : undefined}
                      />
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
                {wishlistGames.map((game) => (
                  <motion.div key={game.id} variants={listItemVariants}>
                    <FullWidthGameCard
                      game={game}
                      renderedIn="Wishlist"
                      shouldRenderWishlistComponent={false}
                      upcoming
                      //   fullListAction={action ? action : undefined}
                    />
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        ) : (
          <ContentNotFound
            title="No Lists Found"
            description="It looks like you haven't created any game lists yet."
            buttonTitle="Create Your First List"
            className="mt-6"
          />
        )}
      </motion.div>
    </section>
  );
}
