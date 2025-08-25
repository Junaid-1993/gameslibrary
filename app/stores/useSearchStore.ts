import { create } from "zustand";
import { SearchStore } from "../types/SearchStore";


export const useSearchStore = create<SearchStore>((set) => ({
    query: "",
    setQuery: (value) => set({ query: value }),

    results: [],
    setResults: (games) => set({ results: games }),

    isLoading: false,
    setIsLoading: (value) => set({ isLoading: value }),

    showModal: false,
    setShowModal: (value) => set({ showModal: value }),

    focusedIndex: -1,
    setFocusedIndex: (value) => set({ focusedIndex: value }),

    reset: () => set({
        query: "",
        results: [],
        isLoading: false,
        showModal: false,
        focusedIndex: -1
    })
}))


