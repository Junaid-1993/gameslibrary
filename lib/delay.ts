export const delay = (ms: number) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    return Promise.resolve(); // Return a resolved promise immediately in production
};