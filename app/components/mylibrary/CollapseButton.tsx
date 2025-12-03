"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsDown, ChevronsUp, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function CollapseButton({ singleChevron = false }: { singleChevron?: boolean }) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="border-border-300 flex h-10 w-fit items-center rounded-[10px] border md:h-11">
      <Button
        variant="ghost"
        title={singleChevron ? "Collapse List" : "Collapse All Lists"}
        className={"h-full cursor-pointer px-3"}
        onClick={() => setCollapse((val) => !val)}
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
                <ChevronDown color="#fff" className="size-6" />
              ) : (
                <ChevronsDown color="#818793" className="size-6" />
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
                <ChevronUp color="#fff" className="size-6" />
              ) : (
                <ChevronsUp color="#818793" className="size-6" />
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
