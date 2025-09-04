import BrowseGamesFilters from "../components/browsegames/BrowseGamesFilters";
import UpcomingGamesCarousel from "../components/browsegames/UpcomingGamesCarousel";

export default function page() {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-[1516px] flex-col gap-6 px-6 md:mt-9 lg:px-8 xl:gap-8 2xl:mt-10 2xl:gap-12">
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
    </div>
  );
}
