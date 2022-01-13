import React, {useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';
import { setCards, addMoreCards } from '../../utils/constants';

const MoviesCardList = ({ cards, onClick, className, handleSaveCard, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setIsVisible] = useState(setCards());
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const postQuery = searchParams.get('card') || '';

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const isClicked = (query) => {
    setSearchParams({card: query});
  };

  const location = useLocation();

  const showMoreMovies = () => {
    setIsVisible((prevValue) => prevValue + addMoreCards());
  };

  /* const filterMovies = (cards) => {
    const searchResult = cards.filter(card => card.director.toString().includes(postQuery));

    return searchResult;
  }; */

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');


  const filterCards = (cards, query) => {
    if (!query) {
        return cards;
    }

    return cards.filter((card) => {
        const cardName = card.nameRu.toLowerCase();
        return cardName.includes(query);
    });
};

const filteredCards = filterCards(cards, query);

  return (
    <>
    { isLoading && <Preloader /> }
    <ul className="cards">
      {
      filteredCards.slice(0, visible).map((card) => {
        // console.log(card.director)
        // console.log(card.year) */
        return (
          <MoviesCard
            key={card.id}
            card={card}
            duration={card.duration}
            buttonClassName={className}
            onClick={onClick}
            handleSaveCard={handleSaveCard}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
    { location.pathname === '/movies' ?  <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={showMoreMovies} /> : null }
    { isLoading && <Preloader /> }
    </>
  )
};

export default MoviesCardList;
