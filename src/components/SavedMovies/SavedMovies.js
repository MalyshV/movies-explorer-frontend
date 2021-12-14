import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = () => {
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteClick = () => setIsDelete(!isDelete); // перенести удаление и лайк/разлайк в саму карточку

  return(
    <section className="movies">
      <SearchForm />
      <MoviesCardList className="-delete" onClick={handleDeleteClick} />
    </section>
  )
};

export default SavedMovies;
