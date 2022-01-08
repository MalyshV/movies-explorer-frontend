import React, {useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { checkMovie } from '../../utils/constants';
import Button from '../Button/Button';

const MoviesCardList = ({ cards, onClick, className }) => {
  const [search, setSearch] = useState('');
  // const [cards, setCards] = useState([]);
  const [filtered, setIsFiltered] = useState(cards);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setIsVisible] = useState(12);

  const location = useLocation();

  // добавили для теста
  const [isShortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // добавили для теста
  const filterMoviesByDuration = (filtredMovies) => {
    return filtredMovies.filter((card) => card.duration < 40)
  }

  function handleCheckboxChecked(e) {
    setShortMovies(e.target.checked);
  }

  const filterByDuration = (duration) => {
    console.log('I am checked now!')

      /* if (duration > 60) {

      } else {

      } */


    /* if (duration > 60) {
      setIsFiltered(cards);
    } else {
      let newCards = [...cards].filter(item => item.duration === duration)
      setIsFiltered(newCards);
    }
    /* console.log(props.duration);
    if(duration > 60) {
      setIsFiltered(cards);
    } else {
      let newCards = [...cards].filter(item => item.duration === duration)
      setIsFiltered(newCards);
    } */
  };

  // добавить константу для ширины экрана и передавать в useState не 12, а число в зависимости от ширины

  /* const filterMovies = cards.filter( card => {
    return card.nameRU.toLowerCase().includes(search.toLocaleLowerCase())
  }); */
  // const [searchParams, setSearchParams] = useSearchParams();
  // const postQuery = searchParams.get('card') || '';

  const showMoreMovies = () => {
    setIsLoading(true);
    setIsVisible((prevValue) => prevValue + 3);

    // добавить константу вместо 3 для разной ширины экрана
  };

  return (
    <>
    <FilterCheckbox handleChecked={handleCheckboxChecked} isChecked={isShortMovies} />
    <ul className="cards">
      {filtered.slice(0, visible).map((card) => {
        return (
          <MoviesCard
            key={card.id}
            card={card}
            duration={card.duration}
            buttonClassName={className}
            onClick={onClick}
          />
        );
      })}
    </ul>
    { location.pathname === '/movies' ? <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={showMoreMovies} /> : null }
    </>
  )
};

export default MoviesCardList;

// after showMovies
// { isLoading && <Preloader /> }