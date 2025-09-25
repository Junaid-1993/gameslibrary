import NewReleases from "@/app/components/browsegames/NewReleases";
import TopRated from "@/app/components/browsegames/TopRated";
import TrendingGames from "@/app/components/browsegames/TrendingGames";
import LinkWithArrow from "@/app/components/LinkWithArrow";
import { delay } from "@/lib/delay";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Allow only specific slugs ( Paths )
  const validSlugs = ["trending", "new-releases", "top-rated"];
  if (!validSlugs.includes(slug)) {
    return notFound();
  }

  // API call can be made here based on the slug to fetch relevant data
  await delay(2000);

  // Normalize the slug for display
  const normalizedSlug = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section className="mt-3 flex flex-col gap-6 2xl:mt-0 2xl:gap-7">
      <div className="gap flex flex-col justify-between sm:flex-row sm:items-center">
        <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">{normalizedSlug} Games</h3>

        <LinkWithArrow
          href="/browsegames"
          title="Go Back To Browse Games"
          arrowDirection="left"
          className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
        />
      </div>

      {slug === "trending" ? (
        <TrendingGames />
      ) : slug === "new-releases" ? (
        <NewReleases />
      ) : (
        <TopRated />
      )}
    </section>
  );
}
