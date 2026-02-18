import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/signin">
        <Button variant="glOutline">Sign in</Button>
      </Link>
      <Link href="/signup">
        <Button variant="glDefault">Sign up</Button>
      </Link>
    </div>
  );
}
