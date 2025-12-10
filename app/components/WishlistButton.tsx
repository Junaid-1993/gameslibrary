"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { useState } from "react";

interface WishlistButtonProps {
  className?: string;
  onToggle?: (isWishlisted: boolean) => void;
  initialState?: boolean;
  transparent?: boolean;
}

export default function WishlistButton({
  className,
  onToggle,
  initialState = false,
  transparent = false,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialState);

  const handleClick = () => {
    const newState = !isWishlisted;
    setIsWishlisted(newState);
    onToggle?.(newState);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      aria-label="Wishlist Button"
      className={cn(
        "dark:bg-surface-500 relative h-auto cursor-pointer overflow-hidden transition-all duration-300 ease-in-out dark:hover:bg-zinc-800",
        isWishlisted ? "w-32" : "w-40",
        transparent && "dark:bg-border-500 dark:hover:bg-input/50",
        className
      )}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isWishlisted ? "check" : "plus"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {isWishlisted ? (
              <BookmarkCheck className="size-6 md:size-[26px]" color="#22C55E" />
            ) : (
              <BookmarkPlus className="size-6 md:size-[26px]" color="#FDB541" />
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isWishlisted ? "wishlisted" : "add"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-sm font-medium whitespace-nowrap"
          >
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </Button>
  );
}
