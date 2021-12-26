// import React, { useState } from 'react';
import Button from '../Button/Button';

const MoviesCard = ({ isLiked, card, onClick, buttonClassName }) => {
  // const [isCliked, setIsCliked] = useState(false);

  //const handleClick = () => setIsCliked(!isCliked);

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins/60);
	  let minutes = mins % 60;
	  if (!minutes) {
      return hours + ' ч';
    } else if (hours) {
      return hours + 'ч ' + minutes + 'м';
    } else {
      return minutes + ' минут';
    }
  };

  return (
    <li className="card">
      <div className="card__info">
        <h4 className="card__title">{card.nameRU}</h4>
        <p className="card__duration">{getTimeFromMins(card.duration)}</p>
      </div>
      <a className="card__link" href={card.trailerLink} rel="noreferrer" target="_blank"><img className="card__image" src={`https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} /></a>
      <Button textOnButton="" buttonClassName={`_place_card${buttonClassName}`} onClick={onClick} />
    </li>
  )
};

export default MoviesCard;
