import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const NavLinks = ({ type }) => {
  /* const navClassName = `${!isLoggedIn? 'nav__page' : 'nav__page nav__page_type_loggedIn'}`;
  const linksClassName = `${!isLoggedIn? 'nav__links' : 'nav__links nav__links_type_loggedIn'}`;
  const accClassName = `${!isLoggedIn? 'nav__accaunt' : 'nav__accaunt nav__accaunt_type_loggedIn'}`;

  const handleCloseSideMenu = () => {
    props.isMobile && props.closeMobileMenu();
  }; */

  /* const handleCloseSideMenu = () => {
    props.isMobile && props.closeMobileMenu();
  }; */

  return (
    <>
      <NavLink className='nav__page nav__page_type_loggedIn' to="/">Главная</NavLink>
      <NavLink className='nav__page nav__page_type_loggedIn' to="/movies">Фильмы</NavLink>
      <NavLink className='nav__page nav__page_type_loggedIn' to="/saved-movies">Сохранённые фильмы</NavLink>
    </>
  )
};

export default NavLinks;
