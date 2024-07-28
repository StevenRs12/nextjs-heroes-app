"use client";
import React from "react";
import Image from "next/image";
import styles from "./CardComic.module.scss";

const CardComic = ({ comic }) => {
  return (
    <div className={styles.comicCard}>
      <Image
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        width={180}
        height={270}
        alt={comic.name}
        className={styles.comicImage}
      />
      <p className={styles.comicName}>{comic.title}</p>
    </div>
  );
};

export default CardComic;
