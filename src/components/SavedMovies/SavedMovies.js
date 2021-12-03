import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = () => {
  return(
    <section class="movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  )
};

export default SavedMovies;
