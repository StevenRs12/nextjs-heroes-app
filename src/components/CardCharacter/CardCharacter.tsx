"use client";
import React from "react";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";
import Link from "next/link";
import styles from "./CardCharacter.module.scss";
import { CardCharacterProps } from "@/interfaces/interfaces";

const CardCharacter: React.FC<CardCharacterProps> = ({
  id,
  name,
  thumbnail,
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(id);

  const handleFavoriteToggle = (event: any) => {
    event.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className={styles.container}>
      <Link href={`/hero-detail/${id}`}>
        {thumbnail?.path && (
          <Image
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt={name}
            width={188}
            height={188}
            className={styles.characterImage}
          />
        )}
        <div className={styles.lineSeparator} />
      </Link>
      <div className={styles.nameContainer}>
        <span className={styles.characterName}>{name}</span>
        <Image
          src={
            isFavorited
              ? "/assets/images/heart-icon.svg"
              : "/assets/images/heart-icon-filled.svg"
          }
          alt="Favorito"
          width={20}
          height={20}
          onClick={handleFavoriteToggle}
          className={styles.heartIcon}
        />
      </div>
    </div>
  );
};

export default CardCharacter;
