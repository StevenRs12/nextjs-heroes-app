'use client'
import { useEffect, useState } from 'react';
import { Character } from "../interfaces/interfaces";

export const useCharacters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY;
            const hash = process.env.NEXT_PUBLIC_MARVEL_API_HASH;
            const ts = process.env.NEXT_PUBLIC_MARVEL_API_TIMESTAMP;

            try {
                const res = await fetch(
                    `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=0&limit=50`);

                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }

                const data = await res.json();

                setCharacters(data.data.results);
                setTotalResults(data.data.total);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    return {
        characters,
        totalResults,
        loading,
        error,
        setCharacters,
    };
}