"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthButtons from "./AuthButtons";
import Hamburger from "./Hamburger";
import HeaderNavLinks from "./HeaderNavLinks";
import MobileHeaderSearch from "./MobileHeaderSearch";
import ServerBoundary from "../ServerBoundary";

export default function MobileSidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // The component which uses the 'usePathname()' will re-render when the pathname changes and the effect will run again.
  const pathname = usePathname();
  const isOpened = useRef(isOpen);

  useEffect(() => {
    isOpened.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    // Close menu when route changes
    if (isOpened.current) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  return (
    <>
      <ServerBoundary>
        <Hamburger isOpen={isOpen} handleToggle={(toggle) => setIsOpen(toggle)} />
      </ServerBoundary>

      {/* Mobile Menu Slide-In */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="bg-background border-border-400 fixed inset-y-[72px] left-0 z-50 w-full border-t p-4 shadow md:inset-y-[76px] md:px-6 xl:hidden"
          >
            <div className="flex flex-col gap-4">
              <MobileHeaderSearch />
              <ServerBoundary>
                <HeaderNavLinks />
              </ServerBoundary>
              <ServerBoundary>
                <AuthButtons />
              </ServerBoundary>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
