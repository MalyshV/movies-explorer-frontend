import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { setRigthDuration, MOVIES_URL /*, checkMovieDuration */ } from '../../utils/constants';

const MoviesCard = ({ card, handleSaveCard, onDelete, savedCards }) => {
  const [isCliked, setIsCliked] = useState(false);
  const location = useLocation();

  const buttonMovies = isCliked ? '-active' : '';
  const buttonSavedMovies = '-delete';

  const buttonClassName = location.pathname === '/movies' ? buttonMovies : buttonSavedMovies;
  const cardImageSrc = location.pathname === '/movies' ? `${MOVIES_URL}${card.image.url}` : `${card.image}`;

  useEffect(() => {
    savedCards && savedCards.map((item) => {
      if (item.movieId === card.id) {
        setIsCliked(true);
      }
    });
  }, [savedCards, card.id]);

  const handleSaveClick = () => {
    if(!isCliked) {
      handleSaveCard(card);
      setIsCliked(true);
    } else {
      setIsCliked(false);
    }
  };

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
      <a className="card__link" href={card.trailerLink} rel="noreferrer" target="_blank">
        <img className="card__image" alt={card.nameRU} src={cardImageSrc} />
      </a>
      <Button textOnButton="" buttonClassName={`_place_card${buttonClassName}`} onClick={buttonClickFunction} />
    </li>
  )
};

export default MoviesCard;
