import React from "react"; 
import Loader from "@/components/Loader/Loader";
import BannerDetails from "@/components/BannerDetails/BannerDetails";
import ComicsSection from "@/components/ComicsSection/ComicsSection";
import { Hero, Comic } from "@/interfaces/interfaces";

const HeroDetailPage = async ({ params }) => {
  const { id } = params;
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
  const hash = process.env.NEXT_PUBLIC_MARVEL_API_HASH;
  const ts = process.env.NEXT_PUBLIC_MARVEL_API_TIMESTAMP;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 180000);

  let hero = {};
  let comics: Comic[] = [];
  let error = null;

  try {
    const resHero = await fetch(
      `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
      {
        signal: controller.signal,
      }
    );

    if (!resHero.ok) {
      throw new Error(`Error al cargar héroe: ${resHero.statusText}`);
    }

    const heroData = await resHero.json();
    hero = heroData.data.results[0];

    const resComics = await fetch(
      `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&orderBy=focDate`,
      {
        signal: controller.signal,
      }
    );

    if (!resComics.ok) {
      throw new Error(`Error al cargar cómics: ${resComics.statusText}`);
    }

    const comicsData = await resComics.json();
    comics = comicsData.data.results || [];
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  } finally {
    clearTimeout(timeoutId);
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hero) {
    return <Loader />;
  }

  return (
    <main>
      <BannerDetails hero={hero} />
      <ComicsSection comics={comics} />
    </main>
  );
};

export default HeroDetailPage;
