import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import Popup from '../Popup/Popup';

const SavedMovies = ({ cards, savedCards, onDelete, handleSearchCard, checkbox, setCheckbox }) => {
  const currentUser = useContext(CurrentUserContext);
  const [search, setIsSearch] = useState('');
  const [isSearched, setIsSearched] = useState(true);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

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

    if (search === '') {
      setIsPopupOpened(true)
      setTimeout(() => setIsPopupOpened(false), 1900);
    } else {
      handleSearchCard(search);
      setTimeout(() => setIsSearched(true), 1000);
    }
  };

  return(
    <section className="movies">
      <SearchForm onChange={handleSearch} handleSearchCard={handleSearchCard} onSubmit={handleSubmit} checkbox={checkbox} setCheckbox={setCheckbox} />
      { isSearched ?
        <MoviesCardList className="-delete" onDelete={handleCardDelete} cards={cards} savedCards={savedCards} checkbox={checkbox} setCheckbox={setCheckbox} />
        :
        <Preloader />
      }
      <Popup onUpdate={isPopupOpened} />
    </section>
  )
};

export default SavedMovies;
