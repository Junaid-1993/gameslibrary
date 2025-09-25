import Image from "next/image";
import WishlistButton from "../WishlistButton";
import { Game } from "./UpcomingGamesCarousel";

interface CarouselSlideProps {
  game: Game;
}

export default function CarouselSlide({ game }: CarouselSlideProps) {
  return (
    <div className="flex-[0_0_80%] px-2 md:flex-[0_0_45%] xl:flex-[0_0_33.333%]">
      <div className="relative h-90 w-full overflow-hidden rounded-md md:rounded-lg">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 66vw, (max-width: 1280px) 40vw, 33vw"
        />
        <div className="from-background/50 to-background/60 absolute bottom-0 w-full bg-linear-to-b p-4 lg:px-6">
          <h4 className="font-space-grotesk text-[1.063rem] sm:text-lg lg:line-clamp-1">
            {game.title}
          </h4>
          <span className="text-xs sm:text-sm">{game.releaseDate}</span>
          <div className="mt-4 flex w-full justify-end 2xl:mt-2">
            <WishlistButton initialState={game.isWishlisted} />
          </div>
        </div>
      </div>
    </div>
  );
}
