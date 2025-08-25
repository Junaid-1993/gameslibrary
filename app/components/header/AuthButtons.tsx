import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="glOutline">Sign in</Button>
      <Button variant="glDefault">Sign up</Button>
    </div>
  );
}
