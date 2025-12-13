"use client";

import { EllipsisVertical, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function DropdownActionMenu({
  children,
  className,
  moreVerticalIcon = false,
}: PropsWithChildren<{ className?: string; moreVerticalIcon?: boolean }>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          aria-label="More Options"
          className={cn("dark:border-border-300 h-9.5 w-11 md:h-10.5 md:w-12", className)}
        >
          {moreVerticalIcon ? (
            <EllipsisVertical className="size-5 md:size-6" />
          ) : (
            <MoreHorizontalIcon className="size-5 md:size-6" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 py-2 md:w-52">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
