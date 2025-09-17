"use client";

import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import AddToWishlistButton from "../AddToWishlistButton";

type Game = {
  id: number;
  title: string;
  imageUrl: string;
  releaseDate: string;
};

const upcomingGames: Game[] = [
  {
    id: 1,
    title: "Metal Gear Solid Delta: Snake Eater",
    imageUrl: "/images/metal-gear-solid-snake-eater.jpg",
    releaseDate: "August 28, 2025",
  },
  {
    id: 2,
    title: "Grand Theft Auto VI",
    imageUrl: "/images/gta-6.jpg",
    releaseDate: "September, 2025",
  },
  {
    id: 3,
    title: "Death Stranding 2: On the Beach",
    imageUrl: "/images/death-stranding-2.jpg",
    releaseDate: "June 26, 2025",
  },
  {
    id: 4,
    title: "007 First Light",
    imageUrl: "/images/007-first-light.jpg",
    releaseDate: "Mar 27, 2026",
  },
  {
    id: 5,
    title: "Borderlands 4",
    imageUrl: "/images/borderlands-4.jpg",
    releaseDate: "Sep 12, 2025",
  },
  {
    id: 6,
    title: "Mafia: The Old Country",
    imageUrl: "/images/mafia-the-old-country.jpg",
    releaseDate: "Aug 8, 2025",
  },
  {
    id: 7,
    title: "Ghost of Yotei",
    imageUrl: "/images/ghost-of-yotei.jpg",
    releaseDate: "Oct 2, 2025",
  },
  {
    id: 8,
    title: "Little Nightmares III",
    imageUrl: "/images/little-nightmares-III.jpg",
    releaseDate: "Oct 9, 2025",
  },
  {
    id: 9,
    title: "Call of Duty: Black Ops 7",
    imageUrl: "/images/call-of-duty-black-ops-7.jpg",
    releaseDate: "Nov 14, 2025",
  },
];

export default function UpcomingGamesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setSnapCount(emblaApi.scrollSnapList().length);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // run once on mount
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between md:flex-row md:items-center md:pr-2">
        <h3 className="font-space-grotesk mb-6 text-xl md:mb-0 2xl:text-[1.375rem]">
          Upcoming Games
        </h3>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: snapCount }).map((_, i) => (
            <span key={i} className="flex h-4 w-4 items-center justify-center">
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === selectedIndex ? "bg-accent-500/80 h-4 w-4" : "h-3 w-3 bg-[#E8E8E9]/80"
                )}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Carousel viewport */}
      <div ref={emblaRef} className="mt-8 overflow-hidden md:mt-10">
        <div className="flex">
          {upcomingGames.map((game) => (
            <div
              key={game.id}
              className="flex-[0_0_80%] px-2 md:flex-[0_0_45%] xl:flex-[0_0_33.333%]"
            >
              <div className="relative h-90 w-full overflow-hidden rounded-md md:rounded-lg">
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 66vw, (max-width: 1280px) 40vw, 33vw"
                />
                <div className="from-background/50 to-background/60 absolute bottom-0 w-full bg-linear-to-b p-4 lg:px-6">
                  <h4 className="font-space-grotesk text-[1.063rem] sm:text-lg lg:line-clamp-1">
                    {game.title}
                  </h4>
                  <span className="text-xs sm:text-sm">{game.releaseDate}</span>
                  <div className="mt-4 flex w-full justify-end 2xl:mt-2">
                    <AddToWishlistButton added={false} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
