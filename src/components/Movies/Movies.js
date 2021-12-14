import React, {useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false); /* для демонстрации Прелоадера заменить на true */

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList />
        <Button textOnButton="Ещё" buttonClassName="_place_movies" />
        { isLoading && <Preloader /> }
      </div>
    </section>
  )
};

export default Movies;
