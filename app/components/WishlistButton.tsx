import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WishlistButton({ className }: { className?: string }) {
  const [add, setAdd] = useState(false);

  return (
    <Button
      onClick={() => setAdd(!add)}
      className={cn(
        "bg-surface-500 border-border-400 rounded-lg border !px-4 !py-5 text-white hover:bg-[#000000] [&_svg]:!h-6 [&_svg]:!w-6 md:[&_svg]:!h-7 md:[&_svg]:!w-7",
        className
      )}
    >
      {add ? (
        <BookmarkCheck className="h-8 w-8" color="#16A34A" strokeWidth="1.5" />
      ) : (
        <BookmarkPlus className="h-8 w-8" color="#FDB541" strokeWidth="1.5" />
      )}
      {add ? "Added" : "Add to Wishlist"}
    </Button>
  );
}
