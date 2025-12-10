"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronsDown, ChevronsUp, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function CollapseButton({
  className,
  collapse,
  onCollapse,
  singleChevron = false,
  disable = false,
}: {
  className?: string;
  singleChevron?: boolean;
  collapse?: boolean;
  onCollapse?: () => void;
  disable?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-border-300 flex h-10 w-fit items-center rounded-[10px] border md:h-11",
        { "lg:h-10.5": singleChevron },
        className
      )}
    >
      <Button
        variant="ghost"
        title={
          singleChevron
            ? collapse
              ? "Expand List"
              : "Collapse List"
            : collapse
              ? "Expand All Lists"
              : "Collapse All Lists"
        }
        className={"h-full cursor-pointer px-3"}
        onClick={onCollapse}
        disabled={disable}
      >
        <AnimatePresence mode="wait" initial={false}>
          {collapse ? (
            <motion.span
              key="chevrons-down"
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: 90 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {singleChevron ? (
                <ChevronDown color="#fff" className="size-5" />
              ) : (
                <ChevronsDown color="#818793" className="size-5 md:size-6" />
              )}
            </motion.span>
          ) : (
            <motion.span
              key="chevrons-up"
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: -90 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {singleChevron ? (
                <ChevronUp color="#fff" className="size-5" />
              ) : (
                <ChevronsUp color="#818793" className="size-5 md:size-6" />
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
