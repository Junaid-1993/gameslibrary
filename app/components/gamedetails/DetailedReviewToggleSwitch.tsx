"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import React from "react";

interface DetailedReviewToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export default function DetailedReviewToggleSwitch({
  checked,
  onCheckedChange,
}: DetailedReviewToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        layout
        initial={false}
        animate={{
          backgroundColor: checked ? "#4c9aff" : "#707076",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative h-6 w-12 rounded-full"
      >
        <SwitchPrimitive.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="absolute inset-0 h-full w-full cursor-pointer rounded-full border-none"
          role="switch"
          aria-checked={checked}
          aria-label="Long review enabled switch" // describe what the switch does
        >
          <motion.div
            layout
            initial={false}
            animate={{
              x: checked ? 24 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-0 left-0 h-6 w-6"
          >
            <SwitchPrimitive.Thumb className="block h-6 w-6 rounded-full bg-white shadow-md" />
          </motion.div>
        </SwitchPrimitive.Root>
      </motion.div>
      {/* Hidden text for screen readers (optional) */}
      <span className="sr-only">{checked ? "Long Review Enabled" : "Short Review Only"}</span>
    </div>
  );
}
