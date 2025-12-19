"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BookmarkButtonProps {
  className?: string;
  onBookmark?: (isBookmarked: boolean) => void;
  initialState: boolean;
  backgroundSize?: string;
  iconSize?: string;
}

export default function BookmarkButton({
  className,
  onBookmark,
  backgroundSize,
  iconSize,
  initialState = false,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialState);

  const handleClick = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    onBookmark?.(newBookmarkedState);
  };

  const plusPath = "M12 5 L12 5 L12 19 L12 19 M5 12 L5 12 L19 12 L19 12";
  const checkPath = "M5 12 L5 12 L9 16 L9 16 M9 16 L9 16 L19 8 L19 8";

  return (
    <div
      className={cn(
        "absolute top-0 left-0 h-11 w-9 rounded-tl-lg bg-black/40 md:h-12 md:w-10 xl:h-14 xl:w-12",
        backgroundSize
      )}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
    >
      <Button
        onClick={handleClick}
        title={isBookmarked ? "Remove from Wishlist" : "Add to Wishlist"}
        variant="ghost"
        className={cn(
          "size-full cursor-pointer rounded-none rounded-tl-lg pt-1 transition-all duration-300 ease-in-out focus-visible:border-2 focus-visible:border-white has-[>svg]:px-0",
          { "bg-success-800 dark:hover:bg-success-800/70": isBookmarked },
          className
        )}
        aria-label={isBookmarked ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <svg
          className={cn("size-6 xl:size-7", iconSize)}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isBookmarked ? checkPath : plusPath}
            className="transition-all duration-300 ease-in-out"
            style={{
              transitionProperty: "d",
            }}
          />
        </svg>
      </Button>
    </div>
  );
}
