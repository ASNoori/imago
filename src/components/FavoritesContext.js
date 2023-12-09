// FavoritesContext.js
import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return storedFavorites;
  });

  const toggleFavorite = (image) => {
    const isFavorite = favorites.some((fav) => fav.title === image.title);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.title !== image.title);
    } else {
      updatedFavorites = [...favorites, image];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};
