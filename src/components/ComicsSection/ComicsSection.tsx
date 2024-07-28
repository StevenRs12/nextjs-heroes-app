"use client";
import React from "react";
import styles from "./ComicsSection.module.scss";
import CardComic from "../CardComic/CardComic";
import Loader from "../Loader/Loader";

const ComicsSection = ({ comics }) => {
  return (
    <div className={styles.container}>
      {!comics && <Loader />}
      {comics?.length == 0 && (
        <>
          <span className={`titleSection ${styles.comicsTitle}`}>
            COMICS Not Found
          </span>
        </>
      )}
      {comics?.length > 0 && (
        <>
          <span className={`titleSection ${styles.comicsTitle}`}>COMICS</span>
          <div className={styles.comicsContainer}>
            {comics.map((comic: any, index: string) => (
              <CardComic comic={comic} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ComicsSection;
