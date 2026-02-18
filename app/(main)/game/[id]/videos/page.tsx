import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // Here we will fetch game video thumbnails from RAWG API but right we will use mock images.

  const { id } = await params;

  const videosThumbnails = [
    "the-witcher-3-photo-8.png",
    "the-witcher-3-photo-6.png",
    "the-witcher-3-photo-5.png",
    "the-witcher-3-photo-1.png",
    "the-witcher-3-photo-3.png",
  ];

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-space-grotesk text-xl font-medium xl:text-[22px]">Game Videos</h3>

      <div className="grid gap-5 lg:grid-cols-2 2xl:gap-6">
        {/* 2xl:h-96 */}
        <div className="aspect-video w-full">
          <VideoThumbnail id={id} thumbnailUrl={videosThumbnails[0]}>
            <PlayIcon className="size-16 sm:size-20" />
          </VideoThumbnail>
        </div>
        {/*  2xl:h-96 */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:gap-4">
          {videosThumbnails.slice(1).map((thumbnailUrl, index) => (
            <VideoThumbnail key={index} id={id} thumbnailUrl={thumbnailUrl}>
              <PlayIcon className="size-10 sm:size-14" />
            </VideoThumbnail>
          ))}
        </div>
      </div>

      <Button
        variant="link"
        className="text-primary-300 hover:text-primary-400 m-auto w-fit cursor-pointer text-base transition duration-300 ease-in-out hover:no-underline"
      >
        See More
      </Button>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M16.0013 29.3337C23.3651 29.3337 29.3346 23.3641 29.3346 16.0003C29.3346 8.63653 23.3651 2.66699 16.0013 2.66699C8.6375 2.66699 2.66797 8.63653 2.66797 16.0003C2.66797 23.3641 8.6375 29.3337 16.0013 29.3337Z"
        fill="#1F78EA"
        stroke="white"
        strokeLinejoin="round"
      />
      <path
        d="M13.3359 16.0006V11.3818L17.3359 13.6912L21.3359 16.0006L17.3359 18.31L13.3359 20.6194V16.0006Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoThumbnail({
  id,
  thumbnailUrl,
  children,
}: {
  id: string;
  thumbnailUrl: string;
  children?: React.ReactNode;
}) {
  return (
    // h-full
    <div className="relative aspect-video w-full cursor-pointer rounded-md border transition duration-300 ease-in-out hover:brightness-90 lg:aspect-auto lg:h-full">
      <Link href={`/game/${id}/videos/${thumbnailUrl}`}>
        <Image
          src={`/images/game/${thumbnailUrl}`}
          alt={`${id} video thumbnail`}
          className="h-auto w-full rounded object-cover"
          fill
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </Link>
    </div>
  );
}
