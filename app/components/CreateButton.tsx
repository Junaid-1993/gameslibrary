import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function CreateButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      className={cn(
        "dark:hover:bg-primary-800 dark:bg-border-500 dark:border-border-400 cursor-pointer border text-white duration-250 dark:hover:border-transparent",
        className
      )}
      size="lg"
    >
      <Plus /> New Entry
    </Button>
  );
}
