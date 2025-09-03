"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Game } from "@/app/types/Game";
import SearchGameCard from "./SearchGameCard";
import SearchGameCardSkeleton from "./Skeletons/SearchGameCardSkeleton";
import ServerBoundary from "./ServerBoundary";

interface SearchWithResultsProps {
  isLoading: boolean;
  results: Game[];
  showModal: boolean;
  focusedIndex: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClose: (suppress: boolean) => void;
}

export default function SearchWithResults({
  isLoading,
  results,
  showModal,
  focusedIndex,
  containerRef,
  onClose,
}: SearchWithResultsProps) {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the container
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef, onClose]);

  // Scroll to focused item
  useEffect(() => {
    if (focusedIndex !== -1 && itemRefs.current[focusedIndex]) {
      const modalContainer = modalContainerRef.current; // scrollable container
      const item = itemRefs.current[focusedIndex];

      if (modalContainer && item) {
        const modalContainerRect = modalContainer.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // Check if the item is above or below the visible area
        const isAbove = itemRect.top < modalContainerRect.top;
        const isBelow = itemRect.bottom > modalContainerRect.bottom;

        if (isAbove || isBelow) {
          item.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          });
        }
      }
    }
  }, [focusedIndex]);

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {showModal && (
          <motion.div
            ref={modalContainerRef}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="border-border-400 dark:bg-surface-500 absolute right-0 left-0 z-50 mt-2 overflow-y-auto rounded-md border shadow-md"
            id="search-results"
            role="listbox"
          >
            <div className="mm:max-h-[568px] scrollbar-w-1 scrollbar scrollbar-thumb-gray-500 scrollbar-track-slate-700 max-h-[332px] space-y-3 overflow-y-auto scroll-smooth p-3 xl:max-h-[440px]">
              {isLoading ? (
                <>
                  <ServerBoundary>
                    <SearchGameCardSkeleton />
                  </ServerBoundary>
                </>
              ) : results.length > 0 ? (
                results.map((game, index) => (
                  <ServerBoundary key={game.id}>
                    <SearchGameCard
                      key={game.id}
                      game={game}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      role="option"
                      aria-selected={focusedIndex === index}
                      tabIndex={0}
                      className={`${focusedIndex === index ? "dark:bg-[#28292A]/30" : ""}`}
                    />
                  </ServerBoundary>
                ))
              ) : (
                <div className="text-muted-foreground flex flex-col items-center gap-3 p-5">
                  <p>We couldn&#39;t find that game.</p>
                  <p className="text-center text-sm">
                    Try checking the spelling or search with a different title.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
