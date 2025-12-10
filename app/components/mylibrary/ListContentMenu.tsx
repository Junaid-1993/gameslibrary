import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Copy, Pin, SquarePen, Trash2 } from "lucide-react";

export default function ListContentMenu() {
  return (
    <>
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
    </>
  );
}
