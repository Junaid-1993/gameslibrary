"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface AddToListButtonProps {
  className?: string;
  onToggle?: (isAdded: boolean) => void;
  initialState?: boolean;
}

export default function AddToListButton({
  className,
  onToggle,
  initialState = false,
}: AddToListButtonProps) {
  const [isAdded, setIsAdded] = useState(initialState);

  const handleClick = () => {
    const newState = !isAdded;
    setIsAdded(newState);
    onToggle?.(newState);
  };

  // dark:hover:bg-zinc-800

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      aria-label="Add to list Button"
      className={cn(
        "dark:bg-border-500 relative h-auto cursor-pointer overflow-hidden transition-all duration-300 ease-in-out",
        isAdded ? "w-[115px]" : "w-[143px]",
        className
      )}
    >
      <motion.div
        className="flex items-center justify-center gap-2.5"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isAdded ? "check" : "plus"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {isAdded ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 md:size-[26px]"
              >
                <path
                  d="M21.293 14.293C21.6835 13.9025 22.3165 13.9025 22.707 14.293C23.0975 14.6835 23.0975 15.3165 22.707 15.707L18.707 19.707C18.3165 20.0976 17.6835 20.0975 17.293 19.707L15.293 17.707C14.9024 17.3165 14.9024 16.6835 15.293 16.293C15.6835 15.9025 16.3165 15.9025 16.707 16.293L18 17.5859L21.293 14.293ZM11 16C11.5523 16 12 16.5037 12 17.125C12 17.7463 11.5523 18.25 11 18.25H3C2.44772 18.25 2 17.7463 2 17.125C2 16.5037 2.44772 16 3 16H11ZM21 10C21.5523 10 22 10.5037 22 11.125C22 11.7463 21.5523 12.25 21 12.25H3C2.44772 12.25 2 11.7463 2 11.125C2 10.5037 2.44772 10 3 10H21ZM21 4C21.5523 4 22 4.50368 22 5.125C22 5.74632 21.5523 6.25 21 6.25H3C2.44772 6.25 2 5.74632 2 5.125C2 4.50368 2.44772 4 3 4H21Z"
                  fill="#22C55E"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 md:size-[26px]"
              >
                <path
                  d="M2 5.125C2 5.42337 2.12643 5.70952 2.35147 5.9205C2.57652 6.13147 2.88174 6.25 3.2 6.25H20.8C21.1183 6.25 21.4235 6.13147 21.6485 5.9205C21.8736 5.70952 22 5.42337 22 5.125C22 4.82663 21.8736 4.54048 21.6485 4.3295C21.4235 4.11853 21.1183 4 20.8 4H3.2C2.88174 4 2.57652 4.11853 2.35147 4.3295C2.12643 4.54048 2 4.82663 2 5.125ZM3.2 12.25H20.8C21.1183 12.25 21.4235 12.1315 21.6485 11.9205C21.8736 11.7095 22 11.4234 22 11.125C22 10.8266 21.8736 10.5405 21.6485 10.3295C21.4235 10.1185 21.1183 10 20.8 10H3.2C2.88174 10 2.57652 10.1185 2.35147 10.3295C2.12643 10.5405 2 10.8266 2 11.125C2 11.4234 2.12643 11.7095 2.35147 11.9205C2.57652 12.1315 2.88174 12.25 3.2 12.25ZM12.875 16C13.1734 16 13.4595 16.1185 13.6705 16.3295C13.8815 16.5405 14 16.8266 14 17.125C14 17.4234 13.8815 17.7095 13.6705 17.9205C13.4595 18.1315 13.1734 18.25 12.875 18.25H3.125C2.82663 18.25 2.54048 18.1315 2.3295 17.9205C2.11853 17.7095 2 17.4234 2 17.125C2 16.8266 2.11853 16.5405 2.3295 16.3295C2.54048 16.1185 2.82663 16 3.125 16H12.875ZM22.125 16C22.4234 16 22.7095 16.1185 22.9205 16.3295C23.1315 16.5405 23.25 16.8266 23.25 17.125C23.25 17.4234 23.1315 17.7095 22.9205 17.9205C22.7095 18.1315 22.4234 18.25 22.125 18.25H21V19.375C21 19.6734 20.8815 19.9595 20.6705 20.1705C20.4595 20.3815 20.1734 20.5 19.875 20.5C19.5766 20.5 19.2905 20.3815 19.0795 20.1705C18.8685 19.9595 18.75 19.6734 18.75 19.375V18.25H17.625C17.3266 18.25 17.0405 18.1315 16.8295 17.9205C16.6185 17.7095 16.5 17.4234 16.5 17.125C16.5 16.8266 16.6185 16.5405 16.8295 16.3295C17.0405 16.1185 17.3266 16 17.625 16H18.75V14.875C18.75 14.5766 18.8685 14.2905 19.0795 14.0795C19.2905 13.8685 19.5766 13.75 19.875 13.75C20.1734 13.75 20.4595 13.8685 20.6705 14.0795C20.8815 14.2905 21 14.5766 21 14.875V16H22.125Z"
                  fill="#FDB541"
                />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={isAdded ? "wishlisted" : "add"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-sm font-medium whitespace-nowrap"
          >
            {isAdded ? "Added" : "Add to List"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </Button>
  );
}
