'use client'
import { useEffect, useState } from 'react';
import { Hero, Comic } from "../interfaces/interfaces";

export const useHeroDetails = (id: string) => {
    const [hero, setHero] = useState<Hero | undefined>(undefined);
    const [comics, setComics] = useState<Comic[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHero = async () => {
            const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
            const hash = process.env.NEXT_PUBLIC_MARVEL_API_HASH;
            const ts = process.env.NEXT_PUBLIC_MARVEL_API_TIMESTAMP;

            try {
                const response = await fetch(`http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                if (!response.ok) throw new Error(`Error al cargar héroe: ${response.statusText}`);
                const data = await response.json();
                setHero(data.data.results[0]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        const fetchComics = async () => {
            const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
            const hash = process.env.NEXT_PUBLIC_MARVEL_API_HASH;
            const ts = process.env.NEXT_PUBLIC_MARVEL_API_TIMESTAMP;

            try {
                const response = await fetch(`http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                if (!response.ok) throw new Error(`Error al cargar cómics: ${response.statusText}`);
                const data = await response.json();
                setComics(data.data.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchHero(), fetchComics()]);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    return { hero, comics, loading, error };
};

