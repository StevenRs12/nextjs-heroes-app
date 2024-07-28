"use client";
import React from "react";
import Image from "next/image";
import styles from "./CardComic.module.scss";

const CardComic = ({ comic }) => {
  const focDateEntry = comic.dates.find(
    (dateEntry: any) => dateEntry.type === "focDate"
  );

  const createDate = new Date(focDateEntry?.date);
  const focYear = !isNaN(createDate.getTime()) ? createDate.getFullYear() : " ";

  return (
    <div className={styles.comicCard}>
      <Image
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        width={180}
        height={270}
        alt={comic.title}
        className={styles.comicImage}
      />
      <p className={styles.comicName}>{comic.title}</p>
      <p className={styles.comicYear}>{focYear}</p>{" "}
    </div>
  );
};

export default CardComic;
