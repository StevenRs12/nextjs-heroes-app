import { useFavorites } from "@/hooks/useFavorites";
import styles from "./BannerDetails.module.scss";
import Image from "next/image";
import Loader from "../Loader/Loader";
import React from "react";

const BannerDetails = ({ hero }) => {
  const { id, name, description, thumbnail } = hero;
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(id);

  const handleFavoriteToggle = () => {
    toggleFavorite(id);
  };

  return (
    <div className={styles.container}>
      {!hero && <Loader />}
      {hero && (
        <>
          <div className={styles.imageContainer}>
            <Image
              src={`${thumbnail.path}.${thumbnail.extension}`}
              alt={name}
              width={390}
              height={390}
              className={styles.characterImage}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.nameContainer}>
              <span className={styles.characterName}>{name}</span>
              <Image
                src={
                  isFavorited
                    ? "/assets/images/heart-icon.svg"
                    : "/assets/images/heart-icon-filled.svg"
                }
                alt="Favorito"
                width={24}
                height={24}
                onClick={handleFavoriteToggle}
                className={styles.heartIcon}
              />
            </div>
            <div className={styles.characterDescription}>
              <p>{description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BannerDetails;
