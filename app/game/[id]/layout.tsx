import GameHeaderDetails from "@/app/components/gamedetails/GameHeaderDetails";
import GameNavLinks from "@/app/components/gamedetails/GameNavLinks";
import LinkWithArrow from "@/app/components/LinkWithArrow";

export default async function GameLayout({
  children,
  photos,
  videos,
  params,
}: {
  children: React.ReactNode;
  photos?: React.ReactNode;
  videos?: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <div className="px-6 xl:py-2 2xl:px-12">
        <LinkWithArrow
          href="/browsegames"
          title="Go Back"
          arrowDirection="left"
          className="text-primary-300 hover:text-primary-500 border-none !pl-0"
        />
      </div>

      <GameHeaderDetails id={id} />

      {/* Tabs */}
      <section className="mx-auto my-2 flex w-full max-w-[1540px] justify-center xl:mt-8">
        <GameNavLinks id={id} />
      </section>

      <div className="mx-auto w-full max-w-[1540px] p-6 pt-2 pb-0 md:pt-6 md:pb-6 xl:px-8">
        {children}
      </div>

      {/* Photos modal slot — rendered on client navigations when intercept route is active */}
      {photos}
      {/* Videos modal slot — rendered on client navigations when intercept route is active */}
      {videos}
    </>
  );
}
