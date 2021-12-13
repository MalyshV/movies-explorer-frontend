import React, { useState } from "react";
import { Link } from 'react-router-dom';
import accauntIcon from '../../images/icon__accaunt.svg';

const NavLinks = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); /* для проверки белой шапки - true - здесь и в Header.js */

  const navClassName = `${!isLoggedIn? 'nav__page' : 'nav__page nav__page_type_loggedIn'}`;
  const linksClassName = `${!isLoggedIn? 'nav__links' : 'nav__links nav__links_type_loggedIn'}`;
  const accClassName = `${!isLoggedIn? 'nav__accaunt' : 'nav__accaunt nav__accaunt_type_loggedIn'}`;

  const handleCloseSideMenu = () => {
    props.isMobile && props.closeMobileMenu();
  };

  return (
    <>
      <ul className="nav__pages ">
        <Link className={navClassName} to="/" onClick={handleCloseSideMenu}>Главная</Link>
        <Link className={navClassName} to="/movies" onClick={handleCloseSideMenu}>Фильмы</Link>
        <Link className={navClassName} to="/saved-movies" onClick={handleCloseSideMenu}>Сохранённые фильмы</Link>
      </ul>
      <ul className={linksClassName}>
        <Link className="nav__link" to="/signup">Регистрация</Link>
        <Link className="nav__link" to="/signin">Войти</Link>
      </ul>
      <Link className={accClassName} to="/profile" onClick={handleCloseSideMenu}>
        <img className="nav__icon" alt="иконка входа в аккаунт" src={accauntIcon} />
        <p className="nav__text">Аккаунт</p>
      </Link>
    </>
  )
};

export default NavLinks;
