import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LinkWithArrow({ href }: { href: string }) {
  return (
    <Link href={href} className="w-full">
      <Button
        variant="outline"
        className="group text-accent-400 dark:border-accent-400 hover:text-accent-400 h-10 w-full cursor-pointer dark:bg-transparent dark:hover:bg-transparent"
      >
        View Details
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 16 16"
          className="transition group-hover:translate-x-0.5"
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
