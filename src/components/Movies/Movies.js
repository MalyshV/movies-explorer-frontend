import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ cards, handleSaveCard, likeClassName }) => {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    // что-нибудь
  }, [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;
    console.log(query, 'работаю, но ничего не ищу')

    return query;
  }

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm onSubmit={handleSubmit} />
        <MoviesCardList handleSaveCard={handleSaveCard} className={likeClassName} cards={cards} />
      </div>
    </section>
  )
};

export default Movies;
