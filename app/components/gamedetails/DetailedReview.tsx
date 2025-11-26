"use client";

import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import Image from "next/image";
import ShareButton from "../ShareButton";
import StarFilledSVG from "../StarFilledSVG";
import StarUnFilledSVG from "../StarUnFilledSVG";
import { DetailedReviewCardTypes } from "./ReviewCard";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

interface DetailedReviewProps {
  id?: string;
  review: DetailedReviewCardTypes & {
    playedPlatforms?: string[];
    hoursPlayed?: string;
    completionStatus?: string;
    detailedReview?: string;
    goodPoints?: { id: number; text: string }[];
    badPoints?: { id: number; text: string }[];
    selectedTags?: string[];
  };
  // rating?: number;
  // dateAdded?: string;
}

const ratingWords: Record<number, string> = {
  10: "Perfect",
  9: "Superb",
  8: "Great",
  7: "Good",
  6: "Average",
  5: "Mediocre",
  4: "Poor",
  3: "Bad",
  2: "Terrible",
  1: "Awful",
};

export default function DetailedReview({
  // id,
  review: {
    author,
    avatarUrl,
    badPoints,
    completionStatus,
    dateAdded,
    detailedReview,
    goodPoints,
    hoursPlayed,
    playedPlatforms,
    rating,
    selectedTags,
    // id,
  },
}: DetailedReviewProps) {
  return (
    <div className="bg-surface-500 grid gap-10 rounded-xl p-4 pb-8 shadow-sm sm:p-5 md:gap-15 md:px-8 md:pt-8 md:pb-12 lg:pb-14">
      <div className="grid gap-5.5">
        <div className="flex flex-col justify-between gap-6 lg:flex-row">
          <div className="flex items-center gap-6">
            <div>
              <div className="w-[55px] shrink-0 md:w-[65px]">
                <Image
                  // Add user avatar from logged in user from database:
                  src={avatarUrl ?? "/avatars/avatar.png"}
                  alt="user picture"
                  width={65}
                  height={66}
                  className="h-auto w-full rounded-full object-cover shadow-sm"
                />
              </div>
            </div>
            <div>
              {/* Add user name from logged in user from database: */}
              <h4 className="font-space-grotesk text-lg font-medium md:text-xl">
                {author ?? "Alex Martinez"}
              </h4>
              {/* Add current date upon creation of the detailed review: */}
              <span className="text-secondary text-sm">{dateAdded ?? "24 April, 2024"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm font-light md:flex-row md:items-center md:gap-4">
            <p>
              Played On:{" "}
              {playedPlatforms?.map((platform, id) => (
                <span key={id} className="font-semibold">
                  {id === playedPlatforms.length - 1 ? platform : `${platform}, `}
                </span>
              ))}
            </p>
            <p>
              Hours Played: <span className="font-semibold">{hoursPlayed}</span>
            </p>
            <p>
              Completion Status: <span className="font-semibold">{completionStatus}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="order-2 md:order-1">
            <ShareButton className="dark:bg-surface-400/80 border-none" />
          </div>
          <div className="order-1 flex flex-wrap items-center gap-2 md:order-2">
            <span className="text-sm font-light">Tags:</span>
            {selectedTags?.map((tag, id) => (
              <Badge key={id} className="bg-surface-400 rounded-sm text-sm font-normal text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div
          style={{ whiteSpace: "pre-wrap" }}
          className="prose dark:prose-invert prose-headings:font-space-grotesk prose-headings:text-2xl prose-headings:md:text-3xl prose-headings:text-accent-400 prose-headings:mb-0 prose-p:mt-0 prose-p:mb-0 prose-p:md:mt-5 prose-p:md:mb-5 prose-p:text-base prose-p:md:text-[1.063rem] prose-img:mt-0 prose-img:mb-0 prose-img:md:mt-8 prose-img:md:mb-8 prose-img:mx-auto max-w-none"
        >
          <ReactMarkdown>{detailedReview || "No long review written."}</ReactMarkdown>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-6 md:px-4 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="flex items-center gap-4">
            <Image
              src="/icons/the-good-icon.svg"
              alt="Thumbs Up Icon"
              width={35}
              height={35}
              className="sm:size-11"
            />
            <h4 className="font-space-grotesk text-lg font-medium sm:text-xl">The Good</h4>
          </div>
          <div>
            <ul className="mt-6 list-disc space-y-2 pl-[1.625em]">
              {goodPoints?.map((point, id) => (
                <li key={id}>{point.text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="flex items-center gap-4">
            <Image
              src="/icons/the-bad-icon.svg"
              alt="Thumbs Down Icon"
              width={35}
              height={35}
              className="sm:size-11"
            />
            <h4 className="font-space-grotesk text-lg font-medium sm:text-xl">The Bad</h4>
          </div>
          <div>
            <ul className="mt-6 list-disc space-y-2 pl-[1.625em]">
              {badPoints?.map((point, id) => (
                <li key={id}>{point.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid justify-items-center gap-3">
        <div className="relative w-fit">
          <Image
            src="/icons/star-filled.svg"
            alt="Yellow Star Icon"
            width={88}
            height={88}
            className="md:size-24 lg:size-28"
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-2.5 text-[1.5rem] font-semibold text-black md:text-[2.125rem]">
            {rating}
          </span>
        </div>
        <h4 className="font-space-grotesk text-center text-lg font-medium">
          {rating !== undefined ? (ratingWords[rating] ?? "") : ""}
        </h4>
        <div className="flex items-center gap-1">
          {Array.from({ length: 10 }, (_, index) => {
            // return an Image element for each iteration and include a key
            return index < (rating ?? 0) ? (
              <StarFilledSVG key={index} className="size-4.5 md:size-6 lg:size-8" />
            ) : (
              <StarUnFilledSVG key={index} stroke={1.5} className="ms:size-6 size-4.5 lg:size-8" />
            );
          })}
        </div>
      </div>
    </div>
  );
}
