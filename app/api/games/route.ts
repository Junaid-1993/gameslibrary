import { NextResponse } from "next/server";

const mockGames = {
    trending: [{
        id: 1,
        title: "The Last of Us Part 1",
        imageUrl: "/covers/the-last-of-us.jpg",
        releaseDate: "May 20, 2026",
        myscore: 10,
        metascore: 95,
        topPick: true,
        added: true,
        bookmarked: true,
        favorite: true,
        genres: ["Action", "Adventure"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
        ],
    },
    {
        id: 2,
        title: "Resident Evil 4",
        imageUrl: "/covers/resident-evil-4.jpg",
        releaseDate: "August 28, 2025",
        myscore: 9,
        metascore: 93,
        topPick: true,
        added: true,
        bookmarked: true,
        favorite: true,
        genres: ["Action", "Adventure"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
            { name: "Xbox", icon: "/icons/xbox.svg" },
        ],
    },
    {
        id: 3,
        title: "Returnal",
        imageUrl: "/covers/returnal.jpg",
        releaseDate: "September 21, 2025",
        myscore: null,
        metascore: 86,
        topPick: false,
        added: false,
        bookmarked: false,
        favorite: false,
        genres: ["Shooter", "Adventure", "Action"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
        ],
    },
    {
        id: 4,
        title: "Hogwarts Legacy",
        imageUrl: "/covers/hogwarts-legacy.jpg",
        releaseDate: "June 26, 2025",
        myscore: null,
        metascore: 84,
        topPick: false,
        added: false,
        bookmarked: false,
        favorite: false,
        genres: ["RPG", "Adventure"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
            { name: "Xbox", icon: "/icons/xbox.svg" },
            { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
        ],
    },
    {
        id: 5,
        title: "Need For Speed The Run",
        imageUrl: "/covers/need-for-speed-the-run.jpg",
        releaseDate: "March 27, 2016",
        myscore: 8,
        metascore: 68,
        topPick: true,
        added: false,
        bookmarked: false,
        favorite: true,
        genres: ["Adventure"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
            { name: "Xbox", icon: "/icons/xbox.svg" },
            { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
        ],
    },
    {
        id: 6,
        title: "It Takes Two",
        imageUrl: "/covers/it-takes-two.jpg",
        releaseDate: "September 12, 2025",
        myscore: 9,
        metascore: 88,
        topPick: true,
        added: true,
        bookmarked: true,
        favorite: true,
        genres: ["Adventure"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
            { name: "Xbox", icon: "/icons/xbox.svg" },
            { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
        ],
    },
    {
        id: 7,
        title: "Call of Duty: Modern Warfare 3",
        imageUrl: "/covers/call-of-duty-mw-3.jpg",
        releaseDate: "Aug 8, 2020",
        myscore: 7,
        metascore: 88,
        topPick: false,
        added: true,
        bookmarked: false,
        favorite: false,
        genres: ["Shooter"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
            { name: "Xbox", icon: "/icons/xbox.svg" },
            { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
        ],
    },
    {
        id: 8,
        title: "Metal Gear Solid 3",
        imageUrl: "/covers/metal-gear-solid-3.jpg",
        releaseDate: "Oct 2, 2007",
        myscore: null,
        metascore: 91,
        topPick: false,
        added: true,
        bookmarked: false,
        favorite: false,
        genres: ["Action"],
        link: "#",
        platforms: [
            { name: "PC", icon: "/icons/windows.svg" },
            { name: "PlayStation", icon: "/icons/playstation.svg" },
            { name: "Xbox", icon: "/icons/xbox.svg" },
            { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
        ],
    }],

    newReleases: [
        {
            id: 9,
            title: "Split Fiction",
            imageUrl: "/covers/split-fiction.jpg",
            releaseDate: "June 20, 2025",
            myscore: 9,
            metascore: 91,
            topPick: true,
            added: true,
            bookmarked: true,
            favorite: true,
            genres: ["Action", "Adventure"],
            link: "#",
            platforms: [
                { name: "PC", icon: "/icons/windows.svg" },
                { name: "PlayStation", icon: "/icons/playstation.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
                { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
            ],
        },
        {
            id: 10,
            title: "South of Midnight",
            imageUrl: "/covers/south-of-midnight.jpg",
            releaseDate: "August 25, 2025",
            myscore: null,
            metascore: 77,
            topPick: false,
            added: true,
            bookmarked: false,
            favorite: false,
            genres: ["Action"],
            link: "#",
            platforms: [
                { name: "PC", icon: "/icons/windows.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
            ],
        },
        {
            id: 11,
            title: "Assassin's Creed Shadows",
            imageUrl: "/covers/assassin-creed-shadows.jpg",
            releaseDate: "September 26, 2025",
            myscore: null,
            metascore: 81,
            topPick: false,
            added: false,
            bookmarked: false,
            favorite: false,
            genres: ["Action", "RPG"],
            link: "#",
            platforms: [
                { name: "PC", icon: "/icons/windows.svg" },
                { name: "PlayStation", icon: "/icons/playstation.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
            ],
        },
        {
            id: 12,
            title: "Atomfall",
            imageUrl: "/covers/atomfall.jpg",
            releaseDate: "June 10, 2025",
            myscore: null,
            metascore: 74,
            topPick: false,
            added: false,
            bookmarked: false,
            favorite: false,
            genres: ["Action", "Strategy"],
            link: "#",
            platforms: [
                { name: "Windows PC", icon: "/icons/windows.svg" },
                { name: "PlayStation", icon: "/icons/playstation.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
                { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
            ],
        },
        {
            id: 13,
            title: "It Takes Two",
            imageUrl: "/covers/it-takes-two.jpg",
            releaseDate: "September 12, 2025",
            myscore: 9,
            metascore: 88,
            topPick: true,
            added: true,
            bookmarked: true,
            favorite: true,
            genres: ["Adventure"],
            link: "#",
            platforms: [
                { name: "PC", icon: "/icons/windows.svg" },
                { name: "PlayStation", icon: "/icons/playstation.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
                { name: "Nintendo Switch", icon: "/icons/nintendo.svg" },
            ],
        }
    ],

    topRated: [
        {
            id: 14,
            title: "Grand Theft Auto V",
            imageUrl: "/covers/gta-5.jpg",
            releaseDate: "June 20, 2013",
            myscore: 9,
            metascore: 97,
            topPick: true,
            added: true,
            bookmarked: false,
            favorite: true,
            genres: ["Action", "Shooter"],
            link: "#",
            platforms: [
                { name: "PC", icon: "/icons/windows.svg" },
                { name: "PlayStation", icon: "/icons/playstation.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
            ],
        },
        {
            id: 15,
            title: "The Legend of Zelda: Breath of the Wild",
            imageUrl: "/covers/zelda.jpg",
            releaseDate: "August 25, 2020",
            myscore: null,
            metascore: 96,
            topPick: false,
            added: false,
            bookmarked: false,
            favorite: false,
            genres: ["RPG", "Strategy"],
            link: "#",
            platforms: [{ name: "Nintendo Switch", icon: "/icons/nintendo.svg" }],
        },
        {
            id: 16,
            title: "Red Dead Redemption 2",
            imageUrl: "/covers/red-dead-redemption-2.jpg",
            releaseDate: "September 26, 2018",
            myscore: 9,
            metascore: 98,
            topPick: true,
            added: true,
            bookmarked: false,
            favorite: true,
            genres: ["Action", "Shooter"],
            link: "#",
            platforms: [
                { name: "PC", icon: "/icons/windows.svg" },
                { name: "PlayStation", icon: "/icons/playstation.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
            ],
        },
        {
            id: 17,
            title: "Uncharted 2: Among Thieves",
            imageUrl: "/covers/uncharted-2.jpg",
            releaseDate: "June 10, 2016",
            myscore: null,
            metascore: 96,
            topPick: true,
            added: true,
            bookmarked: true,
            favorite: true,
            genres: ["Action", "Adventure"],
            link: "#",
            platforms: [{ name: "PlayStation", icon: "/icons/playstation.svg" }],
        },
        {
            id: 18,
            title: "Resident Evil 4",
            imageUrl: "/covers/resident-evil-4.jpg",
            releaseDate: "August 28, 2025",
            myscore: 9,
            metascore: 93,
            topPick: true,
            added: true,
            bookmarked: true,
            favorite: true,
            genres: ["Action", "Adventure"],
            link: "#",
            platforms: [
                { name: "PC", icon: "/icons/windows.svg" },
                { name: "PlayStation", icon: "/icons/playstation.svg" },
                { name: "Xbox", icon: "/icons/xbox.svg" },
            ],
        }
    ]
}


// ✅ Allowed filter values
const allowedPlatforms = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"];
const allowedGenres = ["Action", "Adventure", "RPG", "Shooter", "Strategy"];
const allowedCategories = ["trending", "new-releases", "top-rated"];

// ✅ API handler
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const platform = searchParams.get("platform");
    const genre = searchParams.get("genre");
    const category = searchParams.get("category");

    // ✅ Validate query parameters
    const isValidPlatform = !platform || allowedPlatforms.some(p => p.toLowerCase() === platform.toLowerCase());
    const isValidGenre = !genre || allowedGenres.some(p => p.toLowerCase() === genre.toLowerCase());
    const isValidCategory = !category || allowedCategories.some(p => p.toLowerCase() === category.toLowerCase());

    if (!isValidPlatform || !isValidGenre || !isValidCategory) {
        return NextResponse.json(
            { error: "Invalid query parameters" },
            { status: 400 }
        );
    }


    // ✅ Map category to mockGames key
    const categoryMap = {
        "trending": "trending",
        "new-releases": "newReleases",
        "top-rated": "topRated"
    } as const;

    type CategoryKey = keyof typeof categoryMap;

    const slug = category
        ? categoryMap[category as CategoryKey]
        : undefined; // safe fallback


    // ✅ Select relevant games
    const selectedGames = slug
        ? (mockGames as Record<string, typeof mockGames.trending>)[slug] || []
        : [...mockGames.trending, ...mockGames.newReleases, ...mockGames.topRated];


    // ✅ Filter mock data
    const filteredGames = selectedGames.filter((game) => {
        const matchesPlatform = platform
            // If the user does filter by platform, only games with that platform will match.
            ? game.platforms.some(p => p.name.toLowerCase() === platform.toLowerCase())
            // If the user does not filter by platform, all games should match (no filtering by platform).
            : true;

        const matchesGenre = genre
            ? game.genres.some(g => g.toLowerCase() === genre.toLowerCase())
            : true;

        return matchesPlatform && matchesGenre;
    });

    return NextResponse.json(filteredGames);
}