import React, {useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import { setCards, addMoreCards } from '../../utils/constants';

const MoviesCardList = ({ cards, onClick, className, handleSaveCard, onDelete, savedCards, checkbox }) => {
  const [visible, setIsVisible] = useState(setCards());
  const location = useLocation();

  const showMoreMovies = () => {
    setIsVisible((prevValue) => prevValue + addMoreCards());
  };

  const filteredMoviesByDuration = cards.filter((card) => {
    if ((card.duration <= 40 && checkbox) || !checkbox) {
      return card;
    }
  });

  return (
    <>
    { filteredMoviesByDuration.length === 0 && <p className="cards__not-found">Фильмы не найдены</p> }

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
            />
          );
        })}
      </ul>
      { location.pathname === '/movies' && (visible <= cards.length) ?  <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={showMoreMovies} /> : null }
    </>
  )
};

export default MoviesCardList;
