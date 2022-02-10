import React, {useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, MoviesCard } from '../index';
import { setCards, addMoreCards } from '../../helpers/index';

const MoviesCardList = ({ cards, onClick, className, handleSaveCard, onDelete, savedCards, checkbox, isMovieSaved, checkIsEmpty}) => {
  const [visible, setIsVisible] = useState(setCards());
  const location = useLocation();

  const showMoreMovies = () => {
    setIsVisible((prevValue) => prevValue + addMoreCards());
  };

  const filteredMoviesByDuration = cards.filter((card) => {
    return ((card.duration <= 40 && checkbox) || !checkbox) ? card : null;
  });

  return (
    <>
    { checkIsEmpty ? <p className='cards__not-found'>Ничего не найдено</p> :
      <ul className="cards">
        { filteredMoviesByDuration.slice(0, visible).map((card) => {
          return (
            <MoviesCard
              card={card}
              key={card._id || card.id}
              duration={card.duration}
              buttonClassName={className}
              onClick={onClick}
              handleSaveCard={handleSaveCard}
              onDelete={onDelete}
              savedCards={savedCards}
              isMovieSaved={isMovieSaved}
            />
          )
        })}
      </ul>
    }
      { location.pathname === '/movies' && (visible <= cards.length) ?  <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={showMoreMovies} /> : null }
    </>
    )
};

export default MoviesCardList;
