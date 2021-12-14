import React, { useState } from "react";
import { Link } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';
import burgerIcon from '../../images/burger_large.svg';
import closeBurgerIcon from '../../images/burger-close.svg';
import accauntIcon from '../../images/icon__accaunt.svg';

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const wrightIcon = !isOpen ? burgerIcon : closeBurgerIcon;
  const classes = `${isOpen ? 'nav__pages_view_mobile nav__pages_view_mobile-active' : 'nav__pages_view_mobile'}`;

  const handleBurgerClick = () => setIsOpen(!isOpen);
  const closeBurgerMenu = () => setIsOpen(false);

  return (
    <ul className={classes}>
      <img className="nav__burger" src={wrightIcon} alt="иконка меню-бургера" onClick={handleBurgerClick} />
      { isOpen &&
      <>
        <NavLinks view="view_mobile" isMobile={true} closeBurgerMenu={closeBurgerMenu}  />
        <Link className="nav__accaunt_view_mobile" to="/profile">
          <img className="nav__icon" alt="иконка входа в аккаунт" src={accauntIcon} />
          <p className="nav__text">Аккаунт</p>
        </Link>
      </>
      }
    </ul>
  )
};

export default NavMobile;
