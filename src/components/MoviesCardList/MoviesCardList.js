import React, {useState} from 'react';
// import { useSearchParams } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { checkMovie } from '../../utils/constants';

const MoviesCardList = ({ cards, onClick, className }) => {
  const [search, setSearch] = useState('');
  // const [cards, setCards] = useState([]);
  const [visible, setIsVisible] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [filtered, setIsFiltered] = useState(cards);

  // добавили для теста
  const [isShortMovies, setShortMovies] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  // добавили для теста
  const filterMoviesByDuration = (filtredMovies) => {
    return filtredMovies.filter((card) => card.duration < 40)
  }

  function handleCheckboxChecked(e) {
    setShortMovies(e.target.checked);
}

  const filterByDuration = (duration) => {
    console.log('I am checked now!')

      if (duration > 60) {
        console.log('Мы тут')
      } else {
        console.log('Fuuuuck!')
      }


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
    <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={showMoreMovies} />
    </>
  )
};

export default MoviesCardList;

// after showMovies
// { isLoading && <Preloader /> }