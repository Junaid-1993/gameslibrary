import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LinkWithArrow({
  href,
  title,
  className,
  fullWidth = false,
  arrowDirection = "right",
}: {
  href: string;
  title: string;
  className?: string;
  fullWidth?: boolean;
  arrowDirection?: "right" | "left";
}) {
  return (
    <Link href={href} className={`${fullWidth ? "w-full" : "w-fit"}`}>
      <Button
        variant="outline"
        aria-label={`${title} link`}
        className={cn(
          "group text-accent-400 dark:border-accent-400 hover:text-accent-400 h-10 w-full cursor-pointer dark:bg-transparent dark:hover:bg-transparent",
          className
        )}
      >
        <span className={`${arrowDirection === "left" ? "order-2" : "order-1"}`}>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 16 16"
          className={`transition ${arrowDirection === "left" ? "order-1 rotate-180 group-hover:-translate-x-0.5" : "order-2 group-hover:translate-x-0.5"}`}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m9 13.887l5-5V8.18l-5-5l-.707.707l4.146 4.147H2v1h10.44L8.292 13.18z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Link>
  );
}
