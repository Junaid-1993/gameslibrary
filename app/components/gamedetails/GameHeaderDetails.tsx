import { cn } from "@/lib/utils";
import Image from "next/image";
import AddToListButton from "../AddToListButton";
import FavoriteButton from "../FavoriteButton";
import Metascore from "../Metascore";
import PlatformIcon from "../PlatformIcon";
import ShareButton from "../ShareButton";
import StarRating from "../StarRating";
import TopPickBadge from "../TopPickBadge";
import WishlistButton from "../WishlistButton";

const game = {
  id: 1,
  title: "The Witcher 3: Wild Hunt",
  imageUrl: "/covers/the-witcher-3-wild-hunt-1.jpg",
  releaseDate: "May 18, 2020",
  company: "CD Projekt Red",
  myscore: null,
  metascore: 96,
  topPick: true,
  added: false,
  bookmarked: false,
  favorite: false,
  genres: ["RPG", "Strategy"],
  link: "#",
  platforms: [
    { name: "PC", icon: "/icons/windows.svg" },
    { name: "PlayStation", icon: "/icons/playstation.svg" },
    { name: "Xbox", icon: "/icons/xbox.svg" },
    { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
  ],
};

export default function GameHeaderDetails({ id }: { id: string }) {
  return (
    <section
      className={cn(
        "border-border-300 relative mt-4 border-b-[1px] bg-[url(/images/witcher-3-wild-hunt.jpg)] bg-cover p-6 lg:h-[450px] lg:py-0 xl:h-[550px] xl:px-8",
        // Before
        "before:absolute before:inset-0 before:bg-linear-to-b before:from-black/50 before:to-black/70",
        // Position
        "bg-position-[center_right_-10rem] bg-no-repeat md:bg-position-[center_center] xl:bg-position-[center_top_-5rem]"
      )}
    >
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-[1540px]">
          <div className="flex flex-col gap-8 md:gap-14 lg:flex-row lg:items-end">
            <div className="relative h-60 w-44 shadow-md lg:h-64 lg:w-52 xl:h-80 xl:w-64">
              <Image
                src="/covers/the-witcher-3-wild-hunt-1.jpg"
                alt={`${id} game cover`}
                fill
                className="rounded-md object-cover lg:rounded-none lg:rounded-tl-md lg:rounded-tr-md"
              />
            </div>

            <div className="mb-4 flex grow flex-col gap-4 xl:mb-5 xl:gap-6">
              <div>
                <h2 className="font-space-grotesk text-2xl font-medium xl:text-3xl">
                  {game.title}
                </h2>
                <div className="text-secondary mt-2 flex gap-4 text-sm font-medium md:mt-3 md:gap-6 xl:text-base">
                  <span>{game.company}</span>
                  <span>•</span>
                  <span>{game.releaseDate}</span>
                </div>
              </div>
              <div className="mt-2 flex max-w-[435px] justify-between md:max-w-[450px]">
                <div className="flex gap-2">
                  {game.platforms.map((platform, id) => (
                    <PlatformIcon key={id} platform={platform} />
                  ))}
                </div>

                {game.topPick && (
                  <TopPickBadge
                    fullBadge
                    classes={{ container: "xl:h-8.5", icon: "md:size-6 lg:size-[26px]" }}
                  />
                )}
              </div>

              <div className="flex max-w-[435px] items-center justify-between md:max-w-[450px]">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-sm font-medium xl:text-base">My Score</span>
                  <StarRating userScore={game.myscore} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium xl:text-base">Metascore</span>
                  {game?.metascore ? <Metascore score={game.metascore} solidColor /> : "N/A"}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-y-3 xl:mt-8">
                <div className="flex flex-wrap gap-2 gap-y-3 md:gap-4">
                  <WishlistButton transparent />
                  <FavoriteButton />
                  <AddToListButton />
                </div>

                <div className="flex grow justify-end sm:grow-0">
                  <ShareButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
