import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function ActionButton({
  children,
  title,
  variant = "outline",
  size = "lg",
  active,
  onClick,
}: PropsWithChildren<{
  title: string;
  variant?: "outline" | "default";
  size?: "default" | "lg";
  active?: boolean;
  onClick?: () => void;
}>) {
  return (
    <Button
      variant={variant}
      className={cn("dark:border-border-300 cursor-pointer", {
        "dark:bg-border-500 dark:border-border-400 cursor-pointer border text-white duration-250 dark:hover:border-transparent dark:hover:bg-[#184F68]":
          variant === "default",
        "dark:bg-[#184F68]": active,
      })}
      size={size}
      onClick={onClick}
    >
      {children} <span>{title}</span>
    </Button>
  );
}
