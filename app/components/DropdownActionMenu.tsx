"use client";

import { MoreHorizontalIcon, SquarePen, Pin, Copy, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownActionMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          aria-label="More Options"
          className="dark:border-border-300 h-9.5 w-11 md:h-10.5 md:w-12"
        >
          <MoreHorizontalIcon className="size-5 md:size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SquarePen color="#818793" className="size-5" />
            Edit List
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pin color="#818793" className="size-5" />
            Pin List
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Copy color="#818793" className="size-5" />
            Duplicate List
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 color="#EF4444" className="size-5" />
            Delete List
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
