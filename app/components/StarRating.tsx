import { Button } from "@/components/ui/button";
import StarFilledSVG from "./StarFilledSVG";
import StarUnFilledSVG from "./StarUnFilledSVG";

export default function StarRating({ userScore }: { userScore: number | null }) {
  return (
    <Button
      variant="outline"
      className="cursor-pointer gap-1 border-none has-[>svg]:p-1 dark:hover:bg-gray-700/80"
      aria-label="Rate button"
    >
      {userScore ? (
        <>
          <StarFilledSVG className="size-5" />
          <span>{`${userScore}/10`}</span>
        </>
      ) : (
        <>
          <StarUnFilledSVG className="size-5" />
          <span className="text-accent-400">Rate</span>
        </>
      )}
    </Button>
  );
}
