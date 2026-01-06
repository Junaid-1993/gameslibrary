import LinkWithArrow from "@/app/components/LinkWithArrow";
import ProfileStatPageSection from "@/app/components/profile/ProfileStatPageSection";
import Lists from "@/app/data/lists.json";
import { Game } from "@/app/types/Game";

// Later the user data will come from database:

// Later we will fetch the Reviewed Games from a database:
const reviewedGames: Game[] = Lists[0].games.slice(1);

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
              Your Reviews
            </h2>
            <p>
              by <span className="text-primary-400">Abigal</span>
            </p>
          </div>
          <div>
            <p className="text-secondary">
              Here you'll find every review you've written — your thoughts, opinions, and
              recommendations, all in one place.
            </p>
          </div>
        </section>
        <section>
          <ProfileStatPageSection
            statTitleCount={reviewedGames.length}
            statTitles={reviewedGames}
            notFoundTitle="No Reviewed Titles Yet"
            notFoundDescription="You have not reviewed any games yet."
          />
        </section>
      </div>
    </div>
  );
}
