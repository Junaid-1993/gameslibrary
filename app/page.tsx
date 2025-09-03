import { Button } from "@/components/ui/button";
import AllFeatures from "./components/homepage/AllFeatures";
import HeroCoversResponsiveWrapper from "./components/homepage/HeroCoversResponsiveWrapper";
import AllFeaturesExplain from "./components/homepage/AllFeaturesExplain";
import Link from "next/link";
import MarqueeCovers from "./components/homepage/MarqueeCovers";

export default function Home() {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-[1516px] flex-col gap-13 px-6 md:mt-9 lg:px-8 xl:gap-10 2xl:mt-0 2xl:gap-16">
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

      <section className="flex flex-col gap-10 xl:p-3 2xl:gap-18">
        <h2 className="font-space-grotesk text-[1.375rem] md:text-2xl 2xl:text-[1.75rem]">
          Features Preview
        </h2>

        <div className="flex flex-wrap justify-center gap-12 md:gap-4 md:gap-y-10 lg:gap-10 lg:gap-y-12">
          <AllFeatures />
        </div>
      </section>

      <section className="flex flex-col gap-10 xl:p-3 2xl:gap-18">
        <h2 className="font-space-grotesk text-[1.375rem] md:text-2xl 2xl:text-[1.75rem]">
          How It Works
        </h2>

        <div className="flex flex-col gap-12 2xl:gap-16">
          <AllFeaturesExplain />
        </div>
      </section>

      <section className="md:flex md:items-center md:gap-10 xl:p-3 2xl:gap-18">
        <div className="flex flex-col gap-6 md:w-1/2">
          <div className="flex flex-col gap-4 2xl:mr-20">
            <h2 className="font-space-grotesk text-[1.375rem] md:text-2xl 2xl:text-[1.75rem]">
              Sign Up & Start Organizing Your Gaming Journey
            </h2>
            <p>
              Discover new games, build your ultimate library, and keep track of everything you
              play. Create custom lists, add favorites, write reviews, and personalize your
              collection — all in one place. Your gaming story deserves a home.
            </p>
          </div>
          <Button
            variant="default"
            className="from-primary-900 to-primary-700 hover:to-primary-600 h-10 w-fit cursor-pointer bg-linear-to-r text-white transition duration-300 ease-in-out"
          >
            Get Started Free
          </Button>
          <p>
            Already a member?{" "}
            <Link href="/login" className="text-primary-400">
              [Log In]
            </Link>
          </p>
        </div>

        <div
          className={`dark:bg-surface-500 mx-auto mt-8 flex h-56 w-full max-w-96 items-center justify-center rounded-md shadow-[0_0_72.84px_0,0_0_20.81px_0,0_0_10.41px_0] shadow-[#364549] md:mt-0 md:w-1/2 lg:h-56 xl:h-65 xl:max-w-[450px] 2xl:h-80 2xl:max-w-[580px]`}
        >
          <MarqueeCovers />
        </div>
      </section>

      <section className="flex flex-col gap-10 xl:p-3 2xl:gap-18">
        <h2 className="font-space-grotesk text-center text-[1.375rem] md:text-2xl 2xl:text-[1.75rem]">
          Try Before You Sign Up
        </h2>
        <div className="md:flex md:items-center md:gap-10">
          <div className="flex flex-col gap-6 md:w-1/2">
            <div className="flex flex-col gap-4 2xl:mr-25">
              <h3 className="font-space-grotesk text-xl font-bold md:text-[1.375rem] 2xl:text-[1.625rem]">
                Explore with a{" "}
                <span className="from-accent-300 to-accent-500 bg-gradient-to-r bg-clip-text text-transparent">
                  Demo Account
                </span>
              </h3>
              <p>No email or setup required.</p>
              <p>
                Jump right in and experience how GamesLibrary works — browse games, create lists,
                write reviews, and discover features with a fully functional demo account.
              </p>
              <p>Not ready to sign up? No problem.</p>
            </div>
            <Button
              variant="default"
              className="from-primary-900 to-primary-700 hover:to-primary-600 h-10 w-fit cursor-pointer bg-linear-to-r text-white transition duration-300 ease-in-out"
            >
              Try the Demo
            </Button>
            <p>Your progress won&#39;t be saved — sign up anytime to create your own library.</p>
          </div>

          <div
            className={`dark:bg-surface-500 mx-auto mt-8 flex h-52 w-full max-w-96 items-center justify-center rounded-md border border-amber-500 md:mt-0 md:w-1/2 lg:h-56 xl:h-65 xl:max-w-[450px] 2xl:h-72 2xl:max-w-[550px]`}
          >
            <p className="text-center text-sm">
              Screenshot or a Gif explaining this feature of the app.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
