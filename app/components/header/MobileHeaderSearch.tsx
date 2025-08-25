"use client";

import HeaderSearch from "./HeaderSearch";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

export default function MobileHeaderSearch() {
  const isMobile = useMediaQuery("(max-width: 1280px)", true);

  return (
    <div
      className="block w-full max-w-md xl:hidden xl:max-w-[495px] 2xl:max-w-xl"
      suppressHydrationWarning
    >
      {isMobile && <HeaderSearch isMobile />}
    </div>
  );
}
