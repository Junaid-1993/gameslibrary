import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/get-session";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

export default async function AuthButtons() {
  const session = await getServerSession();

  return (
    <>
      {session ? (
        <ProfileDropdown user={session.user} />
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/signin">
            <Button variant="glOutline">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button variant="glDefault">Sign up</Button>
          </Link>
        </div>
      )}
    </>
  );
}
