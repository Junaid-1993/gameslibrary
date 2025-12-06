import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

export default function ActionButton({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <Button variant="outline" className="dark:border-border-300 cursor-pointer" size="lg">
      {children} <span>{title}</span>
    </Button>
  );
}
