'use client'

import { useState, useEffect } from 'react'
import styles from "./page.module.css";

type Artist = {
  name: string;
  images: { url: string }[];
  genres: string[];
  followers: { total: number };
};

export default function Home() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setLoading] = useState(true)
  const artistId = '1dfeR4HaWDbWqFHLkM9KV1'

  useEffect(() => {
    const fetchArtistData = async () => {
      const response = await fetch(`/api/spotify/artist?artistId=${artistId}`);
      const data = await response.json();
      setArtist(data);
    };

    fetchArtistData();
  }, []);

  if (isLoading) return <p>Loading...</p>
  if (!artist) return <p>No Artist Data.</p>
 
  return (
    <div>
      <h1>{artist.name}</h1>
      <img src={artist.images[0].url} alt={artist.name} width={200} height={200} />
      <p>Genres: {artist.genres.join(', ')}</p>
      <p>Followers: {artist.followers.total}</p>
    </div>
  )
}
