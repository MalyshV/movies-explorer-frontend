import React, { useEffect, useState } from 'react';
import { MoviesCardList, Popup, Preloader, SearchForm } from '../index';

const Movies = ({ handleSaveCard, likeClassName, handleSearchCard, checkbox, setCheckbox, onDelete, searchedCards, cards, savedCards, isNoSearchQuery }) => {

  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  useEffect(() => {
    setCheckbox(JSON.parse(localStorage.getItem('checkboxData')));
  }, [setCheckbox]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsSearched(true);
    e.preventDefault();

    if (search === '') {
      setIsPopupOpened(true)
      setTimeout(() => setIsPopupOpened(false), 1900);
    } else {
      handleSearchCard(search);
      setTimeout(() => setIsSearched(false), 1000);
    }
    localStorage.setItem('searchQuery', search);
  };

  const handleCardDelete = (card) => {
    onDelete(card);
  };

  return (
    <section className='movies' >
      <div className='movies__content'>
        <SearchForm onChange={handleSearch} onSubmit={handleSubmit} checkbox={checkbox} setCheckbox={setCheckbox}/>
        { !isSearched ?
          <MoviesCardList
            handleSaveCard={handleSaveCard}
            onDelete={handleCardDelete}
            className={likeClassName}
            cards={cards}
            checkbox={checkbox}
            setCheckbox={setCheckbox}
            savedCards={savedCards}
            searchedCards={searchedCards}
            isSearched={isSearched}
            isNoSearchQuery={isNoSearchQuery}
          />
          :
          <Preloader />
        }
      </div>
      <Popup onUpdate={isPopupOpened} />
    </section>
  )
};

export default Movies;
