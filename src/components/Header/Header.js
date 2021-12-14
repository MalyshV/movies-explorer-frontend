import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logoIcon from '../../images/logo.svg'

const Header = ({ type }) => {
  return (
    <header className={`header header_type_${type}`}>
      <nav className={`header__content header__content_type_${type}`}>
        <Link className="header__page" to="/">
          <img className="header__icon" alt="логотип сайта" src={logoIcon}/>
        </Link>
        { type !== 'loggedIn' && <Navigation /> }
        { type === 'loggedIn' && <Navigation type='loggedIn' /> }
      </nav>
    </header>
  )
};

export default Header;
