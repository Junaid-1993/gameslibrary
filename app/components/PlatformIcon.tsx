import { cn } from "@/lib/utils";

export default function PlatformIcon({
  platform,
  size = 16,
  className,
}: {
  platform: { name: string; icon: string };
  size?: number;
  className?: string;
}) {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      key={platform.name}
      src={platform.icon}
      alt={`${platform.name} icon`}
      width={size}
      height={size}
      className={cn("mr-1 dark:invert", className)}
    />
  );
}
