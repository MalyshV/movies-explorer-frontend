import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';

const Movies = () => {
  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList />
        <Button textOnButton="Ещё" buttonClassName="_place_movies" />
      </div>
    </section>
  )
};

export default Movies;
