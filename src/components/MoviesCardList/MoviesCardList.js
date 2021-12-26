import React from 'react';
import { useSearchParams } from 'react-router-dom';
// import Movies from '../Movies/Movies';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ cards, onClick, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postQuery = searchParams.get('card') || '';

  return (
    <ul className="cards">
      {cards.filter(
        card => card.nameRU.includes(postQuery)
      ).map((card) => {
        return (
          <MoviesCard
            key={card.id}
            card={card}
            duration="27"
            buttonClassName={className}
            onClick={onClick}
          />
        );
      })}
    </ul>
  )
};

export default MoviesCardList;

/* добавить в карточку, сами функции не надо сюда
onCardClick={onCardClick}
onCardLike={onCardLike}
onDeleteButtonClick={onDeleteButtonClick}
*/

/*
<MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
      <MoviesCard duration="27" buttonClassName={className} handleClick={onClick} />
*/