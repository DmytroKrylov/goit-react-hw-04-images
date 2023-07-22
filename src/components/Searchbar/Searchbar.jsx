import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const normQuery = e.target.query.value.toLowerCase().trim();
    onSearch(normQuery);
    if (!normQuery) {
      alert('Please, enter your search query.');
      return;
    }
    setValue(normQuery);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchForm_button}>
          <span>Search</span>
        </button>
        <input
          name="query"
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
