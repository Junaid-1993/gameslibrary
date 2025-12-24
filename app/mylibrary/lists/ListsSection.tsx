"use client";

import ContentNotFound from "@/app/components/ContentNotFound";
import CreateButton from "@/app/components/CreateButton";
import CollapseButton from "@/app/components/mylibrary/CollapseButton";
import ListItemGrid from "@/app/components/mylibrary/ListItemGrid";
import ListItemRow, { ListProps } from "@/app/components/mylibrary/ListItemRow";
import ListsFilter from "@/app/components/mylibrary/ListsFilter";
import ViewSwitchButtons from "@/app/components/mylibrary/ViewSwitchButtons";
import SearchInput from "@/app/components/SearchInput";
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

export default function ListsSection({ lists }: { lists: ListProps[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // Track collapse state for each list by id
  const [collapsedLists, setCollapsedLists] = useState<Record<string, boolean>>({});

  // Derived global state: true if all lists are collapsed
  const allCollapsed = lists.length > 0 && lists.every((list) => collapsedLists[list.id]);

  // Toggle Global Collapse button
  const toggleGlobal = () => {
    const newState = !allCollapsed;
    const updated: Record<string, boolean> = {};
    lists.forEach((list) => {
      updated[list.id] = newState;
    });
    setCollapsedLists(updated);
  };

  //  // Toggle List's individual Collapse button
  const toggleList = (id: string) => {
    setCollapsedLists((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const hasLists = lists.length >= 1;

  return (
    <section className="grid gap-6 md:gap-8">
      <div className="flex flex-col gap-6 min-[1074px]:flex-row min-[1074px]:items-start min-[1074px]:justify-between min-[1074px]:gap-3">
        <div className="w-full md:w-96">
          <SearchInput placeholder="Search Your Lists..." />
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-4 min-[1074px]:mt-0.5 sm:grid-cols-[auto_1fr_auto] md:flex md:justify-end">
          <div className="mt-0.5 mb-0 md:mb-0 lg:mr-2">
            <CreateButton title="Create New List" className="w-full lg:w-fit" />
          </div>
          <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 md:content-end">
            <ListsFilter />
          </div>
          <div className="col-start-2 row-start-1 content-center sm:col-start-3 sm:content-start">
            <div className="flex items-center gap-2">
              <ViewSwitchButtons
                viewMode={viewMode}
                onViewModeChange={(mode) => setViewMode(mode)}
              />
              <CollapseButton
                collapse={allCollapsed}
                onCollapse={toggleGlobal}
                disable={viewMode === "grid"}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div layout="position">
        {hasLists && (
          <div className="mb-4">
            <p className="text-secondary">Total numbers of Lists: {lists.length}</p>
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
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-3 xl:grid-cols-4 2xl:gap-5"
              >
                {lists.map((list) => (
                  <motion.div key={list.id} variants={gridItemVariants}>
                    <ListItemGrid {...list} />
                  </motion.div>
                ))}
              </motion.section>
            ) : (
              <motion.section
                key="list"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-8 md:gap-10 xl:gap-12"
              >
                {lists.map((list) => (
                  <motion.div key={list.id} variants={listItemVariants}>
                    <ListItemRow
                      {...list}
                      collapsed={collapsedLists[String(list.id)] ?? false}
                      onToggle={() => toggleList(String(list.id))}
                    />
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        ) : (
          <ContentNotFound
            title="No Lists Found"
            description="You haven't created any lists yet. Start building your library by organizing your favorite games."
            buttonTitle="Create Your First List"
            className="mt-6"
          />
        )}
      </motion.div>
    </section>
  );
}
