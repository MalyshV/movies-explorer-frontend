import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import Popup from '../Popup/Popup';

const Movies = ({ handleSaveCard, likeClassName, handleSearchCard, checkbox, setCheckbox, isMovieSaved, onDelete, searchedCards, cards, savedCards }) => {
  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

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
  };

  const handleCardDelete = (card) => {
    onDelete(card);
  };

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm onChange={handleSearch} handleSearchCard={handleSearchCard} onSubmit={handleSubmit} checkbox={checkbox} setCheckbox={setCheckbox}/>
        { !isSearched ?
          <MoviesCardList
            handleSaveCard={handleSaveCard}
            onDelete={handleCardDelete}
            className={likeClassName}
            cards={cards}
            checkbox={checkbox}
            setCheckbox={setCheckbox}
            savedCards={savedCards}
            isMovieSaved={isMovieSaved}
            searchedCards={searchedCards}
            isSearched={isSearched}
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

// todo
// навесить удаление фильма из сохраненных при повторном клике
// подчистить код
