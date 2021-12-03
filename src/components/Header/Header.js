import React from 'react';
import logoIcon from '../../images/logo.svg'
import { Link } from 'react-router-dom';

const Header = () => {
  return(
    <header className="header">
      <div className="header__content">
        <Link className="header__page" to="/">
          <img className="header__icon" alt="логотип сайта" src={logoIcon}/>
        </Link>
        <nav className="header__nav">
          <ul className="header__pages">
              <Link className="header__page" to="/movies">Фильмы</Link>
              <Link className="header__page" to="/saved-movies">Сохранённые фильмы</Link>
          </ul>
          <ul className="header__links">
            <Link className="header__link" to="/signup">Регистрация</Link>
            <Link className="header__link" to="/signin">Войти</Link>
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Header;
