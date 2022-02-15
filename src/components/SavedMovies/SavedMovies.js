import React, { useState } from 'react';
import { MoviesCardList, Popup, Preloader, SearchForm } from '../index';

const SavedMovies = ({ cards, savedCards, handleSavedSearchCard, onDelete, checkbox, setCheckbox, isNoSearchQuery }) => {

  const [search, setIsSearch] = useState('');
  const [isSearched, setIsSearched] = useState(true);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

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
      handleSavedSearchCard(search);
      setTimeout(() => setIsSearched(true), 1000);
    }
    localStorage.setItem('savedSearchQuery', search);
  };

  return(
    <section className='movies'>
      <SearchForm onChange={handleSearch} onSubmit={handleSubmit} checkbox={checkbox} setCheckbox={setCheckbox} />
      { isSearched ?
        <MoviesCardList
          className='-delete'
          onDelete={handleCardDelete}
          cards={cards}
          savedCards={savedCards}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
          isNoSearchQuery={isNoSearchQuery}
        />
        :
        <Preloader />
      }
      <Popup onUpdate={isPopupOpened} />
    </section>
  )
};

export default SavedMovies;
