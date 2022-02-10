import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../index';
import logoIcon from '../../images/logo_icon.svg';

const Header = ({ type, isLoggedIn }) => {

  const headerModificator = isLoggedIn ? 'header header_type_loggedIn' : 'header';

  return (
    <header className={`header header_type_${headerModificator}`}>
      <nav className={`header__content header__content_type_${type}`}>
        <Link className="header__page" to="/">
          <img className="header__icon" alt="логотип сайта" src={logoIcon}/>
        </Link>
        { !isLoggedIn && <Navigation /> }
        { isLoggedIn && <Navigation type='loggedIn' /> }

      </nav>
    </header>
  )
};

export default Header;
