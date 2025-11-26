export default function PlatformIcon({
  platform,
  size = 16,
}: {
  platform: { name: string; icon: string };
  size?: number;
}) {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      key={platform.name}
      src={platform.icon}
      alt={`${platform.name} icon`}
      width={size}
      height={size}
      className="mr-1 dark:invert"
    />
  );
}
