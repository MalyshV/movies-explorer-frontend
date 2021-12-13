import React, { useState } from 'react';
import logoIcon from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); /* для проверки белой шапки - true - здесь и в NavLinks.js */

  const headerClassName=`${!isLoggedIn? 'header' : 'header header_type_loggedIn'}`;

  return(
    <header className={headerClassName}>
      <div className="header__content">
        <Link className="header__page" to="/">
          <img className="header__icon" alt="логотип сайта" src={logoIcon}/>
        </Link>
        <Navigation />
      </div>
    </header>
  )
};

export default Header;
