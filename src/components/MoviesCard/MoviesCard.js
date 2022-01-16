import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { setRigthDuration /*, checkMovieDuration */ } from '../../utils/constants';

const MoviesCard = ({ card, handleSaveCard, onDelete }) => {
  const [isCliked, setIsCliked] = useState(false);
  const location = useLocation();
  const MOVIES_URL = 'https://api.nomoreparties.co';

  const buttonMovies = isCliked ? '-active' : '';
  const buttonSavedMovies = '-delete';

  const buttonClassName = location.pathname === '/movies' ? buttonMovies : buttonSavedMovies;

  const handleSaveClick = () => {
    if(!isCliked) {
      handleSaveCard(card);
      setIsCliked(true);
    } else {
      setIsCliked(false);
    }
  }

  /*const useEffect = (() => {
    function classChange(status) {
      setIsCliked(!isCliked);
    }
  }, [isCliked]); */

  const handleDeleteClick = () => {
    onDelete(card);
  }

  const buttonClickFunction = location.pathname === '/movies' ? handleSaveClick : handleDeleteClick;

  return (
    <li className="card">
      <div className="card__info">
        <h4 className="card__title">{card.nameRU}</h4>
        <p className="card__duration">{setRigthDuration(card.duration)}</p>
      </div>
      <a className="card__link" href={card.trailerLink} rel="noreferrer" target="_blank"><img className="card__image" src={`${MOVIES_URL}${card.image.url}`} alt={card.nameRU} /></a>
      <Button textOnButton="" buttonClassName={`_place_card${buttonClassName}`} onClick={buttonClickFunction} />
    </li>
  )
};

export default MoviesCard;
