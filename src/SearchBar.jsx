import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit} role="search" aria-label="Search posts">
      <label htmlFor="search-input" className={styles.srOnly}>Search posts</label>
      <input
        id="search-input"
        type="text"
        className={styles.input}
        placeholder="Search posts..."
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <button type="submit" className={styles.button} aria-label="Search">
        <span className={styles.icon} aria-hidden="true">🔍</span>
      </button>
    </form>
  );
};

export default SearchBar;
