import NewReleases from "../components/browsegames/NewReleases";
import TopRated from "../components/browsegames/TopRated";
import TrendingGames from "../components/browsegames/TrendingGames";
import UpcomingGamesCarousel from "../components/browsegames/UpcomingGamesCarousel";
import LinkWithArrow from "../components/LinkWithArrow";

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-6 2xl:gap-7">
        <UpcomingGamesCarousel />
      </section>

      <section className="mt-3 flex flex-col gap-6 2xl:mt-0 2xl:gap-7">
        <div className="gap flex flex-col justify-between sm:flex-row sm:items-center">
          <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">Trending Games</h3>

          <LinkWithArrow
            href="/browsegames/trending"
            title="View All Trending Games"
            className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
          />
        </div>

        <TrendingGames />
      </section>

      <section className="mt-3 flex flex-col gap-6 2xl:mt-0 2xl:gap-7">
        <div className="gap flex flex-col justify-between sm:flex-row sm:items-center">
          <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">New Releases</h3>

          <LinkWithArrow
            href="/browsegames/new-releases"
            title="View All New Releases Games"
            className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
          />
        </div>

        <NewReleases />
      </section>

      <section className="mt-3 flex flex-col gap-6 2xl:mt-0 2xl:gap-7">
        <div className="gap flex flex-col justify-between sm:flex-row sm:items-center">
          <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">Top Rated</h3>

          <LinkWithArrow
            href="/browsegames/top-rated"
            title="View All Top Rated Games"
            className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
          />
        </div>

        <TopRated />
      </section>
    </>
  );
}
