"use client";
import React from "react";
import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { useFavorites } from "@/hooks/useFavorites";
import Filter from "@/components/Filter/Filter";
import CardCharacter from "@/components/CardCharacter/CardCharacter";
import styles from "./HomeLayout.module.scss";
import { Character } from "@/interfaces/interfaces";
import Loader from "../Loader/Loader";

const HomeLayout = () => {
  const { characters, loading, error } = useCharacters();
  const { favorites, showFavorites } = useFavorites();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const handleFilterInputChange = (wordFilter: string) => {
    setSearchTerm(wordFilter);

    const charactersToDisplay = showFavorites
      ? characters.filter((character) => favorites.includes(character.id))
      : characters;

    const filteredData = charactersToDisplay.filter((val) =>
      val.name.toLowerCase().includes(wordFilter.toLowerCase())
    );

    setFilteredCharacters(filteredData);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error al cargar personajes: {error}</p>;

  const charactersToDisplay = searchTerm
    ? filteredCharacters
    : showFavorites
    ? characters.filter((character) => favorites.includes(character.id))
    : characters;

  return (
    <main className={styles.homeContainer}>
      {showFavorites && <span className="titleSection">FAVORITES</span>}
      <Filter
        totalResults={charactersToDisplay.length}
        onHandleFilter={handleFilterInputChange}
      />
      <div>
        <ul className={styles.characterList}>
          {charactersToDisplay.map((character) => (
            <li key={character.id}>
              <CardCharacter
                id={character.id}
                name={character.name}
                thumbnail={character.thumbnail}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default HomeLayout;
