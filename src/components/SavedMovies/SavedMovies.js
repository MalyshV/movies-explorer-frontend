import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedMovies = (props) => {
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteClick = () => {
    console.log('delete');
    setIsDelete(!isDelete);
  };

  return(
    <section className="movies">
      <SearchForm />
      <MoviesCardList className="-delete" onClick={handleDeleteClick} cards={props.cards} />
    </section>
  )
};

export default SavedMovies;
