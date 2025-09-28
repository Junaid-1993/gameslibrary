export async function fetchGames(searchParams: Record<string, string>, category?: string) {
    // Start with a clean object
    const queryObject: Record<string, string> = {};

    // Add all valid searchParams
    for (const [key, value] of Object.entries(searchParams)) {
        if (typeof value === "string") {
            queryObject[key] = value;
        }
    }

    // Add category only if it's defined
    if (category) {
        queryObject["category"] = category;
    }

    // Convert to query string
    const query = new URLSearchParams(queryObject).toString();

    const res = await fetch(`http://localhost:3000/api/games?${query}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("API error:", error);
        return [];
    }

    return await res.json();
}