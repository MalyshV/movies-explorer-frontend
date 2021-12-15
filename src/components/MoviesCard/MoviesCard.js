import React from 'react';
import film from '../../images/film.svg';
import Button from '../Button/Button';

const MoviesCard = ({ duration, handleClick, buttonClassName }) => {
  return (
    <li className="card">
      <div className="card__info">
        <h4 className="card__title">В погоне за Бенкси</h4>
        <p className="card__duration"><span>{duration}</span> минут</p>
      </div>
      <img className="card__image" src={film} alt="обложка фильма" />
      <Button textOnButton="" buttonClassName={`_place_card${buttonClassName}`} onClick={handleClick} />
    </li>
  )
};

export default MoviesCard;
