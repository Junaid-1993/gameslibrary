export default function Page() {
  const overviewData = {
    releaseDate: "May 18, 2025",
    genres: ["Role-Playing, ", "Adventure"],
    platforms: ["PC, ", "Xbox One, ", "PS4, ", "Nintendo Switch"],
    developers: "CD Projekt Red",
    esrbRating: "Mature (M)",
    playMode: "Single-Player",
  };

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      <div className="flex flex-col gap-6">
        <h3 className="font-space-grotesk text-xl font-medium xl:text-[22px]">Overview</h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-4 lg:justify-between">
          <OverviewDetail detailTitle="Release Date" detailContent={overviewData.releaseDate} />
          <OverviewDetail detailTitle="Genres" detailContent={overviewData.genres} />
          <OverviewDetail detailTitle="Platforms" detailContent={overviewData.platforms} />
          <OverviewDetail detailTitle="Developers" detailContent={overviewData.developers} />
          <OverviewDetail detailTitle="ESRB Rating" detailContent={overviewData.esrbRating} />
          <OverviewDetail detailTitle="Play Mode" detailContent={overviewData.playMode} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-space-grotesk text-xl font-medium xl:text-[22px]">About the Game</h3>

        <div className="flex flex-col gap-6">
          <p>
            The Witcher 3: Wild Hunt is a action role-playing game developed and published by CD
            Projekt. It is the sequel to the 2011 game The Witcher 2: Assassins of Kings and the
            third game in The Witcher video game series, played in an open world with a third-person
            perspective. The games follow the Witcher series of fantasy novels by Polish author
            Andrzej Sapkowski.
          </p>
          <p>
            The game takes place in a fictional fantasy world based on Slavic folklore. Players
            control Geralt of Rivia, a monster slayer for hire known as a Witcher, and search for
            his adopted daughter who is on the run from the Wild Hunt. Players battle the
            game&apos;s many dangers with weapons and magic, interact with non-player characters,
            and complete quests to acquire experience points and gold, which are used to increase
            Geralt&apos;s abilities and purchase equipment. The game&apos;s story has three possible
            endings, determined by the player&apos;s choices at key points in the narrative.{" "}
          </p>
          <p>
            Development began in 2011 and lasted for three and a half years. Central and Northern
            European cultures formed the basis of the game&apos;s world. The game was developed
            using the REDengine 3, which enabled CD Projekt to create a complex story without
            compromising its open world. The music was primarily composed by Marcin Przybyłowicz and
            performed by the Brandenburg State Orchestra.
          </p>
          <p>
            The Witcher 3: Wild Hunt was released for PlayStation 4, Windows, and Xbox One in May
            2015, with a Nintendo Switch version released in October 2019, and PlayStation 5 and
            Xbox Series X/S versions (subtitled &quot;Complete Edition&quot;) released in December
            2022. The game received critical acclaim, with praise for its gameplay, narrative, world
            design, combat, and visuals, although it received minor criticism due to technical
            issues. It holds more than 200 game of the year awards and has been cited as one of the
            greatest video games ever made. Two expansions were also released to critical acclaim:
            Hearts of Stone and Blood and Wine. A &quot;Game of the Year Edition&quot; was released
            in August 2016, with the base game, expansions and all downloadable content included.
            The game has sold over 50 million units as of March 2023, making it one of the
            best-selling video games of all time. A sequel titled The Witcher IV is in development.
          </p>
        </div>
      </div>
    </div>
  );
}

function OverviewDetail({
  detailTitle,
  detailContent,
}: {
  detailTitle: string;
  detailContent: string | string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-secondary text-sm">{detailTitle}</span>
      <span>{detailContent}</span>
    </div>
  );
}
