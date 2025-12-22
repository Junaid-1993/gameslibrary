import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Copy, Pin, Share2, SquarePen, Trash2 } from "lucide-react";

export default function ListContextMenu({
  pinned,
  renderShare = false,
  setPinned,
  onEdit,
  onDuplicate,
  onShare,
  onDelete,
}: {
  pinned: boolean;
  renderShare?: boolean;
  setPinned: () => void;
  onEdit: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem onSelect={onEdit}>
          <SquarePen color="#818793" className="size-5" />
          Edit List
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={setPinned}>
          <Pin color={pinned ? "#EF4444" : "#818793"} className="size-5" />
          {pinned ? "Unpin List" : "Pin List"}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup>
        {renderShare ? (
          <DropdownMenuItem onSelect={onShare}>
            <Share2 color="#818793" className="size-5" />
            Share List
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={onDuplicate}>
            <Copy color="#818793" className="size-5" />
            Duplicate List
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onDelete}>
          <Trash2 color="#EF4444" className="size-5" />
          Delete List
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
