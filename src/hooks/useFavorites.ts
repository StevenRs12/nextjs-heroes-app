'use client';
import { useContext } from 'react';
import { FavoriteContext } from "@/contexts/FavoriteContext";

export const useFavorites = () => {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw new Error("useFavorites must be used within a FavoriteProvider");
    }

    const { favorites, toggleFavorite, showFavorites, setShowFavorites } = context;

    return {
        favorites,
        toggleFavorite,
        favoritesCount: favorites.length,
        showFavorites,
        setShowFavorites,
    };
};