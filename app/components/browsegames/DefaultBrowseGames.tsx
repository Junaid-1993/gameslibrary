import LinkWithArrow from "../LinkWithArrow";
import NewReleases from "./NewReleases";
import TopRated from "./TopRated";
import TrendingGames from "./TrendingGames";
import UpcomingGamesCarousel from "./UpcomingGamesCarousel";

export default function DefaultBrowseGames() {
  return (
    <>
      <section className="flex flex-col gap-6 2xl:gap-7">
        <UpcomingGamesCarousel />
      </section>

      <GameCategorySection headingTitle="Trending Games" linkTitle="Trending Games">
        <TrendingGames />
      </GameCategorySection>

      <GameCategorySection headingTitle="New Releases" linkTitle="New Releases Games">
        <NewReleases />
      </GameCategorySection>

      <GameCategorySection headingTitle="Top Rated" linkTitle="Top Rated Games">
        <TopRated />
      </GameCategorySection>
    </>
  );
}

function GameCategorySection({
  headingTitle,
  linkTitle,
  children,
}: {
  headingTitle: string;
  linkTitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 flex flex-col gap-6 2xl:mt-12 2xl:gap-7">
      <div className="gap flex flex-col justify-between sm:flex-row sm:items-center">
        <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">{headingTitle}</h3>

        <LinkWithArrow
          href="/browsegames/trending"
          title={`View All ${linkTitle}`}
          className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
        />
      </div>

      {children}
    </section>
  );
}
