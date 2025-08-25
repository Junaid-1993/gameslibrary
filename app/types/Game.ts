export type Game = {
    id: number;
    title: string;
    imageUrl: string;
    releaseDate: string;
    metascore: number | null;
    topPick: boolean;
    added: boolean;
    link: string;
    platforms: {
        name: string;
        icon: string;
    }[];
};

