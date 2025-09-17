import Image from "next/image";
import { Game } from "../types/Game";
import AddToListButton from "./AddToListButton";
import BookmarkButton from "./BookmarkButton";
import FavoriteButton from "./FavoriteButton";
import LinkWithArrow from "./LinkWithArrow";
import Metascore from "./Metascore";
import PlatformIcon from "./PlatformIcon";
import StarRating from "./StarRating";
import TopPickBadge from "./TopPickBadge";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <article className="bg-surface-500 flex max-w-80 flex-col gap-3 rounded-lg p-2 transition-[background-color] duration-300 ease-in-out hover:bg-[#28292A]/80 md:gap-5 md:p-3 xl:gap-4 xl:py-3.5">
      <div className="relative">
        <BookmarkButton bookmarked={game.bookmarked} />

        <Image
          src={game.imageUrl}
          alt={`${game.title} game cover`}
          width={280}
          height={380}
          className="aspect-2/3 w-full rounded-lg object-cover"
        />

        {game.topPick && (
          <TopPickBadge
            classes={{
              container: "absolute bottom-3 left-2",
              icon: "md:size-6 xl:size-[26px]",
            }}
            fullBadge
          />
        )}
      </div>
      <div className="flex flex-col gap-3 md:gap-4 xl:gap-5">
        <h1 className="font-space-grotesk line-clamp-1 font-medium md:text-lg">{game.title}</h1>

        <div className="flex flex-col gap-3 md:gap-3.5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-1">
            {game.platforms.map((platform) => (
              <PlatformIcon key={platform.name} platform={platform} />
            ))}
          </div>
          <LinkWithArrow
            href="#"
            title="View Details"
            className="dark:hover:bg-accent-400 hover:text-background cursor-pointer transition duration-300 ease-in-out"
          />
        </div>

        <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center justify-between gap-2 xl:gap-1">
            <span className="text-sm font-medium">My Score</span>
            <StarRating userScore={game.myscore} />
          </div>

          <div className="flex items-center justify-between gap-2 xl:gap-1.5">
            <span className="text-sm font-medium">Metascore</span>
            {game?.metascore ? <Metascore score={game.metascore} /> : "N/A"}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 xl:flex-row">
        <AddToListButton
          added={game.added}
          className="w-full xl:w-[54%] xl:gap-2.5 xl:has-[>svg]:px-2.5"
        />

        <FavoriteButton
          favorite={game.favorite}
          className="w-full xl:w-[46%] xl:gap-2.5 xl:has-[>svg]:px-2.5"
        />
      </div>
    </article>
  );
}
