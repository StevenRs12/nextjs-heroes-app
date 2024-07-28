"use client";
import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const { favorites, setShowFavorites } = useFavorites();
  const router = useRouter();

  const handleFavoritesClick = () => {
    setShowFavorites(true);
    router.push("/");
  };

  const handleHeroesClick = () => {
    setShowFavorites(false);
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={130}
          height={52}
          onClick={handleHeroesClick}
          data-testid="header-logo"
        />
      </div>
      <div className={styles.favorites} onClick={handleFavoritesClick}>
        <Image
          src="/assets/images/heart-icon.svg"
          alt="Favorites"
          width={24}
          height={24}
          data-testid="heart-icon"
        />
        {favorites.length > 0 && (
          <span className={styles.favoritesCount}>{favorites.length}</span>
        )}
      </div>
    </header>
  );
};

export default Header;
