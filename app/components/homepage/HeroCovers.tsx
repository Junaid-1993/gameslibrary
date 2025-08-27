"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { motion } from "motion/react";
import Image from "next/image";

const covers = [
  { src: "/covers/resident-evil-4.jpg", alt: "Resident evil 4 game cover" },
  { src: "/covers/returnal.jpg", alt: "Returnal game cover" },
  { src: "/covers/the-last-of-us.jpg", alt: "The last of us game cover" }, // Center cover
  { src: "/covers/elden-ring.jpg", alt: "Elden ring game cover" },
  { src: "/covers/hogwarts.jpg", alt: "Hogwarts game cover" },
];

// Fan-out target positions (except center card)
const coverTransitionData = [
  { rotate: -20, index: 1 }, // far left
  { rotate: -10, index: 2 }, // near left
  { rotate: 0, index: 5 }, // center (stays)
  { rotate: 10, index: 4 }, // near right
  { rotate: 20, index: 3 }, // far right
];

const responsiveCoverPositions = {
  tablet: [
    { x: -100, y: 40 }, // far left
    { x: -50, y: -10 }, // near left
    { x: 0, y: 0 }, // center (stays)
    { x: 50, y: -10 }, // near right
    { x: 100, y: 40 }, // far right
  ],
  desktop: [
    { x: -200, y: 40 }, // far left
    { x: -100, y: -20 }, // near left
    { x: 0, y: 0 }, // center (stays)
    { x: 100, y: -20 }, // near right
    { x: 200, y: 40 }, // far right
  ],
};

export default function HeroCovers() {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const currentConfig = isDesktop
    ? responsiveCoverPositions.desktop
    : isTablet
      ? responsiveCoverPositions.tablet
      : null;

  let shadowOpacity = 0;
  if (isDesktop) {
    shadowOpacity = 1;
  } else if (isTablet) {
    shadowOpacity = 0.7;
  }

  return (
    <div className="relative flex items-center justify-center overflow-hidden md:h-80 xl:h-[400px] 2xl:h-[450px]">
      {/* Glowing Shadows */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg blur-2xl md:h-56 md:w-56 xl:blur-3xl 2xl:h-72 2xl:w-48"
          style={{
            background: `radial-gradient(circle, rgba(76,154,255,${shadowOpacity}), transparent)`,
            zIndex: -1,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            delay: 1 + i * 0.3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* Game Covers */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {covers.map((cover, index) => {
          const pos = coverTransitionData[index];

          return (
            <motion.div
              key={cover.src}
              className="absolute aspect-2/3 w-full md:max-w-[100px] xl:max-w-[120px] 2xl:max-w-[150px]"
              style={{
                zIndex: pos.index,
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                // Only animate outward for non-center cards
                x: currentConfig ? currentConfig[index].x : 0,
                y: currentConfig ? currentConfig[index].y : 0,
                rotate: pos.rotate,
              }}
              transition={{
                // Center card needs to transition faster than others.
                opacity:
                  index === 2 ? { duration: 0.5, delay: 0.3 } : { duration: 0.8, delay: 0.5 },
                scale: index === 2 ? { duration: 0.5, delay: 0.3 } : { duration: 0.8, delay: 0.5 },
                x: { duration: 0.6, delay: 0.8 }, // move after delay
                y: { duration: 0.6, delay: 0.8 },
                rotate: { duration: 0.6, delay: 0.8 },
                ease: "easeOut",
              }}
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 768px) 60vw, (max-width: 1280px) 40vw, 150px"
                priority
                className="rounded-md object-cover shadow-xl"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
