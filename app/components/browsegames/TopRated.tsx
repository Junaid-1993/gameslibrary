import { Game } from "@/app/types/Game";
import GameCard from "../GameCard";
import GamesGrid from "../GamesGrid";

export default function TopRated() {
  const topRatedGames: Game[] = [
    {
      id: 1,
      title: "Grand Theft Auto V",
      imageUrl: "/covers/gta-5.jpg",
      releaseDate: "June 20, 2013",
      myscore: 9,
      metascore: 97,
      topPick: true,
      added: true,
      bookmarked: false,
      favorite: true,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "PlayStation", icon: "/icons/playstation.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
      ],
    },
    {
      id: 2,
      title: "The Legend of Zelda: Breath of the Wild",
      imageUrl: "/covers/zelda.jpg",
      releaseDate: "August 25, 2020",
      myscore: null,
      metascore: 96,
      topPick: false,
      added: false,
      bookmarked: false,
      favorite: false,
      link: "#",
      platforms: [{ name: "Nintendo", icon: "/icons/nintendo.svg" }],
    },
    {
      id: 3,
      title: "Red Dead Redemption 2",
      imageUrl: "/covers/red-dead-redemption-2.jpg",
      releaseDate: "September 26, 2018",
      myscore: 9,
      metascore: 98,
      topPick: true,
      added: true,
      bookmarked: false,
      favorite: true,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "PlayStation", icon: "/icons/playstation.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
      ],
    },
    {
      id: 4,
      title: "Uncharted 2: Among Thieves",
      imageUrl: "/covers/uncharted-2.jpg",
      releaseDate: "June 10, 2016",
      myscore: null,
      metascore: 96,
      topPick: true,
      added: true,
      bookmarked: true,
      favorite: true,
      link: "#",
      platforms: [{ name: "PlayStation", icon: "/icons/playstation.svg" }],
    },
    {
      id: 5,
      title: "Resident Evil 4",
      imageUrl: "/covers/resident-evil-4.jpg",
      releaseDate: "August 28, 2025",
      myscore: 9,
      metascore: 93,
      topPick: true,
      added: true,
      bookmarked: true,
      favorite: true,
      link: "#",
      platforms: [
        { name: "Windows", icon: "/icons/windows.svg" },
        { name: "PlayStation", icon: "/icons/playstation.svg" },
        { name: "Xbox", icon: "/icons/xbox.svg" },
      ],
    },
  ];
  return (
    <GamesGrid>
      {topRatedGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </GamesGrid>
  );
}
