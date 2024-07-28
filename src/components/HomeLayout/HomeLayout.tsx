"use client";
import React, { useState } from "react";
import { Character, HomeLayoutProps } from "@/interfaces/interfaces";
import Filter from "@/components/Filter/Filter";
import CardCharacter from "@/components/CardCharacter/CardCharacter";
import styles from "./HomeLayout.module.scss";
import Loader from "../Loader/Loader";
import { useFavorites } from "@/hooks/useFavorites";

const HomeLayout: React.FC<HomeLayoutProps> = ({
  characters,
  error,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const { favorites, showFavorites } = useFavorites();

  const handleFilterInputChange = (wordFilter: string) => {
    setSearchTerm(wordFilter);

    const charactersToFilter = showFavorites
      ? characters.filter((character: Character) =>
          favorites.includes(character.id)
        )
      : characters;

    const filteredData = charactersToFilter.filter((val) =>
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
