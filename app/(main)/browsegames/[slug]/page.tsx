import NewReleases from "@/app/components/browsegames/NewReleases";
import NotFoundGames from "@/app/components/browsegames/NotFoundGames";
import TopRated from "@/app/components/browsegames/TopRated";
import TrendingGames from "@/app/components/browsegames/TrendingGames";
import GameCard from "@/app/components/GameCard";
import GamesGrid from "@/app/components/GamesGrid";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import { fetchGames } from "@/app/services/gameService";
import { Game } from "@/app/types/Game";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  // Allow only specific slugs ( Paths )
  const validSlugs = ["trending", "new-releases", "top-rated"];
  if (!validSlugs.includes(slug)) {
    return notFound();
  }

  // API call can be made here based on the slug to fetch relevant data
  const hasFilters = Object.keys(resolvedSearchParams).length > 0;
  const filteredGames: Game[] = hasFilters ? await fetchGames(resolvedSearchParams, slug) : [];

  // Normalize the slug for display
  const normalizedSlug = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
          <section className="mt-3 flex flex-col gap-6 2xl:mt-0 2xl:gap-7">
            <div className="gap flex flex-col justify-between sm:flex-row sm:items-center">
              <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">
                {normalizedSlug} Games
              </h3>

              <LinkWithArrow
                href="/browsegames"
                title="Go Back To Browse Games"
                arrowDirection="left"
                className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
              />
            </div>

            {slug === "trending" ? (
              <TrendingGames />
            ) : slug === "new-releases" ? (
              <NewReleases />
            ) : (
              <TopRated />
            )}
          </section>
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
