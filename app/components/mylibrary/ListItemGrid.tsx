import { ListProps } from "@/app/components/mylibrary/ListItemRow";
import Image from "next/image";
import CreateButton from "../CreateButton";
import DropdownActionMenu from "../DropdownActionMenu";
import LinkWithArrow from "../LinkWithArrow";
import ListContentMenu from "./ListContentMenu";

export default function ListItemGrid({ title, createdDate, fullViewUrl, games }: ListProps) {
  return (
    <section className="bg-surface-500 grid gap-3.5 rounded-lg p-4 md:p-3 xl:p-4 2xl:p-5">
      <div className="grid aspect-2/3 grid-cols-2 gap-x-3 gap-y-4">
        {Array.from({ length: 4 }).map((_, i) => {
          const game = games[i];
          return game ? (
            <div key={game.id} className="relative h-full w-full flex-shrink-0">
              <Image
                src={game.imageUrl}
                alt={`${game.title} cover`}
                fill
                className="rounded-md object-cover"
                title={game.title}
              />
            </div>
          ) : (
            <div
              key={`placeholder-${i}`}
              className="border-border-400 relative h-full w-full flex-shrink-0 rounded-md border"
            />
          );
        })}
      </div>
      <div className="lg:pt-[0.413rem]">
        <h3 className="font-space-grotesk line-clamp-1 text-lg font-medium sm:text-xl">{title}</h3>
        <p className="text-secondary mt-1 md:mt-0">{games.length} Titles</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-secondary text-sm">Created on {createdDate}</span>
        </div>
        <div>
          <DropdownActionMenu
            className="dark:bg:border-500 dark:border-border-400 rounded-full md:h-10.5 md:w-10.5"
            moreVerticalIcon
          >
            <ListContentMenu />
          </DropdownActionMenu>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="grow basis-[calc(50%-0.375rem)]">
          <CreateButton title="Add Game" className="w-full" />
        </div>
        <div className="grow basis-[calc(50%-0.375rem)]">
          <LinkWithArrow title="View Full List" href={fullViewUrl} fullWidth />
        </div>
      </div>
    </section>
  );
}
