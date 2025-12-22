"use client";

import { ListProps } from "@/app/components/mylibrary/ListItemRow";
import { useListActions } from "@/app/hooks/useListActions";
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CreateButton from "../CreateButton";
import DropdownActionMenu from "../DropdownActionMenu";
import LinkWithArrow from "../LinkWithArrow";
import ListContentMenu from "./ListContentMenu";

import { useRouter } from "next/navigation";

export default function ListItemGrid({
  id,
  title,
  createdDate,
  fullViewUrl,
  games,
  pinnedList = false,
}: ListProps & { pinnedList?: boolean }) {
  const { pinned, handleEdit, handlePin, handleDuplicate, handleDelete } = useListActions(id);
  const router = useRouter();

  return (
    <section
      className={cn("bg-surface-500 grid gap-3 rounded-lg p-4 md:p-3 xl:p-4 2xl:p-5", {
        "gap-0 xl:gap-2": pinnedList,
      })}
    >
      <div
        className={cn("grid aspect-2/3 grid-cols-2 gap-x-3 gap-y-4", {
          "hidden lg:grid": pinnedList,
        })}
      >
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
        {pinnedList ? (
          <Link href={fullViewUrl} className="underline-offset-3 hover:underline">
            <Title title={title} pinnedList />
          </Link>
        ) : (
          <Title title={title} />
        )}

        <p className="text-secondary mt-1 md:mt-0">{games.length} Titles</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-secondary text-sm">Created on {createdDate}</span>
        </div>
        <div>
          <DropdownActionMenu
            className="dark:bg:border-500 dark:border-border-400 rounded-full"
            moreVerticalIcon
            pinnedListContextWidth={pinnedList}
          >
            {pinnedList ? (
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => router.push(`/mylibrary/${fullViewUrl}`)}>
                  <ArrowRight color="#4C9AFF" className="size-5" />
                  View Full List
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handlePin}>
                  <Trash2 color="#EF4444" className="size-5" />
                  Remove from Pinned List
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ) : (
              <ListContentMenu
                pinned={pinned}
                setPinned={handlePin}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            )}
          </DropdownActionMenu>
        </div>
      </div>
      {!pinnedList && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="grow basis-[calc(50%-0.375rem)]">
            <CreateButton title="Add Game" className="w-full" />
          </div>
          <div className="grow basis-[calc(50%-0.375rem)]">
            <LinkWithArrow title="View Full List" href={fullViewUrl} fullWidth />
          </div>
        </div>
      )}
    </section>
  );
}

function Title({ title, pinnedList = false }: { title: string; pinnedList?: boolean }) {
  return (
    <h3
      className={`font-space-grotesk line-clamp-1 text-lg font-medium ${pinnedList ? "sm:text-lg" : "sm:text-xl"}`}
    >
      {title}
    </h3>
  );
}
