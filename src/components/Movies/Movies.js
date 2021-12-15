import React, {useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const type = isLiked ? '-active' : '';

  const handleLoadClick = () => setIsLoading(!isLoading);

  const handleLikeClick = () => setIsLiked(!isLiked);  // перенести удаление и лайк/разлайк в саму карточку

  return (
    <section className="movies" >
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList onClick={handleLikeClick} className={type} />
        <Button textOnButton="Ещё" buttonClassName="_place_movies" onClick={handleLoadClick} />
        { isLoading && <Preloader /> }
      </div>
    </section>
  )
};

export default Movies;
