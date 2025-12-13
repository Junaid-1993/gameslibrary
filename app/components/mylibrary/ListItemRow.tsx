"use client";

import { Game } from "@/app/types/Game";
import { Copy, Pin, SquarePen, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import ContentNotFound from "../ContentNotFound";
import CreateButton from "../CreateButton";
import DropdownActionMenu from "../DropdownActionMenu";
import GameCard from "../GameCard";
import GamesGrid from "../GamesGrid";
import LinkWithArrow from "../LinkWithArrow";
import ActionButton from "./ActionButton";
import CollapseButton from "./CollapseButton";
import ListContentMenu from "./ListContentMenu";

export interface ListProps {
  id: number;
  title: string;
  createdDate: string;
  fullViewUrl: string;
  games: Game[];
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function ListItemRow({
  title,
  createdDate,
  fullViewUrl,
  games,
  collapsed,
  onToggle,
}: ListProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const actionButtons = [
    { title: "Edit List", Icon: <SquarePen color="#818793" className="size-5" /> },
    { title: "Pin List", Icon: <Pin color="#818793" className="size-5" /> },
    { title: "Duplicate List", Icon: <Copy color="#818793" className="size-5" /> },
    { title: "Delete List", Icon: <Trash2 color="#EF4444" className="size-5" /> },
  ];
  return (
    <section className="border-border-400 grid gap-6 rounded-xl border px-3 py-3 sm:gap-8 sm:px-5 sm:py-4 xl:gap-10">
      <div className="grid gap-5">
        <div className="border-border-400 flex items-center justify-between border-b pb-3 sm:pb-4">
          <div className="gap-3.5 md:flex md:items-end md:gap-5 lg:pt-[0.413rem]">
            <h3 className="font-space-grotesk line-clamp-1 text-lg font-medium sm:text-xl">
              {title}
            </h3>
            <p className="text-secondary mt-1 text-sm md:mt-0">{games.length} Titles</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex lg:items-center lg:gap-2">
              {actionButtons.map((action, id) => (
                <ActionButton key={id} title={action.title}>
                  {action.Icon}
                </ActionButton>
              ))}
            </div>
            <CollapseButton
              singleChevron
              collapse={collapsed}
              onCollapse={onToggle}
              disable={isAnimating}
            />
            <div className="lg:hidden">
              <DropdownActionMenu>
                <ListContentMenu />
              </DropdownActionMenu>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <CreateButton title="Add Game to List" />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto 2xl:overflow-hidden">
        <CollapsibleContent games={games} collapsed={collapsed!} whileAnimating={setIsAnimating} />
      </div>
      <div className="border-border-400 flex items-center justify-between border-t pt-3 sm:pt-4">
        <div>
          <span className="text-secondary text-sm">Created on {createdDate}</span>
        </div>
        <div>
          <LinkWithArrow
            title="View Full List"
            href={fullViewUrl}
            // className="dark:hover:bg-accent-400 hover:text-background cursor-pointer transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.7,
      when: "beforeChildren",
      staggerChildren: 0.1,
      staggerDirection: 1, // forward
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1, // reverse order on collapse
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export function CollapsibleContent({
  games,
  collapsed,
  whileAnimating,
}: {
  games: Game[];
  collapsed: boolean;
  whileAnimating: (isAnimating: boolean) => void;
}) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {!collapsed ? (
        <motion.div
          key="expanded"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onAnimationStart={() => whileAnimating(true)}
          onAnimationComplete={() => whileAnimating(false)}
        >
          {games.length >= 1 ? (
            <GamesGrid>
              {games.slice(0, 10).map((game) => (
                <motion.div key={game.id} variants={cardVariants}>
                  <GameCard
                    game={game}
                    shouldRenderWishlistComponent={false}
                    renderedIn="List"
                    hasActionMenu
                  />
                </motion.div>
              ))}
            </GamesGrid>
          ) : (
            <ContentNotFound
              title="This list is currently empty"
              description="Start curating your personalized game collection by adding titles to this list."
              buttonTitle="Add Game to List"
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          key="collapsed"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="rounded-md sm:px-3"
          onAnimationStart={() => whileAnimating(true)}
          onAnimationComplete={() => whileAnimating(false)}
        >
          <div
            className={`flex gap-2 py-2 pb-4 sm:gap-4 2xl:gap-3.5 ${games.length === 10 && "justify-between"}`}
          >
            {games.slice(0, 10).map((game) => (
              <motion.div
                key={game.id}
                variants={cardVariants}
                className="relative h-36 w-24 flex-shrink-0 md:h-44 md:w-32"
              >
                <Image
                  src={game.imageUrl}
                  alt={`${game.title} cover`}
                  fill
                  className="rounded-md object-cover"
                  title={game.title}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
