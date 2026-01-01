import GameCard from "@/app/components/GameCard";
import GamesGrid from "@/app/components/GamesGrid";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import ListItemGrid from "@/app/components/mylibrary/ListItemGrid";
import { ListProps } from "@/app/components/mylibrary/ListItemRow";
import RecentActivityFeed from "@/app/components/profile/RecentActivityFeed";
import { Activity } from "@/app/components/profile/RecentActivityItem";
import StatsGrid from "@/app/components/profile/StatsGrid";
import ShareButton from "@/app/components/ShareButton";
import Lists from "@/app/data/lists.json";
import { Game } from "@/app/types/Game";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Heart,
  HeartPlus,
  List,
  Notebook,
  PencilLine,
  Settings,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Later the stats data will come from database:
const stats = {
  totalGames: 3,
  lists: 2,
  pinnedLists: 2,
  journalEntries: 4,
  ratings: 5,
  reviews: 8,
  wishlist: 12,
  favorites: 8,
};

// Later the activities data will come from database:
const activities: Activity[] = [
  { type: "add_to_list", gameTitle: "Cuphead", listName: "Next to Play" },
  { type: "pin_list", listName: "Next to Play" },
  { type: "entry", gameTitle: "The witcher 3" },
  // { type: "wishlist", gameTitle: "Elden Ring" },
  // { type: "favorite", gameTitle: "The Witcher 3" },
  { type: "rating", gameTitle: "Cyberpunk 2077", rating: 4 },
  // { type: "review", gameTitle: "Baldur's Gate 3" },
  { type: "create_list", listName: "RPG Classics" },
];

// Later we will fetch the lists from a database:
const lists: ListProps[] = Lists;

// Later we will fetch the favoriteGames from a database:
const favoriteGames: Game[] = Array.from(
  new Map(
    Lists.flatMap((list) => list.games.filter((game) => game.favorite)).map((game) => [
      game.title,
      game,
    ])
  ).values()
);

// Later we will fetch the Rated Games from a database:
const ratedGames: Game[] = Array.from(
  new Map(
    Lists.flatMap((list) => list.games.filter((game) => game.myscore)).map((game) => [
      game.title,
      game,
    ])
  ).values()
);

// Later we will fetch the Reviewed Games from a database:
const reviewedGames: Game[] = Lists[0].games.slice(1);

// Later we will fetch the Games that has journal entries from a database:
const entiresAddedGames: Game[] = Lists[0].games.slice(2);

// Later we will fetch the Wishlists Games from a database:
const wishlistsGames: Game[] = Lists[0].games.slice(3);

export default function Page() {
  return (
    <div className="grid gap-8 lg:gap-12">
      <section className="from-surface-500 to-border-500 rounded-xl bg-linear-to-r p-6 md:py-10 lg:px-10 xl:p-12">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="justify-self-end md:col-start-2 md:row-start-1">
            <Link href="/profile/edit">
              <Settings color="#FCA311" size={32} className="transition hover:rotate-45" />
            </Link>
          </div>
          <div className="md:col-start-1 md:row-start-1">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
              <div className="self-center">
                <Image
                  src="/avatars/user-profile-img.png"
                  alt="User Profile Image"
                  width={150}
                  height={150}
                  className="rounded-full border-2 border-white md:h-36 md:w-36 lg:h-40 lg:w-40"
                />
              </div>
              <div className="grid gap-4 md:grow">
                <div className="justify-self-center md:justify-self-start">
                  <div className="text-center md:text-start">
                    <h2 className="font-space-grotesk text-xl font-medium lg:text-2xl">Abigal</h2>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div>
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <span className="text-secondary text-sm">Joined May 2025</span>
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="line-clamp-1 lg:line-clamp-2">
                    RPG and adventure game enthusiast 🎮✨
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary-900 px-3 py-1 text-sm text-white">RPGs</Badge>
                  <Badge className="bg-success-900 px-3 py-1 text-sm text-white">Adventure</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-self-end md:col-start-2 md:row-start-1 md:self-end">
            <ShareButton className="dark:bg-surface-500-500 dark:border-none" />
          </div>
        </div>
      </section>

      <div className="grid items-start gap-8 md:grid-cols-[1fr_300px] md:gap-4 lg:grid-cols-[1fr_350px] 2xl:grid-cols-[1fr_450px] 2xl:gap-6">
        <section className="md:self-stretch">
          <h3 className="font-space-grotesk text-accent-400 text-lg font-medium lg:text-xl">
            Your Library Stats
          </h3>
          <div className="mt-4 md:h-[352px] lg:mt-6 xl:h-[362px]">
            <StatsGrid stats={stats} />
          </div>
        </section>
        <section className="md:self-stretch">
          <h3 className="font-space-grotesk text-accent-400 text-lg font-medium lg:text-xl">
            Recent Activity
          </h3>

          <div className="border-border-400 mt-4 rounded-lg border md:h-[352px] lg:mt-6 xl:h-[362px]">
            <RecentActivityFeed activities={activities} />
          </div>
        </section>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-[1fr_300px] md:gap-4 lg:grid-cols-[1fr_350px] xl:gap-4 2xl:grid-cols-[1fr_450px] 2xl:gap-6">
        <section className="md:self-stretch">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-space-grotesk text-accent-400 text-lg font-medium lg:text-xl">
              Your Lists
            </h3>
            <LinkWithArrow href="/mylibrary/lists" title="View All Lists" />
          </div>
          <div className="mt-6">
            {lists.length >= 1 ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-2 lg:gap-3 xl:grid-cols-3">
                {lists.slice(0, 3).map((list, idx) => (
                  <div className={idx === 2 ? "md:hidden xl:block" : ""} key={list.id}>
                    <ListItemGrid key={list.id} {...list} profileList />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[70%] items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <List color="#818793" className="size-8" />
                  <p className="text-secondary text-sm">No Lists Yet.</p>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="md:self-stretch">
          <div className="border-border-400 grid h-full grid-rows-[1fr_auto] gap-4 rounded-lg border p-4 md:gap-6">
            {favoriteGames.length >= 1 ? (
              <div className="grid grid-cols-2 gap-4 2xl:grid-cols-[max-content_auto]">
                {/* Left big cover */}
                <div className="relative h-full w-full 2xl:w-[150px]">
                  <Image
                    src={favoriteGames[0].imageUrl}
                    alt={`${favoriteGames[0].title} Game Cover`}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>

                {/* Right 4 or 6 smaller covers */}
                <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 md:gap-2 2xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, idx) => {
                    const game = favoriteGames[idx + 1]; // skip the first one (big cover)
                    return game ? (
                      <div
                        className={`relative aspect-[2/3] w-full 2xl:h-[100px] 2xl:w-[78px] ${idx === 4 || idx === 5 ? "hidden 2xl:block" : ""}`}
                        key={game.id}
                      >
                        <Image
                          src={game.imageUrl}
                          alt={`${game.title} Game Cover`}
                          fill
                          className="rounded-sm object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        key={`placeholder-${idx}`}
                        className={`border-border-400 relative aspect-[2/3] w-full flex-shrink-0 rounded-sm border 2xl:h-[100px] 2xl:w-[78px] ${idx === 4 || idx === 5 ? "hidden 2xl:block" : ""}`}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <Heart color="#818793" className="size-8" />
                  <p className="text-secondary text-sm">No Favorite Titles Yet.</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-2">
              <h3 className="font-space-grotesk text-accent-400 text-lg font-medium lg:text-xl">
                Favorites
              </h3>
              <LinkWithArrow href="/mylibrary/favorites" title="View All Favorites" />
            </div>
          </div>
        </section>
      </div>

      <ProfileGamesGridList
        listTitle="Ratings"
        listShortDescription="Most Recently Rated"
        titles={ratedGames}
        noTitlesText="No Rated Titles Yet."
      >
        <Star color="#818793" className="size-8" />
      </ProfileGamesGridList>

      <ProfileGamesGridList
        listTitle="Reviews"
        listShortDescription="Most Recently Reviewed"
        titles={reviewedGames}
        noTitlesText="No Reviewed Titles Yet."
      >
        <PencilLine color="#818793" className="size-8" />
      </ProfileGamesGridList>
      <ProfileGamesGridList
        listTitle="Entries"
        listShortDescription="Most Recent Entries"
        titles={entiresAddedGames}
        noTitlesText="No Journal Entries Added Titles Yet."
      >
        <Notebook color="#818793" className="size-8" />
      </ProfileGamesGridList>
      <ProfileGamesGridList
        listTitle="Wishlist"
        listShortDescription="Most Recent Wishlists Titles"
        titles={wishlistsGames}
        noTitlesText="No Wishlists Titles Yet."
      >
        <HeartPlus color="#818793" className="size-8" />
      </ProfileGamesGridList>
    </div>
  );
}

function ProfileGamesGridList({
  listTitle,
  listShortDescription,
  titles,
  noTitlesText,
  children,
}: {
  listTitle: "Ratings" | "Reviews" | "Entries" | "Wishlist";
  listShortDescription: string;
  titles: Game[] | [];
  noTitlesText: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-space-grotesk text-accent-400 text-lg font-medium lg:text-xl">
            Your {listTitle}
          </h3>
          <p className="text-secondary mt-1 text-sm lg:mt-1.5">{listShortDescription}</p>
        </div>
        <LinkWithArrow
          href={
            listTitle === "Wishlist" ? "/mylibrary/wishlist" : `/profile/${listTitle.toLowerCase()}`
          }
          title={`View All ${listTitle}`}
        />
      </div>
      <div className="mt-6">
        {titles.length >= 1 ? (
          <GamesGrid>
            {titles.slice(0, 5).map((game, idx) => (
              <div key={game.id} className={idx === 4 ? "hidden 2xl:block" : ""}>
                <GameCard game={game} />
              </div>
            ))}
          </GamesGrid>
        ) : (
          <div className="flex h-[70%] items-center justify-center py-6">
            <div className="flex flex-col items-center gap-2">
              {children}
              <p className="text-secondary text-sm">{noTitlesText}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
