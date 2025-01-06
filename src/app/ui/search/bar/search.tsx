'use client';

import styles from './search.module.css';

type SearchProps = {
  placeholder: string;
  onSearch: (term: string) => void;
};
 
export default function Search({ placeholder, onSearch }: SearchProps ) {
  function handleSearch(term: string) {
    onSearch(term);
  }
 
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <p>clear</p>
    </div>
  );
}