"use client";
import React from "react";
import { useState } from "react";
import styles from "./Filter.module.scss";
import Image from "next/image";
import { FilterProps } from "@/interfaces/interfaces";

const Filter: React.FC<FilterProps> = ({ totalResults, onHandleFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
    onHandleFilter(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Image
          src="/assets/images/search-icon.svg"
          alt="Filter"
          className={styles.icon}
          width={20}
          height={20}
          priority
        />
        <input
          type="text"
          placeholder="Search a character..."
          value={searchTerm}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <p className={styles.resultsText}>
        {totalResults} resultados encontrados
      </p>
    </div>
  );
};

export default Filter;
