import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, List } from "lucide-react";

export default function ViewSwitchButtons({
  viewMode,
  onViewModeChange,
}: {
  viewMode: string;
  onViewModeChange: (mode: "list" | "grid") => void;
}) {
  return (
    <div className="border-border-300 flex h-10 w-fit items-center rounded-[12px] border md:h-11">
      <Button
        variant="ghost"
        title="List View"
        className={cn(
          "h-full cursor-pointer rounded-none rounded-tl-[12px] rounded-bl-[12px] transition-colors duration-500 ease-in-out dark:!bg-transparent",
          {
            "dark:!bg-border-500": viewMode === "list",
          }
        )}
        onClick={() => onViewModeChange("list")}
      >
        <List color="#818793" className="size-5" />
      </Button>
      <span className="border-border-300 inline-block h-9 w-[1px] rounded-lg border"></span>
      <Button
        variant="ghost"
        title="Grid View"
        className={cn(
          "h-full cursor-pointer rounded-none rounded-tr-[12px] rounded-br-[12px] transition-colors duration-500 ease-in-out dark:!bg-transparent",
          {
            "dark:!bg-border-500": viewMode === "grid",
          }
        )}
        onClick={() => onViewModeChange("grid")}
      >
        <LayoutGrid color="#818793" className="size-5" />
      </Button>
    </div>
  );
}
