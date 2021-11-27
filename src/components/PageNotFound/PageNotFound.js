import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const PageNotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">
        Страница не найдена
      </p>
      <Link className="note-found__link" to="/">Назад</Link>
      <Preloader />
    </div>
  )
}

export default PageNotFound;