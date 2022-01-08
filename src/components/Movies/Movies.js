import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = (props) => {

  const [isLiked, setIsLiked] = useState(false);

  const type = isLiked ? '-active' : '';

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    console.log('liked');
  };

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList onClick={handleLikeClick} className={type} cards={props.cards} />
      </div>
    </section>
  )
};

export default Movies;
