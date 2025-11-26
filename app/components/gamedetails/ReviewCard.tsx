import Image from "next/image";
import StarFilledSVG from "../StarFilledSVG";
import LinkWithArrow from "../LinkWithArrow";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review?: {
    id?: number;
    avatarUrl?: string;
    author?: string;
    rating?: number; // e.g., 8 for 8/10
    reviewTitle?: string;
    dateAdded?: string; // e.g., "April 15, 2024"
    content?: string;
    hasDetailedReview?: boolean;
    //   reviewLink?: string;
  };
  id?: string;
  className?: string;
}

type Review = NonNullable<ReviewCardProps["review"]>;
export type ReviewCardTypes = Review[];
export type DetailedReviewCardTypes = Omit<Review, "reviewTitle" | "content" | "hasDetailedReview">;

export default function ReviewCard({
  review,
  id,
  //   reviewLink,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "bg-surface-500 flex w-full flex-col gap-4 rounded-xl p-4 shadow-sm sm:p-5 md:gap-6 md:p-6 lg:w-[calc(50%-12px)]",
        className
      )}
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:justify-between lg:gap-2">
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="w-[55px] shrink-0 md:w-[65px]">
            <Image
              src={review?.avatarUrl ?? "/avatars/default-avatar.png"}
              alt="user picture"
              width={65}
              height={66}
              className="h-auto w-full rounded-full object-cover shadow-sm"
            />
          </div>
          <div className="flex flex-col md:gap-1">
            <h4 className="font-space-grotesk text-lg font-medium md:text-xl">{review?.author}</h4>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-1 pt-0.5">
                {review?.rating ? (
                  <>
                    <StarFilledSVG className="size-5 md:size-6" />
                    <span className="text-sm md:text-base">
                      {review?.rating ? `${review.rating}/10` : "Not Yet Rated"}
                    </span>
                  </>
                ) : (
                  <span className="text-accent-400">Not Yet Rated</span>
                )}
              </div>
              <h5 className="font-space-grotesk font-medium md:text-lg">{review?.reviewTitle}</h5>
            </div>
          </div>
        </div>
        <span className="text-secondary text-sm">{review?.dateAdded}</span>
      </header>

      <p>{review?.content}</p>

      {review?.hasDetailedReview && (
        <div className="flex justify-end">
          <LinkWithArrow
            href={`/game/${id}/reviews/${review?.id}`}
            title="Read Full Review"
            className="text-primary-300 hover:text-primary-500 h-auto border-none !pb-0"
          />
        </div>
      )}
    </article>
  );
}
