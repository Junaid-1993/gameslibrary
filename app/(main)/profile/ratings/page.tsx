import LinkWithArrow from "@/app/components/LinkWithArrow";
import ProfileStatPageSection from "@/app/components/profile/ProfileStatPageSection";
import Lists from "@/app/data/lists.json";
import { Game } from "@/app/types/Game";

// Later the user data will come from database:

// Later we will fetch the Rated Games from a database:
const ratedGames: Game[] = Array.from(
  new Map(
    Lists.flatMap((list) => list.games.filter((game) => game.myscore)).map((game) => [
      game.title,
      game,
    ])
  ).values()
);

export default function page() {
  return (
    <div>
      <div className="flex justify-end">
        <LinkWithArrow
          href="/profile/stats"
          title="Go Back"
          arrowDirection="left"
          className="text-primary-300 hover:text-primary-500 border-none !pl-0"
        />
      </div>

      <div className="grid gap-4 md:gap-10">
        <section className="grid gap-4">
          <div className="grid gap-1">
            <h2 className="font-space-grotesk text-accent-400 text-[1.375rem] md:text-2xl 2xl:text-[1.625rem]">
              Your Ratings
            </h2>
            <p>
              by <span className="text-primary-400">Abigal</span>
            </p>
          </div>
          <div>
            <p className="text-secondary">
              View all the games you've rated in one place. This page gives you a quick snapshot of
              your personal ratings — organized, searchable, and easy to revisit.
            </p>
          </div>
        </section>
        <section>
          <ProfileStatPageSection
            statTitleCount={ratedGames.length}
            statTitles={ratedGames}
            notFoundTitle="No Rated Titles Yet"
            notFoundDescription="You have not rated any games yet."
            filter={{
              id: "filter",
              placeholder: "Filter by Rating:",
              options: [
                "10 Stars",
                "9 Stars",
                "8 Stars",
                "7 Stars",
                "6 Stars",
                "5 Stars",
                "4 Stars",
                "3 Stars",
                "2 Stars",
                "1 Star",
              ],
            }}
          />
        </section>
      </div>
    </div>
  );
}
