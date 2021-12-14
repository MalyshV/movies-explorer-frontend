import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ onClick, className }) => {
  return (
    <ul className="cards">
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
    </ul>
  )
};

export default MoviesCardList;
