import { useEffect, useState } from "react";

export function useMediaQuery(mediaQuery: string, defaultMatch = false): boolean {
    const [matches, setMatches] = useState(defaultMatch);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery);

        // Sync with real viewport
        setMatches(mediaQueryList.matches);

        // Update state on media query change
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener("change", handleChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, [mediaQuery]);

    return matches;
}
