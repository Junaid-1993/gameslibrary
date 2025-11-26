"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";

type Point = {
  id: number;
  text: string;
};

interface GamePointsProps {
  pointTitle: "Good" | "Bad";
  points: Point[];
  onAddPoint: (newPoint: Point) => void;
  onDeletePoint: (id: number) => void;
  ref?: React.Ref<HTMLInputElement>;
}

export default function GamePoints({
  pointTitle,
  points,
  onAddPoint,
  onDeletePoint,
  ref,
}: GamePointsProps) {
  const hasPoints = points.length > 0;

  return (
    <div className="relative mt-6 grid gap-8">
      <h5 className="font-space-grotesk text-lg font-medium">{`The ${pointTitle}`}</h5>

      <AnimatePresence>
        {!hasPoints && (
          <motion.p
            key="empty-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.2 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 list-none text-center text-sm md:text-base"
          >
            No {pointTitle.toLowerCase()} point yet.
          </motion.p>
        )}
      </AnimatePresence>

      <ul className="list-disc pl-6">
        <AnimatePresence initial={false}>
          {hasPoints &&
            points.map((point) => (
              <PointItem key={point.id} point={point} onDelete={onDeletePoint} />
            ))}
        </AnimatePresence>
      </ul>

      <AddPointForm pointTitle={pointTitle} onAddPoint={onAddPoint} ref={ref} />
    </div>
  );
}

interface PointItemProps {
  point: Point;
  onDelete: (id: number) => void;
}

const PointItem = React.forwardRef<HTMLLIElement, PointItemProps>(({ point, onDelete }, ref) => {
  return (
    <motion.li
      key={point.id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      ref={ref}
    >
      <motion.div
        className={"flex items-center justify-between rounded-xl px-4 py-1 break-all"}
        initial={{
          opacity: 0,
          y: -8,
          scale: 0.98,
          filter: "blur(2px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: 8,
          scale: 0.98,
          filter: "blur(2px)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {point.text}
        <Button
          type="button"
          title="Delete Point"
          aria-label="Delete Point"
          variant="ghost"
          className="h-auto cursor-pointer py-1.5 hover:text-red-400 dark:hover:bg-transparent"
          onClick={() => onDelete(point.id)}
        >
          <X className="size-4.5" />
        </Button>
      </motion.div>
    </motion.li>
  );
});

PointItem.displayName = "PointItem";

interface AddPointFormProps {
  pointTitle: string;
  onAddPoint: (newPoint: Point) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const AddPointForm = ({ pointTitle, onAddPoint, ref }: AddPointFormProps) => {
  const [value, setValue] = useState("");
  const pointId = useRef(0);

  function handleAddPoint() {
    if (value.trim() === "") return;
    const newId = (pointId.current = pointId.current + 1);
    const newPoint = { id: newId, text: value };

    onAddPoint(newPoint);
    setValue("");
  }

  return (
    <motion.div
      layout="position"
      transition={{ layout: { type: "spring", stiffness: 500, damping: 30 } }}
      className="flex items-center gap-2 md:gap-4"
    >
      <Label htmlFor={`${pointTitle.toLowerCase()}-point`} className="sr-only">
        {`Add a ${pointTitle.toLowerCase()} point`}
      </Label>
      <Input
        ref={ref}
        type="input"
        id={`${pointTitle.toLowerCase()}-point`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="border-border-400 focus-visible:ring-ring/35 h-12 text-sm lg:text-base"
        placeholder={`Add a ${pointTitle.toLowerCase()} point`}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddPoint();
        }}
      />
      <Button
        type="button"
        className="bg-d dark:bg-disabled-800 dark:hover:bg-primary-800 cursor-pointer text-white"
        size="lg"
        disabled={value.length === 0}
        onClick={handleAddPoint}
      >
        <Plus /> Add Point
      </Button>
    </motion.div>
  );
};
