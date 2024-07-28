import React from "react";
import { Character } from "@/interfaces/interfaces";
import HomeLayout from "@/components/HomeLayout/HomeLayout";

const fetchCharacters = async () => {
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
  const hash = process.env.NEXT_PUBLIC_MARVEL_API_HASH;
  const ts = process.env.NEXT_PUBLIC_MARVEL_API_TIMESTAMP;

  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => controller.abort(), 180000);

  try {
    const res = await fetch(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=0&limit=50`,
      { signal }
    );

    if (!res.ok) {
      throw new Error(`Error al cargar personajes: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data.results;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(
        "La solicitud ha tardado demasiado tiempo y ha sido cancelada."
      );
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
};

const Home = async () => {
  let characters: Character[] = [];
  let error = null;
  let loading = true;

  try {
    characters = await fetchCharacters();
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  } finally {
    loading = false;
  }

  return (
    <main>
      <HomeLayout characters={characters} error={error} loading={loading} />
    </main>
  );
};

export default Home;
