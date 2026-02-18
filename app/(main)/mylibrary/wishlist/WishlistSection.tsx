"use client";

import ContentNotFound from "@/app/components/ContentNotFound";
import GameCard from "@/app/components/GameCard";
import GamesGrid from "@/app/components/GamesGrid";
import FullWidthGameCard from "@/app/components/mylibrary/FullWidthGameCard";
import ListsFilter from "@/app/components/mylibrary/ListsFilter";
import ViewSwitchButtons from "@/app/components/mylibrary/ViewSwitchButtons";
import SearchInput from "@/app/components/SearchInput";
import {
  containerVariants,
  gridItemVariants,
  listItemVariants,
} from "@/app/mylibrary/lists/ListsSection";
import { Game } from "@/app/types/Game";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function WishListSection({ wishlistGames }: { wishlistGames: Game[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const hasWishlist = wishlistGames.length >= 1;

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
        {hasWishlist && (
          <div className="mb-4">
            <p className="text-secondary">Wishlisted Titles: {wishlistGames.length}</p>
          </div>
        )}
        {hasWishlist ? (
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
                    />
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center">
            <ContentNotFound
              title="No Wishlist Yet"
              description="Your wishlist is empty. Start adding games you're excited about and keep track of them here."
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
