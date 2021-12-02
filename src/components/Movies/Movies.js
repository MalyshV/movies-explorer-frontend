import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <div className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <button className="movies__button">Ещё</button>
    </div>
  )
};

export default Movies;
