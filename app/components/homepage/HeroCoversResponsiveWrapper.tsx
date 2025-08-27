"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import HeroCovers from "./HeroCovers";

export default function HeroCoversResponsiveWrapper() {
  // Show only on tablet and larger (≥768px for example)
  const isTabletUp = useMediaQuery("(min-width: 768px)");

  if (!isTabletUp) {
    return null; //  Don't even mount on mobile
  }

  return <HeroCovers />;
}
