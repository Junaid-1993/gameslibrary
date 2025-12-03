"use client";

import CreateButton from "@/app/components/CreateButton";
import GameJournalFilters from "@/app/components/gamedetails/GameJournalFilters";
import JournalCards, { JournalCardProps } from "@/app/components/gamedetails/JournalCards";
import { useState } from "react";

const userJournals: JournalCardProps[] = [
  {
    id: "1",
    dateCreated: "2025-11-27T10:22:00Z",
    title: "Finally Mastered Parrying!",
    description:
      "Spent hours getting wrecked by minibosses, but something finally clicked today. I can parry almost anything now. Combat feels so smooth, and I’m way more confident pushing deeper into the world.",
    tags: ["combat", "skills", "progress"],
  },
  {
    id: "2",
    dateCreated: "2025-11-26T18:45:00Z",
    title: "Discovered a Secret Zone",
    description:
      "Thought I was just exploring a dead end, but it opened into a hidden cavern with new enemies and a whole new soundtrack. These surprises are what make this game feel alive.",
    tags: ["exploration", "secret", "surprise"],
  },
  {
    id: "3",
    dateCreated: "2025-11-25T22:10:00Z",
    title: "Lost My Best Gear… Ouch",
    description:
      "Took a risky shortcut and paid the price. Got ambushed, dropped my favorite weapon, and couldn't make it back in time. Brutal lesson learned. Still kinda funny though.",
    tags: ["setback", "gear", "lesson learned"],
  },
  {
    id: "4",
    dateCreated: "2025-11-24T14:05:00Z",
    title: "Met an Awesome NPC",
    description:
      "Ran into a wandering merchant with a ton of lore and personality. Ended up chatting way longer than expected. These character moments help the world feel so real.",
    tags: ["story", "npc", "lore"],
  },
];

export default function Page() {
  const [journals, setJournals] = useState(userJournals);

  return (
    <section className="grid gap-8 md:gap-12">
      <div className="flex flex-col justify-between gap-3 md:gap-6 xl:flex-row">
        <div className="flex flex-col gap-4">
          <div className="gap-3.5 pt-[0.413rem] md:flex md:items-end md:gap-5">
            <h3 className="font-space-grotesk text-xl font-medium xl:text-[22px]">
              Log your thoughts as you play
            </h3>
            <p className="text-secondary mt-2 text-sm md:mt-0 lg:text-base">
              {journals.length} Entry
            </p>
          </div>
        </div>
        <div>
          <div className="mt-4 w-full md:mt-1 md:w-auto lg:mt-0">
            <div className="gap-4 md:flex md:items-start">
              <div className="mt-0.5 mb-4 md:mb-0">
                <CreateButton title="New Entry" />
              </div>
              <GameJournalFilters />
            </div>
          </div>
        </div>
      </div>

      <div>
        <JournalCards
          journals={journals}
          onDelete={(id) => setJournals(journals.filter((journal) => journal.id !== id))}
        />
      </div>
    </section>
  );
}
