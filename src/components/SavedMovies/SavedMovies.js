import React, { useState } from 'react';
import { MoviesCardList, Popup, Preloader, SearchForm } from '../index';

const SavedMovies = ({ cards, savedCards, handleSavedMoviesSearchCard, onDelete, checkbox, setCheckbox, isMovieSaved }) => {
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
      handleSavedMoviesSearchCard(search);
      setTimeout(() => setIsSearched(true), 1000);
    }
  };

  return(
    <section className="movies">
      <SearchForm onChange={handleSearch} onSubmit={handleSubmit} checkbox={checkbox} setCheckbox={setCheckbox} />
      { isSearched ?
        <MoviesCardList
          className="-delete"
          onDelete={handleCardDelete}
          cards={cards}
          savedCards={savedCards}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
          isMovieSaved={isMovieSaved}
        />
        :
        <Preloader />
      }
      <Popup onUpdate={isPopupOpened} />
    </section>
  )
};

export default SavedMovies;
