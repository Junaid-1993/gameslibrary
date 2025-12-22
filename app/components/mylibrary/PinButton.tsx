import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Pin } from "lucide-react";

export default function PinButton({
  pinned,
  setPinned,
}: {
  pinned: boolean;
  setPinned: () => void;
}) {
  // Fixed widths (px) for the two labels
  // Tune these to your font/size. Example uses Tailwind's text-sm and default font:
  const PIN_WIDTH = 62; // "Pin List"
  const UNPIN_WIDTH = 84; // "Unpin List"

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={setPinned}
      className={cn(
        "dark:border-border-300 cursor-pointer px-4 transition-all duration-300 ease-in-out",
        pinned ? "w-[128.98px]" : "w-[110.61px]"
      )}
    >
      {/* Icon color animation */}
      <motion.div
        animate={{ color: pinned ? "#EF4444" : "#818793" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Pin className="size-5" />
      </motion.div>

      {/* Label with fixed width animation */}
      <motion.div
        // Animate between explicit pixel widths
        animate={{ width: pinned ? UNPIN_WIDTH : PIN_WIDTH }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="inline-block overflow-hidden"
        style={{ width: pinned ? UNPIN_WIDTH : PIN_WIDTH }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={pinned ? "unpin" : "pin"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.22 }}
            className="block text-sm"
          >
            {pinned ? "Unpin List" : "Pin List"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </Button>
  );
}
