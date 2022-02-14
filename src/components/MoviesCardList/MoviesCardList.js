import React, {useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, MoviesCard } from '../index';
import { renderCards, addMoreCards } from '../../helpers/index';
import { SHORT_FILM_LENGTH } from '../../utils/constants';

const MoviesCardList = ({ cards, savedCards, onClick, className, handleSaveCard, onDelete, checkbox, isNoSearchQuery}) => {

  const [visible, setIsVisible] = useState(renderCards());
  const location = useLocation();

  const showMoreCards = () => {
    setIsVisible((prevValue) => prevValue + addMoreCards());
  };

  const filterCardsByDuration = cards.filter((card) => {
    return ((card.duration <= SHORT_FILM_LENGTH && checkbox) || !checkbox) ? card : null;
  });

  return (
    <>
    { isNoSearchQuery ? <p className='cards__not-found'>Ничего не найдено</p> :
      <ul className='cards'>
        { filterCardsByDuration.slice(0, visible).map((card) => {
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
          )
        })}
      </ul>
    }
      { location.pathname === '/movies' && (visible <= cards.length) ?
        <Button textOnButton='Ещё' buttonClassName='_place_movies' onClick={showMoreCards} />
        :
        null
      }
    </>
    )
};

export default MoviesCardList;
