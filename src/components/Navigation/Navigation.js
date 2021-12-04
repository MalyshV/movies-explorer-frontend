import React from "react";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return(
    <nav className="nav">
      <ul className="nav__pages">
        <Link className="nav__page" to="/movies">Фильмы</Link>
        <Link className="nav__page" to="/saved-movies">Сохранённые фильмы</Link>
      </ul>
      <ul className="nav__links">
        <Link className="nav__link" to="/signup">Регистрация</Link>
        <Link className="nav__link" to="/signin">Войти</Link>
      </ul>
    </nav>
  )
};

export default Navigation;
