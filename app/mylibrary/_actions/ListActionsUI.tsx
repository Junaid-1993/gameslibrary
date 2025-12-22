import { SquarePen, Copy, Trash2, Share2 } from "lucide-react";
import { ReactNode } from "react";

interface ListActionUI {
  key: string;
  title: string | null;
  Icon: ReactNode | null;
}

export const listActionUI: ListActionUI[] = [
  { key: "edit", title: "Edit List", Icon: <SquarePen className="size-5" color="#818793" /> },
  { key: "pin", title: null, Icon: null },
  { key: "duplicate", title: "Duplicate List", Icon: <Copy className="size-5" color="#818793" /> },
  { key: "delete", title: "Delete List", Icon: <Trash2 className="size-5" color="#EF4444" /> },
  { key: "share", title: "Share List", Icon: <Share2 className="size-5" color="#4C9AFF" /> },
];
