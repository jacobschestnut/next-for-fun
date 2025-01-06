'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Artist } from './types/artist-types'; 
import { ArtistCard } from './components/artist-card/artist-card';
import Search from './ui/search/search';

export default function Home() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [searchContent, setSearchContent] = useState<string>('');
  const artistId = '6Ghvu1VvMGScGpOUJBAHNH';

  const handleSearch = (term: string) => {
    setSearchContent(term);
    console.log(term);
  };

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
    <div className={styles.page}>
      <div>
        <Search placeholder='Search for an artist...' onSearch={handleSearch}/>
      </div>
      <ArtistCard artist={artist}/>
    </div>
  );
}
