import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

const Movies = ({ cards, handleSaveCard, likeClassName, handleSearchCard, checkbox, setCheckbox }) => {
  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsSearched(false);
    e.preventDefault();
    handleSearchCard(search);
    setTimeout(() => setIsSearched(true), 1000);
  };

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm onChange={handleSearch} handleSearchCard={handleSearchCard} onSubmit={handleSubmit} checkbox={checkbox} setCheckbox={setCheckbox}/>
        { isSearched ?
          <MoviesCardList handleSaveCard={handleSaveCard} className={likeClassName} cards={cards} checkbox={checkbox} setCheckbox={setCheckbox} />
          :
          <Preloader />
        }
      </div>
    </section>
  )
};

export default Movies;

// todo

// сохранять изменение цвета кнопки
// навесить удаление фильма из сохраненных при повторном клике
// подчистить код
