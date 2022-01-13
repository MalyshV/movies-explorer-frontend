import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ cards, savedCards, onDelete, handleSearchCard }) => {
  const currentUser = useContext(CurrentUserContext);
  const [search, setIsSearch] = useState('');

  useEffect(() => {
    // что-нибудь
  }, [currentUser])

  const handleCardDelete = (card) => {
    onDelete(card);
  };

  const handleSearch = (e) => {
    setIsSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchCard(search);
  };

  return(
    <section className="movies">
      <SearchForm onChange={handleSearch} handleSearchCard={handleSearchCard} onSubmit={handleSubmit} />
      <MoviesCardList className="-delete" onDelete={handleCardDelete} cards={cards} savedCards={savedCards} />
    </section>
  )
};

export default SavedMovies;
