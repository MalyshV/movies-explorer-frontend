import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ cards, onDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    // что-нибудь
  }, [currentUser])

  const handleCardDelete = (card) => {
    onDelete(card);
  };

  return(
    <section className="movies">
      <SearchForm />
      <MoviesCardList className="-delete" onDelete={handleCardDelete} cards={cards} />
    </section>
  )
};

export default SavedMovies;
