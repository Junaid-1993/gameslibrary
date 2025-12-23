"use client";

import LinkWithArrow from "@/app//components/LinkWithArrow";
import Metascore from "@/app//components/Metascore";
import PlatformIcon from "@/app//components/PlatformIcon";
import AddToListButton from "@/app/components/AddToListButton";
import BookmarkButton from "@/app/components/BookmarkButton";
import DropdownActionMenu from "@/app/components/DropdownActionMenu";
import FavoriteButton from "@/app/components/FavoriteButton";
import ListGameCardContentMenu from "@/app/components/mylibrary/ListGameCardContextMenu";
import StarRating from "@/app/components/StarRating";
import TopPickBadge from "@/app/components/TopPickBadge";
import { Button } from "@/components/ui/button";
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GripVertical, Plus, Square, SquareCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { GameCardProps } from "../GameCard";

export default function FullWidthGameCard({
  game,
  renderedIn,
  fullListAction,
  shouldRenderWishlistComponent = true,
  upcoming = false,
}: GameCardProps) {
  const [selected, setSelected] = useState(false);
  return (
    <article className="bg-surface-500 flex gap-3 rounded-lg p-2 transition-[background-color] duration-300 ease-in-out hover:bg-[#28292A]/80 sm:p-4 sm:pl-3 md:gap-5 xl:gap-4">
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-y-2.5 md:grow">
          <div className="relative shrink-0 sm:row-span-2">
            {shouldRenderWishlistComponent && (
              <BookmarkButton
                initialState={game.bookmarked}
                backgroundSize="xl:h-12 xl:w-10"
                iconSize="xl:size-6.5"
              />
            )}

            <Image
              src={game.imageUrl}
              alt={`${game.title} game cover`}
              width={180}
              height={280}
              className={cn("aspect-2/3 w-24 rounded-lg object-cover sm:w-32 md:w-36", {
                "w-28 sm:!w-40": upcoming,
              })}
            />
          </div>
          <div className="flex w-full flex-col gap-2 p-3 pt-0 pr-0 sm:gap-3 sm:pt-2 sm:pr-3 sm:pl-4 lg:pt-3 lg:pl-5">
            <div>
              <h1 className="font-space-grotesk line-clamp-1 font-medium md:text-lg lg:text-xl">
                {game.title}
              </h1>
              {upcoming && <span className="text-xs">Release Date: {game.releaseDate}</span>}
            </div>
            <div className="flex items-center justify-between gap-1 sm:w-80 sm:gap-10">
              <div className="flex max-w-[96px] gap-1 overflow-hidden sm:max-w-max">
                {game.platforms.map((platform) => (
                  <PlatformIcon
                    key={platform.name}
                    platform={platform}
                    className="md:size-[18px]"
                  />
                ))}
              </div>

              {upcoming ? (
                <div className="flex items-center justify-center rounded-full bg-[#6A4407] px-3 py-1">
                  <span className="text-[12px] md:text-sm">Upcoming</span>
                </div>
              ) : (
                game.topPick && (
                  <TopPickBadge
                    classes={{
                      container: "w-fit",
                      icon: "md:size-6 xl:size-[26px]",
                    }}
                    fullBadge
                  />
                )
              )}
            </div>
            <div className="flex flex-col items-start justify-between gap-1 sm:w-80 sm:flex-row sm:gap-10">
              <div className="flex items-center justify-between gap-2 xl:gap-1">
                <span className="text-sm font-medium">My Score</span>
                <StarRating userScore={game.myscore} />
              </div>

              <div className="flex items-center justify-between gap-2 xl:gap-1.5">
                <span className="text-sm font-medium">Metacritic</span>
                {game?.metascore ? <Metascore score={game.metascore} /> : "N/A"}
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-auto flex items-center justify-between sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:p-4 sm:pt-0 lg:pt-3 lg:pl-5">
            <div>
              <div className={`flex items-center gap-2`}>
                <FavoriteButton
                  titleText={
                    renderedIn
                      ? { mark: "Mark as Favorite", unMark: "Remove from Favorites" }
                      : undefined
                  }
                  iconOnly={renderedIn && false}
                  initialState={game.favorite}
                  className="dark:border-border-300 w-fit xl:has-[>svg]:px-2.5"
                />
                <AddToListButton
                  title={renderedIn ? renderedIn : undefined}
                  initialState={game.added}
                  className="dark:border-border-300 w-fit xl:has-[>svg]:px-2.5"
                  disableAnimation={renderedIn && true}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-3 md:gap-3.5 xl:flex-row xl:items-center xl:justify-between">
                <LinkWithArrow
                  href="#"
                  title="View Details"
                  className="dark:hover:bg-accent-400 hover:text-background cursor-pointer transition duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-border-400 mt-3 mb-2 flex min-w-[65px] items-center justify-center border-t pt-3 pr-1 pl-5 md:border-t-0 md:border-l">
          <AnimatePresence mode="wait" initial={false}>
            {fullListAction === "bulk" ? (
              <motion.div
                key="bulk"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <Button
                  className="dark:bg-border-500 dark:hover:bg-border-500/90 h-9 w-9 cursor-pointer rounded-lg shadow-2xl has-[>svg]:p-1 md:h-auto md:w-auto"
                  onClick={() => setSelected(!selected)}
                >
                  {selected ? (
                    <SquareCheck color="#fff" className="size-7 md:size-8" />
                  ) : (
                    <Square color="#fff" className="size-7 md:size-8" />
                  )}
                </Button>
              </motion.div>
            ) : fullListAction === "arrange" ? (
              <motion.div
                key="arrange"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <Button className="dark:bg-border-500 dark:hover:bg-border-500/90 h-auto w-auto cursor-grab rounded-lg shadow-2xl has-[>svg]:px-0.75 has-[>svg]:py-1.5">
                  <GripVertical color="#fff" className="size-6.5 md:size-7.5" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <DropdownActionMenu className="dark:bg-border-500 dark:hover:bg-border-500/90 h-9 w-9 rounded-full shadow-2xl md:h-10 md:w-10">
                  {renderedIn === "Wishlist" || renderedIn === "Favorites" ? (
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Plus color="#fff" className="size-5" />
                        Add to List
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  ) : (
                    <ListGameCardContentMenu />
                  )}
                </DropdownActionMenu>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
