import Link from "next/link";
import Image from "next/image";
import mockImagesForGame from "@/app/data/mockImages";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // Here we will fetch game images from RAWG API but right we will use mock images.

  const { id } = await params;

  const images = mockImagesForGame();

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-space-grotesk text-xl font-medium xl:text-[22px]">Game Photos</h3>

      <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((imgUrl, index) => (
          <Link
            key={index}
            href={`/game/${id}/photos/${imgUrl}`}
            className="transition duration-300 ease-in-out hover:brightness-90"
          >
            <Image
              src={`/images/game/${imgUrl}`}
              alt={`${id} screenshot`}
              className="h-auto w-full rounded"
              width={250}
              height={180}
            />
          </Link>
        ))}
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
