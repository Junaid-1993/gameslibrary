"use client";

import ReviewFormWithPreview from "@/app/components/gamedetails/form/ReviewFormWithPreview";
import ReviewTabSwitcher from "@/app/components/gamedetails/ReviewTabSwitcher";
import StarUnFilledSVG from "@/app/components/StarUnFilledSVG";
import { Button } from "@/components/ui/button";
import { use, useState } from "react";
import { useModal } from "@/app/stores/useModalStore";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  const { id } = use(params);
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <h3 className="font-space-grotesk text-xl font-medium xl:text-[22px]">
          Share Your Experience
        </h3>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <Button
            variant="outline"
            className="group text-accent-400 dark:border-accent-400 hover:text-background dark:hover:bg-accent-400 h-11 cursor-pointer transition duration-300 ease-in-out md:h-10"
            onClick={() => onOpen("rateGame", { gameId: 3498, gameTitle: "GTA V" })}
          >
            <StarUnFilledSVG className="size-5 transition duration-300 ease-in-out group-hover:text-black" />
            Rate This Game
          </Button>
          <div className="flex items-center gap-2">
            <ReviewTabSwitcher
              activeTab={activeTab}
              onActiveTabChange={(tab) => setActiveTab(tab)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <ReviewFormWithPreview id={id} activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
