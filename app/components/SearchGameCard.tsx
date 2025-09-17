import { cn } from "@/lib/utils";
import Image from "next/image";
import PlatformIcon from "./PlatformIcon";
import Metascore from "./Metascore";
import { Game } from "../types/Game";
import AddedBadge from "./AddedBadge";
import LinkWithArrow from "./LinkWithArrow";
import TopPickBadge from "./TopPickBadge";
import { forwardRef } from "react";

interface SearchGameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  game: Game;
  classname?: string;
}

const SearchGameCard = forwardRef<HTMLDivElement, SearchGameCardProps>(
  ({ game, className, ...props }, ref) => {
    return (
      <article
        ref={ref}
        {...props}
        className={cn(
          "dark:bg-background mm:h-[266px] flex flex-col gap-6 rounded-md p-4 transition xl:h-[202px] xl:flex-row xl:gap-4 2xl:gap-7 hover:dark:bg-[#28292A]/30",
          className
        )}
      >
        <div className="flex grow-1 gap-5 2xl:gap-8">
          <div className="mm:flex relative hidden flex-shrink-0">
            <Image
              src={game.imageUrl}
              width="110"
              height="165"
              alt={`${game.title} game cover.`}
              className="h-[165px] rounded-lg object-cover"
            />
            {game.topPick && <TopPickBadge classes={{ container: "absolute -top-3 -left-3" }} />}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-space-grotesk mm:line-clamp-2 line-clamp-1 text-lg xl:text-xl">
              {game.title}
            </h1>
            <span className="text-secondary text-sm">Released: {game.releaseDate}</span>

            <div className="mm:flex mt-4 hidden gap-1">
              {game.platforms.map((platform) => (
                <PlatformIcon key={platform.name} platform={platform} />
              ))}
            </div>
            <div className="mm:flex mt-4 hidden items-center gap-2 text-sm">
              <span>Metascore:</span>
              {game?.metascore ? <Metascore score={game.metascore} /> : "N/A"}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 xl:flex-col-reverse xl:items-end">
          <LinkWithArrow href={game.link} title="View Details" fullWidth />
          {game.added && <AddedBadge className="mm:flex hidden" />}
        </div>
      </article>
    );
  }
);

SearchGameCard.displayName = "SearchGameCard";

export default SearchGameCard;
