import { cn } from "@/lib/utils";
import { BookOpen, Check, Heart, HeartPlus, List, Pencil, Pin, Star } from "lucide-react";
import { PropsWithChildren } from "react";

// Union type: This can have multiple shapes:
export type Activity =
  | { type: "add_to_list"; gameTitle: string; listName: string }
  | { type: "create_list"; listName: string }
  | { type: "pin_list"; listName: string }
  | { type: "entry"; gameTitle: string }
  | { type: "rating"; gameTitle: string; rating: number }
  | { type: "review"; gameTitle: string }
  | { type: "wishlist"; gameTitle: string }
  | { type: "favorite"; gameTitle: string };

function getActivityText(activity: Activity) {
  switch (activity.type) {
    case "add_to_list":
      return (
        <>
          Added <span className="text-primary-400">{activity.gameTitle}</span> to{" "}
          <span className="text-accent-400">{activity.listName}</span>
        </>
      );
    case "create_list":
      return (
        <>
          Created a new list: <span className="text-accent-400">{activity.listName}</span>
        </>
      );
    case "pin_list":
      return (
        <>
          Pinned the list <span className="text-accent-400">{activity.listName}</span>
        </>
      );
    case "entry":
      return (
        <>
          Wrote a new journal entry for{" "}
          <span className="text-primary-400">{activity.gameTitle}</span>
        </>
      );
    case "rating":
      return (
        <>
          Rated <span className="text-primary-400">{activity.gameTitle}</span>{" "}
          {"★".repeat(activity.rating)}
        </>
      );
    case "review":
      return (
        <>
          Reviewed <span className="text-primary-400">{activity.gameTitle}</span>
        </>
      );
    case "wishlist":
      return (
        <>
          Added <span className="text-primary-400">{activity.gameTitle}</span> to{" "}
          <span className="text-accent-400">Wishlist</span>
        </>
      );
    case "favorite":
      return (
        <>
          Marked <span className="text-primary-400">{activity.gameTitle}</span> as a{" "}
          <span className="text-accent-400">Favorite</span>
        </>
      );
    default:
      return "";
  }
}

function getActivityIcon(activity: Activity) {
  switch (activity.type) {
    case "add_to_list":
      return (
        <IconBackground className="bg-success-500/30">
          <Check className="text-success-500 size-4.5 xl:size-5" strokeWidth={3} />
        </IconBackground>
      );
    case "create_list":
      return (
        <IconBackground className="bg-accent-500/30">
          <List className="text-accent-500 size-4.5 xl:size-5" strokeWidth={3} />
        </IconBackground>
      );
    case "pin_list":
      return (
        <IconBackground className="bg-[#EF4444]/30">
          <Pin className="size-4.5 text-[#EF4444] xl:size-5" strokeWidth={2} />
        </IconBackground>
      );
    case "entry":
      return (
        <IconBackground className="bg-[#4C9AFF]/30">
          <BookOpen className="size-4.5 text-[#4C9AFF] xl:size-5" strokeWidth={2} />
        </IconBackground>
      );
    case "rating":
      return (
        <IconBackground className="bg-[#FACC15]/30">
          <Star className="size-4.5 text-[#FACC15] xl:size-5" strokeWidth={2} />
        </IconBackground>
      );
    case "review":
      return (
        <IconBackground className="bg-[#38BDF8]/30">
          <Pencil className="size-4.5 text-[#38BDF8] xl:size-5" strokeWidth={2} />
        </IconBackground>
      );
    case "wishlist":
      return (
        <IconBackground className="bg-[#FF8C42]/30">
          <HeartPlus className="size-4.5 text-[#FF8C42] xl:size-5" strokeWidth={2} />
        </IconBackground>
      );
    case "favorite":
      return (
        <IconBackground className="bg-[#e35151]/30">
          <Heart className="size-4.5 text-[#e35151] xl:size-5" strokeWidth={2} />
        </IconBackground>
      );
    default:
      return null;
  }
}

export default function RecentActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="mx-4 flex items-center gap-3 p-3">
      {getActivityIcon(activity)}
      <p className="line-clamp-2 text-sm">{getActivityText(activity)}</p>
      {/* <span className="ml-auto text-xs text-gray-500">2h ago</span> */}
    </div>
  );
}

function IconBackground({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <span className={cn("inline-block rounded-lg p-3", className)}>{children}</span>;
}
