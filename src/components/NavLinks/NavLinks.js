import React from "react";
import { NavLink } from 'react-router-dom';

const NavLinks = ({ view, ...props }) => {
  const handleCloseBurgerMenu = () => {
    props.isMobile && props.closeBurgerMenu();
  };

  const classes = view ? `nav__page nav__page_${view}` : 'nav__page';

  return (
    <>
      <NavLink className={classes} to="/">Главная</NavLink>
      <NavLink className={classes} to="/movies" onClick={handleCloseBurgerMenu}>Фильмы</NavLink>
      <NavLink className={classes} to="/saved-movies" onClick={handleCloseBurgerMenu}>Сохранённые фильмы</NavLink>
    </>
  )
};

export default NavLinks;
