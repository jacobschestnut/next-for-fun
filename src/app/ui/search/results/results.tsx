'use client';

import styles from './results.module.css';
import { Artist } from '@/app/types/artist-types';

interface ResultsProps {
  searchContent: string;
  searchResults: Artist[];
}

export default function Results({ searchContent, searchResults }: ResultsProps) {
  return (
    <div className={styles.container}>
      <div>
        {searchResults.length > 0 && searchContent.length > 0 && (
          <ul className={styles.list}>
            {searchResults.map((result) => (
              <li key={result.id} className={styles.resultItem}>
                {result.images && result.images.length > 0 ? (
                  <img src={result.images[0].url} alt={result.name} width={40} height={40} />
                ) : (
                  <div>No Image</div>
                )}
                <p>{result.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}