"use client";

import { cn } from "@/lib/utils";
import { interpolate } from "flubber";
import { animate } from "motion";
import type { SVGMotionProps } from "motion/react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

interface MorphIconProps {
  staticPath?: string; // Outer shape that stays constant
  morphPaths: [string, string]; // Two paths to morph between
  viewBox?: string;
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  active: boolean;
  className?: string;
  fromColor?: string;
  toColor?: string;
}

const MorphIcon: React.FC<MorphIconProps & SVGMotionProps<SVGSVGElement>> = ({
  staticPath,
  morphPaths,
  viewBox = "0 0 25 24",
  width = 25,
  height = 24,
  strokeColor = "currentColor",
  strokeWidth = 0,
  active,
  className,
  fromColor = "#fff",
  toColor = "#fff",
  ...props
}) => {
  const progress = useMotionValue(0);

  const interpolator = interpolate(morphPaths[0], morphPaths[1], {
    maxSegmentLength: 0.1,
  });

  const d = useTransform(progress, (latest) => interpolator(latest));

  const colors = [fromColor, toColor];
  const fill = useTransform(progress, [0, 1], colors);

  useEffect(() => {
    const animation = animate(progress, active ? 1 : 0, {
      duration: 0.3,
      ease: "anticipate",
    });
    // Clean up function to stop animation:
    return () => animation?.stop();
  }, [active, progress]);

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="currentColor"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-[25px]", className)}
      {...props}
    >
      {/* Static outer shape */}
      {staticPath && <motion.path d={staticPath} fill={fill} />}

      {/* Morphing inner shape */}
      <motion.path d={d} fill={fill} />
    </motion.svg>
  );
};

export default MorphIcon;
