// import React, { useState } from 'react';
import Button from '../Button/Button';

const MoviesCard = ({ isLiked, card, onClick, buttonClassName }) => {
  // const [isCliked, setIsCliked] = useState(false);

  //const handleClick = () => setIsCliked(!isCliked);

  const setRigthDuration = (duration) => {
    return `${duration}`.endsWith(1) ? `${duration} минута` :
    ['2', '3', '4'].some(char => `${duration}`.endsWith(char)) ? `${duration} минуты` : `${duration} минут`;
  };

  return (
    <li className="card">
      <div className="card__info">
        <h4 className="card__title">{card.nameRU}</h4>
        <p className="card__duration">{setRigthDuration(card.duration)}</p>
      </div>
      <a className="card__link" href={card.trailerLink} rel="noreferrer" target="_blank"><img className="card__image" src={`https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} /></a>
      <Button textOnButton="" buttonClassName={`_place_card${buttonClassName}`} onClick={onClick} />
    </li>
  )
};

export default MoviesCard;
