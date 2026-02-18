import LinkWithArrow from "@/app/components/LinkWithArrow";
import ProfileStatPageSection from "@/app/components/profile/ProfileStatPageSection";
import Lists from "@/app/data/lists.json";
import { Game } from "@/app/types/Game";

// Later the user data will come from database:

// Later we will fetch the Games that has journal entries from a database:
const entiresAddedGames: Game[] = Lists[0].games.slice(2);

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
              Your Entries
            </h2>
            <p>
              by <span className="text-primary-400">Abigal</span>
            </p>
          </div>
          <div>
            <p className="text-secondary">
              A complete list of your journal entries across all games — track your thoughts,
              sessions, and progress in one place.
            </p>
          </div>
        </section>
        <section>
          <ProfileStatPageSection
            statTitleCount={entiresAddedGames.length}
            statTitles={entiresAddedGames}
            notFoundTitle="No Journal Entries Added Titles Yet"
            notFoundDescription="You have not written any journal entry to any games yet."
            filter={{
              id: "filter",
              placeholder: "Filter by Date:",
              options: [
                "Last 7 Days",
                "Last 30 Days",
                "Last 3 Months",
                "Last 6 Months",
                "Last Year",
                "All Time",
              ],
            }}
          />
        </section>
      </div>
    </div>
  );
}
