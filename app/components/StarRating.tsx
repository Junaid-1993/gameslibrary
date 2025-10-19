import { Button } from "@/components/ui/button";
import StarFilledSVG from "./StarFilledSVG";

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
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            className="size-5"
          >
            <g fill="none">
              <path
                fill="url(#StarGradient)"
                d="M9.104 2.899a1 1 0 0 1 1.794 0l1.93 3.911l4.317.627a1 1 0 0 1 .554 1.706l-3.124 3.045l.738 4.299a1 1 0 0 1-1.451 1.054l-3.86-2.03l-3.862 2.03a1 1 0 0 1-1.45-1.054l.737-4.3l-3.124-3.044a1 1 0 0 1 .554-1.706l4.317-.627z"
              />
              <defs>
                <linearGradient
                  id="StarGradient"
                  x1="18"
                  x2="1.55"
                  y1="18"
                  y2="2.477"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ff6f47" />
                  <stop offset="1" stopColor="#ffcd0f" />
                </linearGradient>
              </defs>
            </g>
          </svg> */}
          <span>{`${userScore}/10`}</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-accent-400 size-5"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12.854 3.5a.979.979 0 0 0-1.708 0q-.3.546-.577 1.106a27 27 0 0 0-1.48 3.656c-.139.431-.551.73-1.023.743a29.4 29.4 0 0 0-4.267.425c-.774.136-1.065 1.018-.515 1.556q.188.185.38.365a32 32 0 0 0 3.03 2.527c.367.269.518.73.378 1.152a27 27 0 0 0-1.14 4.927c-.1.755.708 1.288 1.41.928a28.6 28.6 0 0 0 3.98-2.472a1.15 1.15 0 0 1 1.356 0a28.5 28.5 0 0 0 3.98 2.472c.701.36 1.51-.173 1.41-.928q-.058-.425-.127-.845a27 27 0 0 0-1.013-4.082c-.14-.422.01-.883.378-1.152a31.5 31.5 0 0 0 3.41-2.892c.55-.538.26-1.42-.515-1.556a29 29 0 0 0-4.267-.425a1.1 1.1 0 0 1-1.023-.743a27 27 0 0 0-2.057-4.761"
            />
          </svg>
          <span className="text-accent-400">Rate</span>
        </>
      )}
    </Button>
  );
}
