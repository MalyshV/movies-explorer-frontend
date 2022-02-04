import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ cards, savedCards, onDelete, handleSearchCard, checkbox, setCheckbox }) => {
  const currentUser = useContext(CurrentUserContext);
  const [search, setIsSearch] = useState('');
  const [isSearched, setIsSearched] = useState(true);

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
    setIsSearched(false);
    e.preventDefault();
    handleSearchCard(search);
    setTimeout(() => setIsSearched(true), 1000);
  };

  return(
    <section className="movies">
      <SearchForm onChange={handleSearch} handleSearchCard={handleSearchCard} onSubmit={handleSubmit} checkbox={checkbox} setCheckbox={setCheckbox} />
      { isSearched ?
        <MoviesCardList className="-delete" onDelete={handleCardDelete} cards={cards} savedCards={savedCards} checkbox={checkbox} setCheckbox={setCheckbox} />
        :
        <Preloader />
      }
    </section>
  )
};

export default SavedMovies;
