"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NotebookPen, Eye } from "lucide-react";

interface ReviewTabSwitcherProps {
  activeTab: "editor" | "preview";
  onActiveTabChange: (tab: "editor" | "preview") => void;
}

export default function ReviewTabSwitcher({
  activeTab,
  onActiveTabChange,
}: ReviewTabSwitcherProps) {
  const tabs: ("editor" | "preview")[] = ["editor", "preview"];

  return (
    <div className="relative flex w-full justify-center gap-2 md:w-fit">
      {tabs.map((tab) => (
        <Button
          variant="outline"
          key={tab}
          onClick={() => onActiveTabChange(tab)}
          className={`dark:border-border-400 relative h-10 w-1/2 cursor-pointer rounded-full px-6 py-2 transition-colors duration-300 sm:w-auto md:h-9 ${
            activeTab === tab ? "text-white" : "text-gray-300"
          }`}
        >
          {tab === "editor" ? (
            <span className="flex items-center gap-1.5">
              <NotebookPen /> Editor
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Eye /> Preview
            </span>
          )}

          {activeTab === tab && (
            <motion.div
              layoutId="tabHighlight"
              className="bg-primary-800 absolute inset-0 z-[-1] rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Button>
      ))}
    </div>
  );
}
