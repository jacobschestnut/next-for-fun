'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

type Artist = {
  name: string;
  images: { url: string }[];
  genres: string[];
  followers: { total: number };
};

export default function Home() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const artistId = '0TnOYISbd1XYRBk9myaseg';

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(`/api/spotify/artist?artistId=${artistId}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching artist data:', errorData.error);
          return;
        }

        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error('Error parsing JSON response:', error);
      }
    };

    fetchArtistData();
  }, [artistId]);

  if (!artist) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>{artist.name}</h1>
      <img src={artist.images[0].url} alt={artist.name} width={200} height={200} />
      <p>Genres: {artist.genres.join(', ')}</p>
      <p>Followers: {artist.followers.total.toLocaleString()}</p>
    </div>
  );
}
