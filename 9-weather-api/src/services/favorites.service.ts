const favorites: Set<string> = new Set();

export const getFavorites = (): Set<string> => {
    return favorites;
};

export const addFavorite = (city: string): void => {
    favorites.add(city);
};

export const removeFavorite = (city: string): void => {
    favorites.delete(city);
};
