"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EllipsisVertical, MoreHorizontalIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export default function DropdownActionMenu({
  children,
  className,
  moreVerticalIcon = false,
  pinnedListContextWidth = false,
}: PropsWithChildren<{
  className?: string;
  moreVerticalIcon?: boolean;
  pinnedListContextWidth?: boolean;
}>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          aria-label="More Options"
          className={cn("dark:border-border-300 h-10 w-10 md:h-10.5 md:w-10.5", className)}
        >
          {moreVerticalIcon ? (
            <EllipsisVertical className="size-5 md:size-6" />
          ) : (
            <MoreHorizontalIcon className="size-5 md:size-6" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn("w-44 py-2 md:w-52", { "!w-56": pinnedListContextWidth })}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
