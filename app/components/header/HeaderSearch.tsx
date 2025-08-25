"use client";

import { useSearchStore } from "@/app/stores/useSearchStore";
import SearchInput from "../SearchInput";
import SearchResultModal from "../SearchResultModal";
import { useRef, useEffect } from "react";
import mockGames from "@/app/data/mockGames.json"; // Assuming you have a mock data file
import { useRouter } from "next/navigation";
import { useDelayedUnmount } from "@/app/hooks/useDelayedUnmount";
import ServerBoundary from "../ServerBoundary";

export default function HeaderSearch({ isMobile }: { isMobile?: boolean }) {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  const results = useSearchStore((state) => state.results);
  const setResults = useSearchStore((state) => state.setResults);

  const showModal = useSearchStore((state) => state.showModal);
  const setShowModal = useSearchStore((state) => state.setShowModal);

  const focusedIndex = useSearchStore((state) => state.focusedIndex);
  const setFocusedIndex = useSearchStore((state) => state.setFocusedIndex);

  const isLoading = useSearchStore((state) => state.isLoading);
  const setIsLoading = useSearchStore((state) => state.setIsLoading);

  const inputRef = useRef<HTMLInputElement>(null);
  const didInteract = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const shouldRenderResults = useDelayedUnmount(showModal, 200); // ⬅ delay matches the animation duration

  useEffect(() => {
    // Skip on mount
    if (!didInteract.current) {
      // Check if user has typed something
      if (query.length >= 1) {
        didInteract.current = true;
      } else {
        return;
      }
    }

    if (query.length < 2) {
      setResults([]);
      setShowModal(false);
      return;
    }

    setShowModal(true);
    setIsLoading(true);

    // Simulate API call
    const timeout = setTimeout(() => {
      const filteredGames = mockGames.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredGames);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [query, setResults, setIsLoading, setShowModal]); // Because we are using these functions from the store, we should include them in the dependency array.

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showModal || isLoading || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((useSearchStore.getState().focusedIndex + 1) % results.length); // 'focusIndex' cycles through results it will not go out of bounds.
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex(
        (useSearchStore.getState().focusedIndex - 1 + results.length) % results.length
      );
    } else if (e.key === "Enter" && focusedIndex !== -1) {
      e.preventDefault();

      setShowModal(false);
      setFocusedIndex(-1);

      alert("Navigating to " + results[focusedIndex].link);

      router.push(results[focusedIndex].link);
    } else if (e.key === "Escape") {
      setShowModal(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <ServerBoundary>
        <SearchInput
          value={query}
          inputRef={inputRef}
          onChange={(e) => {
            setQuery(e.target.value);
            setFocusedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onClick={() => {
            if (query.length >= 2) setShowModal(true);
          }}
          onClear={() => {
            setQuery("");
            setFocusedIndex(-1);
            setShowModal(false);
            inputRef.current?.focus();
          }}
          isMobile={isMobile}
          aria-haspopup="listbox"
          aria-expanded={showModal}
          aria-controls="search-results"
        />
      </ServerBoundary>

      {shouldRenderResults && (
        <SearchResultModal
          focusedIndex={focusedIndex}
          isLoading={isLoading}
          results={results}
          showModal={showModal}
          containerRef={containerRef}
          onClose={() => {
            setShowModal(false);
            setFocusedIndex(-1);
          }}
        />
      )}
    </div>
  );
}
