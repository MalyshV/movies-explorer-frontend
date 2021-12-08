import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';

const Movies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <Button textOnButton="Ещё" buttonClassName="_place_movies" />
    </section>
  )
};

export default Movies;
