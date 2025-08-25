"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import HeaderSearch from "./HeaderSearch";

export default function DesktopHeaderSearch() {
  const isDesktop = useMediaQuery("(min-width: 1280px)", true);

  return (
    <div
      className="hidden w-full max-w-md xl:block xl:max-w-[495px] 2xl:max-w-xl"
      suppressHydrationWarning
    >
      {isDesktop && <HeaderSearch />}
    </div>
  );
}
