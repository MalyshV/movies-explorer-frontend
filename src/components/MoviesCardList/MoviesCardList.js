import React, {useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, MoviesCard } from '../index';
import { renderCards, addMoreCards } from '../../helpers/index';
import { SHORT_FILM_LENGTH } from '../../utils/constants';

const MoviesCardList = ({ cards, savedCards, onClick, className, handleSaveCard, onDelete, checkbox, checkSavedCards, setCheckSavedCards, isNoSearchQuery, isNoSearchSavedQuery}) => {

  const [visible, setIsVisible] = useState(renderCards());
  const location = useLocation();

  const noSearchResult = location.pathname === '/movies' ? isNoSearchQuery : isNoSearchSavedQuery;

  const showMoreCards = () => {
    setIsVisible((prevValue) => prevValue + addMoreCards());
  };

  const filterCardsByDuration = cards.filter((card) => {
    if (location.pathname === '/movies') {
      return ((card.duration <= SHORT_FILM_LENGTH && checkbox) || !checkbox) ? card : null;
    }
    if (location.pathname === '/saved-movies') {
      return ((card.duration <= SHORT_FILM_LENGTH && checkSavedCards) || !checkSavedCards) ? card : null;
    }
  });

  return (
    <>
    { noSearchResult ? <p className='cards__not-found'>Ничего не найдено</p> :
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
      { location.pathname === '/movies' && (visible <= filterCardsByDuration.length) ?
        <Button textOnButton='Ещё' buttonClassName='_place_movies' onClick={showMoreCards} />
        :
        null
      }
    </>
    )
};

export default MoviesCardList;
