"use client";

import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageCarouselProps {
  id: string;
  images: string[];
  initialIndex?: number;
}

export default function ImageCarousel({ id, images, initialIndex = 0 }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: initialIndex });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi]);

  return (
    <>
      <div className="absolute top-1/2 left-2 z-50 -translate-y-1/2 transform sm:left-3 md:left-5 lg:left-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous image"
          className="bg-surface-400 dark:hover:bg-surface-400/70 cursor-pointer"
        >
          <ChevronLeft className="size-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-2 z-50 -translate-y-1/2 transform sm:right-3 md:right-5 lg:right-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next image"
          className="bg-surface-400 dark:hover:bg-surface-400/70 cursor-pointer"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>

      {/* Carousel */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container h-fit">
          {images.map((src, index) => (
            <div
              className="embla__slide flex items-center justify-center p-1"
              key={index}
              role="group"
              aria-label={`Image ${index + 1} of ${images.length}`}
            >
              <Image
                src={`/images/game/${src}`}
                alt={`${id} screenshot ${index + 1}`}
                width={924}
                height={520}
                priority={index === initialIndex}
                className="h-auto w-full rounded object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
