import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../index';
import { MOVIES_URL } from '../../utils/constants';
import { setRigthDuration } from '../../helpers/index';

const MoviesCard = ({ card, handleSaveCard, onDelete, isMovieSaved }) => {
  const [isCliked, setIsCliked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsCliked(isMovieSaved(card));
  }, [card, isMovieSaved]);

  const buttonMovies = isCliked ? '-active' : '';
  const buttonSavedMovies = '-delete';

  const buttonClassName = location.pathname === '/movies' ? buttonMovies : buttonSavedMovies;
  const cardImageSrc = location.pathname === '/movies' ? `${MOVIES_URL}${card.image.url}` : `${card.image}`;


  const handleSaveClick = () => {
    if(!isCliked) {
      handleSaveCard(card);
      setIsCliked(true);
    } else {
      setIsCliked(false);
      onDelete(card);
    }
  };

  const handleDeleteClick = () => {
    onDelete(card);
    setIsCliked(false);
  };

   const buttonClickFunction = location.pathname === '/movies' && !isCliked ? (handleSaveClick || handleDeleteClick) : handleDeleteClick;
  // - вот выше возможно ошибка, т.к. я по роуту /movies задаю только функцию handleSaveClick

  return (
    <li className="card">
      <div className="card__info">
        <h4 className="card__title">{card.nameRU}</h4>
        <p className="card__duration">{setRigthDuration(card.duration)}</p>
      </div>
      <a className="card__link" href={card.trailerLink} rel="noreferrer" target="_blank">
        <img className="card__image" alt={card.nameRU} src={cardImageSrc} />
      </a>
      <Button textOnButton="" buttonClassName={`_place_card${buttonClassName}`} onClick={buttonClickFunction} />
    </li>
  )
};

export default MoviesCard;
