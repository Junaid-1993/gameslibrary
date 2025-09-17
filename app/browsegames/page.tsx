import BrowseGamesFilters from "../components/browsegames/BrowseGamesFilters";
import NewReleases from "../components/browsegames/NewReleases";
import TopRated from "../components/browsegames/TopRated";
import TrendingGames from "../components/browsegames/TrendingGames";
import UpcomingGamesCarousel from "../components/browsegames/UpcomingGamesCarousel";
import LinkWithArrow from "../components/LinkWithArrow";

export default function page() {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-[1540px] flex-col gap-6 px-6 md:mt-9 lg:px-8 xl:gap-8 2xl:mt-10 2xl:gap-12">
      <section className="flex flex-col gap-6 2xl:gap-7">
        <div>
          <h2 className="font-space-grotesk mb-2 text-[1.375rem] md:text-2xl 2xl:text-[1.625rem]">
            Browse Games
          </h2>
          <p>
            Discover your next favorite game. Explore trending titles, new releases, or search by
            genre, platform, and more.
          </p>
        </div>

        <BrowseGamesFilters />
      </section>

      <section className="flex flex-col gap-6 2xl:gap-7">
        <UpcomingGamesCarousel />
      </section>

      <section className="mt-3 flex flex-col gap-6 2xl:mt-0 2xl:gap-7">
        <div className="gap flex flex-col justify-between sm:flex-row sm:items-center">
          <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">Trending Games</h3>

          <LinkWithArrow
            href="#"
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
            href="#"
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
            href="#"
            title="View All Top Rated Games"
            className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
          />
        </div>

        <TopRated />
      </section>
    </div>
  );
}
