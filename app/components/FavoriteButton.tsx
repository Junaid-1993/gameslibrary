"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

const FavoriteButton = ({ className, favorite }: { className?: string; favorite: boolean }) => {
  const [active, setActive] = useState(favorite);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={cn(
        "dark:bg-surface-500 dark:border-border-400 h-auto shrink-1 cursor-pointer gap-3 rounded-lg border text-white",
        className
      )}
      aria-label="Favorite Button"
    >
      <motion.svg
        width={25}
        height={24}
        className="size-[26px]"
        viewBox="0 0 25 24"
        xmlns="http://www.w3.org/2000/svg"
        initial={false}
        animate={{
          scale: active ? [1, 1.21, 1] : [1, 0.9, 1],
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-label="Add to favorites"
      >
        <motion.path
          d="M8.27068 1.99988C6.97785 1.98612 5.7107 2.36108 4.63355 3.07616C3.55639 3.79123 2.71891 4.81343 2.22971 6.01021C1.7405 7.20698 1.62213 8.52313 1.88994 9.78799C2.15775 11.0529 2.7994 12.2081 3.73168 13.1039L4.37068 13.7489L5.23368 14.6059L5.23668 14.6089L12.0867 21.4589C12.2742 21.646 12.5283 21.7512 12.7932 21.7512C13.0581 21.7512 13.3122 21.646 13.4997 21.4589L20.3497 14.6089L20.3517 14.6069L21.2097 13.7549L21.8597 13.0979L21.8617 13.0959C23.0388 11.885 23.6943 10.2609 23.6874 8.57223C23.6805 6.88352 23.0118 5.26482 21.8249 4.06361C20.6379 2.86239 19.0273 2.17441 17.3388 2.14735C15.6503 2.12029 14.0185 2.75631 12.7937 3.91888C11.5985 2.70779 9.97213 2.01804 8.27068 1.99988Z"
          initial={{ stroke: "#fff", fill: "transparent" }}
          animate={{
            stroke: active ? "transparent" : "#fff",
            fill: active ? "url(#heartGradient)" : "transparent",
          }}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        <defs>
          <linearGradient
            id="heartGradient"
            x1="12.7187"
            y1="1.99951"
            x2="12.7187"
            y2="21.7512"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F26969" />
            <stop offset="1" stopColor="#832525" />
          </linearGradient>
        </defs>
      </motion.svg>
      <span>Favorite</span>
    </Button>
  );
};

export default FavoriteButton;
