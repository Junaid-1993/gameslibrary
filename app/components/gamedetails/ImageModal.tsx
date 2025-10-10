"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function ImageModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => router.back(), 300); // delay to allow exit animation
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            >
              <Dialog.Overlay className="fixed inset-0" aria-hidden="true" />
              <Dialog.Content
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                aria-label="Image viewer modal"
              >
                <VisuallyHidden>
                  <Dialog.Title className="sr-only">Image viewer Modal</Dialog.Title>
                </VisuallyHidden>
                <div
                  className="bg-surface-500 relative w-full max-w-[924px] rounded-lg shadow-lg outline-none"
                  role="dialog"
                  aria-modal="true"
                >
                  {/* Close Button */}
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeModal}
                      className="bg-surface-400 dark:hover:bg-surface-400/70 absolute -top-10 -right-0 z-50 cursor-pointer rounded-full lg:-top-8 lg:-right-8"
                      aria-label="Close modal"
                    >
                      <X className="size-5" strokeWidth="2" />
                    </Button>
                  </Dialog.Close>

                  {/* Carousel Controls */}
                  {children}
                </div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}
