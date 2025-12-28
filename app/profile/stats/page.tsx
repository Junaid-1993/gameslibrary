import RecentActivityFeed from "@/app/components/profile/RecentActivityFeed";
import { Activity } from "@/app/components/profile/RecentActivityItem";
import StatsGrid from "@/app/components/profile/StatsGrid";
import ShareButton from "@/app/components/ShareButton";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Later the stats data will come from database:
const stats = {
  totalGames: 3,
  lists: 2,
  pinnedLists: 2,
  journalEntries: 4,
  ratings: 5,
  reviews: 8,
  wishlist: 12,
  favorites: 8,
};

// Later the activities data will come from database:
const activities: Activity[] = [
  { type: "add_to_list", gameTitle: "Cuphead", listName: "Next to Play" },
  { type: "pin_list", listName: "Next to Play" },
  { type: "entry", gameTitle: "The witcher 3" },
  { type: "wishlist", gameTitle: "Elden Ring" },
  { type: "favorite", gameTitle: "The Witcher 3" },
  // { type: "rating", gameTitle: "Cyberpunk 2077", rating: 4 },
  // { type: "review", gameTitle: "Baldur's Gate 3" },
  // { type: "create_list", listName: "RPG Classics" },
];

export default function Page() {
  return (
    <div className="grid gap-8 lg:gap-12">
      <section className="from-surface-500 to-border-500 rounded-xl bg-linear-to-r p-6 md:py-10 lg:px-10 xl:p-12">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="justify-self-end md:col-start-2 md:row-start-1">
            <Link href="/profile/edit">
              <Settings color="#FCA311" size={32} />
            </Link>
          </div>
          <div className="md:col-start-1 md:row-start-1">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
              <div className="self-center">
                <Image
                  src="/avatars/user-profile-img.png"
                  alt="User Profile Image"
                  width={150}
                  height={150}
                  className="rounded-full border-2 border-white md:h-36 md:w-36 lg:h-40 lg:w-40"
                />
              </div>
              <div className="grid gap-4 md:grow">
                <div className="justify-self-center md:justify-self-start">
                  <div className="text-center md:text-start">
                    <h2 className="font-space-grotesk text-xl font-medium lg:text-2xl">Abigal</h2>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div>
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <span className="text-secondary text-sm">Joined May 2025</span>
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="line-clamp-1 lg:line-clamp-2">
                    RPG and adventure game enthusiast 🎮✨
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary-900 px-3 py-1 text-sm text-white">RPGs</Badge>
                  <Badge className="bg-success-900 px-3 py-1 text-sm text-white">Adventure</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-self-end md:col-start-2 md:row-start-1 md:self-end">
            <ShareButton className="dark:bg-surface-500-500 dark:border-none" />
          </div>
        </div>
      </section>

      <div className="grid items-start gap-8 md:grid-cols-[1fr_300px] md:gap-4 lg:grid-cols-[1fr_350px] 2xl:grid-cols-[1fr_450px] 2xl:gap-6">
        <section className="md:self-stretch">
          <h3 className="font-space-grotesk text-accent-400 text-lg font-medium lg:text-xl">
            Your Library Stats
          </h3>
          <div className="mt-4 md:h-[352px] lg:mt-6 xl:h-[362px]">
            <StatsGrid stats={stats} />
          </div>
        </section>
        <section className="md:self-stretch">
          <h3 className="font-space-grotesk text-accent-400 text-lg font-medium lg:text-xl">
            Recent Activity
          </h3>

          <div className="border-border-400 mt-4 rounded-lg border md:h-[352px] lg:mt-6 xl:h-[362px]">
            <RecentActivityFeed activities={activities} />
          </div>
        </section>
      </div>
    </div>
  );
}
