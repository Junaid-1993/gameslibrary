import { useEffect, useState } from "react";

export function useDelayedUnmount(isVisible: boolean, delay: number = 200) {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            // Open immediately
            setShouldRender(true);
        } else {
            // Delay closing
            const timeout = setTimeout(() => setShouldRender(false), delay);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, delay]);

    return shouldRender;
}
