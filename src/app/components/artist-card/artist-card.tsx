import React from 'react';
import { Artist } from '@/app/types/artist-types';
import styles from './artist-card.module.css';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className={styles.card}>
      <img src={artist.images[0].url} alt={artist.name} width={200} height={200} />
      <h2>{artist.name}</h2>
      <p>Genres: {artist.genres.join(', ')}</p>
      <p>Followers: {artist.followers.total}</p>
    </div>
  );
};
