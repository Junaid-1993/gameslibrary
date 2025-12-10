import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ArrowRightLeft, Copy } from "lucide-react";

export default function ListGameCardContentMenu() {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <ArrowRightLeft color="#818793" className="size-5" />
          Move to another List
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy color="#818793" className="size-5" />
          Copy to another List
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
