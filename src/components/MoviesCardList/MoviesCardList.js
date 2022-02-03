import React, {useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import { setCards, addMoreCards } from '../../utils/constants';

const MoviesCardList = ({ cards, onClick, className, handleSaveCard, onDelete }) => {
  const [visible, setIsVisible] = useState(setCards());

  const location = useLocation();

  const showMoreMovies = () => {
    setIsVisible((prevValue) => prevValue + addMoreCards());
  };

  return (
    <>
      <ul className="cards">
        {
        cards.slice(0, visible).map((card) => {

          return (
            <MoviesCard
              card={card}
              key={card._id || card.id}
              duration={card.duration}
              buttonClassName={className}
              onClick={onClick}
              handleSaveCard={handleSaveCard}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
      { location.pathname === '/movies' && (visible <= cards.length) ?  <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={showMoreMovies} /> : null }
    </>
  )
};

export default MoviesCardList;
