"use client";

import { ListProps } from "@/app/components/mylibrary/ListItemRow";
import Lists from "@/app/data/lists.json";
import { useListActions } from "@/app/hooks/useListActions";
import { listActionUI } from "@actions/ListActionsUI";
import { getListActionLogic } from "@actions/listActionLogic";
import {
  containerVariants,
  gridItemVariants,
  listItemVariants,
} from "@/app/(main)/mylibrary/lists/ListsSection";
import { cn } from "@/lib/utils";
import {
  ArrowRightLeft,
  Copy,
  Delete,
  GripVertical,
  Layers,
  RotateCcw,
  Save,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import CreateButton from "../CreateButton";
import DropdownActionMenu from "../DropdownActionMenu";
import GameCard from "../GameCard";
import GamesGrid from "../GamesGrid";
import LinkWithArrow from "../LinkWithArrow";
import SearchInput from "../SearchInput";
import ActionButton from "./ActionButton";
import FullWidthGameCard from "./FullWidthGameCard";
import ListContextMenu from "./ListContentMenu";
import ListsFilter from "./ListsFilter";
import PinButton from "./PinButton";
import ViewSwitchButtons from "./ViewSwitchButtons";
import ContentNotFound from "../ContentNotFound";

export default function FullListView({ id }: { id: string }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [action, setAction] = useState<"bulk" | "arrange" | null>(null);

  // Later we will fetch list form database.
  const matchTitle = id.split("-").join(" ").toLowerCase();
  const list: ListProps = Lists.filter((list) => list.title.toLowerCase() === matchTitle)[0];
  const hasGames = list.games.length >= 1;

  const { pinned, handleEdit, handlePin, handleDuplicate, handleDelete, handleShare } =
    useListActions(list.id);

  const listActionHandlers = getListActionLogic({
    onEdit: handleEdit,
    onDuplicate: handleDuplicate,
    onDelete: handleDelete,
    onShare: handleShare,
  });

  return (
    <AnimateChangeInHeight className="border-border-400 rounded-xl border">
      <section className="grid gap-6 px-3 py-3 sm:gap-8 sm:px-5 sm:py-4 xl:gap-10">
        <div className="grid gap-5">
          <div className="border-border-400 flex items-center justify-between border-b pb-3 sm:pb-4">
            <div className="gap-3.5 md:flex md:items-end md:gap-5 lg:pt-[0.413rem]">
              <h3 className="font-space-grotesk line-clamp-1 text-lg font-medium sm:text-xl">
                {list.title}
              </h3>
              <p className="text-secondary mt-1 text-sm md:mt-0">{list.games.length} Titles</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex lg:items-center lg:gap-2">
                {listActionUI.map((ui) => {
                  const action = listActionHandlers.find((action) => action.key === ui.key);
                  return ui.key === "pin" ? (
                    <PinButton key={ui.key} pinned={pinned} setPinned={handlePin} />
                  ) : ui.key === "duplicate" ? null : (
                    <ActionButton key={ui.key} onClick={action?.handler} title={ui.title || ""}>
                      {ui.Icon}
                    </ActionButton>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <ViewSwitchButtons
                  viewMode={viewMode}
                  onViewModeChange={(mode) => setViewMode(mode)}
                />
                <div className="lg:hidden">
                  <DropdownActionMenu className="h-10 md:h-11">
                    <ListContextMenu
                      pinned={pinned}
                      renderShare
                      setPinned={handlePin}
                      onEdit={handleEdit}
                      onShare={handleShare}
                      onDelete={handleDelete}
                    />
                  </DropdownActionMenu>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>{list.description}</p>
          </div>
        </div>

        <div className="grid">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between xl:gap-3">
            <div className="w-full md:w-96">
              <SearchInput placeholder="Search Your List..." />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="mt-0.5 mb-0 md:mb-0">
                <CreateButton title="Add Game to List" className="w-full sm:w-fit" />
              </div>
              <div className="sm:grow">
                <ListsFilter
                  classes={{
                    selectButtonContainerClass: "sm:flex-row md:w-fit",
                    selectButtonClass: "md:w-[230px] lg:w-[250px]",
                  }}
                  filter={{
                    id: "filter",
                    placeholder: "Filter by:",
                    options: ["Top Picks", "Favorites", "Wishlist", "Top Rated"],
                  }}
                />
              </div>
            </div>
          </div>
          <motion.div layout id="buttons" className="mt-5 flex items-center justify-end gap-2.5">
            <ActionButton
              title="Bulk Actions"
              variant="default"
              active={action === "bulk"}
              onClick={() => setAction(action === "bulk" ? null : "bulk")}
            >
              <Layers />
            </ActionButton>
            <ActionButton
              title="Arrange Games"
              variant="default"
              active={action === "arrange"}
              onClick={() => setAction(action === "arrange" ? null : "arrange")}
            >
              <GripVertical />
            </ActionButton>
          </motion.div>

          {/* Show Bulk and Arrange action buttons */}
          <AnimatePresence mode="popLayout">
            {(action === "bulk" || action === "arrange") && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-4 mb-2.5 flex flex-col items-start justify-between gap-y-4 sm:flex-row">
                  <AnimatePresence mode="wait">
                    {action === "bulk" ? (
                      <motion.div
                        key="bulk-actions"
                        className="flex flex-wrap items-center gap-2 gap-y-3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="mr-2">Selected: 0</span>
                        <ActionButton title="Move to Another List" variant="default" size="default">
                          <ArrowRightLeft />
                        </ActionButton>
                        <ActionButton title="Copy to Another List" variant="default" size="default">
                          <Copy />
                        </ActionButton>
                        <ActionButton title="Remove from List" variant="default" size="default">
                          <Delete />
                        </ActionButton>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrange-actions"
                        className="flex flex-wrap items-center gap-2 gap-y-3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ActionButton title="Save Order" variant="default" size="default">
                          <Save />
                        </ActionButton>
                        <ActionButton title="Reset Order" variant="default" size="default">
                          <RotateCcw />
                        </ActionButton>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="self-end">
                    <ActionButton
                      title="Cancel"
                      variant="default"
                      size="default"
                      onClick={() => setAction(null)}
                    >
                      <X />
                    </ActionButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasGames ? (
          <motion.div layout>
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
                    {list.games.map((game) => (
                      <motion.div key={game.id} variants={gridItemVariants}>
                        <GameCard
                          game={game}
                          renderedIn="List"
                          hasActionMenu
                          fullListAction={action ? action : undefined}
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
                  {list.games.map((game) => (
                    <motion.div key={game.id} variants={listItemVariants}>
                      <FullWidthGameCard
                        game={game}
                        renderedIn="List"
                        hasActionMenu
                        fullListAction={action ? action : undefined}
                      />
                    </motion.div>
                  ))}
                </motion.section>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div layout>
            <ContentNotFound
              title="This list is currently empty"
              description="Start curating your personalized game collection by adding titles to this list."
              buttonTitle="Add Game to List"
              className="my-4"
            />
          </motion.div>
        )}

        <motion.div
          className="border-border-400 flex items-center justify-between border-t pt-3 sm:pt-4"
          layout
        >
          <div>
            <span className="text-secondary text-sm">Created on {list.createdDate}</span>
          </div>
          <div>
            <LinkWithArrow
              title="Back to All Lists"
              href="/mylibrary/lists"
              arrowDirection="left"
              // className="dark:hover:bg-accent-400 hover:text-background cursor-pointer transition duration-300 ease-in-out"
            />
          </div>
        </motion.div>
      </section>
    </AnimateChangeInHeight>
  );
}

export function AnimateChangeInHeight(
  props: React.ComponentPropsWithRef<typeof motion.div> & { children: React.ReactNode }
) {
  const [height, setHeight] = useState<number | "auto">("auto");

  return (
    <motion.div
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.3 }}
      {...props}
      className={cn(props.className, "overflow-hidden")}
    >
      <div
        ref={(ref) => {
          const resizeObserver = new ResizeObserver(([entry]) => {
            const observedHeight = entry.contentRect.height;
            setHeight(observedHeight);
          });

          if (ref) {
            resizeObserver.observe(ref);
          }

          return () => {
            resizeObserver.disconnect();
          };
        }}
      >
        {props.children}
      </div>
    </motion.div>
  );
}
