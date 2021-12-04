import React from 'react';
import logoIcon from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return(
    <header className="header">
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
