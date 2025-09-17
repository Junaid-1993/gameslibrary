export type Game = {
    id: number;
    title: string;
    imageUrl: string;
    releaseDate: string;
    myscore: number | null;
    metascore: number | null;
    topPick: boolean;
    bookmarked: boolean;
    added: boolean;
    favorite: boolean
    link: string;
    platforms: {
        name: string;
        icon: string;
    }[];
};

