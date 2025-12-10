import { Game } from "@/app/types/Game";
import GameCard from "../GameCard";
import GamesGrid from "../GamesGrid";

export default function NewReleases() {
  const newReleasesGames: Game[] = [
    {
      id: 1,
      title: "Split Fiction",
      imageUrl: "/covers/split-fiction.jpg",
      releaseDate: "June 20, 2025",
      myscore: 9,
      metascore: 91,
      topPick: true,
      added: true,
      bookmarked: true,
      favorite: true,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "PlayStation", icon: "/icons/playstation.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
        { name: "Nintendo", icon: "/icons/nintendo.svg" },
      ],
    },
    {
      id: 2,
      title: "South of Midnight",
      imageUrl: "/covers/south-of-midnight.jpg",
      releaseDate: "August 25, 2025",
      myscore: null,
      metascore: 77,
      topPick: false,
      added: true,
      bookmarked: false,
      favorite: false,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
      ],
    },
    {
      id: 3,
      title: "Assassin's Creed Shadows",
      imageUrl: "/covers/assassin-creed-shadows.jpg",
      releaseDate: "September 26, 2025",
      myscore: null,
      metascore: 81,
      topPick: false,
      added: false,
      bookmarked: false,
      favorite: false,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "PlayStation", icon: "/icons/playstation.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
      ],
    },
    {
      id: 4,
      title: "Atomfall",
      imageUrl: "/covers/atomfall.jpg",
      releaseDate: "June 10, 2025",
      myscore: null,
      metascore: 74,
      topPick: false,
      added: false,
      bookmarked: false,
      favorite: false,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "PlayStation", icon: "/icons/playstation.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
        { name: "Nintendo", icon: "/icons/nintendo.svg" },
      ],
    },
    {
      id: 5,
      title: "It Takes Two",
      imageUrl: "/covers/it-takes-two.jpg",
      releaseDate: "September 12, 2025",
      myscore: 9,
      metascore: 88,
      topPick: true,
      added: true,
      bookmarked: true,
      favorite: true,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "PlayStation", icon: "/icons/playstation.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
        { name: "Nintendo", icon: "/icons/nintendo.svg" },
      ],
    },
  ];
  return (
    <GamesGrid>
      {newReleasesGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </GamesGrid>
  );
}
