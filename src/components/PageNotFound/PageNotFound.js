import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function PageNotFound () {
  return (
    <div className="not-found">
      <h1 className="not-found__title">
       <span>404</span>
      </h1>
      <p className="not-found__subtitle">
        Страница не найдена
      </p>
      <Link className="note-found__link" to="/">Назад</Link>
      <Preloader />
    </div>
  )
}

export default PageNotFound;