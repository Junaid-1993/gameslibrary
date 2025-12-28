import StatCard from "./StatCard";

interface StatsData {
  totalGames: number;
  lists: number;
  pinnedLists: number;
  journalEntries: number;
  ratings: number;
  reviews: number;
  wishlist: number;
  favorites: number;
}

export default function StatsGrid({ stats }: { stats: StatsData }) {
  const statMeta = [
    {
      iconUrl: "/icons/stats/controller.svg",
      alt: "Controller",
      title: "Total Games",
      value: stats.totalGames,
    },
    {
      iconUrl: "/icons/stats/list.svg",
      alt: "List",
      title: "Lists",
      value: stats.lists,
    },
    {
      iconUrl: "/icons/stats/pinned-list.svg",
      alt: "Pin",
      title: "Pinned Lists",
      value: stats.pinnedLists,
    },
    {
      iconUrl: "/icons/stats/journal.svg",
      alt: "Book",
      title: "Journal Entries",
      value: stats.journalEntries,
    },
    {
      iconUrl: "/icons/stats/rating.svg",
      alt: "Star",
      title: "Ratings",
      value: stats.ratings,
    },
    {
      iconUrl: "/icons/stats/reviews.svg",
      alt: "Pen",
      title: "Reviews",
      value: stats.reviews,
    },
    {
      iconUrl: "/icons/stats/wishlist.svg",
      alt: "Heart With Plus",
      title: "Wishlist",
      value: stats.wishlist,
    },
    {
      iconUrl: "/icons/stats/favorites.svg",
      alt: "Heart",
      title: "Favorites",
      value: stats.favorites,
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 md:h-full md:grid-cols-4 2xl:gap-4">
      {statMeta.map((meta) => (
        <StatCard
          key={meta.title}
          statIconUrl={meta.iconUrl}
          statIconAlt={meta.alt}
          statTitle={meta.title}
          totalStatNumber={meta.value}
        />
      ))}
    </div>
  );
}
