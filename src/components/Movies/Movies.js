import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

const Movies = ({ cards, savedCards, handleSaveCard, likeClassName, handleSearchCard }) => {
  const currentUser = useContext(CurrentUserContext);
  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(true);
  const [isFound, setIsFound] = useState(false);
  const [result, setResult] = useState(savedCards || []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsSearched(false);
    e.preventDefault();
    handleSearchCard(search);
    setTimeout(() => setIsSearched(true), 1000);
  };

  useEffect(() => {
    // что-нибудь
  }, [currentUser]);

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm onChange={handleSearch} handleSearchCard={handleSearchCard} onSubmit={handleSubmit} />
        { isSearched ?
          <MoviesCardList handleSaveCard={handleSaveCard} className={likeClassName} cards={cards} />
          :
          <Preloader />
        }
      </div>
    </section>
  )
};

export default Movies;
