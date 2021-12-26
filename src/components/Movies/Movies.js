import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

const Movies = (props) => {

  // console.log(useLocation());

  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const type = isLiked ? '-active' : '';

  const handleLoadClick = () => setIsLoading(!isLoading);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    console.log('liked');
  };

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList onClick={handleLikeClick} className={type} cards={props.cards} />
        <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={handleLoadClick} />
        { isLoading && <Preloader /> }
      </div>
    </section>
  )
};

export default Movies;
