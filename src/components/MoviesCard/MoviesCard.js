import React from 'react';
import film from '../../images/film_1.svg';

const MoviesCard = ({ duration }) => {
  return (
    <li className="card">
      <div className="card__info">
        <h4 className="card__title">В погоне за Бенкси</h4>
        <p className="card__duration"><span>{duration}</span> минут</p>
      </div>
      <img className="card__image" src={film} alt="обложка фильма"/>
      <button className="card__like">Сохранить</button>
    </li>
  )
};

export default MoviesCard;
