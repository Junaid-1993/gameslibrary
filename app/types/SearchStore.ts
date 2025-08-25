import { Game } from "./Game";

export type SearchStore = {
    query: string;
    setQuery: (value: string) => void;

    results: Game[];
    setResults: (games: Game[]) => void;

    isLoading: boolean;
    setIsLoading: (value: boolean) => void;

    showModal: boolean;
    setShowModal: (value: boolean) => void;

    focusedIndex: number;
    setFocusedIndex: (value: number) => void;

    reset: () => void;
}