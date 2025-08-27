import { Button } from "@/components/ui/button";
import AllFeatures from "./components/homepage/AllFeatures";
import HeroCoversResponsiveWrapper from "./components/homepage/HeroCoversResponsiveWrapper";

export default function Home() {
  return (
    <main className="mx-auto mt-5 flex w-full max-w-[1516px] flex-col gap-13 rounded-2xl px-6 md:mt-9 lg:px-8 xl:gap-10 2xl:mt-0">
      <section className="items-center gap-6 md:flex lg:gap-8 xl:gap-10 xl:p-3 2xl:gap-12">
        <div className="flex-col justify-center md:flex md:h-80 md:w-1/2 xl:h-[400px] 2xl:mr-10 2xl:h-[450px]">
          <h1 className="font-space-grotesk mb-5 text-3xl xl:mb-6 xl:text-4xl 2xl:w-[550px] 2xl:text-[2.5rem]">
            Discover, Review, and Organize Your Favorite Games
          </h1>
          <p className="text-secondary xl:text-lg">
            GamesLibrary is your personal hub to explore games, write reviews, and curate your
            wishlist with ease.
          </p>
          <div className="mt-9 flex items-center gap-5 xl:mt-8">
            <Button
              variant="default"
              className="from-primary-900 to-primary-700 hover:to-primary-600 h-10 cursor-pointer bg-linear-to-r text-white transition duration-300 ease-in-out"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              className="text-accent-400 dark:border-accent-400 hover:text-background dark:hover:bg-accent-400 h-10 cursor-pointer transition duration-300 ease-in-out"
            >
              Browse Games
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <HeroCoversResponsiveWrapper />
        </div>
      </section>

      <section className="flex flex-col gap-13 xl:p-3 2xl:gap-20">
        <h2 className="font-space-grotesk text-[1.375rem] md:text-2xl 2xl:text-[1.75rem]">
          Features Preview
        </h2>

        <div className="flex flex-wrap justify-center gap-12 md:gap-4 md:gap-y-10 lg:gap-10 lg:gap-y-12">
          <AllFeatures />
        </div>
      </section>
    </main>
  );
}
