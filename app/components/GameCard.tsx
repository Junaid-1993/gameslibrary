"use client";

import { Button } from "@/components/ui/button";
import { GripVertical, Square, SquareCheck, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Game } from "../types/Game";
import AddToListButton from "./AddToListButton";
import BookmarkButton from "./BookmarkButton";
import DropdownActionMenu from "./DropdownActionMenu";
import FavoriteButton from "./FavoriteButton";
import LinkWithArrow from "./LinkWithArrow";
import Metascore from "./Metascore";
import ListGameCardContentMenu from "./mylibrary/ListGameCardContextMenu";
import PlatformIcon from "./PlatformIcon";
import StarRating from "./StarRating";
import TopPickBadge from "./TopPickBadge";
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface GameCardProps {
  game: Game;
  renderedIn?: "List" | "Wishlist" | "Favorites";
  shouldRenderWishlistComponent?: boolean;
  hasActionMenu?: boolean;
  fullListAction?: "bulk" | "arrange";
  upcoming?: boolean;
}

export default function GameCard({
  game,
  renderedIn,
  fullListAction,
  shouldRenderWishlistComponent = true,
  hasActionMenu = false,
  upcoming = false,
}: GameCardProps) {
  const [selected, setSelected] = useState(false);
  return (
    <article className="bg-surface-500 flex max-w-80 flex-col gap-3 rounded-lg p-2 transition-[background-color] duration-300 ease-in-out hover:bg-[#28292A]/80 md:gap-5 md:p-3 xl:gap-4 xl:py-3.5">
      <div className="relative">
        {shouldRenderWishlistComponent && <BookmarkButton initialState={game.bookmarked} />}

        {hasActionMenu && (
          <div className="absolute top-1 right-1 md:top-2 md:right-2">
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
        )}

        <Image
          src={game.imageUrl}
          alt={`${game.title} game cover`}
          width={280}
          height={380}
          className="aspect-2/3 w-full rounded-lg object-cover"
        />

        {upcoming ? (
          <div className="absolute top-2 left-1 flex items-center justify-center rounded-full bg-[#6A4407] px-3 py-1 sm:left-2">
            <span className="text-[12px] md:text-sm">Upcoming</span>
          </div>
        ) : (
          game.topPick && (
            <TopPickBadge
              classes={{
                container: `absolute ${shouldRenderWishlistComponent ? "bottom-3 left-2" : "top-2 left-1 sm:left-2"} `,
                icon: "md:size-6 xl:size-[26px]",
              }}
              fullBadge
            />
          )
        )}
      </div>
      <div className="flex flex-col gap-3 md:gap-4 xl:gap-5">
        <div>
          <h1 className="font-space-grotesk line-clamp-1 font-medium md:text-lg">{game.title}</h1>
          {upcoming && <span className="text-xs">Release Date: {game.releaseDate}</span>}
        </div>

        <div className="flex flex-col gap-3 md:gap-3.5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-1">
            {game.platforms.map((platform) => (
              <PlatformIcon key={platform.name} platform={platform} />
            ))}
          </div>
          <LinkWithArrow
            href="#"
            title="View Details"
            className="dark:hover:bg-accent-400 hover:text-background cursor-pointer transition duration-300 ease-in-out"
          />
        </div>

        <div className="flex flex-col gap-1 xl:flex-row xl:items-center xl:justify-between">
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

      <div className={`flex ${renderedIn ? "flex-row" : "flex-col"} gap-2 xl:flex-row`}>
        <AddToListButton
          title={renderedIn ? renderedIn : undefined}
          initialState={game.added}
          className={`w-full ${renderedIn ? "order-2 w-1/2 md:w-fit md:grow-1" : "xl:w-[54%]"} xl:has-[>svg]:px-2.5`}
          disableAnimation={renderedIn && true}
        />

        <FavoriteButton
          titleText={
            renderedIn ? { mark: "Mark as Favorite", unMark: "Remove from Favorites" } : undefined
          }
          iconOnly={renderedIn && false}
          initialState={game.favorite}
          className={`${renderedIn ? "order-1 w-1/2 md:w-fit" : "w-full xl:w-[46%]"} xl:has-[>svg]:px-2.5 ${renderedIn === "Favorites" && "pointer-events-none"}`}
        />
      </div>
    </article>
  );
}
