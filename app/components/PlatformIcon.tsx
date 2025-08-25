import Image from "next/image";

export default function PlatformIcon({
  platform,
  size = 16,
}: {
  platform: { name: string; icon: string };
  size?: number;
}) {
  return (
    <Image
      key={platform.name}
      src={platform.icon}
      alt={`${platform.name} icon`}
      width={size}
      height={size}
      className="mr-1 dark:invert"
    />
  );
}
