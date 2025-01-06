'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Artist } from './types/artist-types'; 
import { ArtistCard } from './components/artist-card/artist-card';
import Search from './ui/search/bar/search';

export default function Home() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [searchResults, setSearchResults] = useState<Artist[]>([]);
  const [searchContent, setSearchContent] = useState<string>('');
  const artistId = '6Ghvu1VvMGScGpOUJBAHNH';

  const handleSearch = (term: string) => {
    setSearchContent(term);
    console.log(term);
  };

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(`/api/spotify/artist/id?artistId=${artistId}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching artist data:', errorData.error);
          return;
        }

        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error('Error parsing JSON response in fetchArtistData:', error);
      }
    };

    fetchArtistData();
  }, [artistId]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`/api/spotify/artist/name?searchTerm=${searchContent}`)

        const data = await response.json();
        if (data.artists.items.length > 0) {
          setSearchResults((data.artists.items));
        }
      } catch (error) {
        console.error('Error parsing JSON response in fetchArtists:', error);
      }
    };

    fetchArtists();
  }, [searchContent]);

  if (!artist) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div>
        <Search placeholder='Search for an artist...' onSearch={handleSearch}/>
        {searchResults.length > 0 && searchContent.length > 0 && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} className={styles.resultItem}>
                {result.images && result.images.length > 0 ? (
                  <img src={result.images[0].url} alt={result.name} width={50} height={50} />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}
                <strong>{result.name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <ArtistCard artist={artist}/> */}
    </div>
  );
}
