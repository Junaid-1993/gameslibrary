"use client";

import { Button } from "@/components/ui/button";
import CreateButton from "../CreateButton";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";

export interface JournalCardProps {
  id: string;
  dateCreated: string;
  title: string;
  description: string;
  tags: string[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function JournalCards({
  journals,
  onDelete,
}: {
  journals: JournalCardProps[];
  onDelete: (id: string) => void;
}) {
  const hasJournals = journals.length > 0;

  return (
    <>
      <AnimatePresence>{!hasJournals && <NoJournals />}</AnimatePresence>
      <AnimatePresence>
        {hasJournals &&
          journals.map((journal) => (
            <JournalCard key={journal.id} {...journal} onDelete={onDelete} />
          ))}
      </AnimatePresence>
    </>
  );
}

function NoJournals() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, height: 0 }}
      animate={{ opacity: 1, scale: 1, height: "auto" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.75 }}
      className="flex items-center justify-center"
    >
      <div className="grid gap-2 text-center">
        <h4 className="font-space-grotesk text-lg font-medium xl:text-xl">
          No journal entries yet
        </h4>
        <p className="text-secondary">
          Start tracking your thoughts, moments, and progress as you play.
        </p>
        <div className="mt-7">
          <CreateButton />
        </div>
      </div>
    </motion.div>
  );
}

function JournalCard({
  id,
  dateCreated,
  title,
  description,
  tags,
  onEdit,
  onDelete,
}: JournalCardProps) {
  return (
    <motion.article
      layout
      key={id}
      initial={false}
      animate={{ opacity: 1, height: "auto" }}
      exit={{
        opacity: 0,
        height: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      style={{ overflow: "hidden" }}
      transition={{ duration: 0.2 }}
      className=""
    >
      <div className="pb-6">
        <motion.div
          initial={false}
          animate={{ gap: 28, padding: 24 }}
          exit={{
            gap: 0,
            padding: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          transition={{ duration: 0.2 }}
          className="bg-surface-500 grid gap-7 rounded-[12px] p-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-secondary text-sm">{dateCreated}</span>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-primary-300 cursor-pointer"
                onClick={() => onEdit?.(id)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-danger-300 cursor-pointer"
                onClick={() => onDelete?.(id)}
              >
                Delete
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-space-grotesk text-lg font-medium xl:text-xl">{title}</h4>
            <p className="mt-2">{description}</p>
          </div>

          <div className="flex items-center gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-surface-400 border-border-400 rounded-sm border text-sm font-normal text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
