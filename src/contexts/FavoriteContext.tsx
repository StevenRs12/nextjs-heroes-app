"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface FavoriteContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favoriteId) => favoriteId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, showFavorites, setShowFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
