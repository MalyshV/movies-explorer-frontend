import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <button className="movies__button">Ещё</button>
    </section>
  )
};

export default Movies;
