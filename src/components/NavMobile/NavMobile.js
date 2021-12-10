import React, { useState } from "react";
import NavLinks from '../NavLinks/NavLinks';
import burgerIcon from '../../images/burger_large.svg';
import closeBurgerIcon from '../../images/burger-close.svg';

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const wrightIcon = !isOpen ? burgerIcon : closeBurgerIcon;
  const classes = `${isOpen ? 'nav__mobile nav__mobile_active' : 'nav__mobile'}`;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className={classes}>
      <img className="nav__burger" src={wrightIcon} alt="иконка меню-бургера" onClick={handleOpen} />
      {isOpen && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
    </nav>
  )
};

export default NavMobile;
