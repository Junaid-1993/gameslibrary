"use client";

import ContentNotFound from "@/app/components/ContentNotFound";
import GameCard from "@/app/components/GameCard";
import GamesGrid from "@/app/components/GamesGrid";
import FullWidthGameCard from "@/app/components/mylibrary/FullWidthGameCard";
import ListsFilter from "@/app/components/mylibrary/ListsFilter";
import ViewSwitchButtons from "@/app/components/mylibrary/ViewSwitchButtons";
import {
  containerVariants,
  gridItemVariants,
  listItemVariants,
} from "@/app/(main)/mylibrary/lists/ListsSection";
import { Game } from "@/app/types/Game";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

interface ProfileStatPageSectionProps {
  statTitleCount: number;
  statTitles: Game[] | [];
  notFoundTitle: string;
  notFoundDescription: string;
  filter?: { id: string; placeholder: string; options: string[] };
}

export default function ProfileStatPageSection({
  statTitleCount,
  statTitles,
  notFoundTitle,
  notFoundDescription,
  filter,
}: ProfileStatPageSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const hasTitles = statTitles.length >= 1;

  return (
    <section className="grid gap-6 md:gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="pt-2 md:pt-2.5 xl:pt-3.5">
          <span className="text-secondary font-medium">{statTitleCount} Titles</span>
        </div>
        <div
          className={cn("flex flex-col items-end gap-2 sm:flex-row sm:items-start md:mt-0.5", {
            "flex-row items-start": filter === undefined,
          })}
        >
          <div className="w-full">
            <ListsFilter
              classes={{
                selectButtonClass: filter ? "sm:w-[180px]" : "sm:w-[250px]",
                selectButtonContainerClass: "sm:flex-row",
              }}
              filter={filter && filter}
            />
          </div>
          <motion.div layout="position" className="mt-[1px] md:mt-0">
            <div className="flex items-center gap-2">
              <ViewSwitchButtons
                viewMode={viewMode}
                onViewModeChange={(mode) => setViewMode(mode)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div layout="position">
        {hasTitles ? (
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
                  {statTitles.map((game) => (
                    <motion.div key={game.id} variants={gridItemVariants}>
                      <GameCard game={game} />
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
                {statTitles.map((game) => (
                  <motion.div key={game.id} variants={listItemVariants}>
                    <FullWidthGameCard game={game} renderedIn="Profile" />
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center">
            <ContentNotFound
              title={notFoundTitle}
              description={notFoundDescription}
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
